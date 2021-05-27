import React from 'react'
import './SlideShow.css'

export class SlideShow extends React.Component
{
  constructor(props) {
    super(props)
    this.state = { current : 0 }
    this.onClick = this.onClick.bind(this)
    this.onTransitionEnd = this.onTransitionEnd.bind(this)
  }

  render() {
    const dir = [this.props.dir, this.props.album.dir].filter(Boolean).join('/')
    const current = this.state.current
    const prev = this.getIndex(current - 1)
    const next = this.getIndex(current + 1)
    const items = this.props.album.items
    const slice = [items[prev], items[current], items[next]]
    return (
      <div className="SlideShow">
        <div className="SlideList"
             onClick={ this.onClick }
             onTransitionEnd={ this.onTransitionEnd }>{
          slice.map((item, i) => (
            <SlideItem key={ item } url={ dir + '/' + item } index={ i }/>
          ))
        }</div>
        <div className="SlideControl">
          <button className="SlidePrev" onClick={ () => this.switchSlide(-1) }>
            <span className="icon icon-angle-left"/>
          </button>
          <div className="SlideCounter">{ current + 1 } / { items.length }</div>
          <button className="SlideNext" onClick={ () => this.switchSlide(1) }>
            <span className="icon icon-angle-right"/>
          </button>
        </div>
      </div>
    )
  }

  switchSlide(shift) {
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

  onClick(e) {
    this.switchSlide(e.pageX < window.innerWidth / 2? -1 : 1)
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
