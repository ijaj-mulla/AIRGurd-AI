import os
import shutil
import random

# Set the base directory
base_dir = r"C:\Users\KALPESH\Downloads\AerialRiskDataset\Aerial"

# Define paths for new structure
new_structure = {
    "images": {"train": [], "val": [], "test": []},
    "labels": {"train": [], "val": [], "test": []}
}

# Output directories
output_dir = os.path.join(base_dir, "AerialRiskDataset")
os.makedirs(output_dir, exist_ok=True)

for subdir in ["images/train", "images/val", "images/test", "labels/train", "labels/val", "labels/test"]:
    os.makedirs(os.path.join(output_dir, subdir), exist_ok=True)

# Define category mappings
categories = ["High", "Medium", "Low", "No"]

# Gather all images
all_images = []
for category in categories:
    category_path = os.path.join(base_dir, category)
    if os.path.exists(category_path):
        images = [img for img in os.listdir(category_path) if img.endswith(".jpg")]
        all_images.extend([(category, img) for img in images])

# Shuffle dataset for randomness
random.shuffle(all_images)

# Split dataset (70% Train, 15% Val, 15% Test)
train_split = int(0.7 * len(all_images))
val_split = int(0.85 * len(all_images))

# Assign data
train_files = all_images[:train_split]
val_files = all_images[train_split:val_split]
test_files = all_images[val_split:]

# Function to move files
def move_files(files, split_type):
    for category, img_name in files:
        # Define source paths
        img_src = os.path.join(base_dir, category, img_name)
        label_src = os.path.join(base_dir, "labels", img_name.replace(".jpg", ".txt"))

        # Define destination paths
        img_dst = os.path.join(output_dir, f"images/{split_type}/{img_name}")
        label_dst = os.path.join(output_dir, f"labels/{split_type}/{img_name.replace('.jpg', '.txt')}")

        # Move image and label if they exist
        shutil.move(img_src, img_dst)
        if os.path.exists(label_src):
            shutil.move(label_src, label_dst)

# Move files to the new structure
move_files(train_files, "train")
move_files(val_files, "val")
move_files(test_files, "test")

print("✅ Dataset restructuring complete! New structure is in:", output_dir)
