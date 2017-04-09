# AI for Picasso's Iris

## Prerequisites
   - You must have `imagenet-vgg-verydeep-19.mat` located in the directory of this README

## Training the AI
- You must include the name you wish to assign to your training style.
- You must include the path of the base image you wish to use for your training style.
- You must include the number of epochs you wish to run training for.
- You must include the path to the image repository used for training your style.  
- Ex. `$ python3 train_style.py --style-name yourStyleName --style-path yourItyleImage.(png|jpg|tiff) --epochs 4 --train-path c:\images`  to train the AI. It prints out epoch times.


## Applying the style
- You must include the path of the image you wish to style.
- You must include the path of the destination you wish to use for your output.
- You must include the name of the trained style you wish to apply.
- `$ python3 transfer_style.py --in-path "yourInputImage.(png|jpg|tiff) --out-path "result.(png|jpg|tiff)" --style yourStyleName`
