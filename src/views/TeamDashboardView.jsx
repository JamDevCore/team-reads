import React from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';

class TeamBooksView extends React.Component {

  render() {
    const { books } = this.props;
    console.log(books)
    return (
      <div className="TeamBooksView">
        <h1>Team books view</h1>
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

TeamBooksView.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
};

TeamBooksView.defaultProps = {
  books: undefined,
};

export default TeamBooksView;
