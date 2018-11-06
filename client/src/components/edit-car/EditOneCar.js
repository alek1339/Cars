import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editCars } from '../../actions/editCarsActions'
import { deleteCar } from '../../actions/editCarsActions'

class EditOneCar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cars: [],
      model: '',
      make: '',
      year: '',
      mpg: '',
      realMpg: '',
      hp: '',
      carClassification: '',
      engine: '',
      averageRepairCosts: '',
      reliability: '',
      imgUrl: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.deleteCar = this.deleteCar.bind(this)
  }

  deleteCar (e) {
    e.preventDefault()
    deleteCar()
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit (e) {
    console.log('edit car')
    e.preventDefault()

    const carData = {
      model: this.state.model,
      make: this.state.make,
      year: this.state.year,
      mpg: this.state.mpg,
      realMpg: this.state.realMpg,
      hp: this.state.hp,
      carClassification: this.state.carClassification,
      engine: this.state.engine,
      averageRepairCosts: this.state.averageRepairCosts,
      reliability: this.state.reliability,
      imgUrl: this.state.imgUrl
    }
    this.props.editCars(carData)
  }

  componentDidMount () {
    fetch('/api/cars/edit')
      .then(res => res.json())
      .then(cars => this.setState({
        cars,
        model: cars.model,
        make: cars.make,
        year: cars.year,
        mpg: cars.mpg,
        realMpg: cars.realMpg,
        hp: cars.hp,
        carClassification: cars.carClassification,
        engine: cars.engine,
        averageRepairCosts: cars.averageRepairCosts,
        reliability: cars.reliability,
        imgUrl: cars.imgUrl
      },
      console.log('Cars fetched', cars)))
  }

  render () {
    return (
      <div className='container'>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <h1>Edit a car </h1>
            <input type='text' name='make' onChange={this.onChange} placeholder='make' value={this.state.make} />
            <input type='text' name='model' onChange={this.onChange} placeholder='model' value={this.state.model} />
            <input type='text' name='year' onChange={this.onChange} placeholder='year' value={this.state.year} />
            <input type='text' name='mpg' onChange={this.onChange} placeholder='mpg' value={this.state.mpg} />
            <input type='text' name='realMpg' onChange={this.onChange} placeholder='realMpg' value={this.state.realMpg} />
            <input type='text' name='hp' onChange={this.onChange} placeholder='hp' value={this.state.hp} />
            <input type='text' name='carClassification' onChange={this.onChange} placeholder='carClassification' value={this.state.carClassification} />
            <input type='text' name='engine' onChange={this.onChange} placeholder='engine' value={this.state.engine} />
            <input type='text' name='year' onChange={this.onChange} placeholder='year' value={this.state.year} />
            <input type='text' name='averageRepairCosts' onChange={this.onChange} placeholder='averageRepairCosts' value={this.state.averageRepairCosts} />
            <input type='text' name='reliability' onChange={this.onChange} placeholder='reliability' value={this.state.reliability} />
            <input type='text' name='imgUrl' onChange={this.onChange} placeholder='imgUrl' value={this.state.imgUrl} />
            <input type='submit' value='Edit' className='btn btn-primary' />
            <button onClick={this.deleteCar}>Delete Car</button>
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
    editCars: (carData) => dispatch(editCars(carData)),
    deleteCar: () => dispatch(deleteCar())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOneCar)
