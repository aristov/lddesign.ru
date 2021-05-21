import fs from 'fs'
import path from 'path'

const cwd = process.cwd()
const files = fs.readdirSync(path.join(cwd, 'public/media'))

for(const file of files) {
  if(!/\s/.test(file)) {
    continue
  }
  const name = file.replace(/\s/g, '_')
  fs.renameSync(path.join(cwd, 'public/media', file), path.join(cwd, 'public/media', name))
  console.log(file, ' => ', name)
}
