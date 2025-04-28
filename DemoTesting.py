from ultralytics import YOLO
import cv2

# Load trained YOLOv8 model
model = YOLO("best.pt")  # Ensure best.pt is in your project folder

# Load an image
image_path = "fog_willy-wong-CBSxOCWXwzA-unsplash_jpg.rf.6dc30ecd4f24008afdfc37c2d152eace.jpg"  # Change this to your image path
image = cv2.imread(image_path)

# Run inference on the image
results = model.predict(image, save=True, conf=0.5)  # Adjust confidence if needed

# Show results
for result in results:
    result.show()  # Display the image with detections
