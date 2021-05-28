import React from 'react'
import { Link } from 'react-router-dom'
import './AlbumGroup.css'

const DATA_DIR = '/data'

export function AlbumGroup(props) {
  return (
    <div className="AlbumGroup">
      <div className="AlbumItem"><h2>{ props.group.name }</h2></div>
      { props.group.items.map(item => <AlbumItem key={ item.dir } album={ item }/>) }
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
