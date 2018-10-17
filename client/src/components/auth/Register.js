import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: ''
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit (e) {
    e.preventDefault()

    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }

    this.props.registerUser(userData)
  }

  render () {
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
            <input className='form-control'
              type='text'
              name='email'
              placeholder='email'
              onChange={this.onChange}
              aria-describedby='emailHelp'
            />
            <input
              className='form-control'
              type='password' name='password'
              placeholder='password'
              onChange={this.onChange}
            />
            <input type='submit' id='btnLogin' className='btn btn-primary' />
          </div>

        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email
})

function mapDispatchToProps (dispatch) {
  return {
    registerUser: (userData) => dispatch(registerUser(userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
