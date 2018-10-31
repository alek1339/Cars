import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchNews } from '../../actions/newsActions'
import { setCurrentNews } from '../../actions/setCurrentNewsAction'

class LastNews extends Component {
  constructor (props) {
    super(props)

    this.lastNewsClicked = this.lastNewsClicked.bind(this)
  }

  lastNewsClicked (id) {
    this.props.history.push('/news/id/' + id)
    this.props.setCurrentNews(id)
  }

  componentDidMount () {
    this.props.fetchNews()
  }

  render () {
    const news = this.props.news
    return (
      <div className='col-sm-4'>
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

function mapDispatchToProps (dispatch) {
  return {
    fetchNews: () => dispatch(fetchNews()),
    setCurrentNews: (id) => dispatch(setCurrentNews(id))
  }
}

const mapStateToProps = state => ({
  news: state.news
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LastNews))
