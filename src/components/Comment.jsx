import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import api from '../modules/api-call';
import Panel from '../components/_common/Panel';
import Button from '../components/_common/Button';
import IconButton from '../components/_common/IconButton';


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
        <h3>{`Written by: ${username || ""}`}</h3>
        <p>{text}</p>
        <div className="lightbulb">
            <IconButton
              icon="fas fa-lightbulb"
            />
        </div>
          <p className="lightbulbs">{lightbulbs}</p>
            {userId === ownerId &&
            <div className="editButton">
              <Button
                label="Edit"
              />
            </div>}
      </Panel>
    );
  }
}

Comment.propTypes = {
  className: PropTypes.string,
  commentId: PropTypes.string,
  ownerId: PropTypes.string,
  userId: PropTypes.string,
  lightbulbs: PropTypes.number,
  text: PropTypes.string,
};

Comment.defaultProps = {
  className: undefined,
  commentId: undefined,
  userId: undefined,
  ownerId: undefined,
  lightbulbs: undefined,
  text: undefined,
};

export default styled(Comment)`
.lightbulb {
  display: inline-block;
}
.editButton {
  float: right;
  display: inline-block;
}
`;
