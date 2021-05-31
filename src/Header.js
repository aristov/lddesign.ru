import React from 'react'
import { Link } from 'react-router-dom'
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
          <ul onClick={ this.props.closeNav }>
            {
              this.props.data.slice(1).map(item => {
                return (
                  <li key={ item.dir }>
                    <Link to={ '/' + item.dir } onKeyDown={ e => {
                      if(e.code === 'Space') {
                        e.stopPropagation()
                        e.target.click()
                      }
                    } }>{ item.name }</Link>
                  </li>
                )
              })
            }
            <li><Link to="/Контакты">Контакты</Link></li>
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
}
