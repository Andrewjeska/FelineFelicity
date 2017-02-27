import cv2
import numpy as np

#lambda takes image from request

#compress image to 5MB

img = cv2.imread("imgres.jpg")
height, width = img.shape[:2]
print(height, width)

height_percent = height / 100
width_percent = width / 100

percent = 1
print(height - percent * height_percent)

#crop_img = img[0: height - percent * height_percent, 0: percent * width_percent]

#top left corner
cat_score = -1
left_top_percent = -1
bottom_right_percent
while(percent < 100):
    crop_img = img[0: percent * height_percent, 0: percent * width_percent]
    #run on aws rekognition, get score, set to cat score if bigger

    percent = percent + 1
    cv2.imshow("cropped", crop_img)
    cv2.waitKey(0)

# NOTE: its img[y: y + h, x: x + w] and *not* img[x: x + w, y: y + h]s
#crop_img = img[200:400, 100:300] #

#cv2.imshow("cropped", crop_img)
#cv2.waitKey(0)
