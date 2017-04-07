

def main():
    import transform_net as trans_net
    import compare_net as comp_net
    import tensorflow as tf
    import py_compile

    with open("tests/testing.log", "w") as file_test:
        file_test.write("Testing: Compiles")
        try:
            py_compile.compile('transform_net.py', doraise=True)
        except:
            file_test.write("\n transform_net failed compile")
        else:
            file_test.write("\n transform_net Completed")
        try:
            py_compile.compile('compare_net.py', doraise=True)
        except:
            file_test.write("\n compare_net failed compile")
        else:
            file_test.write("\n compare_net Completed")
        try:
            py_compile.compile('transfer_style.py', doraise=True)
        except:
            file_test.write("\n transfer_style failed compile")
        else:
            file_test.write("\n transfer_style Completed")
        try:
            py_compile.compile('train_style.py', doraise=True)
        except:
            file_test.write("\t train_style failed compile")
        else:
            file_test.write("\n train_style Completed")

        file_test.write("\nTesting: test_compare_net")
        bool_successful = True
        file_test.write("\nTesting: get_images_list('tests/')")
        try:
            img_lst_test = comp_net.get_images_list("tests/")
        except:
            file_test.write("\nget_img test failed")
            bool_successful = False
        else:
            file_test.write("\nget_images_list completed - content: {0} images"\
                .format(len(img_lst_test)))
            #for img_lst_item in img_lst_test:
            #    print(img_lst_item)


        file_test.write("\nTesting: get_img('tests/test.jpg')")
        try:
             img_test = comp_net.get_img("tests/test.jpg")
        except:
            file_test.write("\nget_img test failed")
            bool_successful = False
        else:
            file_test.write("\nget_img completed - dimensions: {0} x {1} x {2}"\
                .format(len(img_test), len(img_test[0]), len(img_test[0][0])))

        file_test.write("\nTesting: create_network")
        with tf.Graph().as_default(), tf.Session() as sess:
            net_test = tf.placeholder(tf.float32, shape=(1,)+img_test.shape, name="style_image")
            try:
                net_test_create = comp_net.create_network(net_test)
            except:
                file_test.write("\ncreate_network test failed")
                bool_successful = False
            else:
                file_test.write("\ncreate_network completed - {0} layers"\
                    .format(len(net_test_create)))
                for net_test_create_layer in net_test_create:
                    file_test.write("\n{0}".format(net_test_create_layer))


            file_test.write("\nTesting: get_style_loss")
            try:
                style_features_test = comp_net.get_style_loss(img_test)
            except:
                file_test.write("\nget_style_loss failed")
                bool_successful = False
            else:
                file_test.write("\nget_style_loss completed - {0} layers"\
                    .format(len(style_features_test)))
                for style_key, style_item in style_features_test.items():
                    file_test.write("\n{0} : {1} x {2}".format(style_key, len(style_item),len(style_item[0])))

            file_test.write("\ntest_compare_net test finished")

            file_test.write("\nTesting: test_transform_net")
            file_test.write("\nTesting: init_weights")
            try:
                test_net_init = trans_net.init_weights(net_test, 32, 3, 2)
            except:
                file_test.write("\ninit_weights failed")
                bool_successful = False
            else:
                file_test.write("\{0}".format(test_net_init))



        file_test.write("\nTesting: transform_net.create_network")
        try:
            test_net = trans_net.create_network(net_test)
        except:
            file_test.write("\ntransform_net.create_network failed")
            bool_successful = False
        else:
            file_test.write("\ntransform_net.create_network completed - {0}".format(test_network))


            #conv_layer(net, int_filters, int_filter_size, int_strides, bool_relu)
            #conv_tr(net, int_filters, int_filter_size, int_strides)
            #normalize(net)
            #init_weights(net, int_out_channels, int_filter_size, bool_transpose)
        file_test.write("\ntest_transform_net test finished")

        print("Test completed. Please review Testing.log")

    return bool_successful

if __name__ == "__main__":
    main()
