import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class EditCars extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cars: []
    }
    this.onEditClick = this.onEditClick.bind(this)
  }

  onEditClick (id) {
    this.props.history.push('/edit-one-car/id:' + id)
  }

  componentDidMount () {
    fetch('/api/cars/edit-cars')
      .then(res => res.json())
      .then(cars => this.setState({ cars }, console.log('Cars fetched', cars)))
  }
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <h1>Cars:</h1>
                  <div className='col-sm-8'>
            <ul> {this.state.cars.map(car =>
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

export default withRouter(EditCars)
