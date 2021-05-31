import React from 'react'
import { Link } from 'react-router-dom'
import config from './config'
import './AlbumGroup.css'

export class AlbumGroup extends React.Component
{
  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }

  render() {
    const { group } = this.props
    document.title = group.name + ' | Лариса Дедловская'
    return (
      <div className="AlbumGroup appear" aria-busy="true" ref={ this._ref }>
        <div className="AlbumItem"><h2>{ group.name }</h2></div>
        { group.items.map(item => <AlbumItem key={ item.dir } album={ item }/>) }
      </div>
    )
  }

  componentDidMount() {
    setTimeout(() => this._ref.current.removeAttribute('aria-busy'))
  }
}

class AlbumItem extends React.Component
{
  render() {
    const props = this.props
    const url = [
      config.DATA_DIR, props.album.dir, config.THUMBS_DIR, props.album.items[0],
    ].join('/')
    return (
      <Link to={ '/' + props.album.path }
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
