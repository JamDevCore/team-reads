import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreateBookForm from '../components/forms/CreateBookForm';
import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';
import NoResults from '../components/_common/NoResults';
import Panel from '../components/_common/Panel';
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
    const { className, userId, addBookToState  } = this.props;
    return (
      <div className={className}>
        <div className="AddBookForm">
        <Panel>
        <CreateBookForm
          userId={userId}
          addBookToState={addBookToState}
          />
        </Panel>
      </div>
      <DashboardTotals />
      <div className="BookList">
        <h2>Your books</h2>
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
};

BookListView.defaultProps = {
  className: undefined,
  userId: undefined,
  books: undefined,
  currentShelf: undefined,
  addBookToState: undefined,
};

export default styled(BookListView)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .AddBookForm {
    position: fixed;
    margin: 40px 30px;
    width: 480px;
    min-width: 300px;
    select {
      margin-left: 0 !important;
    }
  }
  .BookList {
    h2 {
      padding: 15px;
    }
    width: 950px;
    box-sizing: border-box;
    margin: 40px auto;
    margin-left: 500px;
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
