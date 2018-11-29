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
  }
  render() {
    const {
      isLoading,
      discussions,
    } = this.state;
    console.log(discussions)
    return isLoading && !discussions.length > 0 ? <Callback /> :
    <TeamDiscussionListView
      discussions={discussions}
    />
  }
}

TeamDiscussionListViewContainer.propTypes = {
  userId: PropTypes.string,
  username: PropTypes.string,
};

TeamDiscussionListViewContainer.defaultProps = {
  userId: undefined,
  username: undefined,
};


export default TeamDiscussionListViewContainer;
