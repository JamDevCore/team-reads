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
    };
  }

  removeUserFromTeam(id, isSelf) {
    const { teamId, updateTeamMembers,userId } = this.props;
    this.setState({ isRemovingUser: id });
    api.put(`team/${teamId}`, {
      removeUser: id,
    })
      .then(() => {
        this.setState({
          isRemovingUser: false,
        });
        openAlert({ message: 'The user has been removed from your team', type: 'success' });
        if (userId === id) {
          window.location.reload();
        } else {
          updateTeamMembers(id);
        }
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
    const { teamId, updateTeamMembers } = this.props;
    this.setState({ isCancellingInvite: userId });
    api.put(`team/${teamId}`, {
      cancelInvitation: userId,
    })
      .then(() => {
        this.setState({
          isCancellingInvite: false,
        });
        openAlert({ message: 'This invite has been cancelled', type: 'success' });
        updateTeamMembers(userId);
      })
      .catch((err) => {
        this.setState({
          isCancellingInvite: false,
        });
        console.log(err);
        openAlert({ message: `Error: ${err}` });
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
        return isPending ? (
          <p>
            <span style={{ fontStyle: 'italic' }}>Pending : </span>
            {props.value}
          </p>) : <p>{props.value}</p>;
      },
    }, {
      Header: 'Email',
      accessor: 'email',
      Cell: props => <p>{props.value}</p>,
    }, {
      Header: 'Role',
      accessor: 'role',
      Cell: props => <p>{props.value}</p>,
      maxWidth: 120,
    }, {
      Header: 'Delete user',
      accessor: '_id',
      minWidth: 150,
      Cell: (props) => {
        console.log(props);
        const isPending = props.original.teams[0] !== teamId;
        return isPending ? (
          <Button
            theme="danger"
            label="Cancel invitation"
            isLoading={isCancellingInvite === props.value}
            onClick={() => this.cancelPendingInvite(props.value)}
          />)
          : (
            <Button
              theme="danger"
              label={userId === props.value ? 'Leave team' : 'Remove user'}
              isLoading={isRemovingUser === props.value}
              onClick={() => this.removeUserFromTeam(props.value)}
            />);
      },
    }];
  }

  render() {
    const { className, teamMembers } = this.props;
    const columns = this.columns()
    console.log(teamMembers);
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
  className: PropTypes.string,
  teamId: PropTypes.string,
  userId: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.object),
  updateTeamMembers: PropTypes.func,
};

TeamMembers.defaultProps = {
  className: undefined,
  teamId: undefined,
  userId: undefined,
  teamMembers: undefined,
  updateTeamMembers: undefined,
};

export default styled(TeamMembers)`
p {
  font-weight: 500;
}
button {
  float: right;
  margin-right: 15px;
}
`;
