import React from 'react'
import api from './api'
import './Blog.css'

const { moment } = window

export class Blog extends React.Component
{
  constructor(props) {
    super(props)
    this.state = { data : [], busy : false }
    this._ref = React.createRef()
  }

  componentDidMount() {
    void this.load()
  }

  async load() {
    if(this.state.busy) {
      return
    }
    const data = this.state.data
    this.setState({ busy : true })
    const { count, items } = await api.getBlog(data.length)
    this._count = count
    this.setState({ data : [...data, ...items], busy : false })
  }

  onScroll = () => {
    if(this.state.data.length >= this._count) {
      return
    }
    const node = this._ref.current
    if(node.scrollTop > node.scrollHeight - node.clientHeight * 2) {
      void this.load()
    }
  }

  render() {
    return (
      <div role="feed"
           className="Blog"
           onScroll={ this.onScroll }
           ref={ this._ref }
           aria-busy={ this.state.busy }>
        { this.state.data.map(item => {
          if(!item.text && !item.attachments) {
            return null
          }
          if(item.copy_history) {
            return null
          }
          return <Post key={ item.id } item={ item }/>
        }) }
        { this.state.busy && <div className="Loading">Загрузка...</div> }
      </div>
    )
  }
}

function Post(props) {
  const item = props.item
  const [title, ...text] = item.text.split('\n\n')
  return (
    <article>
      <time>{ moment.unix(item.date).format('D MMM YYYY') }</time>
      <h3 dangerouslySetInnerHTML={ { __html : linkInsert(title) } }/>
      { !!text.length && text.map(p => {
        return <p key={ p } dangerouslySetInnerHTML={ { __html : linkInsert(p) } }/>
      }) }
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
}

const URL_RE = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/g

function linkInsert(str) {
  return str.replace(URL_RE, '<a href="$1" target="_blank" rel="noreferrer">$1</a>')
}
