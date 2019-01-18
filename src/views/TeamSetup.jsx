import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { openAlert } from 'simple-react-alert';
import history from '../modules/history';
import api from '../modules/api-call'
import Panel from '../components/_common/Panel';
import BannerMessage from '../components/_common/BannerMessage';
import Button from '../components/_common/Button';
import List from '../components/_common/List';
import CreateTeamForm from '../components/forms/CreateTeamForm';
import FindTeamForm from '../components/forms/FindTeamForm';
import theme from '../theme';


class TeamSetup extends React.Component {
  constructor() {
    super();
    this.state = {
      teamSearchList: undefined,
      teamInvitations: [],
      isLoading: false,
      isAcceptingTeam: false,
      isDecliningTeam: false,
      isRequesting: false,
    }
    this.setSearchResults = this.setSearchResults.bind(this);
    this.acceptInvite = this.acceptInvite.bind(this);
    this.declineInvite = this.declineInvite.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  componentDidMount() {
    const { teamInvites } = this.props;
    const { teamInvitations } = this.state;
    if (teamInvites) {
    teamInvites.forEach((id) => {
      api.get(`team/${id}`)
      .then((res) => {
        const team = res.data;
        const invitations = teamInvitations;
        invitations.push(team);
        this.setState({
          teamInvitations: invitations,
        })
      })
      .catch(err => console.log(err));
    })
  }
  }

  acceptInvite(teamId) {
    const { userId } = this.props;
    console.log(userId, teamId)
    this.setState({ isAcceptingTeam: teamId });
    api.put(`team/${teamId}`, {
      acceptInvite: userId,
    })
    .then(() => {
      this.setState({ isAcceptingTeam: false })
      openAlert({ message: "The invitation has been accepted", type: "success" });
      history.replace(`/team/${teamId}/books`);
    })
    .catch((err) => {
      this.setState({ isAcceptingTeam: false });
      openAlert({ message: `Error: ${err}`, type: "danger" });
    })
  }

  declineInvite(teamId) {
    const { userId } = this.props;
    console.log(userId, teamId)
    this.setState({ isDecliningUser: userId });
    api.put(`team/${teamId}`, {
      declineInvitation: userId,
    })
    .then(() => {
      this.setState({ isDecliningUser: false })
      openAlert({ message: "The request has been declined", type: "info" });
    })
    .catch((err) => {
      this.setState({ isDecliningUser: false });
      openAlert({ message: `Error: ${err}`, type: "danger" });
    })
  }

  sendRequest(teamId) {
    const { userId } = this.props;
    this.setState({ isRequesting: teamId });
    api.put(`team/${teamId}`, {
      joinRequest: userId,
    })
    .then((res )=> {
      openAlert({ message: 'Your request has been sent', type: 'info' });
      this.setState({
        isRequesting: false,
        teamSearchList: undefined,
      });
    })
    .catch((err) => {
      openAlert({ message: `Error: ${err}`, type: 'danger' });
      this.setState({ isRequesting: false });
    })
  }

  setSearchResults(teams) {
    this.setState({
      teamSearchList: teams,
    })
  }
  render() {
    const { className, userId } = this.props;
    const {
      teamSearchList, isDecliningTeam, isAcceptingTeam, teamInvitations, isRequesting,
    } = this.state;
    return (
      <div className={className}>
        {teamInvitations && teamInvitations.length > 0 ?
        teamInvitations.map((team) => {
        return (
          <BannerMessage
            key={team._id}
            meta={team._id}
            isAlert
            actionLoading={isAcceptingTeam === team._id}
            closeLoading={isDecliningTeam === team._id}
            action={this.acceptInvite}
            closeAction={this.declineInvite}
            actionLabel="Accept invitation"
            closeLabel="Decline"
            message={`${team.teamName} has sent you an invitation to join their team`}
            />)})
        : null}
        <Panel>
          <h2>Create a team</h2>
          <CreateTeamForm
            userId={userId}
          />
        </Panel>
        <Panel>
          <h2>Find a team</h2>
          <FindTeamForm
            setSearchResults={this.setSearchResults}
          />
        {teamSearchList && teamSearchList.length > 0 ? (
            <React.Fragment>
              <ul className="userSearchList">
                {teamSearchList.map(team => (
                  <li
                    key={team}
                    className="userSearchItem"
                  >
                    <div className="userDetails">
                      <p className="name">{team.teamName}</p>
                      <p>{`${team.numberOfUsers} users`}</p>
                    </div>
                    <div className="actions">
                      <Button
                        theme="link"
                        icon="fas fa-user-plus"
                        isLoading={isRequesting === team._id}
                        onClick={() => this.sendRequest(team._id)}
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

TeamSetup.propTypes = {
  userId: PropTypes.string,
  teamInvites: PropTypes.arrayOf(PropTypes.string),
};

TeamSetup.defaultProps = {
  userId: undefined,
  teamInvites: undefined,
};

export default styled(TeamSetup)`
margin 40px auto;
width: 1000px;
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
