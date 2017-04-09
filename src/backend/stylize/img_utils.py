import numpy as np
from PIL import Image
from scipy.misc import imread, imresize
from io import BytesIO
import base64

def get_img_from_path(loc):
    img = imread(loc, mode="RGB")
    if len(img.shape) != 3 or img.shape[2] != 3:
        img = np.dstack((img, img, img))
    return img

def get_scipy_img_from_img(img):
    result = np.array(img.convert("L"))
    if  len(result.shape) != 3 or result.shape[2] != 3:
        result = np.dstack((result, result, result))
    return result

def save_img_base64(_preds):
    """
    Returns image as base64
    :param: preds - np array which describes an image
    """
    img = Image.fromarray(_preds)
    buff = BytesIO()
    img.save(buff, format="JPEG")
    return base64.b64encode(buff.getvalue())

