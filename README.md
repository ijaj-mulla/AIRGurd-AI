# Airborne Threat Detection in Surveillance (PS_01)

## Overview
Airborne threats, such as drones or other flying objects, pose significant security risks in surveillance scenarios. This project aims to detect airborne threats using deep learning techniques. We collected a dataset from various platforms, applied data augmentation and annotation techniques to improve detection accuracy, and trained a YOLOv8 model on Google Colab using a dataset of 25,000 images.

## Features
- **Dataset Collection**: Gathered data from multiple platforms like Kaggle, Roboflow, and open-source repositories.
- **Data Augmentation**: Enhanced dataset quality through various augmentation techniques.
- **Data Annotation**: Labeled the dataset using Roboflow and LabelImg for precise object detection.
- **YOLOv8 Conversion**: Converted dataset into a YOLOv8-compatible format.
- **Model Training**: Trained the YOLOv8 model on Google Colab with GPU acceleration for efficient detection.
- **Real-time Surveillance**: Designed for integration with surveillance systems.

## Dataset Collection
We acquired datasets from various platforms, including:
- [Kaggle](https://www.kaggle.com)
- [Roboflow](https://roboflow.com)
- Open-source repositories
- Custom-labeled data

**Dataset Link**: [Click Here](https://drive.google.com/drive/folders/1p09LbS8vKoDOCBOMdxyHIB9zxO5cpnwK?usp=sharing)

## Data Annotation
To ensure high-quality training data, we performed precise annotations:
- **Tools Used**: [Roboflow](https://roboflow.com), [LabelImg](https://github.com/tzutalin/labelImg)
- **Classes Annotated**: Various airborne threats, including drones, UAVs, and other unidentified flying objects.
- **Bounding Boxes**: Labeled objects with bounding boxes to improve detection accuracy.
- **Annotation Format**: Converted labeled data into YOLOv8 format.

## Data Augmentation
To improve the model’s generalization and robustness, we applied:
- Rotation
- Scaling
- Flipping
- Brightness and contrast adjustments
- Noise addition

## Model Training
### Preprocessing
- Converted dataset annotations to YOLOv8 format using automated scripts.
- Split dataset into training (80%), validation (10%), and testing (10%) sets.

### Training Setup
- **Platform**: Google Colab with GPU acceleration.
- **Hardware Used**: NVIDIA Tesla T4 (Colab Pro for enhanced speed and efficiency).
- **Framework**: Ultralytics YOLOv8.
- **Training Command:**
  ```bash
  yolo task=detect mode=train model=yolov8s.pt data=dataset.yaml epochs=100 batch=32 imgsz=640
  ```

### Hyperparameter Tuning
- Adjusted learning rate, batch size, and augmentation parameters.
- Experimented with different YOLOv8 model sizes (YOLOv8s, YOLOv8m) for performance evaluation.

### Evaluation Metrics
- **Accuracy**: 92.5%
- **Precision**: 89.3%
- **Recall**: 90.7%
- **Loss Metrics**: Monitored and optimized classification, objectness, and localization loss.

## Installation & Usage
### Prerequisites
- Python 3.8+
- PyTorch
- Ultralytics YOLOv8
- OpenCV
- Google Colab

### Running the Model
1. Install dependencies:
   ```bash
   pip install ultralytics opencv-python
   ```
2. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/airborne-threat-detection.git
   ```
3. Navigate to the project directory:
   ```bash
   cd airborne-threat-detection
   ```
4. Run the detection script:
   ```bash
   python detect.py --source test_video.mp4 --weights best.pt
   ```

## Contributors
- **Prathmesh Dhone**
- **Kalpesh Borse**
- **Pragati Gomare**
- **Sarthak Manmode**

## Acknowledgments
We acknowledge open-source datasets and tools like Kaggle, Roboflow, and Ultralytics for making this research possible.

