import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreateBookForm from '../components/forms/CreateBookForm';
import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';
import TextInput from '../components/_common/form-components/TextInput';
import NoResults from '../components/_common/NoResults';
import Panel from '../components/_common/Panel';
import Button from '../components/_common/Button';
import Callback from '../components/Callback';
import theme from '../theme';
import DashboardTotals from '../components/DashboardTotals';
import api from '../modules/api-call';

class BookListView extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    }
  }

  renderBooks() {
    const { books } = this.props;
    return books.length > 0 ? books.map(book => (
      <Card
        key={book._id}
        bookId={book._id}
        title={book.name}
        readers={book.readers || ["Not read"]}
        lightbulbs={book.lightbulbs || 0}
        contributions={book.discussions.length}
        author={book.author}
        link={`/book/${book._id}`}
      />)) : <NoResults isBook />
  }

  render() {
    const { className, userId, addBookToState, totals } = this.props;
    return (
      <div className={className}>

      <div className="BookList">
        <div className="header">
        <h5>Dashboard</h5>
        <Button
          theme="success"
          icon="fas fa-plus"
          label="Add book"
          />
        </div>
          <DashboardTotals
            bookTotal={totals.bookTotal}
            discussionTotal={totals.discussionTotal}
            insightTotal={totals.insightTotal}
            />
          <TextInput searchBar id="bookSearch"/>
          {this.renderBooks()}
          </div>
      </div>
    );
  }
}

BookListView.propTypes = {
  className: PropTypes.string,
  userId: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.object),
  addBookToState: PropTypes.func,
  totals: PropTypes.object,
};

BookListView.defaultProps = {
  className: undefined,
  userId: undefined,
  books: undefined,
  currentShelf: undefined,
  addBookToState: undefined,
  totals: undefined,
};

export default styled(BookListView)`
  .header {
    h5 {
      margin: auto 20px;
    }
    display: flex;
    div:first-of-type {
      float: right;
      margin: auto 20px auto auto;
    }
  }
  .header:
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  .AddBookForm {
    margin: 40px 30px;
    width: 480px;
    min-width: 300px;
    select {
      margin-left: 0 !important;
    }
  }
  .BookList {
    margin: 25px auto;
    h2 {
      padding: 15px;
    }
    width: 1200px;

  }
  @media(max-width: 1124px) {
    .BookList {
      margin: 20px auto;
      width: 100%;

    }
    .AddBookForm {
      width: 480px;
      min-width: 300px;
      position: relative;
      margin: 40px 0px auto;
    }
  }

  }
`;
