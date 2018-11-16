import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreateBookForm from '../components/forms/CreateBookForm';
import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';
import Panel from '../components/_common/Panel';
import Callback from '../components/Callback';
import theme from '../theme';
import api from '../modules/api-call';

class DashboardView extends React.Component {
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
      />)) : <Panel><h2>You don't have any books on this shelf</h2></Panel>
  }
  render() {
    const { className, userId, shelves, addBookToState  } = this.props;
    return (
      <div className={className}>
        <div className="container left">
        <Panel>
        <CreateBookForm
          shelves={shelves}
          userId={userId}
          addBookToState={addBookToState}
          />
        </Panel>
      </div>
      <div className="container right">
          <Select
            id="shelf"
          >
          <option value="all">All books</option>
            {shelves.length > 0 ? shelves.map(shelf => <option key={shelf._id} value={shelf._id}>{shelf.name}</option>) : null}
          </Select>
          {this.renderBooks()}
          </div>
      </div>
    );
  }
}

DashboardView.propTypes = {
  className: PropTypes.string,
  userId: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.object),
  currentShelf: PropTypes.string,
  shelves: PropTypes.arrayOf(PropTypes.object),
  addBookToState: PropTypes.func,
};

DashboardView.defaultProps = {
  className: undefined,
  userId: undefined,
  books: undefined,
  currentShelf: undefined,
  shelves: undefined,
  addBookToState: undefined,
};

export default styled(DashboardView)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .left {
    margin: 40px auto;
    width: 450px;
    min-width: 300px;
    select {
      margin-left: 0 !important;
    }
  }
  .right {
    box-sizing: border-box;
    width: 60%;
    margin: 20px auto;
  }
  @media(max-width: 1124px) {
    .right {
      margin: 20px auto;
      width: 100%;

    }
    .left {
      width: 100%;
      margin: 40px 0px auto;
    }
  }

  }
`;
