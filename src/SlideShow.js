import React from 'react'
import items from './items.json'

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
      <div className="SlideShow" onClick={ this.onClick } onTransitionEnd={ this.onTransitionEnd }>
        <div className="SlideList">{
          this.state.items.map((item, i) => {
            return <SlideItem key={ item } url={ item } index={ i }/>
          })
        }</div>
      </div>
    )
  }

  onClick(e) {
    if(this._transition) {
      return
    }
    const shift = e.screenX < window.innerWidth / 2? -1 : 1
    this.setState(state => {
      const current = getIndex(state.current + shift)
      const prev = getIndex(current - 1)
      const next = getIndex(current + 1)
      return {
        current,
        items : [items[prev], items[current], items[next]],
      }
    })
    this._transition = true
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
