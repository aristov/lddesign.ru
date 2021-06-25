import React from 'react'
import { Link } from 'react-router-dom'
import api from './api'
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
    if(!group) {
      return <div className="Loading">Загрузка...</div>
    }
    document.title = group.title + ' | Лариса Дедловская'
    return (
      <div className="AlbumGroup appear" aria-busy={ this.state.busy } ref={ this._ref }>
        <div className="AlbumItem"><h2>{ group.title }</h2></div>
        { group.items.map(album => <AlbumItem key={ album.id } album={ album }/>) }
      </div>
    )
  }

  componentDidMount() {
    void this.load()
  }

  componentDidUpdate(prevProps) {
    if(this.props.path !== prevProps.path) {
      this.setState({ busy : true })
      void this.load()
    }
  }

  async load() {
    this.setState({ group : await api.getSection(this.props.path) })
    setTimeout(() => this.setState({ busy : false }))
  }
}

class AlbumItem extends React.Component
{
  render() {
    const album = this.props.album
    const url = album.sizes.find(size => size.type === 'r').src
    return (
      <Link to={ album.path }
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
