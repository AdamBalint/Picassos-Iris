import sys
sys.path.insert(0, "AI")
import train_style as ts
import compare_net as cn
from scipy.misc import imread

#ts.train(0,1,2,3)

img = imread("../test.jpg")

d = cn.get_style_features(img)
print(d)
