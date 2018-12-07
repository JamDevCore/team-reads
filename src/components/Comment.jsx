import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import api from '../modules/api-call';
import Panel from '../components/_common/Panel';
import ButtonGroup from '../components/_common/ButtonGroup';
import Chip from '../components/_common/Chip';
import HighlightButton from '../components/_common/HighlightButton';
import DangerButton from '../components/_common/DangerButton';
import Loading from '../components/Loading';
import AddCommentForm from '../components/forms/AddCommentForm';
import theme from '../theme';


class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      username: undefined,
      isLoading: false,
      editing: false,
    }
    this.setEditState = this.setEditState.bind(this);
  }

  componentDidMount() {
    const { ownerId } = this.props;
    this.setState({ isLoading: true });
    api.get(`user/${ownerId}`)
      .then(res => {
        this.setState({ username: res.data.username, isLoading: false })
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }

  deleteComment() {
    const { commentId, comments, discussionId, removeComments } = this.props;
    this.setState({
      isLoading: true,
    })
    api.delete(`comment/${commentId}`)
    .then((res) => {
      const newCommentArray = comments.filter(comment => comment._id !== commentId);
      this.setState({ isLoading: false })
      api.put(`discussion/${discussionId}`, {
        comments: newCommentArray,
      })
        .then(() => {
          console.log("success")
          removeComments(commentId);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      this.setState({ isLoading: false })
      console.log(err)
    })
  }

  setEditState(editing) {
    this.setState({
      editing,
    });
  }
  setLoading(isLoading) {
    this.setState({
      isLoading,
    })
  }

  renderEditCommentForm() {
    const  { discussionId, text, userId, commentId, updateComments } = this.props;
    return (
      <AddCommentForm
        userId={userId}
        text={text}
        discussionId={discussionId}
        setEditState={this.setEditState}
        commentId={commentId}
        updateComments={updateComments}
      />
    )
  }

  renderComment() {
    const { userId, ownerId, text } = this.props;
    const { username, editing, isLoading } = this.state;
    return (
      <React.Fragment>
        <div className="header">
          <h6>{username}</h6>
          </div>
          {editing ? this.renderEditCommentForm() : <p>{text}</p>}
          {userId === ownerId &&
            <ButtonGroup>
              <HighlightButton
                label="Edit"
                onClick={() => this.setEditState(true)}
              />
            <DangerButton
                label="Delete"
                isLoading={isLoading}
                onClick={() => this.deleteComment()}
              />
          </ButtonGroup>}
      </React.Fragment>
    )
  }
  render() {
    const{ userId, className } = this.props;
    const { username } = this.state;
    return (
      <Panel key={userId} className={className}>
        {username  ? this.renderComment() : <Loading />}
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
  discussionId: PropTypes.string,
  updateComments: PropTypes.func,
  comments: PropTypes.arrayOf(PropTypes.object),
  removeComments: PropTypes.func,
};

Comment.defaultProps = {
  className: undefined,
  commentId: undefined,
  userId: undefined,
  ownerId: undefined,
  text: undefined,
  discussionId: undefined,
  updateComments: undefined,
  comments: undefined,
  removeComments: undefined
};

export default styled(Comment)`
padding: 30px;
position: relative;
.header {
  display: flex;
}
`;
