import React from 'react'
import { Link } from 'react-router-dom'
import './FileList.css'

const DATA_DIR = '/data'

export function FileList(props) {
  return (
    <div className="FileList">
      <h2>{ props.group.name }</h2>
      <hr/>
      { props.group.items.map(item => <FileLink key={ item.file } item={ item }/>) }
    </div>
  )
}

function FileLink(props) {
  const to = [DATA_DIR, props.item.file].join('/')
  return (
    <Link className="FileLink" to={ to } target="_blank" rel="noreferrer">
      <span className="icon icon-file-pdf"/>
      { props.item.name }
    </Link>
  )
}
