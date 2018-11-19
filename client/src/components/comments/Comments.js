import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComments, fetchComments } from '../../actions/commentsActions'

class Comments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      author: 'Гост',
      authorId: 'AuthorId',
      text: '',
      comments: []
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onSubmit (e) {
    e.preventDefault()
    let url = window.location.href
    let startIndexOfId = url.lastIndexOf('/') + 1
    let id = url.slice(startIndexOfId)

    if (this.props.auth.isAuthenticated) {
      this.setState({
        authorId: this.props.auth.user.id
      })
    }

    let comment = {
      newsId: id,
      authorId: this.state.authorId,
      author: this.state.author,
      text: this.state.text
    }

    let oldState = this.state.comments
    oldState.push(comment)
    this.setState({
      comments: oldState
    })
    this.props.addComments(comment)
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentWillReceiveProps (nextProps) {
    let url = window.location.href
    console.log(nextProps)
    let startIndexOfId = url.lastIndexOf('/') + 1

    if (nextProps.comments.length > 0) {
      if (nextProps.comments[0].newsId !== '') {
        let commentsArray = nextProps.comments.filter(c => c.newsId === url.slice(startIndexOfId))
        this.setState({
          comments: commentsArray
        })
      }
    }
    if (nextProps.auth.isAuthenticated) {
      this.setState({
        author: nextProps.auth.user.name
      })
    }
  }

  componentDidMount () {
    this.props.fetchComments()
  }

  render () {
    return (
      <div>
              <form className='form-group' onSubmit={this.onSubmit}>
          <input
                      className='mb-2'
            type='text'
                      value={this.state.author}
            name='author'
                      placeholder='Вашето име'
            onChange={this.onChange} />
                  <br />
                  <textarea className='mb-2'
            type='text'
            cols='50'
            value={this.state.text}
            name='text'
            placeholder='Вашият коментар'
            onChange={this.onChange} />
                  <br />
                  <h5>Коментари: </h5>
          {this.state.comments.map(comment => <div className='row ' key={comment.id}>

                      <div className='col-sm-6'>
                          <h6>{comment.author}</h6>
              <p>{comment.text}</p>
              <hr />
            </div>

          </div>
          )}
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>

      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: () => dispatch(fetchComments()),
    addComments: (comment) => dispatch(addComments(comment))
  }
}

const mapStateToProps = state => ({
  comments: state.comments,
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
