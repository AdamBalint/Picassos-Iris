import tensorflow as tf
from argparse import ArgumentParser
from scipy.misc import imsave, imread, imresize
import numpy as np
import transform_net

#DEVICE = '/gpu:0'

def feedNetwork(img_in, str_path_out, str_check_dir=None):

        shape_in = (1,)+(img_in.shape)
        img_in = np.expand_dims(img_in.astype(np.float32),  axis = 0).astype(np.float32)
        soft_config = tf.ConfigProto(allow_soft_placement=True)
        soft_config.gpu_options.allow_growth = True
        graphMain = tf.Graph()
        with graphMain.as_default() , tf.Session(config=soft_config) as sessMain:
            img_placeholder = tf.placeholder(tf.float32, shape=shape_in, name='img_placeholder')
            predMain = transform_net.create_network(img_placeholder)
            sessMain.run(tf.global_variables_initializer())
            tf.saved_model.loader.load(sessMain, ["iris"], "checks")
            _preds = sessMain.run(predMain, feed_dict={img_placeholder:img_in})
            imsave(str_path_out, _preds[0])


def buildParser():
    parMain = ArgumentParser()

    parMain.add_argument('--in-path', type=str,
                        dest='str_path_in',help='file to transform',
                        metavar='IN_PATH', required=True)

    parMain.add_argument('--out-path', type=str,
                        dest='str_path_out', help='destination dir of transformed file',
                        metavar='OUT_PATH', required=True)

    parMain.add_argument('--checkpoint', type=str,
                        dest='str_check_dir',
                        help='dir to load checkpoint from',
                        metavar='CHECKPOINT', required=False)

    ##parMain.add_argument('--device', type=str,
    ##                    dest='str_device',help='device to perform compute on',
    ##                    metavar='DEVICE', default=DEVICE)

    ##parMain.add_argument('--batch-size', type=int,
    ##                    dest='int_batch_size',help='batch size for feedforwarding',
    ##                    metavar='BATCH_SIZE', default=BATCH_SIZE)

    ##parMain.add_argument('--allow-different-dimensions', action='store_true',
    ##                    dest='allow_different_dimensions',
    ##                    help='allow different image dimensions')

    return parMain

def get_img(loc):
    img = imread(loc, mode="RGB")
    if len(img.shape) != 3 or img.shape[2] != 3:
        img = np.dstack((img, img, img))
    img = imresize(img,(256,256,3))

    return img

def main():
    parMain = buildParser()
    argsMain = parMain.parse_args() ##get arguements
    #exists(argsMain.str_path_in, "No in path exists")
        ##build image from in path and then call feedfoward network
    imgMain = get_img(argsMain.str_path_in)
    feedNetwork(imgMain, argsMain.str_path_out)

if __name__ == "__main__":
    main()
