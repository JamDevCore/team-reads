import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { openAlert } from 'simple-react-alert';
import history from '../modules/history';
import api from '../modules/api-call';
import handleDeleteBook from '../modules/handle-delete-book';
import Panel from '../components/_common/Panel';
import Divider from '../components/_common/Divider';
import ButtonGroup from '../components/_common/ButtonGroup';
import Button from '../components/_common/Button';
import DangerButton from '../components/_common/DangerButton';
import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';
import Fallback from './Fallback';
import theme from '../theme';
import PageTitle from '../components/_common/PageTitle';

const AmazonLink = styled.a`
  text-decoration: underline;
  display: block;
  text-align: center;
  margin-top: 20px;
`;

class TeamDiscussionListView extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.discussions)
      this.state = {
        isLoading: false,
        isDeleting: false,
        discussions: this.props.discussions,
        sortBy: "all",
      }
  }

  selectUser() {
    const { discussions } = this.props;
    const user = document.querySelector('[name="userSort"]').value;
    console.log(user)
    if (user === "all") {
      this.setState({ discussions });
    } else {
      const newDiscussions = discussions.filter(book => book.userId === user);
      this.setState({
        discussions: newDiscussions,
      })
    }
  }


  renderDiscussions() {
    const { discussions } = this.state;
    console.log(discussions)
    return discussions.length > 0 ? discussions.map(d =>
      <Card
        key={d._id}
        owner={d.username}
        title={d.title || 'Untitled'}
        readers={d.readers}
        lightbulbs={d.lightbulbs}
        contributions={d.comments.length}
        link={`/book/${d.bookId}/discussion/${d._id}`}
      />
  ) : <Panel><h3>No discussions here yet</h3></Panel>;
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
            {teamMembers && teamMembers.length > 0 ? teamMembers.map(user => {
              console.log(user)
              return (
              <option key={user._id} value={user._id}>{user.username}</option>
            )}): null}
          </Select>
           {this.renderDiscussions()}
    </div>)
  }
}

TeamDiscussionListView.propTypes = {
 userId: PropTypes.string,
 bookId: PropTypes.string,
 discussions: PropTypes.arrayOf(PropTypes.object),
 bookTitle: PropTypes.string,
 author: PropTypes.string,
 readBy: PropTypes.arrayOf(PropTypes.string),
 personalStatus: PropTypes.string,
 username: PropTypes.string,
 teamMembers: PropTypes.arrayOf(PropTypes.object),
};

TeamDiscussionListView.defaultProps = {
 userId: undefined,
 bookId: undefined,
 discussions: undefined,
 bookTitle: undefined,
 author: undefined,
 readBy: undefined,
 personalStatus: undefined,
 username: undefined,
 teamMembers: undefined,
};

export default styled(TeamDiscussionListView)`
width: 100%;
padding-top: 40px;
@media(max-width: 950px) {
  margin: 20px auto;
  width: 100%;
}
`;
