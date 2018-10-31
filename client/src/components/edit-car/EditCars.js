import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCars } from '../../actions/carActions'

class EditCars extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cars: []
    }
    this.onEditClick = this.onEditClick.bind(this)
  }

  onEditClick(id) {
    this.props.history.push('/edit-one-car/id:' + id)
  }

  componentDidMount() {
    this.props.fetchCars()
  }

  render() {
    const cars = this.props.cars
    return (
      <div className='container'>
        <div className='row'>
          <h1>Cars:</h1>
          <div className='col-sm-8'>
            <ul> {cars.map(car =>
              <li key={car.id}>
                <h1>{car.make}</h1>
                <h1>{car.model}</h1>
                <button onClick={() => this.onEditClick(car._id)}>Edit</button>
              </li>
            )}
            </ul>
          </div>
          <hr />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCars: () => dispatch(fetchCars())
  }
}

const mapStateToProps = state => ({
  cars: state.cars
})

export default connect(mapStateToProps, mapDispatchToProps)(EditCars)
