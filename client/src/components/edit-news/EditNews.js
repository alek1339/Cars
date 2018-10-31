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
          <div className='col-sm-8'>
            <div> {this.state.news.map(news =>
              <div key={news.id}>
                <h1>{news.header}</h1>
                <div className='container'>
                  <img
                    src={news.imgUrl}
                    widt='100%'
                    height='250'
                    alt='img' />
                </div>
                <article>{news.text}</article>
                <p>{news.author}</p>
                <button className='btn btn-primary' onClick={() => this.onEditClick(news._id)}>Edit</button>
              </div>
            )}
            </div>
          </div>
          <hr />
        </div>
      </div>
    )
  }
}

export default withRouter(EditNews)
