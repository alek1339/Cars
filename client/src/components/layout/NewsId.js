import React, { Component } from 'react'
import axios from 'axios'

class NewsId extends Component {
  constructor (props) {
    super(props)
    this.state = {
      news: [],
      header: '',
      text: '',
      imgUrl: '',
      author: '',
      date: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount () {
    axios.get('/api/news/id')
      .then(news => this.setState({
        news,
        author: news.data.author,
        header: news.data.header,
        imgUrl: news.data.imgUrl,
        text: news.data.text,
        date: news.data.date
      },
      console.log('News fetched', news)))
  }

  render () {
    let dateToStr = this.state.date
    let hourToStr = this.state.date
    hourToStr = this.state.date.slice(11, 19)
    dateToStr = this.state.date.slice(0, 10)

    console.log(typeof (date))
    return (
      <div className='container'>
        <h4>{this.state.header}</h4>

        <img src={this.state.imgUrl} />
        <p>{this.state.text}</p>
        <p>Написана от {this.state.author} </p>
        <p>{dateToStr} | {hourToStr}</p>
      </div>
    )
  }
}

export default (NewsId)
