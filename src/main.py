import sys
sys.path.insert(0, "AI")
import transform_net as tn
import compare_net as cn
from scipy.misc import imread
import tensorflow as tf

#ts.train(0,1,2,3)

img = imread("../test.jpg")

#d = cn.get_style_features(img)

p = tf.placeholder(tf.float32, shape=(1,)+img.shape,name='img_placeholder')

d = tn.create_network(p)
print(d)
