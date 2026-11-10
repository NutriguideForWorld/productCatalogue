import json
import os

# Load categories file
categories_file = os.path.join('data', 'categories.json')
if not os.path.exists(categories_file):
    categories_file = 'categories.json'

with open(categories_file, 'r', encoding='utf-8') as f:
    categories = json.load(f)

base_dir = 'products'

for cat in categories:
    cat_folder = cat['folder']
    for line in cat['productLines']:
        line_name = line['name']
        line_folder = line['folder']
        
        target_dir = os.path.join(base_dir, cat_folder, line_folder)
        os.makedirs(target_dir, exist_ok=True)
        
        file_path = os.path.join(target_dir, 'product.json')
        
        # Generate boilerplate product data tailored to line name
        product_data = {
            "productName": f"Premium {line_name}",
            "weight": "Standard Commercial Grade",
            "colors": ["White", "Beige", "Custom"],
            "material": "High Durability Specs",
            "customization": "Custom branding and logo available",
            "images": [
                "image1.jpg",
                "image2.jpg"
            ]
        }
        
        # Save product.json if it doesn't already exist
        if not os.path.exists(file_path):
            with open(file_path, 'w', encoding='utf-8') as pf:
                json.dump(product_data, pf, indent=2)
            print(f"Created: {file_path}")
        else:
            print(f"Skipped (already exists): {file_path}")

print("All product.json files generated successfully!")