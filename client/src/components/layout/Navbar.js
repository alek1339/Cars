import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'

class Navbar extends Component {
  onLogoutClick (e) {
    e.preventDefault()
    this.props.logoutUser()
  }

  render () {
    const { isAuthenticated } = this.props.auth

    const authLinks = (
      <ul className='navbar-nav ml-auto'>
        <li class='nav-item dropdown'>
          <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            Новини
          </a>
          <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
            <Link class='dropdown-item' to='/add-news'>Добави</Link>
            <Link class='dropdown-item' to='/edit-news'>Промени</Link>
          </div>
        </li>
        <li class='nav-item dropdown'>
          <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            Автомобили
          </a>
          <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
            <Link class='dropdown-item' to='/add-car'>Добави</Link>
            <Link class='dropdown-item' to='/edit-cars'>Промени</Link>
          </div>
        </li>
        <li class='nav-item dropdown'>
          <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            Ревюта
          </a>
          <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
            <Link class='dropdown-item' to='/add-news'>Добави Ревю</Link>
            <Link class='dropdown-item' to='/edit-news'>Промени Ревю</Link>
          </div>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/'>
            {' '}
            Новини
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/cars'>
            {' '}
            Автомобили
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/reliability'>
            {' '}
            Надеждност
          </Link>
        </li>
        <li>
          <Link className='nav-link' to='/reviews'>
            {' '}
            Ревюта
          </Link></li>
      </ul>
    )

    const guestLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/'>
            {' '}
            Новини
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/cars'>
            {' '}
            Автомобили
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/reliability'>
            {' '}
            Надеждност
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/reviews'>
            {' '}
            Ревюта
          </Link>
        </li>
      </ul>
    )

    return (
      <nav className='navbar navbar-expand-sm navbar-dark nav mb-4'>
        <div className='container'>
          <Link className='navbar-brand' to='/' id='logo'>
            CARNEWS
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#mobile-nav'
          >
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='mobile-nav'>
            <ul className='navbar-nav mr-auto'>
              {/* <li className='nav-item'>
                <Link className='nav-link' to='/news'>
                  {' '}
                  Новини
                </Link>
              </li> */}
            </ul>
            {this.props.auth.user.id === '5bdec2221a96476648975936' ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(
  Navbar
)
