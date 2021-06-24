import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from './common'
import './AlbumGroup.css'

export class AlbumGroup extends React.Component
{
  constructor(props) {
    super(props)
    this.state = { group : null, busy : true }
    this._ref = React.createRef()
  }

  render() {
    const group = this.state.group
    document.title = this.props.name + ' | Лариса Дедловская'
    if(!group) {
      return <div className="Loading">Загрузка...</div>
    }
    return (
      <div className="AlbumGroup appear" aria-busy={ this.state.busy } ref={ this._ref }>
        <div className="AlbumItem"><h2>{ this.props.name }</h2></div>
        { group.items.map(album => <AlbumItem key={ album.id } album={ album }/>) }
      </div>
    )
  }

  async componentDidMount() {
    await this.load()
    setTimeout(() => this.setState({ busy : false }))
  }

  async load() {
    const url = new URL('albums.php', BASE_URL)
    url.searchParams.set('owner_id', this.props.ownerId)
    const res = await fetch(url)
    this.setState({ group : await res.json() })
  }
}

class AlbumItem extends React.Component
{
  render() {
    const album = this.props.album
    const url = album.sizes.find(size => size.type === 'r').src
    return (
      <Link to={ '/' + -album.owner_id + '/' + album.id }
            className="AlbumItem"
            style={ { backgroundImage : `url(${ url })` } }
            onKeyDown={ this.onKeyDown }>
        <div className="AlbumInfo">{ album.title }</div>
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
