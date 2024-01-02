input_file_path = 'wadwwa.txt'
output_file_path = 'output.txt'

with open(input_file_path, 'r') as input_file, open(output_file_path, 'w') as output_file:
    for line in input_file:
        # Assuming the lines have a consistent format as mentioned in your example
        value = line.split('"')[1]
        output_file.write(value + '\n')

print("Extraction completed. Numbers are saved in", output_file_path)
