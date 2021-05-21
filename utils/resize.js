const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const INPUT_PATH = 'tmp/media'
const OUTPUT_PATH = 'public/media'
const IMAGE_SIZE = 1024

const files = fs.readdirSync(path.join(process.cwd(), INPUT_PATH))

async function resize() {
  for(const file of files) {
    if(!file.endsWith('.jpg') && !file.endsWith('.JPG')) {
      continue
    }
    const data = fs.readFileSync(path.join(process.cwd(), INPUT_PATH, file))
    const buffer = await sharp(data).resize({
      width : IMAGE_SIZE,
      height : IMAGE_SIZE,
      fit : 'inside',
      withoutEnlargement : true,
    }).toBuffer()
    console.log('Resize', file)
    fs.writeFileSync(path.join(process.cwd(), OUTPUT_PATH, file), buffer)
  }
}

resize().then(() => console.log('Done!'))
