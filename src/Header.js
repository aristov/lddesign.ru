import React from 'react'
import './Header.css'

export function Header() {
  return (
    <header className="Header">
      <h1><a href="/">Лариса Дедловская</a></h1>
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
