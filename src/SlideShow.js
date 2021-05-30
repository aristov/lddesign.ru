import React from 'react'
import './SlideShow.css'

const { Hammer } = window

export class SlideShow extends React.Component
{
  constructor(props) {
    super(props)
    this.state = { current : 0 }
    this._list = React.createRef()
    this.onClick = this.onClick.bind(this)
    this.onTransitionEnd = this.onTransitionEnd.bind(this)
  }

  render() {
    const album = this.props.album
    const dir = [this.props.dir, album.dir].filter(Boolean).join('/')
    const current = this.state.current
    const prev = this.getIndex(current - 1)
    const next = this.getIndex(current + 1)
    const items = [album.items[prev], album.items[current], album.items[next]]
    return (
      <div className="SlideShow">
        <h2>{ album.name }</h2>
        <div className="SlideList"
             ref={ this._list }
             onClick={ this.onClick }
             onTransitionEnd={ this.onTransitionEnd }>{
          items.map((item, i) => (
            <SlideItem key={ item } url={ dir + '/' + item } index={ i }/>
          ))
        }</div>
        <div className="SlideControl">
          <button className="SlidePrev" onClick={ () => this.switchSlide(-1, true) }>
            <span className="icon icon-angle-left"/>
          </button>
          <div className="SlideCounter">{ current + 1 } / { album.items.length }</div>
          <button className="SlideNext" onClick={ () => this.switchSlide(1, true) }>
            <span className="icon icon-angle-right"/>
          </button>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.auto && this.tick()
    this._hammertime = new Hammer(this._list.current)
    this._hammertime.on('swipe', e => this.switchSlide(3 - e.direction))
  }

  componentWillUnmount() {
    this._timer && clearTimeout(this._timer)
    this._timer = null
    this._hammertime.off('swipe')
  }

  tick() {
    this._timer = setTimeout(() => {
      this.switchSlide(1)
      this.tick()
    }, 6000)
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

  onClick() {
    this.switchSlide(1, true)
  }

  onTransitionEnd() {
    this._transition = false
  }
}

function SlideItem(props) {
  return (
    <div className="SlideItem" style={ {
      backgroundImage : `url(/data/${ props.url })`,
      left : (props.index - 1) * 100 + '%',
    } }/>
  )
}
