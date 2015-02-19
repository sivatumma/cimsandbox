import os
import sys
from PIL import Image

def resize(folder, fileName):
    filePath = os.path.join(folder, fileName)
    im = Image.open(filePath)
    w, h  = im.size
    # newIm = im.resize((int(w*factor), int(h*factor)))
    newIm = im.resize((20,20))
    # i am saving a copy, you can override orginal, or save to other folder
    newIm.save("resized/"+filePath+".png")

def bulkResize(imageFolder):
    imgExts = ["png", "bmp", "jpg"]
    for path, dirs, files in os.walk(imageFolder):
        for fileName in files:
            ext = fileName[-3:].lower()
            if ext not in imgExts:
                continue

            resize(path, fileName)

if __name__ == "__main__":
    imageFolder=sys.argv[1] # first arg is path to image folder
    # resizeFactor=float(sys.argv[2])/100.0# 2nd is resize in %
    bulkResize(imageFolder)