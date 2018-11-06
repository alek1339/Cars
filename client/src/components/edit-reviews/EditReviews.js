import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchReviews } from '../../actions/reviewsActions'
import { render } from 'react-dom'
import Pagination from 'react-paginating'



class EditReviews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            currentPage: 1
        }
    }

    handlePageChange = page => {
        this.setState({
            currentPage: page
        });
    };

    componentDidMount() {
        this.props.fetchReviews()
    }
    render() {
        const { currentPage } = this.state;

        const reviews = this.props.reviews
        const reviewsArray = []

        for (let i = 0; i < reviews.length / 4; i++) {
            reviewsArray.push([reviews[i], reviews[i + 1], reviews[i + 2], reviews[i + 3]])
        }

        const limit = 4;
        const pageCount = 3;
        const total = reviewsArray.length * limit;

        return (
            <div className='container reviews'>
                <div className='row'>
                    <div className='col-sm-8 reviews'>
                        <div>
                            {reviewsArray[currentPage - 1].map(reviews => <div key={reviews.id}>
                                <Link className='header' to={'/reviews/id/' + reviews._id}><h1 className='text-dark'>{reviews.header}</h1></Link>
                                <Link to={'/reviews/id/' + reviews._id}>
                                    <img
                                        src={reviews.imgUrl}
                                        widt='100%'
                                        height='250'
                                        alt='img' />
                                </Link>
                                <article>{reviews.text.substr(0, 199)}</article>
                                <Link className='readMore' to={'/reviews/id/' + reviews._id}>
                                    <button className='btn btn-primary'>Почети още</button>
                                </Link>
                                <div className='m-2'>
                                    <Link className='readMore' to={'/edit-one-reviews/id:' + reviews._id}>
                                        <button className='btn btn-primary'>Edit</button>
                                    </Link>
                                </div>
                                <hr />
                            </div>
                            )}
                        </div>
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
                                    <div class='row'>
                                        <div className='col-sm-8 pagination'>
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
                                        </div>
                                    </div>
                                )}
                        </Pagination>
                    </div>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchReviews: () => dispatch(fetchReviews())
    }
}

const mapStateToProps = state => ({
    reviews: state.reviews
})

export default connect(mapStateToProps, mapDispatchToProps)(EditReviews)
