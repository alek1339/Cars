import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import LastNews from './LastNews'
import Comments from '../comments/Comments'

class NewsId extends Component {
  constructor (props) {
    super(props)
    this.state = {
      news: [],
      header: '',
      text: '',
      imgUrl: '',
      author: '',
      date: '',
      id: '1'
    }
    this.onChange = this.onChange.bind(this)
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

  componentWillReceiveProps (props) {
    const id = props.location.pathname.slice(9)
    let currentNews = this.props.news.filter(n => n._id === id)

    if (currentNews && currentNews.length !== 0) {
      this.setState({
        header: currentNews[0].header,
        text: currentNews[0].text,
        author: currentNews[0].author,
        date: currentNews[0].date,
        imgUrl: currentNews[0].imgUrl
      })
    }
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    let dateToStr = this.state.date
    let hourToStr = this.state.date
    hourToStr = this.state.date.slice(11, 19)
    dateToStr = this.state.date.slice(0, 10)

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8'>
            <h3>{this.state.header}</h3>
            <img src={this.state.imgUrl} width='98%' />
            <p>{this.state.text} </p>
            <p>Aвтор {this.state.author} </p>
            <p>{dateToStr} | {hourToStr}</p>
            <Comments />
          </div>
          <LastNews />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  news: state.news
})

export default connect(mapStateToProps)(NewsId)
