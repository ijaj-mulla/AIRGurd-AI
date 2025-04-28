import cv2
from ultralytics import YOLO

# Load trained YOLOv8 model
model = YOLO("best.pt")

# Open video file
cap = cv2.VideoCapture("video_20250302_110658_edit.mp4")

# Get original video properties
original_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
original_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = int(cap.get(cv2.CAP_PROP_FPS))

# Resize settings (Change based on your requirement)
output_width, output_height = 640, 480  # Change these to match your need

# Define output video writer (resized resolution)
fourcc = cv2.VideoWriter_fourcc(*"mp4v")
out = cv2.VideoWriter("output.mp4", fourcc, fps, (output_width, output_height))

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        break  # Stop if video ends

    # Run YOLOv8 detection
    results = model(frame, stream=True)

    # Draw detections on the frame
    for result in results:
        frame = result.plot()

    # Resize frame for display and saving
    resized_frame = cv2.resize(frame, (output_width, output_height))

    # Write frame to output video
    out.write(resized_frame)

    # Display resized frame
    cv2.imshow("YOLOv8 Detection", resized_frame)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break  # Press 'q' to exit

# Release resources
cap.release()
out.release()
cv2.destroyAllWindows()
