import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCars } from '../../actions/carActions'
import { render } from 'react-dom'
import Pagination from 'react-paginating'

class EditCars extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cars: [],
      currentPage: 1
    }
  }

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  componentDidMount() {
    this.props.fetchCars()
  }

  render() {
    const cars = this.props.cars
    const { currentPage } = this.state;

    const carsArray = []

    for (let i = 0; i < cars.length / 4; i++) {
      carsArray.push([cars[i], cars[i + 1], cars[i + 2], cars[i + 3]])
    }

    const limit = 4;
    const pageCount = 3;
    const total = carsArray.length * limit;

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8'>
            <h1>Cars:</h1>
            <div> {carsArray[currentPage - 1].map(cars => <div key={cars.id}>
              <h1>{cars.make}</h1>
              <p>{cars.model}</p>
              <p>{cars.year}</p>
              <Link className='readMore' to={'/edit-one-car/id:' + cars._id}>
                <button className='btn btn-primary'>Edit</button>
              </Link>
              <hr />
            </div>
            )}
            </div>
            <div class='row'>
              <div className='col-sm-8'>
                <Pagination
                  total={total}
                  limit={limit}
                  pageCount={pageCount}
                  currentPage={currentPage}
                >
                  {({
                    pages,
                    currentPage,
                    hasNextPage,
                    hasPreviousPage,
                    previousPage,
                    nextPage,
                    totalPages,
                    getPageItemProps
                  }) => (

                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <a className='page-link'
                              {...getPageItemProps({
                                pageValue: 1,
                                onPageChange: this.handlePageChange
                              })}
                            >
                              Първа
              </a>
                          </li>


                          {hasPreviousPage && (
                            <li className="page-item">
                              <a className='page-link'
                                {...getPageItemProps({
                                  pageValue: previousPage,
                                  onPageChange: this.handlePageChange
                                })}
                              >
                                {"<"}
                              </a>
                            </li>
                          )}

                          {pages.map(page => {
                            let activePage = null;
                            if (currentPage === page) {
                              activePage = { backgroundColor: "#40b3a2" };
                            }
                            return (
                              <li className="page-item">
                                <a className='page-link'
                                  key={page}
                                  style={activePage}
                                  {...getPageItemProps({
                                    pageValue: page,
                                    onPageChange: this.handlePageChange
                                  })}
                                >
                                  {page}
                                </a>
                              </li>
                            );
                          })}

                          {hasNextPage && (
                            <li className="page-item">
                              <a className='page-link'
                                {...getPageItemProps({
                                  pageValue: nextPage,
                                  onPageChange: this.handlePageChange
                                })}
                              >
                                {">"}
                              </a>
                            </li>

                          )}
                          <li className="page-item">
                            <a className='page-link'
                              {...getPageItemProps({
                                pageValue: totalPages,
                                onPageChange: this.handlePageChange
                              })}
                            >
                              Последна
              </a>
                          </li>

                        </ul>
                      </nav>

                    )}
                </Pagination>
              </div>
            </div>
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
