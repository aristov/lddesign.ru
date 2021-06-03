import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
import { slugify } from 'transliteration'
import config from '../src/config.js'

const cwd = process.cwd()
const INPUT_PATH = './data'
const OUTPUT_PATH = './public' + config.DATA_DIR
const THUMBS_DIR = config.THUMBS_DIR
const IMAGE_SIZE = 1200
const THUMB_SIZE = 500
const options = {
  width : IMAGE_SIZE,
  height : IMAGE_SIZE,
  fit : 'inside',
  withoutEnlargement : true,
}
const thumbOptions = {
  width : THUMB_SIZE,
  height : THUMB_SIZE,
  fit : 'inside',
  withoutEnlargement : true,
}

async function data(itemName) {
  const { dir, base, ext, name } = path.parse(itemName)
  const srcPath = path.join(cwd, INPUT_PATH, itemName)
  const stats = fs.statSync(srcPath)
  if(!stats.isDirectory()) {
    if(!/\.(png|jpg|tif|pdf)$/i.test(ext)) {
      return null
    }
    const dirName = dir.split('/').map(chunk => slugify(normalize(chunk))).join('/')
    if(ext === '.pdf') {
      const destName = slugify(name.trim()) + '.pdf'
      const destPath = path.join(cwd, OUTPUT_PATH, dirName, destName)
      fs.copyFileSync(srcPath, destPath)
      return {
        name : name.replace(/^\d+\s/, ''),
        file : [dirName.slice(1), destName].join('/'),
      }
    }
    const destName = slugify(name.trim()) + '.jpg'
    const destPath = path.join(cwd, OUTPUT_PATH, dirName, destName)
    const thumbPath = path.join(cwd, OUTPUT_PATH, dirName, THUMBS_DIR, destName)
    const file = fs.readFileSync(srcPath)
    await Promise.all([
      sharp(file).resize(options).toFile(destPath),
      sharp(file).resize(thumbOptions).toFile(thumbPath),
    ])
    console.log(destPath)
    return destName
  }
  const pathName = itemName.split('/').map(chunk => normalize(chunk)).join('/')
  const dirName = itemName.split('/').map(chunk => slugify(normalize(chunk))).join('/')
  const destPath = path.join(cwd, OUTPUT_PATH, dirName)
  const thumbPath = path.join(cwd, OUTPUT_PATH, dirName, THUMBS_DIR)
  const items = []
  fs.existsSync(destPath) || fs.mkdirSync(destPath)
  fs.existsSync(thumbPath) || fs.mkdirSync(thumbPath)
  console.log(destPath)
  for(const item of fs.readdirSync(srcPath)) {
    const result = await data(path.join(itemName, item))
    result && items.push(result)
  }
  return {
    dir : dirName.slice(1),
    path : pathName.slice(1),
    name : format(base),
    items,
  }
}

function normalize(name) {
  return name.trim().replace(/^\d\s/, '').replace(/[,.]/g, '').replace(/[\s()]+/g, '_')
}

function format(name) {
  return name.trim().replace(/^\d\s/, '').replace(/[_\s]+/g, ' ')
}

fs.rmSync(path.join(cwd, OUTPUT_PATH), { recursive : true, force : true })

data('/').then(result => {
  const filePath = path.join(cwd, OUTPUT_PATH, 'data.json')
  const json = JSON.stringify(result.items, null, 2)
  fs.writeFileSync(filePath, json)
  console.log(json)
})
