import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from '../components/Card';
import Select from '../components/_common/form-components/Select';
import PageTitle from '../components/_common/PageTitle';
import Panel from '../components/_common/Panel';

class TeamBookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books,
      sortBy: "all",
    }
  }

  selectUser() {
    const { books } = this.props;
    const user = document.querySelector('[name="userSort"]').value;
    console.log(user)
    if (user === "all") {
      this.setState({ books });
    } else {
      const newBooks = books.filter(book => book.ownerId === user);
      this.setState({
        books: newBooks,
      })
    }
  }

  sortBooks
  render() {
    const { className, teamMembers } = this.props;
    const { books } = this.state;
    return (
      <div className={className}>
        <Panel>
        <PageTitle>What's been read</PageTitle>
        </Panel>
        <Select
          name="userSort"
          label="Sort by team member"
          onChange={() => this.selectUser()}
        >
          <option key="all" value="all">All team members</option>
          {teamMembers && teamMembers.length > 0 ? teamMembers.map(user => {
            console.log(user)
            return (
            <option key={user._id} value={user._id}>{user.username}</option>
          )}): null}
        </Select>
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
  teamMembers: PropTypes.arrayOf(PropTypes.object),
};

TeamBookList.defaultProps = {
  books: undefined,
  teamMembers: undefined,
};

export default styled(TeamBookList)`
width: 1000px;
padding-top: 40px;
`;
