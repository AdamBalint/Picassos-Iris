import os
import base64
from PIL import Image as Im

class Image:
    def __init__(self, path):
        self.file_path = path
        self.name, self.base_64, self.ext = ["", "", ""]
        self.height, self.width = [0, 0]
        self.ext = os.path.splitext(self.file_path)[1:][0]
        with Im.open(self.file_path) as image:
            self.height, self.width = image.size
        with open(self.file_path, "rb") as image_file:
            self.base_64 = base64.b64encode(image_file.read())


