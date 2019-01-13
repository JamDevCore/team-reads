import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { _ } from 'underscore';
import { openAlert } from 'simple-react-alert';
import api from '../modules/api-call';
import theme from '../theme';
import Panel from '../components/_common/Panel';
import Button from '../components/_common/Button';
import BannerMessage from '../components/_common/BannerMessage';
import UpdateTeamNameForm from '../components/forms/UpdateTeamNameForm';
import FindUserForm from '../components/forms/FindUserForm';
import TeamMembers from '../components/TeamMembers';


class TeamSettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSearchList: [],
      isSendingRequest: false,
      isAcceptingUser: false,
      isDecliningUser: false,
    };

    this.acceptJoinRequest = this.acceptJoinRequest.bind(this);
    this.declineJoinRequest = this.declineJoinRequest.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  setSearchResults(users) {
    const { teamMembers } = this.props;
    console.log(teamMembers);
    const teamIds = _.pluck(teamMembers, '_id');
    const userSearch = users.filter(user => !_.contains(teamIds, user._id) && user._id);
    this.setState({
      userSearchList: userSearch,
    });
  }

  resetSearchResults() {
    this.setState({
      userSearchList: [],
    });
  }

  sendRequest(userId) {
    console.log(userId);
    const { teamId, updateTeamMembers } = this.props;
    this.setState({ isSendingRequest: userId });
    api.put(`team/${teamId}`, {
      sendInvitation: userId,
    })
      .then((res) => {
        console.log(res);
        openAlert({ message: 'Your invite has been sent', type: 'info' });
        this.setState({ isSendingRequest: false });
        api.get(`user/${userId}`)
          .then((response) => {
            const { user } = response.data;
            updateTeamMembers(user, true);
            this.resetSearchResults();
          })
          .catch(err => console.log(err));
      })
      .catch((err) => {
        openAlert({ message: `Error: ${err}`, type: 'danger' });
        this.setState({ isSendingRequest: false });
      });
  }

  declineJoinRequest(userId) {
    const { teamId, removeJoinRequests } = this.props;
    console.log(userId, teamId);
    this.setState({ isDecliningUser: userId });
    api.put(`team/${teamId}`, {
      declineRequest: userId,
    })
      .then(() => {
        this.setState({ isDecliningUser: false });
        openAlert({ message: 'This request has been declined', type: 'success' });
        const user = { _id: userId };
        removeJoinRequests(userId);
      })
      .catch((err) => {
        this.setState({ isDecliningUser: false });
        openAlert({ message: `Error: ${err}`, type: 'danger' });
      });
  }

  acceptJoinRequest(userId) {
    const { teamId, updateTeamMembers, removeJoinRequests } = this.props;
    console.log(userId, teamId);
    this.setState({ isAcceptingUser: userId });
    api.put(`team/${teamId}`, {
      newUser: userId,
    })
      .then(() => {
        this.setState({ isAcceptingUser: false });
        openAlert({ message: 'This request has been accepted', type: 'success' });
        api.get(`user/${userId}`)
          .then((response) => {
            const { user  }= response.data;
            updateTeamMembers(user, true);
            removeJoinRequests(userId);
          })
          .catch(err => console.log(err));
      })
      .catch((err) => {
        this.setState({ isAcceptingUser: false });
        openAlert({ message: `Error: ${err}`, type: 'danger' });
      });
  }

  render() {
    const {
      className,
      userId,
      teamId,
      teamName,
      joinRequests,
      teamMembers,
      updateTeamMembers,
      updateTeamName,
    } = this.props;
    const {
      isAcceptingUser, isDecliningUser, userSearchList, isSendingRequest,
    } = this.state;
    console.log(teamId);
    return (
      <div className={className}>
        {joinRequests && joinRequests.length > 0
          ? joinRequests.map(user => (
            <BannerMessage
              key={user && user._id}
              isAlert
              meta={user && user._id}
              actionLoading={user && isAcceptingUser === user._id}
              closeLoading={user && isDecliningUser === user._id}
              action={this.acceptJoinRequest}
              closeAction={this.declineJoinRequest}
              actionLabel="Accept invite"
              closeLabel="Decline"
              message={user && `${user.email} has requested to join your team`}
            />))
          : null}
        <Panel>
          <UpdateTeamNameForm
            key={teamName}
            userId={userId}
            teamId={teamId}
            teamName={teamName}
            updateTeamName={updateTeamName}
          />
        </Panel>
        <Panel>
          <TeamMembers
            key={teamName}
            userId={userId}
            teamId={teamId}
            teamName={teamName}
            teamMembersId={teamMembers}
            teamMembers={teamMembers}
            updateTeamMembers={updateTeamMembers}
          />
        </Panel>
        <Panel>
          <FindUserForm
            teamId={teamId}
            setSearchResults={this.setSearchResults}
          />
          {userSearchList && userSearchList.length > 0 ? (
            <React.Fragment>
              <ul className="userSearchList">
                {userSearchList.map(user => (
                  <li
                    key={user}
                    className="userSearchItem"
                  >
                    <div className="userDetails">
                      <p className="name">{user.username}</p>
                      <p>{user.email}</p>
                    </div>
                    <div className="actions">
                      <Button
                        theme="link"
                        icon="fas fa-user-plus"
                        isLoading={isSendingRequest === user._id}
                        onClick={() => this.sendRequest(user._id)}
                      />
                    </div>
                  </li>))}
              </ul>
            </React.Fragment>) : null}
        </Panel>
      </div>
    );
  }
}

TeamSettingsView.propTypes = {
  className: PropTypes.string,
  joinRequests: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.object),
  updateTeamMembers: PropTypes.func,
  updateTeamName: PropTypes.func,
  removeJoinRequests: PropTypes.func,
};

TeamSettingsView.defaultProps = {
  className: undefined,
  joinRequests: undefined,
  userId: undefined,
  teamId: undefined,
  teamName: undefined,
  teamMembers: undefined,
  updateTeamMembers: undefined,
  updateTeamName: undefined,
  removeJoinRequests: undefined,
};

export default styled(TeamSettingsView)`
width: 95%;
padding-top: 40px;
h2 {
  margin: 20px 0px;
}
@media(max-width: 950px) {
  margin: 20px auto;
  width: 100%;
}
@media(max-width: 450px) {
  .userSearchItem {
    flex-direction: column;
    .actions {
    button {
      float: left;
      margin: 0;
      }
    }
  }
}
h3 {
  margin: 20px 20px;
}
.userSearchList {
  display: column;
  margin-top: ${theme.baseMargin * 3};
  padding: 10px 0;
  list-style-type: none;
}
.userSearchItem {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid ${theme.colors.black};
}
.actions {
  flex-grow: 2;
  padding: 5px;
  button {
    float: right;
    margin: 10px;
  }
}
.userDetails {
  flex-grow: 5;
  max-width: 60%;
  padding: 5px;
  .name {
    font-weight: bold;
    margin-bottom: 0;
    padding: 0;
  }
  height: 100%;
  display: flex;
  flex-direction: column;
}
`;
