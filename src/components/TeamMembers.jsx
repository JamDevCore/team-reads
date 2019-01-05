import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { openAlert } from 'simple-react-alert';
import history from '../modules/history';
import 'react-table/react-table.css';
import styled from 'styled-components';
import Button from './_common/Button';
import api from '../modules/api-call';

class TeamMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRemovingUser: false,
      isCancellingInvite: false,
    }
  }

  removeUserFromTeam(userId) {
    const { teamId, removeTeamMember, teamMembers } = this.props;
    this.setState({ isRemovingUser: userId });
    api.put(`team/${teamId}`, {
      removeUser: userId,
    })
      .then(() => {
        const newTeamMembers = teamMembers.filter(user => user._id !== userId);
        this.setState({
          isRemovingUser: false,
          teamMembers: newTeamMembers,
        });
        openAlert({ message: 'The user has been removed from your team', type: 'success' });
        removeTeamMember(userId);
      })
      .catch((err) => {
        this.setState({
          isRemovingUser: false,
        });
        console.log(err);
        openAlert({ message: `Error: ${err}` });
      });
  }

  cancelPendingInvite(userId) {
    const { teamId, removeTeamMember, teamMembers } = this.props;
    this.setState({ isCancellingInvite: userId });
    api.put(`team/${teamId}`, {
      cancelInvitation: userId,
    })
      .then(() => {
        const newTeamMembers = teamMembers.filter(user => user._id !== userId);
        this.setState({
          isCancellingInvite: false,
          teamMembers: newTeamMembers,
        });
        openAlert({ message: 'This invite has been cancelled', type: 'success' });
        removeTeamMember(userId)
      })
      .catch((err) => {
        this.setState({
          isCancellingInvite: false,
        });
        console.log(err)
        openAlert({ message: `Error: ${err}`});
      });
  }

  columns() {
    const { userId, teamId } = this.props;
    const { isRemovingUser, isCancellingInvite } = this.state;
    return [{
      Header: 'Name',
      accessor: 'username',
      Cell: (props) => {
        const isPending = props.original.teams[0] !== teamId;
        return isPending ? <p><span style={{fontStyle: 'italic'}}>Pending</span>: {props.value}</p> : <p>{props.value}</p>
      }
    }, {
      Header: 'Email',
      accessor: 'email',
      Cell: (props) => {
        return <p>{props.value}</p>
      }
    }, {
      Header: 'Role',
      accessor: 'role',
      Cell: props => <p>{props.value}</p>,
    }, {
      Header: 'Delete user',
      accessor: '_id',
      Cell: (props) => {
        console.log(props)
        const isPending = props.original.teams[0] !== teamId;
        return isPending ? (
          <Button
            theme="danger"
            label={"Cancel invitation"}
            isLoading={isCancellingInvite === props.value}
            onClick={() => this.cancelPendingInvite(props.value)}/>)
          : (
            <Button
              theme="danger"
              label={userId === props.value ? "Leave team" : "Remove user"}
              isLoading={isRemovingUser === props.value}
              onClick={() => this.removeUserFromTeam(props.value)}
            />)
      }
    }];
}

  render() {
    const { className, teamMembers } = this.props;
    const columns = this.columns()
    console.log(teamMembers)
    return (
      <div className={className}>
        <h2>Team members</h2>
        {<ReactTable
          key={teamMembers.length}
          className="table -striped"
          data={teamMembers}
          columns={columns}
          minRows={0}
          defaultPageSize={5}
          showPagination={false}
          showPaginationBottom={false}
          showPageSizeOptions={false}
        />}
      </div>
    );
  }
}

TeamMembers.propTypes = {
  teamId: PropTypes.string,
  userId: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.object),
  removeTeamMember: PropTypes.func,
};

TeamMembers.defaultProps = {
  teamId: undefined,
  userId: undefined,
  teamMembers: undefined,
  removeTeamMember: undefined,
};

export default styled(TeamMembers)`
p {
  font-weight: 500;
}
button {
  margin: auto 10px !important;
}
`;
