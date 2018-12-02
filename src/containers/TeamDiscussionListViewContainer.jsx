import React from 'react';
import PropTypes from 'prop-types';
import TeamDiscussionListView from '../views/TeamDiscussionListView';
import Callback from '../components/Callback';
import api from '../modules/api-call';
import { ascending } from '../modules/sort-by-date';

class TeamDiscussionListViewContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      discussions: [],
      isLoading: true,
      teamMembers: [],
    }
  }
  componentDidMount() {
    const { teamId } = this.props;
    api.get(`discussion?teamId=${teamId}`)
    .then((res) => {
      console.log(res);
      const discussions = res.data.data;
      this.setState({
        discussions: ascending(discussions),
      }, this.setState({
        isLoading: false,
      }));
    })
    .catch(err => {
      this.setState({
        isLoading: false,
      })
      console.log(err)
    });
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
  render() {
    const {
      isLoading,
      discussions,
      teamMembers,
    } = this.state;
    console.log(discussions)
    return isLoading && !discussions.length > 0 ? <Callback /> :
    <TeamDiscussionListView
      key={discussions.length}
      discussions={discussions}
      teamMembers={teamMembers}
    />
  }
}

TeamDiscussionListViewContainer.propTypes = {
  userId: PropTypes.string,
  username: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.string)
};

TeamDiscussionListViewContainer.defaultProps = {
  userId: undefined,
  username: undefined,
  teamMembers: undefined,
};


export default TeamDiscussionListViewContainer;
