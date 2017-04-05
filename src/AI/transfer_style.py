import tensorflow as tf
from argparse import ArgumentParser
from scipy.misc import imsave, imread, imresize
import numpy as np
import transform_net
import compare_net as cn

def feed_network(img_in, str_path_out):

        shape_in = (1,)+(img_in.shape)
        img_in = np.expand_dims(img_in.astype(np.float32),  axis = 0).astype(np.float32)
        soft_config = tf.ConfigProto(allow_soft_placement=True)
        soft_config.gpu_options.allow_growth = True
        graph_main = tf.Graph()
        with graph_main.as_default() , tf.Session(config=soft_config) as sess_main:
            
            img_placeholder = tf.placeholder(tf.float32, shape=shape_in, name='img_placeholder')
            pred_main = transform_net.create_network(img_placeholder)
            #sess_main.run(tf.global_variables_initializer())
            #tf.saved_model.loader.load(sess_main, ["iris"], "checks")
            new_saver = tf.train.import_meta_graph("checks/iris-model.ckpt.meta")
            new_saver.restore(sess_main, tf.train.latest_checkpoint('checks/'))
            _preds = sess_main.run(pred_main, feed_dict={img_placeholder:img_in})
            imsave(str_path_out, cn.unprocess(_preds[0]).astype(np.uint8))


def build_parser():
    par_main = ArgumentParser()
    par_main.add_argument('--in-path', type=str,
                        dest='str_path_in',help='Image to transform',
                        metavar='IN_PATH', required=True)

    par_main.add_argument('--out-path', type=str,
                        dest='str_path_out', help='Destination directory for transformed image',
                        metavar='OUT_PATH', required=True)
    return par_main

def get_img(loc):
    img = imread(loc, mode="RGB")
    if len(img.shape) != 3 or img.shape[2] != 3:
        img = np.dstack((img, img, img))
    #img = imresize(img,(256,256,3))
    return img

def main():
    par_main = build_parser()
    args_main = par_main.parse_args()
    img_main = get_img(args_main.str_path_in)
    feed_network(img_main, args_main.str_path_out)

if __name__ == "__main__":
    main()
