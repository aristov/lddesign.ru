import React from 'react'
import './Contacts.css'

export function Contacts() {
  return (
    <div className="Contacts">
      <h2>Контакты</h2>
      <hr/>
      <p>Эл. почта: <a href="mailto:lddesign@mail.ru">lddesign@mail.ru</a></p>
      <p>Телефон: <a href="tel:+79257711473">+7 925 771 1473</a></p>
      <p>LiveJournal: <a href="https://mona.livejournal.com"
                         target="_blank"
                         rel="noreferrer">mona</a></p>
      <hr/>
      <a className="SocialLink"
         href="https://instagram.com/design.ld"
         target="_blank"
         rel="noreferrer">
        <span className="icon icon-instagram"/>
        instagram.com/design.ld
      </a>
      <a className="SocialLink"
         href="https://facebook.com/larisa.dedlovskaya"
         target="_blank"
         rel="noreferrer">
        <span className="icon icon-facebook"/>
        facebook.com/larisa.dedlovskaya
      </a>
      <a className="SocialLink"
         href="https://vk.com/larisadedlovskaya"
         target="_blank"
         rel="noreferrer">
        <span className="icon icon-vkontakte"/>
        vk.com/larisadedlovskaya
      </a>
    </div>
  )
}
