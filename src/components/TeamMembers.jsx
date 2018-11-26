import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import styled from 'styled-components';
import api from '../modules/api-call';


const columns = [{
  Header: 'Name',
  accessor: 'username'
}, {
  Header: 'Email',
  accessor: 'email',
}, {
  Header: 'Role',
  accessor: 'role',
}]


class TeamMembers extends React.Component {
  constructor() {
    super();
    this.state = {
      teamMembers: [],
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

  render() {
    const { teamMembers } = this.state;
    const { className } = this.props;
    console.log(teamMembers)
    return (
      <div className={className}>
        <h1>Team members</h1>
        <ReactTable
          key={teamMembers.length}
          className="-striped"
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
`;
