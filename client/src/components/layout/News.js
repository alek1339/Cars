import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchNews } from '../../actions/newsActions'

class News extends Component {
  componentDidMount () {
    this.props.fetchNews()
  }

  render () {
    const news = this.props.news

    const pStyle = {
      fontSize: '25px',
      textAlign: 'center',
      backgroundImage: `url(https://exp.cdn-hotels.com/hotels/12000000/11230000/11226700/11226610/11226610_31_z.jpg)`
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className='row'>
              <div className='col-sm-4 img' style={pStyle}>{news[0].header}</div>
              <div className='col-sm-8'>
                <div className='row'>
                  <div className='col-sm-12 seccolfirstrow'>{news[1].header}</div>
                </div>
                <div className='row'>
                  <div className='col-sm-6 seccolsecrow'>{news[2].header}</div>
                  <div className='col-sm-6 thirdcolfirstrow'>{news[3].header}</div>
                </div>
              </div>
            </div>
          </div>
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
