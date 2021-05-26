import path from 'path'
import fs from 'fs'
import sharp from 'sharp'

const cwd = process.cwd()
const INPUT_PATH = './tmp/media'
const OUTPUT_PATH = './public/data'
const IMAGE_SIZE = 1024
const options = {
  width : IMAGE_SIZE,
  height : IMAGE_SIZE,
  fit : 'inside',
  withoutEnlargement : true,
}

async function build(itemName) {
  const { dir, base, ext, name } = path.parse(itemName)
  const srcPath = path.join(cwd, INPUT_PATH, itemName)
  const stats = fs.statSync(srcPath)
  if(!stats.isDirectory()) {
    if(!/\.(png|jpg|tif)$/i.test(ext)) {
      return null
    }
    const destName = normalize(name) + '.jpg'
    const destPath = path.join(cwd, OUTPUT_PATH, normalize(dir), destName)
    await sharp(fs.readFileSync(srcPath)).resize(options).toFile(destPath)
    console.log(destPath)
    return destName
  }
  const destPath = path.join(cwd, OUTPUT_PATH, normalize(itemName))
  const items = []
  fs.mkdirSync(destPath)
  console.log(destPath)
  for(const item of fs.readdirSync(srcPath)) {
    const result = await build(path.join(itemName, item))
    result && items.push(result)
  }
  return { name : normalize(base), displayName : format(base), items }
}

function normalize(name) {
  return name.trim().replace(/\s+/g, '_')
}

function format(name) {
  return name.trim().replace(/^\d\s/, '').replace(/[_\s]+/g, ' ')
}

fs.rmSync(path.join(cwd, OUTPUT_PATH), { recursive : true, force : true })

build('/').then(result => {
  const filePath = path.join(cwd, OUTPUT_PATH, 'data.json')
  const json = JSON.stringify(result.items, null, 2)
  fs.writeFileSync(filePath, json)
})
