import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';

import NoResults from '../components/_common/NoResults';

const AmazonLink = styled.a`
  text-decoration: underline;
  display: block;
  text-align: center;
  margin-top: 20px;
`;

class TeamDiscussionListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      discussions: this.props.discussions,
      sortBy: "all",
    }
  }

  selectUser() {
    const { discussions } = this.props;
    const user = document.querySelector('[name="userSort"]').value;
    if (user === 'all') {
      this.setState({ discussions });
    } else {
      const newDiscussions = discussions.filter(book => book.userId._id === user);
      this.setState({
        discussions: newDiscussions,
      })
    }
  }


  renderDiscussions() {
    const { discussions } = this.state;
    return discussions.length > 0 ? discussions.map(d => (
      <Card
        key={d._id}
        owner={d.userId.username}
        title={d.title || 'Untitled'}
        readers={d.readers}
        isDiscussion
        lightbulbs={d.lightbulbs}
        contributions={d.comments.length}
        link={`/book/${d.bookId._id}/discussion/${d._id}`}
      />)) : <NoResults isDiscussion />;
  }

  render() {
    const { className, teamMembers } = this.props;
    const { isLoading, discussions } = this.state;
    return (
      <div className={className}>
        <Select
          name="userSort"
          onChange={() => this.selectUser()}
        >
          <option key="all" value="all">All team members</option>
          {teamMembers && teamMembers.length > 0 ? teamMembers.map(user => (
            <option key={user._id} value={user._id}>{user.username}</option>
          )) : null}
        </Select>
        {this.renderDiscussions()}
      </div>);
  }
}

TeamDiscussionListView.propTypes = {
  discussions: PropTypes.arrayOf(PropTypes.object),
  teamMembers: PropTypes.arrayOf(PropTypes.object),
};

TeamDiscussionListView.defaultProps = {
  discussions: undefined,
  teamMembers: undefined,
};

export default styled(TeamDiscussionListView)`
width: 100%;
padding-top: 20px;
@media(max-width: 950px) {
  margin: 20px auto;
  width: 100%;
}
`;
