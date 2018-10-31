import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNews } from '../../actions/newsActions'

import { Link } from 'react-router-dom'

class News extends Component {
  componentDidMount () {
    this.props.fetchNews()
  }

  render () {
    const news = this.props.news

    const firstBoxIdLink = '/news/id/' + news[0]._id
    const secondBoxIdLink = '/news/id/' + news[1]._id
    const thirdBoxIdLink = '/news/id/' + news[2]._id
    const fourthBoxIdLink = '/news/id/' + news[3]._id

    const firstBox = {
      backgroundSize: 'cover',
      fontSize: '18px',
      textAlign: 'center',
      backgroundImage: `url(${news[0].imgUrl})`
    }

    const secondBox = {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      fontSize: '18px',
      textAlign: 'center',
      backgroundImage: `url(${news[1].imgUrl})`
    }

    const thirdBox = {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      fontSize: '16px',
      textAlign: 'center',
      backgroundImage: `url(${news[2].imgUrl})`
    }

    const fourthBox = {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      fontSize: '16px',
      textAlign: 'center',
      backgroundImage: `url(${news[3].imgUrl})`
    }

    return (
      <div className='container'>
        <div className='row jumbo'>
          <div className='col-sm-12 '>
            <div className='row'>
              <div className='col-sm-4 img' style={firstBox}>
                <Link class='dropdown-item landing-box' to={firstBoxIdLink}>{news[0].header.slice(0, 30)}</Link>
              </div>
              <div className='col-sm-8'>
                <div className='row'>
                  <div className='col-sm-12 seccolfirstrow' style={secondBox}>
                    <Link class='dropdown-item landing-box' to={secondBoxIdLink}>{news[1].header}</Link>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-6 seccolsecrow' style={thirdBox}>
                    <Link class='dropdown-item landing-box' to={thirdBoxIdLink}>{news[2].header.slice(0, 25)}</Link>
                  </div>
                  <div className='col-sm-6 thirdcolfirstrow' style={fourthBox}>
                    <Link class='dropdown-item landing-box' to={fourthBoxIdLink}>{news[3].header.slice(0, 25)}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-8'>
            <div> {news.slice(1).map(news =>
              <div key={news.id}>
                <Link className='header' to={'/news/id/' + news._id}><h1 className='text-dark'>{news.header}</h1></Link>
                <Link to={'/news/id/' + news._id}>
                  <img
                    src={news.imgUrl}
                    widt='100%'
                    height='250'
                    alt='img' />
                </Link>
                <article>{news.text.substr(0, 199)}</article>
                <Link className='readMore' to={'/news/id/' + news._id}>
                  <button className='btn btn-primary'>Почети още</button>
                </Link>
                <hr />
              </div>
            )}
            </div>
          </div>
          <hr />
        </div>
      </div >
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchNews: () => dispatch(fetchNews())
  }
}

const mapStateToProps = state => ({
  news: state.news
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
