import React from 'react'
import { Link } from 'react-router-dom'
import config from './config'
import './FileList.css'

const items = [
  {
    'name' : 'Концептуальный проект',
    'file' : 'proektirovanie/01-konceptualnyi-proekt.pdf',
  },
  {
    'name' : 'Эскизный проект',
    'file' : 'proektirovanie/02-eskiznyi-proekt.pdf',
  },
  {
    'name' : 'Рабочий проект',
    'file' : 'proektirovanie/03-rabochii-proekt.pdf',
  },
  {
    'name' : 'Примеры работ в 3D',
    'file' : 'proektirovanie/04-primery-rabot-v-3d.pdf',
  },
]

export function FileList() {
  document.title = 'Проектирование | Лариса Дедловская'
  return (
    <div className="FileList">
      <h2>Проектирование</h2>
      <hr/>
      { items.map(item => <FileLink key={ item.file } item={ item }/>) }
    </div>
  )
}

function FileLink(props) {
  const to = [config.DATA_DIR, props.item.file].join('/')
  return (
    <Link className="FileLink" to={ to } target="_blank" rel="noreferrer">
      <span className="icon icon-file-pdf"/>
      { props.item.name }
    </Link>
  )
}
