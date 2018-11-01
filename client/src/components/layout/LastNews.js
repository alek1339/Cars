import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchNews } from '../../actions/newsActions'

class LastNews extends Component {
  constructor(props) {
    super(props)

    this.lastNewsClicked = this.lastNewsClicked.bind(this)
  }

  lastNewsClicked(id) {
    this.props.history.push('/news/id/' + id)
  }

  componentDidMount() {
    this.props.fetchNews()
  }

  render() {
    const news = this.props.news
    return (
      <div className='col-sm-4'>
        <div class="fb-page" data-href="https://www.facebook.com/CarNews-1998746596851960/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite="https://www.facebook.com/CarNews-1998746596851960/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/CarNews-1998746596851960/">CarNews</a></blockquote></div>
        <h5>Последни новини: </h5>
        {news.slice(0, 5).map(news => <div key={news.id}>
          <a className='header pointer' onClick={() => this.lastNewsClicked(news._id)} ><h6>{news.header}</h6>
          </a>
          <hr />
        </div>
        )}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNews: () => dispatch(fetchNews())
  }
}

const mapStateToProps = state => ({
  news: state.news
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LastNews))
