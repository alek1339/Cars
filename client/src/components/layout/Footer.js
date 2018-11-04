import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../actions/authActions'

class Footer extends Component {
  onLogoutClick(e) {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated } = this.props.auth

    const authLinks = (
      <a
        href=''
        onClick={this.onLogoutClick.bind(this)}
        className='nav-link'
      >
        {/* Hello {user.name} */}
        {' '}
        Logout
      </a>
    )

    const guestLinks = (
      <div>
        <button>
          <Link className='nav-link' to='/login'>
            Влез
          </Link>
        </button>
        <button>
          <Link className='nav-link' to='/register'>
            Регистрация
          </Link>
        </button>
      </div>
    )

    return (
      <div className='footer p-5 text-center text-white'>
        <div>
          <button><Link className='nav-link' to='/aboutus'>
            За Нас
          </Link></button>
          <button><Link className='nav-link' to='/contacts'>
            Контакти
          </Link></button>
          <button> <Link className='nav-link' to='/privacy-policy'>
            Условия за ползване
          </Link></button>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
        <p id='footer-text'>Copyright © 2018 Carnews.bg All rights reserved.</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Footer)
