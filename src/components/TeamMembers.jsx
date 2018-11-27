import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { openAlert } from 'simple-react-alert';
import 'react-table/react-table.css';
import styled from 'styled-components';
import HighlightButton from './_common/HighlightButton';
import api from '../modules/api-call';

class TeamMembers extends React.Component {
  constructor() {
    super();
    this.state = {
      teamMembers: [],
      isRemovingUser: false,
    }
  }

  componentDidMount() {
    const { teamMembersId } = this.props;
    const component = this;
    if (teamMembersId.length > 0) {
      teamMembersId.forEach(id => {
        api.get(`user/${id}`)
        .then((res) => {
          console.log(res)
          const teamMembers = component.state.teamMembers;
          console.log(teamMembers)
          teamMembers.push(res.data);
          this.setState({
            teamMembers,
          });
        })
        .catch(err => console.log(err))
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
      console.log(props)
      return (
    <HighlightButton
      label="Remove user"
      isLoading={isRemovingUser === props.value}
      onClick={() => this.removeUserFromTeam(props.value)}
      />)
    }
  }];
}

  render() {
    const { teamMembers } = this.state;
    const { className } = this.props;
    const columns = this.columns()
    console.log(teamMembers)
    return (
      <div className={className}>
        <h1>Team members</h1>
        <ReactTable
          key={teamMembers.length}
          className="table -striped"
          data={teamMembers}
          columns={columns}
          defaultPageSize={5}
        />
      </div>
    );
  }
}

TeamMembers.propTypes = {

};

TeamMembers.defaultProps = {

};

export default styled(TeamMembers)`
.table {
  font-size: 16px;
  font-weight: 600;
}
`;
