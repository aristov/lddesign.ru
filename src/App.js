import React from 'react'
import { SlideShow } from './SlideShow'
import { Header } from './Header'
import './App.css'

class App extends React.Component
{
  constructor(props) {
    super(props)
    this.state = { open : false }
  }

  onClick = () => {
    this.setState(state => ({ open : !state.open }))
  }

  render() {
    return (
      <div className={ this.state.open? 'App open' : 'App' }>
        <div className="Inner">
          <Header open={ this.state.open } onClick={ this.onClick }/>
          <SlideShow/>
        </div>
      </div>
    )
  }
}

export default App
