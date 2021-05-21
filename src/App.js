import React from 'react'
import './App.css'

const items = [
  '00-01.jpg',
  '01-0_Квартира_для_родителей.jpg',
  '01-1_Квартира_для_родителей.jpg',
]

function App() {
  return (
    <div className="App">
      <SlideShow/>
    </div>
  )
}

class SlideShow extends React.Component
{
  constructor(props) {
    super(props)
    this.state = {
      current : 0,
    }
  }

  render() {
    return (
      <div className="SlideShow">
        <div className="SlideList"
             onClick={ () => this.onClick() }
             style={ { left : -this.state.current * 100 + '%' } }>
          { items.map((item, i) => <SlideItem key={ i } url={ item }/>) }
        </div>
      </div>
    )
  }

  onClick() {
    const current = this.state.current + 1
    this.setState({ current : current < items.length? current : 0 })
  }
}

function SlideItem(props) {
  return (
    <div className="SlideItem" style={ { backgroundImage : `url(media/${ props.url })` } }/>
  )
}

export default App
