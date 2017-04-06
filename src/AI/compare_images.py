from scipy.misc import imread, imsave
import numpy as np

img1 = imread("res10.png")
img2 = imread("res8.png")

img3 = img2-img1

imsave("diff.png", img3)