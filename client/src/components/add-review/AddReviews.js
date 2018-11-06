import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReview } from '../../actions/addReviewsActions'

class AddReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      header: '',
      text: '',
      author: '',
      imgUrl: '',
      errors: {}
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard')
    // }
    console.log(nextProps.errors + 'Errors')
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const reviewData = {
      header: this.state.header,
      text: this.state.text,
      author: this.state.author,
      imgUrl: this.state.imgUrl
    }
    this.props.addReview(reviewData)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state
    return (
      <div className='container'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <input type='text' name='header' onChange={this.onChange} placeholder='title' />
            <span>{errors.header}</span>
            <textarea
              name='text'
              id=''
              cols='20'
              rows='20'
              className='form-control'
              placeholder='new article'
              onChange={this.onChange}
            /><span>{errors.text}</span>
            <input type='text' name='author' onChange={this.onChange} placeholder='author' />
            <span>{errors.author}</span>
            <input type='text' name='imgUrl' onChange={this.onChange} placeholder='image URL' />
            <span>{errors.imgUrl}</span>
            <input type='submit' className='btn btn-primary' />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors
})

function mapDispatchToProps(dispatch) {
  return {
    addReview: (reviewData) => dispatch(addReview(reviewData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReview)
