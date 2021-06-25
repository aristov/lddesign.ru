import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import cn from 'classnames'
import api from './api'
import { Header } from './Header'
import { SlideShow } from './SlideShow'
import { AlbumGroup } from './AlbumGroup'
import { FileList } from './FileList'
import { Contacts } from './Contacts'
import { Blog } from './Blog'
import { ErrorPage } from './ErrorPage'
import './App.css'

class App extends React.Component
{
  constructor(props) {
    super(props)
    this.state = { open : false, data : null }
  }

  toggleNav = () => {
    this.setState(state => ({ open : !state.open }))
  }

  closeNav = () => {
    this.setState({ open : false })
  }

  render() {
    const { open, data } = this.state
    const className = cn('App', { open, homepage : window.location.pathname === '/' })
    return (
      <BrowserRouter>
        <div className={ className } aria-busy={ String(!data) }>
          <div className="Inner">
            <Header open={ open }
                    data={ data }
                    toggleNav={ this.toggleNav }
                    closeNav={ this.closeNav }/>
            <Switch>
              <Route path="/:sectionPath/:albumPath" render={ ({ match }) => {
                return <SlideShow path={ match.url }/>
              } }/>
              { api.config.sections.map(section => (
                <Route key={ section.owner_id } path={ section.path }>
                  <AlbumGroup path={ section.path }/>
                </Route>
              )) }
              <Route path="/Проектирование">
                <main className="Main"><FileList/></main>
              </Route>
              <Route path="/Блог">
                <Blog/>
              </Route>
              <Route path="/Контакты">
                <main className="Main"><Contacts/></main>
              </Route>
              <Route path="/" exact>
                <SlideShow path="/" auto/>
              </Route>
              <Route path="*">
                <ErrorPage/>
              </Route>
            </Switch>
            <div className="Backdrop" onClick={ this.closeNav }/>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
