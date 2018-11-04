import React, { Component } from 'react'
import { connect } from 'react-redux'

import LastNews from './LastNews'
import { fetchCars } from '../../actions/carActions'

class Cars extends Component {
  constructor (props) {
    super(props)
    this.state = {
      models: [],
      car: []
    }

    this.onChange = this.onChange.bind(this)
    this.modelChanged = this.modelChanged.bind(this)
  }

  // Dispatch action to fetch cars
  componentDidMount () {
    this.props.fetchCars()
  }

  onChange (e) {
    let filteredCars = this.props.cars.filter(m => m.make === e.target.value)
    let models = []

    for (let i = 0; i < filteredCars.length; i++) {
      models.push(filteredCars[i].model)
    }

    this.setState({
      models: models
    })
  }

  modelChanged (e) {
    let car = this.props.cars.filter(m => m.model === e.target.value)

    this.setState({
      car: car
    })
  }

  render () {
    let cars = this.props.cars

    let makes = []

    for (let i = 0; i < cars.length; i++) {
      if (!makes.includes(cars[i].make)) {
        makes.push(cars[i].make)
      }
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8 mb-5'>
            <p><strong>Разходи за подръжка и ремонт:</strong> <br />
              Средните общи годишни разходи за непредвидени ремонти и поддръжка през всички модели години на превозно средство. По-високата средна цена не означава непременно, че превозното средство е по-малко надеждно. Например, части и труд за вашия автомобил може да са скъпи, особено ако това е европейска луксозна кола, но ако тежките проблеми и средните годишни посещения в магазина са ниски, това е добър показател за надеждна кола.</p>
            <p>
              <strong>Реален разход: </strong><br />
              Реалнияр разход е изсчислен според данни на множество собственици на автомобила.
            </p>
            <select onChange={this.onChange} className='form-control'>
              <option>Make</option>
              {makes.map(make =>
                <option key={make._id} value={make}>
                  {make}</option>
              )}</select>
            <select onChange={this.modelChanged} className='form-control'>
              <option>Model</option>
              {this.state.models.map(model =>
                <option key={model.id} value={model}>
                  {model}</option>
              )}</select>
            <div className='mt-3'>{this.state.car.map(car =>
              <div key={car.id}>
                <img src={car.imgUrl} width='240px' />
                <div><p>
                  <strong>{car.make} {car.model} {car.engine} {car.year}</strong>
                </p></div>
                <div>
                  <p>Средната сума за подръжка и ремонт на
                  {' ' + car.make} {car.model} е <strong>{car.averageRepairCosts}лв</strong>.</p>
                  <p>Средният разход на 100км според данни на производителя е <strong>{car.mpg}</strong>
                    , но реалният среден разход според данни на собствениците е <strong>{car.realMpg}</strong>.
                  </p>
                </div>
              </div>
            )}</div>
          </div>
          <LastNews />
        </div>

      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCars: () => dispatch(fetchCars())
  }
}

const mapStateToProps = state => ({
  cars: state.cars
})

export default connect(mapStateToProps, mapDispatchToProps)(Cars)
