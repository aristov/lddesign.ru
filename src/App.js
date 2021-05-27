import React from 'react'
import { SlideShow } from './SlideShow'
import { Header } from './Header'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { AlbumGroup } from './AlbumGroup'
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
      <BrowserRouter>
        <div className={ open? 'App open' : 'App' }>
          <div className="Inner">{
            data?
              <>
                <Header open={ open } data={ data } onClick={ this.onClick }/>
                <Switch>
                  <Route path="/Лофты">
                    <AlbumGroup group={ data[2] }/>
                  </Route>
                  <Route path="/Классика">
                    <SubSlideShow album={ data[1].items[0] } dir={ data[1].dir }/>
                  </Route>
                  <Route path="/">
                    <SlideShow album={ data[0] }/>
                  </Route>
                </Switch>
              </> :
              <div className="Loading">Loading...</div>
          }</div>
        </div>
      </BrowserRouter>
    )
  }
}

function SubSlideShow(props) {
  return <SlideShow { ...props }/>
}

export default App
