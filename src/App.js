import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import cn from 'classnames'
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
          <SlideShow album={ data[0] } auto/>
        </Route>)
        routes.push(<Route key="/404" path="/">
          <main className="Main">
            <div className="Error">404</div>
          </main>
        </Route>)
      }
      this._routes = routes
      this.setState({ data })
    })
  }

  toggleNav = () => {
    this.setState(state => ({ open : !state.open }))
  }

  closeNav = () => {
    this.setState({ open : false })
  }

  render() {
    const { open, data } = this.state
    return (
      <BrowserRouter>
        <div className={ cn('App', { open, homepage : window.location.pathname === '/' }) }>
          <div className="Inner">{
            data?
              <>
                <Header open={ open } data={ data }
                        toggleNav={ this.toggleNav }
                        closeNav={ this.closeNav }/>
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
