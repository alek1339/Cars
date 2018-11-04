import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchNews } from '../../actions/newsActions'
import { render } from 'react-dom'
import Pagination from 'react-paginating'

import LastNews from './LastNews'

class News extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1
    }
    this.getLastInex = this.getLastInex.bind(this)
    this.newsClicked = this.newsClicked.bind(this)
  }

  // Return index of las index of text when the text is cutted under 300 chars
  getLastInex(text) {
    let firstText = text.slice(0, 300)
    let lastIndex = firstText.lastIndexOf('.')
    return lastIndex + 1
  }

  newsClicked(id) {
    this.props.history.push('/news/id/' + id)
  }

  // Handle for pagination
  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  // Dispatch action to fetch news
  componentDidMount() {
    this.props.fetchNews()
  }

  render() {
    const { currentPage } = this.state;

    const news = this.props.news
    const newsArray = []

    for (let i = 0; i < news.length / 4; i++) {
      newsArray.push([news[i], news[i + 1], news[i + 2], news[i + 3]])
    }

    const limit = 4;
    const pageCount = 3;
    const total = newsArray.length * limit;

    const firstBoxIdLink = '/news/id/' + news[0]._id
    const secondBoxIdLink = '/news/id/' + news[1]._id
    const thirdBoxIdLink = '/news/id/' + news[2]._id
    const fourthBoxIdLink = '/news/id/' + news[3]._id

    const firstBox = {
      backgroundSize: 'cover',
      fontSize: '18px',
      textAlign: 'center',
      backgroundImage: `url(${news[0].imgUrl})`
    }

    const secondBox = {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      fontSize: '18px',
      textAlign: 'center',
      backgroundImage: `url(${news[1].imgUrl})`
    }

    const thirdBox = {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      fontSize: '16px',
      textAlign: 'center',
      backgroundImage: `url(${news[2].imgUrl})`
    }

    const fourthBox = {
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      fontSize: '16px',
      textAlign: 'center',
      backgroundImage: `url(${news[3].imgUrl})`
    }

    return (
      <div className='container'>
        <div className='row jumbo'>
          <div className='col-sm-12 '>
            <div className='row'>
              <div className='col-sm-4 img pointer' style={firstBox} onClick={() => this.newsClicked(news[0]._id)}>
                <Link class='dropdown-item landing-box' to={firstBoxIdLink}>{news[0].header.slice(0, 30)}</Link>
              </div>
              <div className='col-sm-8'>
                <div className='row'>
                  <div className='col-sm-12 seccolfirstrow pointer' style={secondBox} onClick={() => this.newsClicked(news[1]._id)}>
                    <Link class='dropdown-item landing-box' to={secondBoxIdLink}>{news[1].header}</Link>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-sm-6 seccolsecrow pointer' style={thirdBox} onClick={() => this.newsClicked(news[2]._id)}>
                    <Link class='dropdown-item landing-box' to={thirdBoxIdLink}>{news[2].header.slice(0, 25)}</Link>
                  </div>
                  <div className='col-sm-6 thirdcolfirstrow pointer' style={fourthBox} onClick={() => this.newsClicked(news[3]._id)}>
                    <Link class='dropdown-item landing-box' to={fourthBoxIdLink}>{news[3].header.slice(0, 25)}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-8 news'>
            <div>
              {newsArray[currentPage - 1].map(news => <div key={news.id}>
                <Link className='header' to={'/news/id/' + news._id}><h1 className='text-dark'>{news.header}</h1></Link>
                <Link to={'/news/id/' + news._id}>
                  <img
                    src={news.imgUrl}
                    width='100%'
                    alt='img' />
                </Link>{}
                <article>{news.text.slice(0, this.getLastInex(news.text))}</article>
                <Link className='readMore' to={'/news/id/' + news._id}>
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
          <LastNews />
        </div>

      </div >
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNews: () => dispatch(fetchNews())
  }
}

const mapStateToProps = state => ({
  news: state.news
})

export default connect(mapStateToProps, mapDispatchToProps)(News)
