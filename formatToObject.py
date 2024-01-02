import json

input_filename = 'output.txt'  # Replace with your input file name
output_filename = 'formatted_output.txt'  # Replace with your desired output file name

formatted_options = []

# Read each line from the input file and format the data
with open(input_filename, 'r') as file:
    for line in file:
        bus_number = line.strip()
        formatted_options.append(f'{{ value: "{bus_number}", label: "{bus_number}" }}')

# Write the formatted data to the output file
with open(output_filename, 'w') as file:
    file.write(",\n".join(formatted_options))

print(f"Formatted options saved to {output_filename}.")
