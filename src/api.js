import { BASE_URL } from './common'

function normalize(name) {
  return name.replace(/[\s():,./]+/g, '_')
}

const api = {
  sections : [
    {
      owner_id : -205424841,
      title : 'Современная классика',
    },
    {
      owner_id : -205407254,
      title : 'Лофт / минимализм',
    },
    {
      owner_id : -205425358,
      title : 'Экстерьер / другое',
    },
  ],
  cache : {
    '/' : {
      owner_id : -204943414,
      id : 278146389,
    }
  },
  async getSection(path) {
    const section = this.cache[path]
    if(section.items) {
      return section
    }
    const url = new URL('albums.php', BASE_URL)
    url.searchParams.set('owner_id', section.owner_id)
    const res = await fetch(url)
    const { items } = await res.json()
    section.items = items
    for(const album of items) {
      album.section = section
      this.cache[album.path = path + '/' + normalize(album.title)] = album
    }
    return section
  },
  async getAlbum(path) {
    let album = this.cache[path]
    if(!album) {
      await this.getSection('/' + path.slice(1).split('/')[0])
      album = this.cache[path]
    }
    if(album.items) {
      return album
    }
    const url = new URL('album.php', BASE_URL)
    url.searchParams.set('owner_id', album.owner_id)
    url.searchParams.set('album_id', album.id)
    const res = await fetch(url)
    const { items } = await res.json()
    album.items = items
    return album
  }
}

for(const section of api.sections) {
  api.cache[section.path = '/' + normalize(section.title)] = section
}

window.api = api

export default api
