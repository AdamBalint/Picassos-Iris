# Style image, content image, content weight, style weight, total variance weight
# pretrained VGG19 weights

# train the network
# save checkpoints

from scipy.misc import imsave, imread
import tensorflow as tf
from argparse import ArgumentParser
from compare_net import train_nn

_bool_save_training = True

# starts the training and saves the checkpoints
# in charge of printing and saving the final weights
def train(style_name, img_style, epochs, str_content_img_dir):
    for img_results, float_arr_losses, int_iteration, int_epoch, tf_session, bool_end in train_nn(style_name, img_style, epochs, str_content_img_dir):
        if ((int_iteration % 500) == 0):
            print ("Epoch", int_epoch, "int_iteration", int_iteration, "Losses", float_arr_losses)
        if ((int_iteration % 10000) == 0 and _bool_save_training):
            # save image
            imsave(img_results, "../training/img_results")
        if (bool_end):
            # save tf_session
            tf_weight_saver = tf.train.Saver()
            # tf_weight_saver.save(tf_session, str_output_dir)
    # train_nn(img_style, str_content_img_dir);

def build_parser():
    par_main = ArgumentParser()
    par_main.add_argument('--style-name', type=str,
                        dest='str_style_name',help='name of style trained, che',
                        metavar='IN_PATH', required=True)
    par_main.add_argument('--style-path', type=str,
                        dest='str_path_style',help='Image to transform',
                        metavar='IN_PATH', required=True)
    par_main.add_argument('--epochs', type=int,
                        dest='int_epochs', help='epoch count for training corpus',
                        metavar='INT_ARG', required=True)
    par_main.add_argument('--train-path', type=str,
                        dest='str_train_path', help='directory of training images',
                        metavar='IN_ARG', required=True)
    # par_main.add_argument('--ckpt-path', type=str,
    #                     dest='str_ckpt_path', help='directory for saving checkpoints',
    #                     metavar='', required=True)
    return par_main


if __name__ == "__main__":
    par_main = build_parser()
    args_main = par_main.parse_args()
    img_style = imread(args_main.str_path_style, mode="RGB")
    train(args_main.str_style_name, img_style, args_main.int_epochs, args_main.str_train_path)
