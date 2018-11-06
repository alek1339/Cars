import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editReviews } from '../../actions/editReviewsActions'

class EditOneReview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reviews: [],
      header: '',
      text: '',
      imgUrl: '',
      author: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()

    const reviewsData = {
      header: this.state.header,
      text: this.state.text,
      author: this.state.author,
      imgUrl: this.state.imgUrl
    }
    console.log(reviewsData)
    this.props.editReviews(reviewsData)
  }

  componentDidMount () {
    fetch('/api/reviews/edit')
      .then(res => res.json())
      .then(reviews => this.setState({
        reviews,
        author: reviews.author,
        header: reviews.header,
        imgUrl: reviews.imgUrl,
        text: reviews.text
      },
      console.log('reviews fetched', reviews)))
  }

  render () {
    return (
      <div className='container'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <h1>Edit one reviews </h1>
            <input type='text' name='header' onChange={this.onChange} placeholder='header' value={this.state.header} />
            <textarea cols='60' className='form-control' rows='20' name='text' onChange={this.onChange} placeholder='imgUrl' value={this.state.text} />
            <input type='text' name='imgUrl' onChange={this.onChange} placeholder='imgUrl' value={this.state.imgUrl} />
            <input type='text' name='author' onChange={this.onChange} placeholder='author' value={this.state.author} />
            <input type='submit' value='Edit' className='btn btn-primary' />
          </div>
        </form>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors
})

function mapDispatchToProps (dispatch) {
  return {
    editReviews: (reviewsData) => dispatch(editReviews(reviewsData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOneReview)
