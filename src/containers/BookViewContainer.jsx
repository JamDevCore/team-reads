import React from 'react';
import PropTypes from 'prop-types';
import BookView from '../views/BookView';
import Callback from '../components/Callback';
import api from '../modules/api-call';

class BookViewContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      bookId: undefined,
      ownerId: undefined,
      discussions: [],
      bookTitle: undefined,
      author: undefined,
      readBy: [],
      personalStatus: undefined,
    }
  }
  componentDidMount() {
    const { bookId } = this.props.match.params;
    api.get(`book/${bookId}`)
    .then((res) => {
      console.log(res);
      const book = res.data;
      this.setState({
        bookId: book._id,
        bookTitle: book.name,
        author: book.author,
        readBy: book.readyBy,
        ownerId: book.ownerId,
      }, this.setState({
        isLoading: false,
      }));
    })
    .catch(err => {
      this.setState({
        isLoading: false,
      })
      console.log(err)
    })
    api.get(`discussion?bookId=${bookId}`)
      .then((res) => {
        console.log(res)
        const discussions = res.data.data;
        this.setState({
          discussions,
        })
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
      bookId,
      ownerId,
    } = this.state;
    const { userId, username, } = this.props;
    console.log(ownerId)
    return isLoading && !bookId ? <Callback /> :
    <BookView
      key={bookId}
      userId={userId}
      ownerId={ownerId}
      bookId={bookId}
      discussions={discussions}
      bookTitle={bookTitle}
      author={author}
      readBy={readBy}
      personalStatus={personalStatus}
      username={username}
    />
  }
}

BookViewContainer.propTypes = {
  userId: PropTypes.string,
  username: PropTypes.string,
};

BookViewContainer.defaultProps = {
  userId: undefined,
  username: undefined,
};


export default BookViewContainer;
