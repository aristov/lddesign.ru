import React from 'react'
import { Link } from 'react-router-dom'
import './SlideShow.css'

const { Hammer } = window

export class SlideShow extends React.Component
{
  constructor(props) {
    super(props)
    this.state = { current : 0, busy : true }
    this._ref = React.createRef()
  }

  render() {
    const group = this.props.group
    const album = this.props.album
    const current = this.state.current
    const prev = this.getIndex(current - 1)
    const next = this.getIndex(current + 1)
    const items = [album.items[prev], album.items[current], album.items[next]]
    if(group) {
      document.title = album.name + ' | Лариса Дедловская'
    }
    return (
      <div className="SlideShow">
        { group?
          <h2>
            <Link to={ '/' + group.path } onKeyDown={ this.onBackKeyDown }>{ group.name }</Link>
            { ' → ' + album.name }
          </h2> :
          null }
        <div className="SlideList appear"
             aria-busy={ this.state.busy }
             ref={ this._ref }
             onClick={ this.onClick }
             onTransitionEnd={ this.onTransitionEnd }>{
          items.map((item, i) => (
            <SlideItem key={ item } url={ item } index={ i }/>
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

  componentDidMount() {
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
    setTimeout(() => this.setState({ busy : false }))
  }

  componentWillUnmount() {
    this._timer && clearTimeout(this._timer)
    this._timer = null
    this._hammertime.off('swipe')
    document.removeEventListener('keydown', this.onKeyDown)
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
    const items = this.props.album.items
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
  const style = {
    backgroundImage : `url(${ props.url })`,
    left : (props.index - 1) * 100 + '%',
  }
  if(window.location.hostname === 'new.lddesign.ru') {
    style.backgroundSize = 'cover'
  }
  return <div role="img" className="SlideItem" style={ style }/>
}
