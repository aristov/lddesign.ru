import React from 'react'
import './AlbumGroup.css'

export function AlbumGroup(props) {
  return (
    <div className="AlbumGroup">
      <h2>{ props.group.name }</h2>
      <div className="AlbumList">
        { props.group.items.map(item => {
          return <AlbumItem key={ item.dir } album={ item }/>
        }) }
      </div>
    </div>
  )
}

function AlbumItem(props) {
  const url = ['/data', props.album.dir, props.album.items[0]].join('/')
  return (
    <div className="AlbumItem" style={ { backgroundImage : `url(${ url })` } }>
      <div className="AlbumInfo">{ props.album.name }</div>
    </div>
  )
}
