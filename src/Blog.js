import React from 'react'
import './Blog.css'

const { moment } = window

export class Blog extends React.Component
{
  constructor(props) {
    super(props)
    this.state = { data : null }
  }

  componentDidMount() {
    fetch('http://new.lddesign.ru/vk.php')
    .then(res => res.json())
    .then(res => {
      console.log(res.response)
      this.setState({ data : res.response })
    })
  }

  render() {
    if(!this.state.data) {
      return <div className="Loading">Загрузка...</div>
    }
    return (
      <div className="Blog">
        {
          this.state.data.items.map(item => {
            if(!item.text && !item.attachments) {
              return null
            }
            if(item.copy_history) {
              return null
            }
            const [title, ...text] = item.text.split('\n\n')
            return (
              <article key={ item.id }>
                <time>{ moment.unix(item.date).format('D MMM YYYY') }</time>
                <h3>{ title }</h3>
                { text.length? text.map(p => <p key={ p }>{ p }</p>) : null }
                { item.attachments?.map(attachment => {
                  if(attachment.type === 'photo') {
                    return (
                      <img key={ attachment.photo.id }
                           src={ attachment.photo.sizes.find(size => size.type === 'r')?.url }
                           alt=""/>
                    )
                  }
                  return null
                }) }
              </article>
            )
          })
        }
      </div>
    )
  }
}
