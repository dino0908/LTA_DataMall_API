import json
import os

# Get the absolute path to the script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, 'data.json')
output_js_path = os.path.join(script_dir, 'output.js')

with open(file_path, 'r') as f:
    data = json.load(f)
    data = data['value']
    names = []
    for i in range(0, len(data)):
        if data[i]['Development'] != '' and data[i]['Development'] not in names:
            names.append(data[i]['Development'])

# Prepare JavaScript array string
js_array = [
    '{ value: "", label: "Select Option" },',
    *[f'{{ value: "{name}", label: "{name}" }},' for name in names]
]

# Create the JavaScript file
with open(output_js_path, 'w') as js_file:
    js_file.write('const AllCarParks = [\n')
    js_file.write('\n'.join(js_array))
    js_file.write('\n]\n\nexport default AllCarParks;')

print(f"JavaScript file '{output_js_path}' has been created.")
