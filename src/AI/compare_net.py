#MEAN_PIXEL = np.array([ 123.68 ,  116.779,  103.939])

import scipy.io
import numpy as np
import tensorflow as tf
from functools import reduce
import transform_net as tn
import time

# Comparison network VGG

arr_str_layers = (
    "conv1_1", "relu1_1", "conv1_2", "relu1_2", "pool1",

    "conv2_1", "relu2_1", "conv2_2", "relu2_2", "pool2",

    "conv3_1", "relu3_1", "conv3_2", "relu3_2", "conv3_3",
    "relu3_3", "conv3_4", "relu3_4", "pool3",

    "conv4_1", "relu4_1", "conv4_2", "relu4_2", "conv4_3",
    "relu4_3", "conv4_4", "relu4_4", "pool4",

    "conv5_1", "relu5_1", "conv5_2", "relu5_2", "conv5_3",
    "relu5_3", "conv5_4", "relu5_4"
)

str_weights_path = "imagenet-vgg-verydeep-19.mat"

def create_network(tf_placeholder_input):
    # make the compare network. -> vgg
    #print ("tmp")
    # load weights from file
    data = scipy.io.loadmat(str_weights_path)
    # returns all of the layer information for all layers
    all_layers = data["layers"][0]
    # returns the list of means
    #normalization = data["normalization"][0][0][0]



    #print(data.keys())
    #data["layers"][1][each part of the network][1][1][5][1][kernels,biases][3][3][3][64]
    # weights hold: weights, biases, kernels
    #print(data["layers"][0][0][0][0][0][0][0])

    # define network dictionary
    network = {}
    # enumerate through layers
    net = tf_placeholder_input
    for int_id, str_layer in enumerate(arr_str_layers):
        #print (str_layer)
        # set up the network
        if "conv" in str_layer:
            # get kernels and biases for the current layer
            kernels, bias = all_layers[int_id][0][0][0][0]
            # reduces dimensionality of array to the minimum size required
            bias = bias.reshape(-1)
            # swap the ordering of the first 2 elements to fit tensorflows ordering
            kernels = np.transpose(kernels, (1,0,2,3))
            # create
            conv = tf.nn.conv2d(net, tf.constant(kernels), strides=(1,1,1,1), padding="SAME")
            net = tf.nn.bias_add(conv, bias)
        elif "relu" in str_layer:
            net = tf.nn.relu(net)
        elif "pool" in str_layer:
            # max, average
            net = tf.nn.max_pool(net, ksize=(1, 2, 2, 1), strides=(1, 2, 2, 1), padding="SAME")
        network[str_layer] = net

    #assert len(network) == len(arr_str_layers)
    return network





STYLE_WEIGHT, CONTENT_WEIGHT = 1e2, 7.5
TOTVAR_WEIGHT = 2e2


def get_style_loss(img_style):
    #style_features = {}
    #with tf.Graph().as_default(), tf.device("/cpu:0"), tf.Session() as sess:
    img_style = scipy.misc.imresize(img_style,(256,256))
    tf_placeholder_img = tf.placeholder(tf.float32, shape=(1,)+img_style.shape, name="style_image")
    # pre-process may be added here
    net = create_network(tf_placeholder_img)

    img_np_style = np.array([img_style])

    style_loss = []
    for layer in ("relu1_1", "relu2_1", "relu3_1", "relu4_1", "relu5_1"):
        layer_feature = net[layer].eval(feed_dict={tf_placeholder_img:img_np_style})
        layer_feature = np.reshape(layer_feature, (-1, layer_feature.shape[3]))
        gram_mat = np.matmul(layer_feature.T, layer_feature)/layer_feature.size
        #style_features[layer] = gram_mat

        net_layer = net[layer]
        batch, h, w, filters = map(lambda i : i.value, net_layer.get_shape())
        size = w*h*filters
        print(net_layer, batch, w, h, filters)
        features = tf.reshape(net_layer, (batch, w*h, filters))
        grams = tf.matmul(tf.transpose(features, perm=[0,2,1]), features)
        #style_gram = style_features
        style_loss.append(2*tf.nn.l2_loss(grams-gram_mat)/gram_mat.size)

    style_loss = STYLE_WEIGHT * reduce(tf.add, style_loss)

    return style_loss




def get_content_loss():
    cont_features = {}
    # Need to resize training images to 256x256
    tf_placeholder_img = tf.placeholder(tf.float32, shape=(1,256,256,3), name="content_image")
    pred = tn.create_network(tf_placeholder_img)
    net = create_network(pred)
    cont_features["relu4_2"] = net["relu4_2"]
    # May have to do tf_placeholder_img/255 for img representation

    # int_content_size = _tensor_size(cont_features["relu4_2"])
    # TODO: Find appropriate content weight

    cont_size = _tensor_size(cont_features["relu4_2"])

    # May need to add assert similar to line 90 of optimize

    cont_loss = CONTENT_WEIGHT * tf.nn.l2_loss(net["relu4_2"] - cont_features["relu4_2"])/cont_size
    # "relu4_2" represents the content layer of net


    return pred, cont_loss, tf_placeholder_img








def get_images_list(loc):
    from os import listdir
    from os.path import isfile, join
    all_files = [join(loc, f) for f in listdir(loc) if isfile(join(loc, f))]
    return all_files



def train_nn(img_style, str_content_img_dir):
    cont_img_name_list = get_images_list(str_content_img_dir)
    # create convolutional NN
    # get style and content features
    # build network per Session

    #yield(0,1,2,3,4,False)
    builder = tf.saved_model.builder.SavedModelBuilder("checks")
    with tf.Graph().as_default(), tf.Session() as sess:
        style_loss = get_style_loss(img_style)
        preds, cont_loss, x_content = get_content_loss()
        totvar_x_size = _tensor_size(preds[:,:,1:,:])
        totvar_y_size = _tensor_size(preds[:,1:,:,:])
        x_totvar = tf.nn.l2_loss(preds[:,:,1:,:] - preds[:,:,:255,:])
        y_totvar = tf.nn.l2_loss(preds[:,1:,:,:] - preds[:,:255,:,:])
        totvar_loss = TOTVAR_WEIGHT *2*(x_totvar/totvar_x_size + y_totvar/totvar_y_size)
        total_loss = cont_loss + style_loss + totvar_loss


        # auto defaults to 0.001 as the learning rate
        train_step = tf.train.AdamOptimizer().minimize(total_loss)
        sess.run(tf.global_variables_initializer())
        train_time = time.time()

        #saver = tf.train.Saver()
        for epoch in range(3):
            epoch_time = time.time()

            num_examples = len(cont_img_name_list)
            iteration = 0
            # could be swapped to for loop
            while iteration < num_examples:
                step = iteration+1
                X = np.expand_dims(get_img(cont_img_name_list[iteration]).astype(np.float32),  axis = 0).astype(np.float32)

                iteration += 1

                feed_dict = {x_content:X}
                train_step.run(feed_dict=feed_dict)

                #  if (epoch == 100000-1 and iteration >= num_examples) or (epoch % 10000 == 0 and iteration >= num_examples):
                if  (epoch >= 0 and iteration >= num_examples):
                    to_get = [style_loss, cont_loss, totvar_loss, total_loss, preds]
                    test_feed_dict = {
                       x_content:X
                    }
                    tup = [0,0,0,0,0]
                    #saver.save(sess, "saves/iris-model.ckpt")
                    #tup = sess.run(to_get, feed_dict=test_feed_dict)
                    yield(tup[-1], tup[1:-1], iteration, epoch, sess, False)


            print("time for epoch: ", epoch, "is",(time.time()-epoch_time) )
        builder.add_meta_graph_and_variables(sess, ["iris"])

    #tf_net = create_network()
    builder.save()
    print("time to train:",(time.time()-train_time))



def _tensor_size(tensor):
    from operator import mul
    return reduce(mul, (d.value for d in tensor.get_shape()[1:]), 1)
