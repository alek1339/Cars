import React, { Component } from 'react'

class News extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news: []
    }
  }

  componentDidMount() {
    fetch('/api/news/')
      .then(res => res.json())
      .then(news => this.setState({ news }, console.log('News fetched', news)))
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          {this.state.news.slice(0, 1).map(news => <div key={news.id} classNameName='col-sm-12'>
            <div className='row'>
              <div className='col-sm-4 img'>{news.author}</div>
            </div>
          </div>)}
        </div>
        <div className='row'>
          <h1>News:</h1>
          <div className='col-sm-4'>
            <ul> {this.state.news.slice(0, 1).map(news =>
              <li key={news.id}>
                <h1>{news.header}</h1>
                <div className='container'>
                  <img
                    src={news.imgUrl}
                    widt='100%'
                    height='250'
                    alt='Smiley face' />
                </div>
                <article>{news.text}</article>
                {news.author}
              </li>
            )}
            </ul>
          </div>
          <div className='col-sm-4'>
            <ul> {this.state.news.slice(1, 3).map(news =>
              <li key={news.id}>
                <h1>{news.header}</h1>
                <div className='container'>
                  <img
                    src={news.imgUrl}
                    widt='100%'
                    height='250'
                    alt='Smiley face' />
                </div>
                <article>{news.text}</article>
                {news.author}
              </li>
            )}
            </ul>
          </div>
          <hr />
        </div>
      </div>
    )
  }
}

export default (News)
