import os
from flask import Flask, url_for, render_template, jsonify, request, make_response, send_file
from shutil import copyfile
import webview
import app
import base64
from PIL import Image

frontend_dir = os.path.join(os.getcwd(), "../frontend")  # development path
if not os.path.exists(frontend_dir):  # frozen executable path
    frontend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)),
        "../frontend")

server = Flask(__name__, static_folder=frontend_dir, template_folder=frontend_dir)
server.config["SEND_FILE_MAX_AGE_DEFAULT"] = 1  # disable caching

supported_file_types = [
    'png',
    'jpg',
    'jpeg',
    'tiff'
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
    can_start = app.initialize()
    response = {"status": "ok"} if can_start else {"status": "error"}
    return jsonify(response)


@server.route("/open/file")
def open_file():
    """
    Invoke a file selection dialog here
    :return:
    """
    image_file_filter = webview.create_file_filter(supported_file_types)

    dirs = webview.create_file_dialog(webview.OPEN_DIALOG, allow_multiple=False,
        file_filter=image_file_filter)

    if dirs and len(dirs) > 0:
        selected_file = dirs[0]
        filename, file_extension = os.path.splitext(selected_file)

        with Image.open(selected_file) as im:
            width, height = im.size

        with open(selected_file, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read())

        response = {
            "status": "ok",
            "ext": "image/"+file_extension[1:],
            "width": width,
            "height": height,
            "file_path": selected_file,
            "img_base64": encoded_string.decode("utf-8")
        }
    else:
        response = {"status": "cancel"}

    return jsonify(response)


def run_server():
    server.run(host="127.0.0.1", port=23948, threaded=True)


if __name__ == "__main__":
    run_server()
