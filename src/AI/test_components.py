





def test_compare_net():
    import compare_net as comp_net
    import tensorflow as tf


    print ("Testing: get_images_list('test/')")
    try:
        img_lst_test = comp_net.get_images_list("test/")
    except:
        print ("get_img test failed")
    else:
        print ("get_images_list completed - content: {0}"\
            .format(len(img_lst_test)))
        #for img_lst_item in img_lst_test:
        #    print(img_lst_item)

    print ("Testing: get_img('test.jpg')")
    try:
         img_test = comp_net.get_img("test.jpg")
    except:
        print ("get_img test failed")
    else:
        print ("get_img completed - dimensions: {0} x {1} x {2}"\
            .format(len(img_test), len(img_test[0]), len(img_test[0][0])))

    print ("Testing: create_network")
    try:
        with tf.Graph().as_default(), tf.Session() as sess:
            tf_placeholder_img = tf.placeholder(tf.float32, shape=(1,)+img_test.shape, name="style_image")
            create_network_test = comp_net.create_network(tf_placeholder_img)
    except:
        print ("create_network test failed")
    else:
        print ("create_network completed - {0} layers"\
            .format(len(create_network_test)))
        for network_test_layer in create_network_test:
            print("{0}".format(network_test_layer))


    print ("Testing: get_style_loss")
    style_features_test = comp_net.get_style_loss(img_test)
    print ("get_style_loss completed - {0} layers"\
        .format(len(style_features_test)))
    for style_key, style_item in style_features_test.items():
        print("{0} : {1} x {2}".format(style_key, len(style_item),len(style_item[0])))


def test_transform_net():
    import transform_net as trans_net

def test_train_style():
    import train_style as train_style
    #nothing to train. compare_net could be integrated into train_style


def test_transfer_style():
    import transfer_style as trans_style

def main():
    test_compare_net()

if __name__ == "__main__":
    main()
