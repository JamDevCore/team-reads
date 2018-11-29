import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../components/Card';
import PageTitle from '../components/_common/PageTitle';

class TeamBookList extends React.Component {

  render() {
    const { books, className } = this.props;
    return (
      <div className={className}>
        <PageTitle>Team books view</PageTitle>
        {books && books.length > 0 ? books.map(book =>
          <Card
            key={book._id}
            title={book.name}
            author={book.author}
            bookId={book._id}
            readers={book.readers || ["Not read"]}
            lightbulbs={book.lightbulbs || 0}
            contributions={book.discussions.length}
            link={`/book/${book._id}`}
          />
      ): null}
      </div>
    );
  }
}

TeamBookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

TeamBookList.defaultProps = {
  books: undefined,
};

export default styled(TeamBookList)`
width: 1000px;
`;
