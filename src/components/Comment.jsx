import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import api from '../modules/api-call';
import Panel from '../components/_common/Panel';
import ButtonGroup from '../components/_common/ButtonGroup';
import Chip from '../components/_common/Chip';
import HighlightButton from '../components/_common/HighlightButton';
import IconButton from '../components/_common/IconButton';
import Loading from '../components/Loading';
import AddCommentForm from '../components/forms/AddCommentForm';
import theme from '../theme';


const Edit = styled.div`
width: 100%;
height: 25px;
position: absolute;
top: 0;
left: 0;
background-color: ${theme.colors.grey}
button {
  cursor: pointer;
  float: right;
  margin: 0px 5px;
  color: ${theme.colors.black};
  background: transparent;
  border: none;
  padding: 3px;
  i {
    font-size: 16px;
  }
}
`

class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      username: undefined,
      isLoading: false,
      editing: false,
    }
    this.toggleEditState = this.toggleEditState.bind(this);
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

  toggleEditState() {
    const { editing } = this.state;
    this.setState({
      editing: !editing,
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
        toggleEditState={this.toggleEditState}
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
      </React.Fragment>
    )
  }
  render() {
    const{ userId, className, ownerId } = this.props;
    const { username, isLoading } = this.state;
    return (
      <Panel key={userId} className={className}>
        {userId === ownerId &&
        <Edit>
          <button
            onClick={() => this.deleteComment()}
            >
            {!isLoading && <i className="fas fa-times" />}
            {isLoading && <i className="fas fa-spinner fa-spin" />}
          </button>
          <button

            onClick={() => this.toggleEditState()}
            >
            <i className="fas fa-pen" />
          </button>
        </Edit>}
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
padding-top: 50px;
position: relative;
.header {
  display: flex;
}
`;
