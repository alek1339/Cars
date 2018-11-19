import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import LastNews from './LastNews'
import Comments from '../comments/Comments'

class ReviewsId extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reviews: [],
      header: '',
      text: '',
      imgUrl: '',
      author: '',
      date: '',
      id: '1'
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/reviews/id')
      .then(reviews => this.setState({
        reviews,
        author: reviews.data.author,
        header: reviews.data.header,
        imgUrl: reviews.data.imgUrl,
        text: reviews.data.text,
        date: reviews.data.date
      },
        console.log('reviews fetched', reviews)))
  }

  componentWillReceiveProps(props) {
    const id = props.location.pathname.slice(9)
    let currentReviews = this.props.reviews.filter(n => n._id === id)

    if (currentReviews && currentReviews.length !== 0) {
      this.setState({
        header: currentReviews[0].header,
        text: currentReviews[0].text,
        author: currentReviews[0].author,
        date: currentReviews[0].date,
        imgUrl: currentReviews[0].imgUrl
      })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
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
  reviews: state.reviews
})

export default connect(mapStateToProps)(ReviewsId)
