import React, { Component } from 'react'
import { connect } from 'react-redux'

import LastNews from './LastNews'
import { fetchCars } from '../../actions/carActions'

class Cars extends Component {
  constructor (props) {
    super(props)
    this.state = {
      carClassification: [],
      carResult: []
    }

    this.onChange = this.onChange.bind(this)
  }

  // Dispatch action to fetch cars
  componentDidMount () {
    this.props.fetchCars()
  }

  onChange (e) {
    let filteredCars = this.props.cars.filter(m => m.carClassification === e.target.value)
    let cars = []

    for (let i = 0; i < filteredCars.length; i++) {
      if (!isNaN(filteredCars[i].reliability)) {
        cars.push(filteredCars[i])
      }
    }

    this.setState({
      carResult: cars.sort(function (a, b) {
        return Number(a.reliability) - Number(b.reliability)
      }).reverse()
    })
  }

  render () {
    let cars = this.props.cars

    let carClassification = []

    for (let i = 0; i < cars.length; i++) {
      if (!carClassification.includes(cars[i].carClassification)) {
        carClassification.push(cars[i].carClassification)
      }
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8 mb-5'>
            <h2 style={{ color: '#4d615e' }}>Надеждност</h2>
            <p>
              Оценката за надеждност от <strong>Carnews.bg</strong> е измерване на надеждността на автомобила въз основа на цената, честотата и тежестта на непланираните ремонти и поддръжка. <strong>Carnews.bg</strong> съчетава обширна собствена база данни, включваща милиони фактури за ремонт на автомобили, с допълнителна автомобилна статистика и предсказуема научна информация за разработване на най-автентичния показател за надеждност в индустрията. Оценката за надеждност ви позволява да изследвате надеждността и разходите за собственост, свързани с непредвидени ремонти и поддръжка, в допълнение към сравняването на факторите за надеждност спрямо другите превозни средства и средните стойности в отрасъла. Индивидуалните фактори, допринасящи за комбинирания рейтинг на надеждността на автомобила, включват цена, честота и тежест.</p>
            <select onChange={this.onChange} className='form-control'>
              <option>Клас на автомибила</option>
              {carClassification.map(carClassification =>
                <option key={carClassification._id} value={carClassification}>
                  {carClassification}</option>
              )}</select>

            <div>
              {this.state.carResult.slice(0, 5).map((cars, index) => <div className='row' key={cars.id}>
                <span className='badge badge-pill badge-primary'>{index + 1}</span>
                <div className='col-sm-8 mb-5 mt-5 mr-2'>
                  <img className='float-left mr-3' src={cars.imgUrl} width='240px' />
                  <p className=''>{cars.make} {cars.model} {cars.year}</p>
                  <div className='progress'>
                    <div className='progress-bar bg-success' role='progressbar' style={{ width: cars.reliability * 20 + '%' }} aria-valuenow={cars.reliability * 20} aria-valuemin='0' aria-valuemax='100' />
                  </div>
                  <p className=''>Надеждност: {cars.reliability} of 5</p>
                </div>
              </div>
              )}
            </div>
            <div />
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
