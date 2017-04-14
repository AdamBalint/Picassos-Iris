from . import transfer_style
import img_utils
import os

def get_styled_image(img):
    """
    Returns a base64 string of a styled image
    """
    img_in = img_utils.get_scipy_img_from_img(img)
    return transfer_style.feed_network(img_in, './', 'waves_82k', base64=True)







