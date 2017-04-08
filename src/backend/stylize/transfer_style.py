import os
import tensorflow as tf
import base64
from argparse import ArgumentParser
from scipy.misc import imsave, imread, imresize
from io import BytesIO
from PIL import Image
import numpy as np
from stylize.AI import transform_net
from stylize import img_utils


MAX_WIDTH = MAX_HEIGHT = 2000

CHECKPOINT_DIR = os.path.join(os.path.dirname(
    os.path.abspath(__file__)), "checkpoints/")
if not os.path.exists(CHECKPOINT_DIR):  # dev executable path
    CHECKPOINT_DIR = os.path.join(os.getcwd(), "stylize/checkpoints/")

def feed_network(img_in, str_path_out, style_name, base64=False):
    shape_orig = img_in.shape
    print (shape_orig)
    # double check to make sure that the association is right
    scale_x, scale_y = MAX_WIDTH/shape_orig[1], MAX_WIDTH/shape_orig[0]
    img_scale = min(scale_x, scale_y)
    img_in = imresize(img_in, (int(shape_orig[0]*img_scale), int(shape_orig[1]*img_scale), shape_orig[2]))
    shape_in = (1,)+(img_in.shape)
    img_in = np.expand_dims(img_in.astype(np.float32),  axis = 0).astype(np.float32)
    soft_config = tf.ConfigProto(allow_soft_placement=True)
    soft_config.gpu_options.allow_growth = True
    graph_main = tf.Graph()
    with graph_main.as_default() , tf.Session(config=soft_config) as sess_main:
        img_placeholder = tf.placeholder(tf.float32, shape=shape_in, name='img_placeholder')
        pred_main = transform_net.create_network(img_placeholder)
        saver = tf.train.Saver(tf.get_collection(tf.GraphKeys.TRAINABLE_VARIABLES))
        saver.restore(sess_main, tf.train.latest_checkpoint(CHECKPOINT_DIR+style_name) )
        _preds = sess_main.run(pred_main, feed_dict={img_placeholder:img_in})[0]
        _preds = imresize(_preds, shape_orig)
        if (base64):
            return img_utils.save_img_base64(_preds)
        imsave(str_path_out, _preds.astype(np.uint8))


def build_parser():
    par_main = ArgumentParser()
    par_main.add_argument('--in-path', type=str,
                        dest='str_path_in',help='Image to transform',
                        metavar='IN_PATH', required=True)
    par_main.add_argument('--out-path', type=str,
                        dest='str_path_out', help='Destination directory for transformed image',
                        metavar='OUT_PATH', required=True)
    par_main.add_argument('--style', type=str,
                        dest='str_style', help='Style applied to image',
                        metavar='STYLE_PATH', required=True)
    return par_main

def main():
    par_main = build_parser()
    args_main = par_main.parse_args()
    img_main = img_utils.get_img_from_path(args_main.str_path_in)
    style_name = args_main.str_style
    feed_network(img_main, args_main.str_path_out, style_name)

if __name__ == "__main__":
    main()
