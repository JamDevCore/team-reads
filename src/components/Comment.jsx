import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import api from '../modules/api-call';
import Panel from '../components/_common/Panel';
import Button from '../components/_common/Button';
import LinkButton from '../components/_common/LinkButton';


class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      username: undefined,
    }
  }
  componentDidMount() {
    const { ownerId } = this.props;
    api.get(`user/${ownerId}`)
      .then(res => {
        this.setState({ username: res.data.username })
      })
      .catch(err => console.log(err));
  }
  render() {
    const{ userId, ownerId, text, lightbulbs, className } = this.props;
    const { username } = this.state;
    return (
      <Panel key={userId} className={className}>
        <h3>{`User: ${username || "Anonymous"}`}</h3>
          {userId === ownerId &&
          <div className="editButton">
            <LinkButton
              label="Edit"
            />
          </div>}
        <p>{text}</p>

      </Panel>
    );
  }
}

Comment.propTypes = {
  className: PropTypes.string,
  commentId: PropTypes.string,
  ownerId: PropTypes.string,
  userId: PropTypes.string,
  text: PropTypes.string,
};

Comment.defaultProps = {
  className: undefined,
  commentId: undefined,
  userId: undefined,
  ownerId: undefined,
  text: undefined,
};

export default styled(Comment)`
h3 {
  display: inline-block;
}
.editButton {
  display: inline-block;
  width: auto;
}
`;
