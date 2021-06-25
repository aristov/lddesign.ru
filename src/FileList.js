import React from 'react'
import { Link } from 'react-router-dom'
import api from './api'
import './FileList.css'

export function FileList() {
  document.title = 'Проектирование | Лариса Дедловская'
  return (
    <div className="FileList">
      <h2>Проектирование</h2>
      <hr/>
      { api.config.docs.map(item => <FileLink key={ item.path } item={ item }/>) }
    </div>
  )
}

function FileLink(props) {
  return (
    <Link className="FileLink" to={ props.item.path } target="_blank" rel="noreferrer">
      <span className="icon icon-file-pdf"/>
      { props.item.title }
    </Link>
  )
}
