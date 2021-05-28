import React from 'react'
import './Contacts.css'

export function Contacts() {
  return (
    <div className="Contacts">
      <h2>Контакты</h2>
      <hr/>
      <a className="SocialLink"
         href="mailto:lddesign@mail.ru">
        <span className="icon icon-mail"/>
        lddesign@mail.ru
      </a>
      <a className="SocialLink"
         href="tel:+79257711473">
        <span className="icon icon-phone"/>
        +7 925 771 1473
      </a>
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
      <a className="SocialLink"
         href="https://mona.livejournal.com"
         target="_blank"
         rel="noreferrer">
        <span className="icon icon-livejournal"/>
        mona.livejournal.com
      </a>
    </div>
  )
}
