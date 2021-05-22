import React from 'react'
import items from './items.json'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header/>
      <SlideShow/>
    </div>
  )
}

function Header() {
  return (
    <header className="Header">
      <h1><a href="/">Лариса Дедловская</a></h1>
      <nav>
        <ul>
          <li><a href="/classic">Классика</a></li>
          <li><a href="/loft">Лофты</a></li>
          <li><a href="/exterior">Экстерьер</a></li>
          <li><a href="/design">Проектирование</a></li>
          <li><a href="/blog">Блог</a></li>
          <li><a href="/contact">Контакты</a></li>
        </ul>
      </nav>
    </header>
  )
}

class SlideShow extends React.Component
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

export default App
