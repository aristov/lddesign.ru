import React from 'react'
import items from './items.json'
import './SlideShow.css'

export class SlideShow extends React.Component
{
  constructor(props) {
    super(props)
    this.state = {
      current : 0,
      items : [items[items.length - 1], items[0], items[1]],
    }
    this.onClick = this.onClick.bind(this)
    this.onTransitionEnd = this.onTransitionEnd.bind(this)
  }

  render() {
    return (
      <div className="SlideShow">
        <div className="SlideList"
             onClick={ this.onClick }
             onTransitionEnd={ this.onTransitionEnd }>{
          this.state.items.map((item, i) => {
            return <SlideItem key={ item } url={ item } index={ i }/>
          })
        }</div>
        <div className="SlideControl">
          <button className="SlidePrev" onClick={ () => this.switchSlide(-1) }>Prev</button>
          <button className="SlideNext" onClick={ () => this.switchSlide(1) }>Next</button>
        </div>
      </div>
    )
  }

  switchSlide(shift) {
    if(this._transition) {
      return
    }
    this._transition = true
    this.setState(state => {
      const current = getIndex(state.current + shift)
      const prev = getIndex(current - 1)
      const next = getIndex(current + 1)
      return {
        current,
        items : [items[prev], items[current], items[next]],
      }
    })
  }

  onClick(e) {
    this.switchSlide(e.screenX < window.innerWidth / 2? -1 : 1)
  }

  onTransitionEnd() {
    this._transition = false
  }
}

function getIndex(i) {
  return i < 0? items.length + i : i % items.length
}

function SlideItem(props) {
  return (
    <div className="SlideItem" style={ {
      backgroundImage : `url(media/${ props.url })`,
      left : (props.index - 1) * 100 + '%',
    } }/>
  )
}
