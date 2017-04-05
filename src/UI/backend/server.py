import os
import base64
import webview
import util
from models.image import Image
from flask import Flask, render_template, jsonify, request

FRONTEND_DIR = os.path.join(os.getcwd(), "../frontend")  # development path
if not os.path.exists(FRONTEND_DIR):  # frozen executable path
    FRONTEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                "../frontend")

STYLES_DIR = os.path.join(os.getcwd(), "../../Resources/styles")
if not os.path.exists(STYLES_DIR):
    STYLES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../Resources/styles")


server = Flask(__name__, static_folder=FRONTEND_DIR, template_folder=FRONTEND_DIR)
server.config["SEND_FILE_MAX_AGE_DEFAULT"] = 1  # disable caching

SUPPORTED_FILE_TYPES = [
    'png',
    'jpg',
    'jpeg',
    'tiff'
]

STYLES = [
    ('persistence_of_memory', '.png',
    [
      'How time flows when you are having fun ⌛🎉',
      "Curling Dali's mustache 😲"
    ]),
    ('starry_night', '.jpg',
    [
      "Finding Van Gogh's missing ear 👀👂",
      "Gogh-ing to get the artist ✌ 🔜"
    ]),
    ('wave', '.jpg',
    [
      'Waving it up, dude 🌊🌊🌊',
      'Note: Art generated is not suitable for surfing 😖❗❗',
      'These waves are more dangerous than an iceberg! ❄'
    ])
]


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

    for style in STYLES:
        img = Image(STYLES_DIR+"/"+style[0]+style[1])
        img.name = style[0]
        img_quotes = style[2]
        response["styles"].append({
            "status":"ok",
            "ext": "image/"+img.ext[1:],
            "name": img.name,
            "width": img.width,
            "height": img.height,
            "file_path": img.file_path,
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

  :return: json response
  {
    "status": "ok or fail"
  }
  """

  data = request.get_json(cache=False)

  file_name = webview.create_file_dialog(webview.SAVE_DIALOG, allow_multiple=False, file_filter=None, save_filename="file")

  response = {
    "status": "cancel"
  }

  if file_name and len(file_name) > 0:
    with open(file_name[0]+".png", "wb") as fh:
        img_data = base64.b64decode(data["img_base64"])
        fh.write(img_data)
    response = {
      "status": "ok"
    }

  return jsonify(response)

@server.route("/stylize", methods=['POST'])
def stylize():
    """
    Route to stylize image.
    Returns base_64 of styled image
    """
    data = request.get_json(cache=True)

    # not implemented yet

    # response = {
    #     "styled_base_64": util.get_styled_image(data["file_path"], (data["width"], data["height"])).decode("utf-8")
    # }

    response = {
        "status": "cancel"
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
        selected_file_path = dirs[0]
        img = Image(selected_file_path)
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
