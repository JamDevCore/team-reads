import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreateBookForm from '../components/forms/CreateBookForm';
import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';
import NoResults from '../components/_common/NoResults';
import Panel from '../components/_common/Panel';
import Callback from '../components/Callback';
import Divider from '../components/_common/Divider';
import theme from '../theme';
import api from '../modules/api-call';

class AddBookView extends React.Component {
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
        <div className="container">
        <Panel>
        <CreateBookForm
          userId={userId}
          addBookToState={addBookToState}
          />
        </Panel>
      </div>
      </div>
    );
  }
}

AddBookView.propTypes = {
  className: PropTypes.string,
  userId: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.object),
  addBookToState: PropTypes.func,
};

AddBookView.defaultProps = {
  className: undefined,
  userId: undefined,
  books: undefined,
  addBookToState: undefined,
};

export default styled(AddBookView)`
  max-width: 600px;
  margin: 100px auto;
`;
