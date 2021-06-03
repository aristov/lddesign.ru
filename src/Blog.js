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
    fetch('http://new.lddesign.ru/blog.php')
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
                <h3 dangerouslySetInnerHTML={ { __html : linkInsert(title) } }/>
                { text.length?
                  text.map(p => {
                    return <p key={ p } dangerouslySetInnerHTML={ { __html : linkInsert(p) } }/>
                  }) :
                  null }
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

const URL_RE = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/g

function linkInsert(str) {
  return str.replace(URL_RE, '<a href="$1" target="_blank" rel="noreferrer">$1</a>')
}
