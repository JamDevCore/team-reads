import React from 'react';
import PropTypes from 'prop-types';
import BookListView from '../views/BookListView';
import Callback from '../components/Callback';
import api from '../modules/api-call';
import { ascending } from '../modules/sort-by-date';

class BookListViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoading: true,
    }
    this.addBookToState = this.addBookToState.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props;
    if (userId) {
    console.log(userId)
    api.get(`book?ownerId=${userId}`)
    .then((response) => {
      console.log(response);
      const books = response.data.data;
      const sortedBooks = ascending(books);
      console.log(sortedBooks)
      this.setState({
        books: sortedBooks,
        isLoading: false,
      });
    })
    .catch((err) => {
      console.log(err)
      this.setState({ isLoading: false });
    });
    }
  }

  addBookToState(book) {
    const { books } = this.state;
    const newBooks = books;
    newBooks.unshift(book);
    this.setState({
      books: newBooks,
    });
  }

  render() {
    const {
      isLoading,
      books,
    } = this.state;
    const { userId, totals } = this.props;
    return isLoading ? <Callback /> :
    <BookListView
      userId={userId}
      books={books}
      totals={totals}
      addBookToState={this.addBookToState}
    />
  }
}

BookListViewContainer.propTypes = {
  userId: PropTypes.string,
  totals: PropTypes.object,
};

BookListViewContainer.defaultProps = {
  userId: undefined,
  totals: undefined,
};

export default BookListViewContainer;
