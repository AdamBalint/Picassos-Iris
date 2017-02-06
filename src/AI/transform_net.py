# preprocess  transform of acontent image
import tensorflow as tf
def create_network(img_content):
    net = conv_layer(img_content, 32, 9, 1, True)
    net = conv_layer(net, 64, 3, 2, True)
    net = conv_layer(net, 128, 3, 2, True)
    for i in range (5):
        temp = conv_layer(net, 128, 3, 1, True)
        net = net + conv_layer(temp, 128, 3, 1, False)
    net = conv_tr(net, 64, 3, 2)
    net = conv_tr(net, 32, 3, 2)
    net = conv_layer(net, 3, 9, 1, False)
    net = tf.nn.sigmoid(net) * 255.0
    return net

def conv_layer(net, int_filters, int_filter_size, int_strides, bool_relu):
    weights = init_weights(net, int_filters, int_filter_size, False)
    strides = [1, int_strides, int_strides, 1]
    net =  tf.nn.conv2d(net, weights, strides, padding="SAME")
    net = normalize(net)
    if bool_relu:
        net = tf.nn.relu(net)
    return net

def conv_tr(net, int_filters, int_filter_size, int_strides):
    weights = init_weights(net, int_filters, int_filter_size, True)
    int_batch_size, int_rows, int_cols, int_channels = [i.value for i in net.get_shape()]

    shape = tf.pack([int_batch_size, int_rows * int_strides, int_cols * int_strides, int_filter_size])
    strides = [1, int_strides, int_strides, 1]
    net = tf.nn.conv2d_transpose(net, weights, strides, shape, padding = "SAME")
    net = normalize(net)
    return tf.nn.relu(net)

def normalize(net):
    int_batch_size, int_rows, int_cols, int_channels = [i.value for i in net.get_shape()]
    shape = [int_channels]
    flt_mean, flt_variance = tf.nn.moments(net, [1,2], keep_dims=True)
    #shift = tf.Variable(tf.zeros(shape))
    scale = tf.Variable(tf.ones(shape))
    normalized = (net-flt_mean)/(flt_variance + (1e-3))**(0.5)
    print("normalized", normalized)
    print("scale", scale)
    return scale * normalized #+ shift


def init_weights(net, int_out_channels, int_filter_size, bool_transpose):
    int_in_channels = [i.value for i in net.get_shape()][3]
    if bool_transpose:
        weights_shape = [int_filter_size, int_filter_size, int_out_channels, int_in_channels]
    else:
        weights_shape = [int_filter_size, int_filter_size, int_in_channels, int_out_channels]

    return tf.Variable(tf.truncated_normal(weights_shape, stddev=0.1, seed=1),dtype=tf.float32)
