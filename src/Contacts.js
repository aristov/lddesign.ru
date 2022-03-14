import React from 'react'
import './Contacts.css'

export function Contacts() {
  document.title = 'Контакты | Лариса Дедловская'
  return (
    <div className="Contacts">
      <h2>Контакты</h2>
      <hr/>
      <a className="ContactsLink"
         href="mailto:lddesign@mail.ru">
        <span className="icon icon-mail"/>
        lddesign@mail.ru
      </a>
      <a className="ContactsLink"
         href="tel:+79257711473">
        <span className="icon icon-phone"/>
        +7 925 771 1473
      </a>
      <hr/>
      {/*<a className="ContactsLink"
         href="https://instagram.com/design.ld"
         target="_blank"
         rel="noreferrer">
        <span className="icon icon-instagram"/>
        design.ld
      </a>
      <a className="ContactsLink"
         href="https://facebook.com/larisa.dedlovskaya"
         target="_blank"
         rel="noreferrer">
        <span className="icon icon-facebook"/>
        larisa.dedlovskaya
      </a>*/}
      <a className="ContactsLink"
         href="https://vk.com/larisadedlovskaya"
         target="_blank"
         rel="noreferrer">
        <span className="icon icon-vkontakte"/>
        larisadedlovskaya
      </a>
      <a className="ContactsLink"
         href="https://mona.livejournal.com"
         target="_blank"
         rel="noreferrer">
        <span className="icon icon-livejournal"/>
        mona
      </a>
      <hr/>
      <div className="Author">
        { 'Разработчик сайта: ' }
        <a href="mailto:vv.aristov@gmail.com" target="_blank" rel="noreferrer">Вячеслав Аристов</a>
      </div>
    </div>
  )
}
