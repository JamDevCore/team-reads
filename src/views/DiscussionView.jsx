import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import api from '../modules/api-call';
import history from '../modules/history';
import { openAlert } from 'simple-react-alert';
import Panel from '../components/_common/Panel';
import Divider from '../components/_common/Divider';
import ButtonGroup from '../components/_common/ButtonGroup';
import Button from '../components/_common/Button';
import DangerButton from '../components/_common/DangerButton';
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
  }
}

  addNote() {
    const { bookId, userId, username, bookTitle } = this.props;
    console.log(bookId, userId, username)
    this.setState({
      isLoading: true,
    });
    api.post(`discussion`, {
      userId,
      username,
      bookId,
      bookTitle,
    })
    .then((res) => {
      this.setState({ isLoading: true });
      console.log(res);
      const discussion = res.data;
      history.push(`/book/${bookId}/discussion/${discussion._id}`);
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
      console.log(res)
      api.get(`book/${bookId}`)
      .then((res) => {
        openAlert({ message: "Success! Your discussion has been deleted", type: "info" });
        history.push(`/book/${bookId}`);
        console.log(res);
        const book = res.data;
        const discussions = book.discussions.filter(id => id !== discussionId)
        console.log(discussions);
        api.put(`book/${bookId}`, {
          discussions,
        })
        .then(() => this.setState({ isDeleting: false }))
        .catch(err => console.log(err));
      })
        .catch(err => console.log(err))
    })
    .catch((err) => {
      this.setState({ isDeleting: false });
      openAlert({ message: `Error: ${err}`, type: "danger" })
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
      const { updateDiscussion, discussionId, title, note } = this.props;
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
          <Link to={`/book/${bookId}`}><h2>{bookTitle}</h2></Link>
          <h4>{author}</h4>
          <Divider />
        <ButtonGroup>
          <Button
            label="Start new discussion"
            isLoading={isLoading}
            onClick={() => this.addNote()}
          />
        {ownerId === userId && <DangerButton
            label="Delete discussion"
            isLoading={isDeleting}
            onClick={() => this.deleteDiscussion()}
          />}
        </ButtonGroup>
        </Panel>
          <AmazonLink href="http://www.amazon.co.uk">Purchase on Amazon</AmazonLink>
        </div>
        <div className="right">
          <Panel>
            {userId === ownerId ? this.renderEditorView() : this.renderContributorView()}
          </Panel>
          {comments && comments.length > 0 ?
          comments.map(comment =>
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
            />
            ) : null}
          {title && note && <Panel>
              <AddCommentForm
                userId={userId}
                discussionId={discussionId}
                comments={comments}
                updateComments={updateComments}
              />
            </Panel>}
        </div>
      </div>
    );
  }
}

DiscussionView.propTypes = {
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
li {
  margin-right: 10px;
}
.left {
  margin: 40px auto;
  width: 450px;
  min-width: 300px;
    select {
      margin-left: 0 !important;
    }
}
.right {
  box-sizing: border-box;
  width: 60%;
  margin: 40px auto;
  .lightbulbs {
    display: inline-block !important;
    margin-left: 10px;
    font-size: 16px;
    font-family: 'Maven Pro';
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
  }
}
`;
