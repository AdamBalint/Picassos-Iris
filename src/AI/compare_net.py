#MEAN_PIXEL = np.array([ 123.68 ,  116.779,  103.939])

import scipy.io
import numpy as np
import tensorflow as tf


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

CONTENT_WEIGHT = 0.5

str_weights_path = "imagenet-vgg-verydeep-19.mat"

def create_network(tf_placeholder_input):
    # make the compare network. -> vgg
    print ("tmp")
    # load weights from file
    data = scipy.io.loadmat(str_weights_path)
    # returns all of the layer information for all layers
    all_layers = data["layers"][0]
    # returns the list of means
    normalization = data["normalization"][0][0][0]



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









def get_style_features(img_style):
    style_features = {}
    with tf.Graph().as_default(), tf.device("/cpu:0"), tf.Session() as sess:

        tf_placeholder_img = tf.placeholder(tf.float32, shape=(1,)+img_style.shape, name="style_image")
        # pre-process may be added here
        net = create_network(tf_placeholder_img)

        img_np_style = np.array([img_style])

        for layer in ("relu1_1", "relu2_1", "relu3_1", "relu4_1", "relu5_1"):
            layer_feature = net[layer].eval(feed_dict={tf_placeholder_img:img_np_style})
            layer_feature = np.reshape(layer_feature, (-1, layer_feature.shape[3]))
            gram_mat = np.matmul(layer_feature.T, layer_feature)/layer_feature.size
            style_features[layer] = gram_mat
        return style_features
    print("tmp")



def get_content_features(str_content_img_dir):
    cont_features = {}
    with tf.Graph().as_default(), tf.device("/cpu:0"), tf.Session() as sess:
        # Need to resize training images to 256x256
        tf_placeholder_img = tf.placeholder(tf.float32, shape=(1,256,256,3), name="content_image")
        net = create_network(tf_placeholder_img)
        # May have to do tf_placeholder_img/255 for img representation
        # int_content_size = _tensor_size(cont_features["relu4_2"])
        # TODO: Find appropriate content weight
        content_loss = CONTENT_WEIGHT * tf.nn.l2_loss(net["relu4_2"] - cont_features["relu4_2"])
        # "relu4_2" represents the content layer of net


    return cont_features









def train_nn(img_style, str_content_img_dir):

    # create convolutional NN
    # get style and content features
    # build network per Session

    yield(0,1,2,3,4,False)
    #get_style_features()
    #get_content_features()
    #tf_net = create_network()
