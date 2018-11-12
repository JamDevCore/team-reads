import React from 'react';
import PropTypes from 'prop-types';
import BookView from '../views/BookView';
import Loading from '../components/Loading';
import api from '../modules/api-call';

class BookViewContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      bookId: undefined,
      discussions: [],
      bookTitle: undefined,
      author: undefined,
      readBy: [],
      personalStatus: undefined,
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    api.get(`book/${id}`)
    .then((res) => {
      console.log(res);
      const book = res.data;
      this.setState({
        bookId: book._id,
        bookTitle: book.name,
        author: book.author,
        readBy: book.readyBy,
      });
    })
    .catch(err => {
      this.setState({
        isLoading: false,
      })
      console.log(err)
    })
    api.get(`discussion?bookId=${id}`)
      .then((res) => {
        console.log(res)
        const discussions = res.data;
        this.setState({
          discussions,
        }, this.setState({
          isLoading: false,
        }))
      })
      .catch(err => {
        console.log(err)
        this.setState({
          isLoading: false,
        })
      })
  }
  render() {
    const {
      isLoading,
      discussions,
      bookTitle,
      author,
      readBy,
      personalStatus,
      userId,
      bookId,
    } = this.state;
    return isLoading ? <Loading /> :
    <BookView
      key={bookId}
      userId={userId}
      bookId={bookId}
      discussions={discussions}
      bookTitle={bookTitle}
      author={author}
      readBy={readBy}
      personalStatus={personalStatus}
    />
  }
}

BookViewContainer.propTypes = {
  userId: PropTypes.string,
};

BookViewContainer.defaultProps = {
  userId: undefined,
};

export default BookViewContainer;
