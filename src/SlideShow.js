import React from 'react'
import { Link } from 'react-router-dom'
import { ErrorPage } from './ErrorPage'
import { Loading } from './Loading'
import api from './api'
import './SlideShow.css'

const { Hammer } = window

export class SlideShow extends React.Component
{
  constructor(props) {
    super(props)
    this.state = { album : null, current : 0, busy : true, err : null }
    this._ref = React.createRef()
  }

  render() {
    const { album, err } = this.state
    if(err) {
      return <ErrorPage/>
    }
    if(!album) {
      return <Loading/>
    }
    const section = album.section
    const current = this.state.current
    const prev = this.getIndex(current - 1)
    const next = this.getIndex(current + 1)
    const items = [album.items[prev], album.items[current], album.items[next]]
    if(album.title) {
      document.title = album.title + ' | Лариса Дедловская'
    }
    return (
      <div className="SlideShow">
        { section && (<h2>
          <Link to={ section.path } onKeyDown={ this.onBackKeyDown }>{ section.title }</Link>
          { ' → ' + album.title }
        </h2>) }
        <div className="SlideList appear"
             aria-busy={ this.state.busy }
             ref={ this._ref }
             onClick={ this.onClick }
             onTransitionEnd={ this.onTransitionEnd }>{
          items.map((item, i) => (
            <SlideItem key={ item.id } item={ item } index={ i }/>
          ))
        }</div>
        <div className="SlideControl">
          <button className="SlidePrev"
                  onClick={ this.onPrevButtonClick }
                  onKeyDown={ this.onButtonKeyDown }
                  title="Предыдущий слайд">
            <span className="icon icon-angle-left"/>
          </button>
          <div className="SlideCounter">{ current + 1 } / { album.items.length }</div>
          <button className="SlideNext"
                  onClick={ this.onNextButtonClick }
                  onKeyDown={ this.onButtonKeyDown }
                  title="Следующий слайд">
            <span className="icon icon-angle-right"/>
          </button>
        </div>
      </div>
    )
  }

  async componentDidMount() {
    await this.load()
    if(this.state.err) {
      return
    }
    this.props.auto && this.tick()
    this._hammertime = new Hammer(this._ref.current)
    this._hammertime.on('swipe', e => {
      if(e.direction === Hammer.DIRECTION_LEFT) {
        this.switchSlide(1, true)
      }
      else if(e.direction === Hammer.DIRECTION_RIGHT) {
        this.switchSlide(-1, true)
      }
    })
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    this._timer && clearTimeout(this._timer)
    this._timer = null
    this._hammertime?.off('swipe')
    document.removeEventListener('keydown', this.onKeyDown)
  }

  async load() {
    try {
      this.setState({ album : await api.getAlbum(this.props.path) })
      setTimeout(() => this.setState({ busy : false }))
    }
    catch(err) {
      this.setState({ err })
    }
  }

  tick() {
    this._timer = setTimeout(() => {
      this.switchSlide(1)
      this.tick()
    }, 5000)
  }

  switchSlide(shift, stop = false) {
    if(stop) {
      this._timer && clearTimeout(this._timer)
      this._timer = null
    }
    if(this._transition) {
      return
    }
    this._transition = true
    this.setState(state => ({ current : this.getIndex(state.current + shift) }))
  }

  getIndex(i) {
    const items = this.state.album.items
    return i < 0? items.length + i : i % items.length
  }

  onClick = () => {
    this.switchSlide(1, true)
  }

  onKeyDown = e => {
    switch(e.code) {
      case 'ArrowLeft':
        this.switchSlide(-1, true)
        break
      case 'ArrowRight':
      case 'Space':
        this.switchSlide(1, true)
        break
      default:
        void null
    }
  }

  onTransitionEnd = () => {
    this._transition = false
  }

  onPrevButtonClick = () => {
    this.switchSlide(-1, true)
  }

  onNextButtonClick = () => {
    this.switchSlide(1, true)
  }

  onButtonKeyDown = e => {
    e.code === 'Space' && e.stopPropagation()
  }

  onBackKeyDown = e => {
    if(e.code === 'Space') {
      e.stopPropagation()
      e.target.click()
    }
  }
}

function SlideItem(props) {
  const url = props.item.sizes.find(size => size.type === 'z').url
  const style = {
    backgroundImage : `url(${ url })`,
    left : (props.index - 1) * 100 + '%',
  }
  if(window.location.hostname === 'new.lddesign.ru') {
    style.backgroundSize = 'cover'
  }
  return <div role="img" className="SlideItem" style={ style }/>
}
