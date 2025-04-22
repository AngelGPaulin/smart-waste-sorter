import numpy as np
import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
labels_path = os.path.join(BASE_DIR, 'labels.npy')

labels = np.load(labels_path, allow_pickle=True).item()

json_path = os.path.join(BASE_DIR, 'labels.json')
with open(json_path, 'w') as f:
    json.dump(labels, f)

print("✅ labels.json creado en la raíz")
