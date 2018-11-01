import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchNews } from '../../actions/newsActions'
import { render } from 'react-dom'
import Pagination from 'react-paginating'



class EditNews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
      currentPage: 1
    }
  }

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

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

    return (
      <div className='container news'>
        <div className='row'>
          <div className='col-sm-8 news'>
            <div>
              {newsArray[currentPage - 1].map(news => <div key={news.id}>
                <Link className='header' to={'/news/id/' + news._id}><h1 className='text-dark'>{news.header}</h1></Link>
                <Link to={'/news/id/' + news._id}>
                  <img
                    src={news.imgUrl}
                    widt='100%'
                    height='250'
                    alt='img' />
                </Link>
                <article>{news.text.substr(0, 199)}</article>
                <Link className='readMore' to={'/news/id/' + news._id}>
                  <button className='btn btn-primary'>Почети още</button>
                </Link>
                <div className='m-2'>
                  <Link className='readMore' to={'/edit-one-news/id:' + news._id}>
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
    fetchNews: () => dispatch(fetchNews())
  }
}

const mapStateToProps = state => ({
  news: state.news
})

export default connect(mapStateToProps, mapDispatchToProps)(EditNews)
