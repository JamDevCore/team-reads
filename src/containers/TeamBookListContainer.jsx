import React from 'react';
import PropTypes from 'prop-types';
import TeamBookList from '../views/TeamBookList';
import Callback from '../components/Callback';
import api from '../modules/api-call';
import { ascending } from '../modules/sort-by-date';

class TeamBookListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoading: true,
      teamMembers: [],
    }
  }

  componentDidMount() {
    const { teamId, teamMembers } = this.props;
    console.log(teamId)
    if (teamId) {
    api.get(`book?teamId=${teamId}`)
    .then((res) => {
      this.setState({
        books: ascending(res.data.data),
        isLoading: false,
      });
    })
    .catch(err => {
      console.log(err)
      this.setState({
        isLoading: false,
      })
    })
    }
    if (teamId) {
      this.setState({
        loadingUsers: true,
      })
        api.get(`user?teamId=${teamId}`)
        .then((res) => {
          const users = res.data.data;
          console.log(res)
          this.setState({
            teamMembers: users,
            loadingUsers: false,
          });
        })
        .catch(err => {
          this.setState({
            loadingUsers: false,
          })
          console.log(err)
        })
    }
  }

  render() {
    const {
      isLoading,
      books,
    } = this.state;
    const { userId, teamId } = this.props;
    const { teamMembers } = this.state;
    return isLoading ? <Callback /> :
    <TeamBookList
      userId={userId}
      books={books}
      teamId={teamId}
      teamMembers={teamMembers}
    />
  }
}

TeamBookListContainer.propTypes = {
  teamId: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.string),
};

TeamBookListContainer.defaultProps = {
  teamId: undefined,
  teamMembers: undefined,
};

export default TeamBookListContainer;
