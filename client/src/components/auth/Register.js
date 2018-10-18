import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { registerUser } from '../../actions/authActions'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit (e) {
    e.preventDefault()

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.registerUser(userData, this.props.history)
  }

  render () {
    const { errors } = this.state
    return (
      <div>
        <h2>Здравей, {this.props.email}</h2>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <input className='form-control'
              type='text'
              name='name'
              placeholder='Name'
              onChange={this.onChange}
            />
            <span>{errors.name} </span>
            <input className='form-control'
              type='text'
              name='email'
              placeholder='email'
              onChange={this.onChange}
              aria-describedby='emailHelp'
            />
            <span>{errors.email} </span>
            <input
              className='form-control'
              type='password' name='password'
              placeholder='password'
              onChange={this.onChange}
            />
            <span>{errors.password} </span>
            <input
              className='form-control'
              type='password' name='password2'
              placeholder='Confirm password'
              onChange={this.onChange}
            /><span>{errors.password2}</span>
            <input type='submit' id='btnLogin' className='btn btn-primary' />
          </div>

        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  errors: state.errors
})

function mapDispatchToProps (dispatch) {
  return {
    registerUser: (userData, history) => dispatch(registerUser(userData, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))
