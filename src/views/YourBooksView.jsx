import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreateBookForm from '../components/forms/CreateBookForm';
import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';
import Panel from '../components/_common/Panel';
import Loading from '../components/Loading';
import theme from '../theme';
import api from '../modules/api-call';

class YourBooksView extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      shelves: [],
      currentShelf: 'all',
      isLoading: false,
    }
  }
  componentDidMount() {
    const { userId } = this.props;
    this.setState({ isLoading: true })
    console.log(userId)
    api.get(`book?ownerId=${userId}`)
    .then((response) => {
      console.log(response);
      const books = response.data.data;
      this.setState({
        books: books,
        isLoading: false,
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
      })
    })
  }

  renderBooks() {
    const { books } = this.state;
    return books.length > 0 ? books.map(book => (
      <Card
        key={book._id}
        title={book.name}
        readers={book.readers || ["Not read"]}
        lightbulbs={book.lightbulbs || 0}
        comments={book.comments || 0}
        author={book.author}
      />)) : <Panel><h2>You don't have any books on this shelf</h2></Panel>
  }
  render() {
    const { className, userId } = this.props;
    const { isLoading, books, shelves } = this.state;
    console.log(shelves)
    console.log(books, isLoading)
    return (
      <div className={className}>
        <div className="container left">
        <Panel>
        <CreateBookForm shelves={shelves} userId={userId}/>
        </Panel>
        </div>
        <div className="container right">
          <Select
            id="shelf"
          >
          <option value="all">All books</option>
            {shelves.length > 0 ? shelves.map(shelf => <option key={shelf._id} value={shelf._id}>{shelf.name}</option>) : null}
          </Select>
          {isLoading ? <Panel><Loading /></Panel> : this.renderBooks()}
        </div>
      </div>
    );
  }
}

YourBooksView.propTypes = {
  className: PropTypes.string,
  userId: PropTypes.string,
};

YourBooksView.defaultProps = {
  className: undefined,
  userId: undefined,
};

export default styled(YourBooksView)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  .left {
    margin: 40px auto;
    width: 400px;
    min-width: 300px;
  }
  .right {
    box-sizing: border-box;
    width: 60%;
    margin: 20px auto;
  }
  @media(max-width: 1000px) {
    .right {
      margin: 30px auto;
      width: 100%;
    }
    .left {
      width: 500px;
      min-width: 300px;
      margin: 40px auto;
    }
  }
`;
