const path = require('path')
const fs = require('fs')

const files = fs.readdirSync(path.join(process.cwd(), 'public/media'))
const arr = []

for(const file of files) {
  if(!file.endsWith('.jpg') && !file.endsWith('.JPG')) {
    continue
  }
  arr.push(file)
}

console.log(JSON.stringify(arr, null, 2))
