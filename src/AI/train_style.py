# Style image, content image, content weight, style weight, total variance weight
# pretrained VGG19 weights

# train the network
# save checkpoints

from scipy.misc import imsave
import tensorflow as tf
from compare_net import train_nn

_bool_save_training = True

# starts the training and saves the checkpoints
# in charge of printing and saving the final weights
def train(str_name, img_style, str_content_img_dir, str_output_dir):
    for img_results, float_arr_losses, int_iteration, int_epoch, tf_session, bool_end in train_nn(img_style, str_content_img_dir):
        if ((int_iteration % 500) == 0):
            print ("Epoch", int_epoch, "int_iteration", int_iteration, "Losses", float_arr_losses)
        if ((int_iteration % 10000) == 0 and _bool_save_training):
            # save image
            imsave(img_results, "../training/img_results")
        if (bool_end):
            # save tf_session
            tf_weight_saver = tf.train.Saver()
            tf_weight_saver.save(tf_session, str_output_dir)




if __name__ == "__main__":
    train()
