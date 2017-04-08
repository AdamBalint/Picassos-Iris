from io import BytesIO
import base64
from stylize import transfer_style, img_utils

def get_styled_image(img, style_name):
    img = img_utils.get_scipy_img_from_img(img)
    return transfer_style.feed_network(img, './', style_name, base64=True)


def get_base64_from_image(img):
    buff = BytesIO()
    img.save(buff, format="JPEG")
    return base64.b64encode(buff.getvalue())


