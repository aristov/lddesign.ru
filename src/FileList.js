import React from 'react'
import { Link } from 'react-router-dom'
import config from './config'
import './FileList.css'

export function FileList(props) {
  document.title = props.group.name + ' | Лариса Дедловская'
  return (
    <div className="FileList">
      <h2>{ props.group.name }</h2>
      <hr/>
      { props.group.items.map(item => <FileLink key={ item.file } item={ item }/>) }
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
