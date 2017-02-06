import os
from flask import Flask, url_for, render_template, jsonify, request, make_response
import webview
import app

gui_dir = os.path.join(os.getcwd(), "gui")  # development path
if not os.path.exists(gui_dir):  # frozen executable path
    gui_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gui")

server = Flask(__name__, static_folder=gui_dir, template_folder=gui_dir)
server.config["SEND_FILE_MAX_AGE_DEFAULT"] = 1  # disable caching


@server.after_request
def add_header(response):
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
def choose_path():
    """
    Invoke a file selection dialog here
    :return:
    """
    dirs = webview.create_file_dialog(webview.OPEN_DIALOG)
    if dirs and len(dirs) > 0:
        selected_file = dirs[0]
        if isinstance(selected_file, bytes):
            selected_file = selected_file.decode("utf-8")

        response = {
                "status": "ok",
                "file": selected_file
            }
    else:
        response = {"status": "cancel"}

    return jsonify(response)


@server.route("/do/stuff", methods=['POST'])
def do_stuff():
    result = app.do_stuff()

    if result:
        response = {
            "status": "ok",
            "result": result
        }
    else:
        response = {
            "status": "error"
        }

    return jsonify(response)


def run_server():
    server.run(host="127.0.0.1", port=23948, threaded=True)


if __name__ == "__main__":
    run_server()
