import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { Header } from './Header'
import { SlideShow } from './SlideShow'
import { AlbumGroup } from './AlbumGroup'
import { FileList } from './FileList'
import { Contacts } from './Contacts'
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
    .then(data => {
      const routes = []
      if(data) {
        for(const group of data.slice(1)) {
          if(!group.items) {
            continue
          }
          for(const item of group.items) {
            if(item.file) {
              continue
            }
            routes.push(<Route key={ item.dir } path={ '/' + item.dir }>
              <SlideShow album={ item }/>
            </Route>)
          }
          if(group.items[0].file) {
            routes.push(<Route key={ group.dir } path={ '/' + group.dir }>
              <main className="Main"><FileList group={ group }/></main>
            </Route>)
            continue
          }
          routes.push(<Route key={ group.dir } path={ '/' + group.dir }>
            <AlbumGroup group={ group }/>
          </Route>)
        }
        routes.push(<Route key="Контакты" path="/Контакты">
          <main className="Main"><Contacts/></main>
        </Route>)
        routes.push(<Route key="/" path="/" exact>
          <SlideShow album={ data[0] } className="homepage"/>
        </Route>)
      }
      this._routes = routes
      this.setState({ data })
    })
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
                <Switch>{ this._routes }</Switch>
              </> :
              <div className="Loading">Загрузка...</div>
          }</div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
