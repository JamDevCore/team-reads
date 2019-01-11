import React from 'react';
import PropTypes from 'prop-types';
import { openAlert } from 'simple-react-alert';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../modules/api-call';
import history from '../modules/history';
import Panel from '../components/_common/Panel';
import Divider from '../components/_common/Divider';
import ButtonGroup from '../components/_common/ButtonGroup';
import Button from '../components/_common/Button';
import Select from '../components/_common/form-components/Select';
import Comment from '../components/Comment';
import CreateDiscussionForm from '../components/forms/CreateDiscussionForm';
import AddCommentForm from '../components/forms/AddCommentForm';


const AmazonLink = styled.a`
  text-decoration: underline;
  display: block;
  text-align: center;
  margin-top: 20px;
`;

class DiscussionView extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isDeleting: false,
    };
  }

  addNote() {
    const {
      bookId, userId, username, bookTitle, updateDiscussionId,
    } = this.props;
    this.setState({
      isLoading: true,
    });
    api.post('discussion', {
      userId,
      username,
      bookId,
      bookTitle,
    })
      .then((res) => {
        this.setState({ isLoading: false });
        const discussion = res.data;
        updateDiscussionId({ discussionId: discussion._id });
        history.replace(`/book/${bookId}/discussion/${discussion._id}`);
        console.log(res);
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        console.log(err);
      })
  }

  deleteDiscussion() {
    const { discussionId, bookId } = this.props;
    this.setState({ isDeleting: true });
    api.delete(`discussion/${discussionId}`)
      .then((res) => {
        openAlert({ message: 'The discussion has been deleted', type: 'success' });
        console.log(res)
        const book = res.data;
        this.setState({ isDeleting: false });
        history.push(`/book/${bookId}`);
      })
      .catch((err) => {
        this.setState({ isDeleting: false });
        openAlert({ message: `Error: ${err}`, type: 'danger' });
      });
  }


  renderContributorView() {
    const { title, note } = this.props;
    return (
      <React.Fragment>
        <h3>Highlight</h3>
        <p className="highlight">{title || "Untitled"}</p>
        <h3>Note</h3>
        <p className="note">{note || "No note has been added"}</p>
      </React.Fragment>
    )
  }

  renderEditorView() {
    const {
      updateDiscussion, discussionId, title, note,
    } = this.props;
    return (
      <CreateDiscussionForm
        discussionId={discussionId}
        title={title}
        note={note}
        updateDiscussion={updateDiscussion}
      />
    )
  }

  render() {
    const {
      className,
      bookTitle,
      author,
      comments,
      title,
      note,
      bookId,
      userId,
      ownerId,
      discussionId,
      updateComments,
      removeComments,
    } = this.props;
    const { isDeleting, isLoading } = this.state;
    console.log(comments)
    return (
      <div className={className}>
        <div className="left">
          <Panel>
            <Link to={`/book/${bookId}`}><h3>{bookTitle}</h3></Link>
            <h4>{author}</h4>
            <ButtonGroup>
              <Button
                label="Start new discussion"
                isLoading={isLoading}
                onClick={() => this.addNote()}
              />
              {ownerId === userId && (
                <Button
                  status="secondary"
                  theme="danger"
                  label="Delete discussion"
                  isLoading={isDeleting}
                  onClick={() => this.deleteDiscussion()}
                />)}
            </ButtonGroup>
            <Button
              status="secondary"
              isFullWidth
              theme="link"
              link="http://www.amazon.co.uk"
              icon="fab fa-amazon"
              label="Get this on amazon"
            />
          </Panel>
        </div>
        <div className="right">
          <Panel>
            {userId === ownerId ? this.renderEditorView() : this.renderContributorView()}
          </Panel>
          {comments && comments.length > 0
            ? comments.map(comment => (
              <Comment
                key={comment._id}
                userId={userId}
                ownerId={comment.userId}
                discussionId={discussionId}
                text={comment.text}
                commentId={comment._id}
                updateComments={updateComments}
                comments={comments}
                removeComments={removeComments}
              />)) : null}
          {title && (
            <Panel>
              <AddCommentForm
                userId={userId}
                discussionId={discussionId}
                comments={comments}
                updateComments={updateComments}
              />
            </Panel>)}
        </div>
      </div>
    );
  }
}

DiscussionView.propTypes = {
  updateDiscussionId: PropTypes.func,
  className: PropTypes.string,
  userId: PropTypes.string,
  ownerId: PropTypes.string,
  discussionId: PropTypes.string,
  bookId: PropTypes.string,
  bookTitle: PropTypes.string,
  author: PropTypes.string,
  readBy: PropTypes.arrayOf(PropTypes.string),
  comments: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  note: PropTypes.string,
  updateDiscussion: PropTypes.func,
  updateComments: PropTypes.func,
  removeComments: PropTypes.func,
};

DiscussionView.defaultProps = {
  updateDiscussionId: undefined,
  className: undefined,
  userId: undefined,
  ownerId: undefined,
  discussionId: undefined,
  bookId: undefined,
  bookTitle: undefined,
  author: undefined,
  readBy: undefined,
  comments: undefined,
  title: undefined,
  note: undefined,
  updateDiscussion: undefined,
  updateComments: undefined,
  removeComments: undefined,
};

export default styled(DiscussionView)`
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 100%;

.highlight {
  font-style: italic;
}
li {
  margin-right: 10px;
}
.left {
  position: fixed;
  margin: 40px auto;
  margin-left: 30px;
  width: 480px;
  min-width: 300px;
    select {
      margin-left: 0 !important;
    }
}
.right {
  box-sizing: border-box;
  width: 60%;
  position: relative;
  margin: 40px auto;
  margin-left: 500px;
  .lightbulbs {
    display: inline-block !important;
    margin-left: 10px;
    font-size: 16px;
    font-family: 'Nunito';
  }
}
@media(max-width: 1124px) {
  .right {
    margin: 30px auto;
    width: 100%;
  }
  .left {
    width: 100%;
    margin: 40px 0px auto;
    position: relative;
  }
}
`;
