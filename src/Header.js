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
            <li><a href="/classic">Классика</a></li>
            <li><a href="/loft">Лофты</a></li>
            <li><a href="/exterior">Экстерьер</a></li>
            <li><a href="/design">Проектирование</a></li>
            <li><a href="/blog">Блог</a></li>
            <li><a href="/contact">Контакты</a></li>
          </ul>
        </nav>
      </header>
    )
  }
}
