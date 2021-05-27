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
    const index = {}
    if(data) {
      for(const item of data) {
        index['/' + item.dir] = item
      }
    }
    return (
      <BrowserRouter>
        <div className={ open? 'App open' : 'App' }>
          <div className="Inner">{
            data?
              <>
                <Header open={ open } data={ data } onClick={ this.onClick }/>
                <Switch>
                  {
                    data.slice(1).map(group => (
                      <Route key={ group.dir } path={ '/' + group.dir }>
                        <AlbumGroup group={ group }/>
                      </Route>
                    ))
                  }
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

export default App
