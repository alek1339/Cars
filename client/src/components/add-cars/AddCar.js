import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCar } from '../../actions/addCarActions'

class AddCar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      make: '',
      model: '',
      engine: '',
      year: '',
      hp: '',
      mpg: '',
      realMpg: '',
      carClassification: '',
      averageRepairCosts: '',
      reliability: '',
      imgUrl: '',
      errors: {}
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //   this.props.history.push('/dashboard')
    // }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit (e) {
    e.preventDefault()
    const newCar = {
      make: this.state.make,
      model: this.state.model,
      year: this.state.year,
      engine: this.state.engine,
      hp: this.state.hp,
      mpg: this.state.mpg,
      realMpg: this.state.realMpg,
      carClassification: this.state.carClassification,
      averageRepairCosts: this.state.averageRepairCosts,
      reliability: this.state.reliability,
      imgUrl: this.state.imgUrl,
      errors: {}
    }
    this.props.addCar(newCar)
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const { errors } = this.state
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <input type='text' name='make' placeholder='make' onChange={this.onChange} />
            <span>{errors.make}</span>
            <input type='text' name='model' placeholder='model' onChange={this.onChange} />
            <span>{errors.model}</span>
            <input type='text' name='engine' placeholder='engine' onChange={this.onChange} />
            <span>{errors.engine}</span>
            <input type='text' name='year' placeholder='year' onChange={this.onChange} />
            <span>{errors.year}</span>
            <input type='text' name='hp' placeholder='hp' onChange={this.onChange} />
            <span>{errors.hp}</span>
            <input type='text' name='mpg' placeholder='mpg' onChange={this.onChange} />
            <span>{errors.mpg}</span>
            <input type='text' name='realMpg' placeholder='realMpg' onChange={this.onChange} />
            <span>{errors.realMpg}</span>
            <input type='text' name='carClassification' placeholder='carClassification' onChange={this.onChange} />
            <span>{errors.carClassification}</span>
            <input type='text' name='averageRepairCosts' placeholder='averageRepairCosts' onChange={this.onChange} />
            <span>{errors.averageRepairCosts}</span>
            <input type='text' name='reliability' placeholder='reliability' onChange={this.onChange} />
            <span>{errors.reliability}</span>
            <input type='text' name='imgUrl' placeholder='imgUrl' onChange={this.onChange} />
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

function mapDispatchToProps (dispatch) {
  return {
    addCar: (carData) => dispatch(addCar(carData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCar)
