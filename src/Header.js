import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const { Hammer } = window

export class Header extends React.Component
{
  constructor(props) {
    super(props)
    this._nav = React.createRef()
  }

  render() {
    return (
      <header className="Header">
        <div className="Inner">
          <h1><a href="/">Лариса Дедловская</a></h1>
          <button className="MenuButton" onClick={ this.props.toggleNav }>
            <span className={ this.props.open? 'icon icon-cancel' : 'icon icon-menu' }/>
          </button>
        </div>
        <nav ref={ this._nav }>
          <ul role="menu" onClick={ this.props.closeNav }>
            {
              this.props.data.slice(1).map(item => {
                return (
                  <li role="menuitem" key={ item.dir }>
                    <NavLink to={ '/' + item.path }
                             onKeyDown={ this.onKeyDown }
                             activeClassName="current"
                             exact
                    >{ item.name }</NavLink>
                  </li>
                )
              })
            }
            <li role="menuitem">
              <NavLink
                to="/Блог"
                onKeyDown={ this.onKeyDown }
                activeClassName="current"
                exact
              >Блог</NavLink>
            </li>
            <li role="menuitem">
              <NavLink
                to="/Контакты"
                onKeyDown={ this.onKeyDown }
                activeClassName="current"
                exact
              >Контакты</NavLink>
            </li>
          </ul>
          <div className="Social">
            <div>
              <a target="_blank" rel="noreferrer" href="https://instagram.com/design.ld">
                <span className="icon icon-instagram"/>
              </a>
              <a target="_blank" rel="noreferrer" href="https://facebook.com/larisa.dedlovskaya">
                <span className="icon icon-facebook"/>
              </a>
              <a target="_blank" rel="noreferrer" href="https://mona.livejournal.com">
                <span className="icon icon-livejournal"/>
              </a>
              <a target="_blank" rel="noreferrer" href="https://vk.com/larisadedlovskaya">
                <span className="icon icon-vkontakte"/>
              </a>
            </div>
          </div>
          <small>
            © { (new Date()).getFullYear() } Лариса Дедловская
          </small>
        </nav>
      </header>
    )
  }

  componentDidMount() {
    this._hammertime = new Hammer(this._nav.current)
    this._hammertime.on('swipe', e => {
      e.direction === Hammer.DIRECTION_RIGHT && this.props.closeNav()
    })
  }

  componentWillUnmount() {
    this._hammertime.off('swipe')
  }

  onKeyDown = e => {
    if(e.code === 'Space') {
      e.stopPropagation()
      e.target.click()
    }
    if(e.code === 'ArrowUp') {
      e.target.parentElement.previousElementSibling?.querySelector('a').focus()
    }
    if(e.code === 'ArrowDown') {
      e.target.parentElement.nextElementSibling?.querySelector('a').focus()
    }
  }
}
