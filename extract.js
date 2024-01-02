const fs = require('fs');

// Read the JSON file
const rawData = fs.readFileSync('results.json');
const data = JSON.parse(rawData);

// Extract information from the data
const actualData = data.value;

// Create a write stream for the .txt file
const writeStream = fs.createWriteStream('output.txt');

// Iterate through each object and write ServiceNo to the .txt file
for (let obj of actualData) {
    const serviceNo = obj.ServiceNo;
    writeStream.write(`${serviceNo}\n`);
}

// Close the write stream
writeStream.end();

console.log('Service numbers have been written to output.txt');
