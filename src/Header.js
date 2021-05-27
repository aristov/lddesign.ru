import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export class Header extends React.Component
{
  render() {
    return (
      <header className="Header solid">
        <div className="Inner">
          <h1><Link to="/">Лариса Дедловская</Link></h1>
          <button className="MenuButton" onClick={ this.props.onClick }>
            <span className={ this.props.open? 'icon icon-cancel' : 'icon icon-menu' }/>
          </button>
        </div>
        <nav>
          <ul onClick={ this.props.onClick }>
            {
              this.props.data.slice(1).map(item => {
                return (
                  <li key={ item.dir }>
                    <Link to={ '/' + item.name }>{ item.name }</Link>
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
              <a target="_blank" rel="noreferrer" href="https://vk.com/larisadedlovskaya">
                <span className="icon icon-vkontakte"/>
              </a>
            </div>
            <small>
              © { (new Date()).getFullYear() } Лариса Дедловская
            </small>
          </div>
        </nav>
      </header>
    )
  }
}
