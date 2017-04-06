# AI for Picasso's Iris

## Prerequisites
 - You must have an image named `test.jpg` located in the directory of this README
 - You must have a folder named `test` which contains the dataset of images you will be training on
 - You must have `imagenet-vgg-verydeep-19.mat` located in the directory of this README

## Training the AI
- `$ python3 train_style.py` to train the AI. It prints out epoch times.
- **Note:** Currently, everytime you train it produces a `checks` folder. If you want to train again, you must ensure this folder is removed. __This issue will be fixed soon__

## Applying the style
- `$ python3 transfer_style.py --in-path "yourInputImage.(png|jpg|tiff) --out-path "result.(png|jpg|tiff)"`




