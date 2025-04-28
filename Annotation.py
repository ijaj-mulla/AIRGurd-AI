import os

# 🔹 Define dataset path (change this to your actual dataset path)
dataset_path = r"C:\Users\KALPESH\Downloads\AerialRiskDataset\Aerial"  # Example: r"C:\Users\YourName\Dataset"

# 🔹 Define output label folder
label_folder = os.path.join(dataset_path, "labels")
os.makedirs(label_folder, exist_ok=True)  # Create if not exists

# 🔹 Class Mapping (YOLO class IDs)
class_mapping = {
    "High": 0,
    "Medium": 1,
    "Low": 2,
    "No": 3
}

# 🔹 Loop through each class folder
for class_name, class_id in class_mapping.items():
    class_folder = os.path.join(dataset_path, class_name)  # Path to class folder

    if not os.path.exists(class_folder):
        print(f"⚠️ Folder {class_folder} not found, skipping...")
        continue

    # Loop through all images in the class folder
    for img_name in os.listdir(class_folder):
        if img_name.lower().endswith((".jpg", ".png", ".jpeg")):
            txt_filename = img_name.rsplit(".", 1)[0] + ".txt"  # Replace extension
            label_path = os.path.join(label_folder, txt_filename)

            # Write YOLO annotation (Full Image Bounding Box)
            with open(label_path, "w") as f:
                f.write(f"{class_id} 0.5 0.5 1.0 1.0\n")  # YOLO format

print("✅ YOLO annotation files generated successfully!")
