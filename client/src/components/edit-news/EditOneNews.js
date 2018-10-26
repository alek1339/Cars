import React, { Component } from 'react'

class EditOneNews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
      location: this.props.location.patname
    }
  }
  render() {
    return (
      <div className='container'>
        <h1>Edit one news {this.state.location}</h1>
      </div>
    )
  }
}

export default (EditOneNews)
