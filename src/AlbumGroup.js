import React from 'react'
import { Link } from 'react-router-dom'
import './AlbumGroup.css'

const DATA_DIR = '/data'

export function AlbumGroup(props) {
  return (
    <div className="AlbumGroup">
      <h2>{ props.group.name }</h2>
      <div className="AlbumList">
        { props.group.items.map(item => {
          if(item.file) {
            return <FileLink key={ item.file } item={ item }/>
          }
          return <AlbumItem key={ item.dir } album={ item }/>
        }) }
      </div>
    </div>
  )
}

function AlbumItem(props) {
  const dir = props.album.dir
  const url = [DATA_DIR, props.album.dir, props.album.items[0]].join('/')
  return (
    <Link to={ '/' + dir }
          className="AlbumItem"
          style={ { backgroundImage : `url(${ url })` } }>
      <div className="AlbumInfo">{ props.album.name }</div>
    </Link>
  )
}

function FileLink(props) {
  const to = [DATA_DIR, props.item.file].join('/')
  return <Link className="FileLink" to={ to } target="_blank" rel="noreferrer">{
    props.item.name
  }</Link>
}
