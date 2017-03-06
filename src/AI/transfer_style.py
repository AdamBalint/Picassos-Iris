import tensorflow as tf
from argparse import ArgumentParser
from utils import save_img, get_img, exists, list_files

DEVICE = '/gpu:0'

def feedNetwork(img_in, str_path_out, str_check_dir):

        shape_in = img_in.shape()
        graphMain = tf.Graph()
        with graphMain.as_default(), graphMain.device(DEVICE), \
            tf.Session(config=soft_config) as sessMain:
            img_placeholder = tf.placeholder(tf.float32, shape=img_shape,
                                         name='img_placeholder')
            predMain = transform.net(img_placeholder)
            tfSaver = tf.train.Saver()
            tfSaver.restore(sessMain, checkpoint_dir)
            _preds = sessMain.run(predMain, feed_dict={img_placeholder:X})
            save_img(str_paths_out, _preds[0])


def buildParser:
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
                        metavar='CHECKPOINT', required=True)

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

def main()
    parMain = buildParer()
    argsMain = parMain.parse_args() ##get arguements
    if exists(argsMain.str_path_in):
        ##build image from in path and then call feedfoward network
        imgMain = get_img(argsMain.str_path_in)
        feedNetwork(imgMain, argsMain.str_path_out, str_check_dir)
