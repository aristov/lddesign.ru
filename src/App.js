import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import cn from 'classnames'
import api from './api'
import config from './config'
import { BASE_URL } from './common'
import { Header } from './Header'
import { SlideShow } from './SlideShow'
import { AlbumGroup } from './AlbumGroup'
import { FileList } from './FileList'
import { Contacts } from './Contacts'
import { Blog } from './Blog'
import './App.css'

class App extends React.Component
{
  constructor(props) {
    super(props)
    this.state = { open : false, data : null }
  }

  componentDidMount() {
    const url = new URL('album.php', BASE_URL)
    url.searchParams.set('owner_id', -204943414)
    url.searchParams.set('album_id', 278146389)
    Promise.all([
      fetch(config.DATA_DIR + '/data.json').then(res => res.json()),
      fetch(url).then(res => res.json()),
    ])
    .then(([data, album]) => {
      const routes = []
      data[0].items = album.items.map(item => {
        return item.sizes.find(size => size.type === 'z').url
      })
      for(const group of data.slice(1)) {
        if(!group.items) {
          continue
        }
        for(const item of group.items) {
          if(item.file) {
            continue
          }
          routes.push(<Route key={ item.dir } path={ '/' + item.path }>
            <SlideShow group={ group } album={ item }/>
          </Route>)
        }
        if(group.items[0].file) {
          routes.push(<Route key={ group.dir } path={ '/' + group.path }>
            <main className="Main"><FileList group={ group }/></main>
          </Route>)
          continue
        }
        routes.push(<Route key={ group.dir } path={ '/' + group.path }>
          <AlbumGroup group={ group }/>
        </Route>)
      }
      routes.push(<Route key="Блог" path="/Блог"><Blog/></Route>)
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
    const className = cn('App', { open, homepage : window.location.pathname === '/' })
    return (
      <BrowserRouter>
        <div className={ className } aria-busy={ String(!data) }>
          <div className="Inner">{
            data?
              <>
                <Header open={ open }
                        data={ data }
                        toggleNav={ this.toggleNav }
                        closeNav={ this.closeNav }/>
                <Switch>
                  <Route path="/:sectionPath/:albumPath" render={ ({ match }) => {
                    return <SlideShow path={ match.url }/>
                  } }/>
                  { api.sections.map(section => (
                    <Route key={ section.owner_id } path={ section.path }>
                      <AlbumGroup path={ section.path }/>
                    </Route>
                  )) }
                  <Route path="/Современная_классика">
                    <AlbumGroup ownerId={ -205424841 } name="Современная классика"/>
                  </Route>
                  <Route path="/Лофт_минимализм">
                    <AlbumGroup ownerId={ -205407254 } name="Лофт / минимализм"/>
                  </Route>
                  <Route path="/Экстерьер_другое">
                    <AlbumGroup ownerId={ -205425358 } name="Экстерьер / другое"/>
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
                    <main className="Main">
                      <div className="Error">404</div>
                    </main>
                  </Route>
                </Switch>
                <div className="Backdrop" onClick={ this.closeNav }/>
              </> :
              <div className="Loading">Загрузка...</div>
          }</div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
