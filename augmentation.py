import os
import cv2
import numpy as np
import random


# Augmentation Functions
def add_rain(image):
    """Simulates rain by adding random streaks."""
    rain_layer = np.zeros_like(image, dtype=np.uint8)
    num_drops = random.randint(100, 500)

    for _ in range(num_drops):
        x1, y1 = random.randint(0, image.shape[1]), random.randint(0, image.shape[0])
        x2, y2 = x1 + random.randint(-5, 5), y1 + random.randint(10, 30)
        cv2.line(rain_layer, (x1, y1), (x2, y2), (200, 200, 200), 1)

    return cv2.addWeighted(image, 0.8, rain_layer, 0.2, 0)


def add_fog(image):
    """Simulates fog using Gaussian blur and a white overlay with reduced intensity."""
    fog_intensity = random.uniform(0.2, 0.5)  # Reduced upper limit of fog intensity
    h, w, _ = image.shape
    white_layer = np.full((h, w, 3), 255, dtype=np.uint8)
    fog_image = cv2.addWeighted(image, 1 - fog_intensity, white_layer, fog_intensity, 0)
    return cv2.GaussianBlur(fog_image, (15, 15), 10)


def darken_image(image):
    """Reduces brightness to simulate low-light conditions."""
    alpha = random.uniform(0.3, 0.6)  # Brightness scale (lower = darker)
    return cv2.convertScaleAbs(image, alpha=alpha, beta=0)


def apply_augmentation(input_folder):
    """Applies rain, fog, and dark light to images in the given folder."""
    if not os.path.exists(input_folder):
        print("Folder does not exist!")
        return

    output_folder = os.path.join(input_folder, "Augmented_Images")
    os.makedirs(output_folder, exist_ok=True)

    images = [img for img in os.listdir(input_folder) if img.lower().endswith(('.png', '.jpg', '.jpeg'))]

    if not images:
        print("No images found in the folder!")
        return

    for img_name in images:
        img_path = os.path.join(input_folder, img_name)
        image = cv2.imread(img_path)

        if image is None:
            print(f"Skipping {img_name}, unable to read file.")
            continue

        # Apply augmentations
        rain_img = add_rain(image)
        fog_img = add_fog(image)
        dark_img = darken_image(image)

        # Save images
        cv2.imwrite(os.path.join(output_folder, f"rain_{img_name}"), rain_img)
        cv2.imwrite(os.path.join(output_folder, f"fog_{img_name}"), fog_img)
        cv2.imwrite(os.path.join(output_folder, f"dark_{img_name}"), dark_img)

    print(f"Augmented images saved in: {output_folder}")


# Example usage
input_folder = r"C:\Users\KALPESH\Downloads\AerialRiskDataset\Aerial\No Risk"  # Change this to the path of your folder
apply_augmentation(input_folder)
