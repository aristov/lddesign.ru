import React from 'react'
import './Contacts.css'

export function Contacts() {
  return (
    <div className="Contacts">
      <h2>Контакты</h2>
      <hr/>
      <p>Эл. почта: <a href="mailto:lddesign@mail.ru">lddesign@mail.ru</a></p>
      <p>Телефон: <a href="tel:+79257711473">+7 925 771 1473</a></p>
      <hr/>
      <p>Instagram: <a href="https://www.instagram.com/design.ld" target="_blank" rel="noreferrer">design.ld</a></p>
      <p>Facebook: <a href="https://facebook.com/larisa.dedlovskaya" target="_blank" rel="noreferrer">larisa.dedlovskaya</a></p>
      <p>VK: <a href="https://vk.com/larisadedlovskaya" target="_blank" rel="noreferrer">larisadedlovskaya</a></p>
      <p>LiveJournal: <a href="https://mona.livejournal.com" target="_blank" rel="noreferrer">mona</a></p>
    </div>
  )
}
