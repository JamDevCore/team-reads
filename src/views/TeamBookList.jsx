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
    console.log(this.props.books)
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

  render() {
    const { className, teamMembers } = this.props;
    const { books } = this.state;
    console.log(books)
    return (
      <div className={className}>
        <Panel header >
        <PageTitle>Team book feed</PageTitle>
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
            owner={book.owner}
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
  teamName: PropTypes.string,
};

TeamBookList.defaultProps = {
  books: undefined,
  teamMembers: undefined,
  teamName: undefined,
};

export default styled(TeamBookList)`
width: 1000px;
padding-top: 40px;
`;
