console.log('Application is running...');

// Core module
const os = require('os');

console.log(os.freemem())

const fs = require('fs');

// Read file
const fileContent = fs.readFileSync("./file.txt", "utf-8")
console.log("Content file:", fileContent)

// Write file
fs.writeFileSync("./file2.txt", "Ini content file dibuat dari nodejs")

// Write file json
const personData = {
  "id": 1,
  "name": "John",
}

fs.writeFileSync("./person.json", JSON.stringify(personData))

// Local Module
const luasSegitiga = require('./luasSegitiga')

console.log("Luas segitiga:", luasSegitiga(3, 5));