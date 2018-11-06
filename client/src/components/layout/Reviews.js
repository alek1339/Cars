import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchReviews } from '../../actions/reviewsActions'
import { render } from 'react-dom'
import Pagination from 'react-paginating'

import LastNews from './LastNews'

class Reviews extends Component {
    constructor() {
        super()
        this.state = {
            currentPage: 1
        }
        this.getLastInex = this.getLastInex.bind(this)
        this.reviewsClicked = this.reviewsClicked.bind(this)
    }

    // Return index of las index of text when the text is cutted under 300 chars
    getLastInex(text) {
        let firstText = text.slice(0, 300)
        let lastIndex = firstText.lastIndexOf('.')
        return lastIndex + 1
    }

    reviewsClicked(id) {
        this.props.history.push('/reviews/id/' + id)
    }

    // Handle for pagination
    handlePageChange = page => {
        this.setState({
            currentPage: page
        });
    };

    // Dispatch action to fetch news
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

        const firstBoxIdLink = '/reviews/id/' + reviews[0]._id
        const secondBoxIdLink = '/reviews/id/' + reviews[1]._id
        const thirdBoxIdLink = '/reviews/id/' + reviews[2]._id
        const fourthBoxIdLink = '/reviews/id/' + reviews[3]._id

        const firstBox = {
            backgroundSize: 'cover',
            fontSize: '18px',
            textAlign: 'center',
            backgroundImage: `url(${reviews[0].imgUrl})`
        }

        const secondBox = {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            fontSize: '18px',
            textAlign: 'center',
            backgroundImage: `url(${reviews[1].imgUrl})`
        }

        const thirdBox = {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            fontSize: '16px',
            textAlign: 'center',
            backgroundImage: `url(${reviews[2].imgUrl})`
        }

        const fourthBox = {
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            fontSize: '16px',
            textAlign: 'center',
            backgroundImage: `url(${reviews[3].imgUrl})`
        }

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-8 reviews'>
                        <div>
                            {reviewsArray[currentPage - 1].map(reviews => <div key={reviews.id}>
                                <Link className='header' to={'/reviews/id/' + reviews._id}><h1 className='text-dark'>{reviews.header}</h1></Link>
                                <Link to={'/reviews/id/' + reviews._id}>
                                    <img
                                        src={reviews.imgUrl}
                                        width='100%'
                                        alt='img' />
                                </Link>{}
                                <article>{reviews.text.slice(0, this.getLastInex(reviews.text))}</article>
                                <Link className='readMore' to={'/reviews/id/' + reviews._id}>
                                    <button className='btn btn-primary'>Почети още</button>
                                </Link>
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
                                        <div className='pagination'>
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
                    <LastNews />
                </div>

            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
