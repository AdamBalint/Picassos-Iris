import os
import base64
import webview
import json
import util
from PIL import Image as im
from io import BytesIO
from models.image import Image
from flask import Flask, render_template, jsonify, request

FRONTEND_DIR = os.path.join(os.getcwd(), "gui")  # development path
if not os.path.exists(FRONTEND_DIR):  # frozen executable path
    FRONTEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gui")

STYLES_DIR = os.path.join(os.getcwd(), "styles")
if not os.path.exists(STYLES_DIR):
    STYLES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "styles")

JSON_FILE_PATH = os.path.join(os.getcwd(), "config")
if not os.path.exists(JSON_FILE_PATH):
    JSON_FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "config")


JSON_FILE_PATH = JSON_FILE_PATH + '/styles.json'

"""
Schema of the cache is as follows:

Cache:
  [file_path]: {
    styled_previews: {
      id: {
        base64_result
      }
      ...
    }
    styled_results: {
      style_name: {
        base64_result:
      }
      ...
    }
  },
  ...
}
"""

CACHE = {}

server = Flask(__name__, static_folder=FRONTEND_DIR, template_folder=FRONTEND_DIR)
server.config["SEND_FILE_MAX_AGE_DEFAULT"] = 1  # disable caching

SUPPORTED_FILE_TYPES = [
    'png',
    'jpg',
    'jpeg',
    'tiff'
]

JSON_DATA = {}
with open(JSON_FILE_PATH) as json_file:
  JSON_DATA = json.load(json_file)

SELECTED_FILE = {
    "selected_file_name": '',
    "selected_file_ext": '',
}

SELECTED_STYLE = {
    "selected_style_name": '',
}

@server.after_request
def add_header(response):
    """
    Disables caching by modifying Cache-Control in header
    """
    response.headers['Cache-Control'] = 'no-store'
    return response


@server.route("/")
def landing():
    """
    Render index.html. Initialization is performed asynchronously in
    initialize() function
    """
    return render_template("index.html")


@server.route("/init")
def initialize():
    """
    Perform heavy-lifting initialization asynchronously.
    :return:
    """
    response = {"status": "ok"}
    return jsonify(response)

@server.route("/styles")
def fetch_styles():
    """
    Route to fetch all styles supported by Picasso's Iris
    """

    response = {
        "styles": []
    }

    for style in JSON_DATA["styles"]:
        name = style["name"]
        ext = style["style_extension"]
        quotes = style["quotes"]
        img_file_name=style["style_file_name"]
        img = Image(STYLES_DIR+"/"+img_file_name+ext)
        img.name = name
        img_quotes = quotes
        response["styles"].append({
            "status":"ok",
            "ext": "image/"+img.ext[1:],
            "name": img.name,
            "width": img.width,
            "height": img.height,
            "file_path": img.file_path,
            "price": style["price"],
            "unlocked": style["unlocked"],
            "quotes": img_quotes,
            "img_base64": img.base_64.decode("utf-8")
        })

    return jsonify(response)

@server.route("/save-image", methods=['POST'])
def save_image():
    """
    Route to save image

    POST Parameters:
    {
      img_base64: base64 representation of image to save
    }
    :return: json response:
    {
      "status": "ok or cancel"
    }
    """

    data = request.get_json(cache=False)
    orig_file_name = SELECTED_FILE["selected_file_name"]
    selected_style = SELECTED_STYLE["selected_style_name"]
    file_ext = SELECTED_FILE["selected_file_ext"]
    save_filename = orig_file_name + " - " + selected_style+file_ext
    file_name = webview.create_file_dialog(webview.SAVE_DIALOG, allow_multiple=False, file_filter=None, save_filename=save_filename)

    response = {
        "status": "cancel"
    }

    if file_name and len(file_name) > 0:
        img_file = open(file_name[0], "wb")
        img_file.write(base64.b64decode(data["img_base64"]))
        img_file.close()
        response = {
            "status": "ok"
        }

    return jsonify(response)


@server.route("/stylize-preview", methods=['POST'])
def stylize_preview():
    """
    Route to stylize image.
    Returns base_64 of styled image
    {
      "styled_base_64": "base_64 of styled image"
    }
    """
    data = request.get_json(cache=True)

    style_id = data["style_id"]
    file_path = data["file_path"]
    width = data["width"]
    height = data["height"]

    if style_id not in CACHE[file_path]["styled_previews"]:
        style_name = JSON_DATA["styles"][style_id]["checkpoint_dir_name"]
        orig_img = im.open(file_path)
        img = orig_img.resize((width, height), resample=im.NEAREST)
        styled_base64 = util.get_styled_image(img, style_name, preview=True)
        styled_image = im.open(BytesIO(base64.b64decode(styled_base64)))
        styled_image = styled_image.resize(
            (orig_img.width, orig_img.height), resample=im.NEAREST)
        buff = BytesIO()
        styled_image.save(buff, format="JPEG")
        styled_base64 = base64.b64encode(buff.getvalue()).decode("utf-8")

        response = {
            "id": style_id,
            "styled_base_64": styled_base64
        }

        CACHE[file_path]["styled_previews"][style_id] = {
            "styled_base_64": response["styled_base_64"]
        }

        return jsonify(response)
    else:
        response = {
            "id": style_id,
            "styled_base_64": CACHE[file_path]["styled_previews"][style_id]["styled_base_64"]
        }
        return jsonify(response)

@server.route("/stylize-result", methods=['POST'])
def stylize():
    """
    Route to stylize image.
    Returns base_64 of styled image
    :return: json response:
    {
      "styled_base_64": "base_64 of styled image"
    }
    """
    data = request.get_json(cache=True)

    # get variables from request
    style_id = data["style_id"]
    style_name = JSON_DATA["styles"][style_id]["name"]
    checkpoint_dir_name = JSON_DATA["styles"][style_id]["checkpoint_dir_name"]
    SELECTED_STYLE["selected_style_name"] = checkpoint_dir_name
    opacity = float(str(data["opacity"]))
    img_file_path = data["file_path"]

    if style_name not in CACHE[img_file_path]["styled_results"]:
        image_file = im.open(img_file_path)
        styled_base64 = util.get_styled_image(
            image_file, checkpoint_dir_name, preview=False)
        styled_image = im.open(BytesIO(base64.b64decode(styled_base64)))
        image_file = image_file.convert("RGBA")
        styled_image = styled_image.convert("RGBA")

        # apply the overlay on the background with defined opacity
        # where the overlay is the styled image
        # and the background user selected image
        new_img = im.blend(image_file, styled_image, opacity / 100)

        response = {
            "id": style_id,
            "styled_base_64": util.get_base64_from_image(new_img).decode("utf-8")
        }

        CACHE[img_file_path]["styled_results"][style_name] = {
            "styled_base_64": styled_base64
        }

        return jsonify(response)
    else:
        image_file = im.open(img_file_path)
        styled_base64 = CACHE[img_file_path]["styled_results"][style_name]["styled_base_64"]
        styled_image = im.open(BytesIO(base64.b64decode(styled_base64)))
        image_file = image_file.convert("RGBA")
        styled_image = styled_image.convert("RGBA")
        new_img = im.blend(image_file, styled_image, opacity / 100)

        response = {
            "id": style_id,
            "styled_base_64": util.get_base64_from_image(new_img).decode("utf-8")
        }
        return jsonify(response)

@server.route("/shop/purchase", methods=["POST"])
def purchase_style():
  """
  Updates the JSON file when a purchase has been made
  """

  response = {
    "status": "cancel"
  }

  data = request.get_json(cache=False)
  style_purchased_index = data["id"]
  JSON_DATA["styles"][style_purchased_index]["unlocked"] = True
  with open(JSON_FILE_PATH, 'w') as outfile:
        json.dump(JSON_DATA, outfile, indent=4)
        response = {
            "status": "ok"
        }

  return jsonify(response)



@server.route("/open/file")
def open_file():
    """
    Invoke a file selection dialog here
    :return: json response:
    {
        "status": "ok or "cancel"
        "ext": "file extension",
        "width": "image width",
        "height": "image height",
        "file_path": "absolute_file_path",
        "img_base64": "base 64 string representation"
    }
    """
    image_file_filter = webview.create_file_filter(SUPPORTED_FILE_TYPES)

    dirs = webview.create_file_dialog(webview.OPEN_DIALOG, allow_multiple=False,
                                      file_filter=image_file_filter)

    if dirs and len(dirs) > 0:
        file_path = dirs[0]
        img = Image(file_path)
        SELECTED_FILE["selected_file_name"] = img.file_name
        SELECTED_FILE["selected_file_ext"] = img.ext

        if file_path not in CACHE:
            CACHE[file_path] = {
                "styled_previews": {},
                "styled_results": {}
            }

        response = {
            "status": "ok",
            "ext": "image/"+img.ext,
            "width": img.width,
            "height": img.height,
            "file_path": img.file_path,
            "img_base64": img.base_64.decode("utf-8")
        }
    else:
        response = {"status": "cancel"}

    return jsonify(response)


def run_server():
    """
    Starts server, entry point
    """
    server.run(host="127.0.0.1", port=3000, threaded=True)


if __name__ == "__main__":
    run_server()
