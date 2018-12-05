import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { openAlert } from 'simple-react-alert';
import 'react-table/react-table.css';
import styled from 'styled-components';
import Loading from './Loading';
import DangerButton from './_common/DangerButton';
import api from '../modules/api-call';

class TeamMembers extends React.Component {
  constructor() {
    super();
    this.state = {
      teamMembers: [],
      isRemovingUser: false,
      loadingUsers: false,
    }
  }

  componentDidMount() {
    const { teamId } = this.props;
    if (teamId) {
      this.setState({
        loadingUsers: true,
      })
        api.get(`user?teamId=${teamId}`)
        .then((res) => {
          const users = res.data.data;
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
  removeUserFromTeam(userId) {
    const { teamId } = this.props;
    const { teamMembers } = this.state;
    this.setState({ isRemovingUser: userId })
    api.put(`team/${teamId}`, {
      removeUser: userId,
    })
    .then(() => {
      const newTeamMembers = teamMembers.filter(user => user._id !== userId);
      this.setState({
        isRemovingUser: false,
        teamMembers: newTeamMembers,
      });
      openAlert({ message: "The user has been removed from your team", type: "success" });
    })
    .catch(err => {
      this.setState({
      isRemovingUser: false,
    });
      console.log(err)
      openAlert({ message: `Error: ${err}`});
    });
  }

  columns() {
    const { userId } = this.props;
    const { isRemovingUser } = this.state;
    return [{
    Header: 'Name',
    accessor: 'username'
  }, {
    Header: 'Email',
    accessor: 'email',
  }, {
    Header: 'Role',
    accessor: 'role',
  }, {
    Header: 'Delete user',
    accessor: '_id',
    Cell: props => {
      console.log(props.value, userId)
      return (
    <DangerButton
      label={userId === props.value ? "Leave team" : "Remove user"}
      isLoading={isRemovingUser === props.value}
      onClick={() => this.removeUserFromTeam(props.value)}
      />)
    }
  }];
}

  render() {
    const { teamMembers, loadingUsers } = this.state;
    const { className } = this.props;
    const columns = this.columns()
    console.log(teamMembers)
    return (
      <div className={className}>
        <h1>Team members</h1>
        {!loadingUsers ? <ReactTable
          key={teamMembers.length}
          className="table -striped"
          data={teamMembers}
          columns={columns}
          defaultPageSize={5}
        /> : <Loading />}
      </div>
    );
  }
}

TeamMembers.propTypes = {
  teamId: PropTypes.string,
  userId: PropTypes.string,
};

TeamMembers.defaultProps = {
  teamId: undefined,
  userId: undefined,
};

export default styled(TeamMembers)`
.table {
  font-size: 16px;
  font-weight: 600;
}
`;
