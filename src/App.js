import React from 'react'
import { SlideShow } from './SlideShow'
import { Header } from './Header'
import './App.css'

class App extends React.Component
{
  constructor(props) {
    super(props)
    this.state = { open : false, data : null }
  }

  componentDidMount() {
    fetch('/data/data.json')
    .then(res => res.json())
    .then(data => this.setState({ data }))
  }

  onClick = () => {
    this.setState(state => ({ open : !state.open }))
  }

  render() {
    const { open, data } = this.state
    return (
      <div className={ open? 'App open' : 'App' }>
        <div className="Inner">{
          data?
            <>
              <Header open={ open } onClick={ this.onClick }/>
              <SlideShow album={ data[0] }/>
            </> :
            <div className="Loading">Loading...</div>
        }</div>
      </div>
    )
  }
}

export default App
