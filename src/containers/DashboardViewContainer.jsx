import React from 'react';
import PropTypes from 'prop-types';
import DashboardView from '../views/DashboardView';
import Loading from '../components/Loading';
import api from '../modules/api-call';
import { ascending } from '../modules/sort-by-date';

class DashboardViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      shelves: [],
      currentShelf: 'all',
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
      this.setState({
        books: sortedBooks,
      });
    })
    .catch((err) => {
      console.log(err)
      this.setState({ isLoading: false });
    });
    api.get(`shelf?ownerId=${userId}`)
    .then((response) => {
      console.log(response)
      const shelves = response.data.data;
      this.setState({
        shelves,
      }, this.setState({
        isLoading: false,
      }))
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
      currentShelf,
      shelves,
    } = this.state;
    const { userId } = this.props;
    return isLoading ? <Loading /> :
    <DashboardView
      userId={userId}
      books={books}
      currentShelf={currentShelf}
      shelves={shelves}
      addBookToState={this.addBookToState}
    />
  }
}

DashboardViewContainer.propTypes = {
  userId: PropTypes.string,
};

DashboardViewContainer.defaultProps = {
  userId: undefined,
};

export default DashboardViewContainer;
