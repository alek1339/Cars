import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class EditNews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news: []
    }
    this.onEditClick = this.onEditClick.bind(this)
  }

  onEditClick(id) {
    this.props.history.push('/edit-one-news/id:' + id)
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
          <h1>News:</h1>
          <div className='col-sm-8'>
            <ul> {this.state.news.map(news =>
              <li key={news.id}>
                <h1>{news.header}</h1>
                <div className='container'>
                  <img
                    src={news.imgUrl}
                    widt='100%'
                    height='250'
                    alt='img' />
                </div>
                <article>{news.text}</article>
                {news.author}
                <button onClick={() => this.onEditClick(news._id)}>Edit</button>
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

export default withRouter(EditNews)
