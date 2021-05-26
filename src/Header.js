import React from 'react'
import './Header.css'

export class Header extends React.Component
{
  /*constructor(props) {
    super(props)
    this.state = { open : false }
  }

  onClick = () => {
    this.setState(state => ({ open : !state.open }))
  }*/

  render() {
    return (
      <header className="Header">
        <div className="Inner">
          <h1><a href="/">Лариса Дедловская</a></h1>
          <button className="MenuButton" onClick={ this.props.onClick }>
            <span className={ this.props.open? 'icon icon-cancel' : 'icon icon-menu' }/>
          </button>
        </div>
        <nav>
          <ul>
            {
              this.props.data.slice(1).map(item => {
                return <li key={ item.dir }><a href={ '/' + item.name }>{ item.name }</a></li>
              })
            }
            <li><a href="/Контакты">Контакты</a></li>
          </ul>
          <div className="Social">
            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/design.ld/">
              <span className="icon icon-instagram"/>
            </a>
            <a target="_blank" rel="noreferrer" href="https://facebook.com/larisa.dedlovskaya">
              <span className="icon icon-facebook"/>
            </a>
            <a target="_blank" rel="noreferrer" href="https://vk.com/larisadedlovskaya">
              <span className="icon icon-vkontakte"/>
            </a>
          </div>
        </nav>
      </header>
    )
  }
}
