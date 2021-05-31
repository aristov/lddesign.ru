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

class AlbumItem extends React.Component
{
  render() {
    const props = this.props
    const dir = props.album.dir
    const url = [DATA_DIR, props.album.dir, 'thumbs', props.album.items[0]].join('/')
    return (
      <Link to={ '/' + dir }
            className="AlbumItem"
            style={ { backgroundImage : `url(${ url })` } }
            onKeyDown={ this.onKeyDown }>
        <div className="AlbumInfo">{ props.album.name }</div>
      </Link>
    )
  }

  onKeyDown = e => {
    switch(e.code) {
      case 'Space':
        e.target.click()
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        e.target.previousElementSibling?.focus()
        break
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        e.target.nextElementSibling?.focus()
        break
      default:
        void null
    }
  }
}
