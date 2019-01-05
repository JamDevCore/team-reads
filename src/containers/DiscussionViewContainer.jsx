import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import DiscussionView from '../views/DiscussionView';
import Callback from '../components/Callback';
import api from '../modules/api-call';

class DiscussionViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bookId: undefined,
      discussionId: undefined,
      bookTitle: undefined,
      author: undefined,
      ownerId: undefined,
      title: undefined,
      note: undefined,
      comments: [],
    }

    this.updateDiscussion = this.updateDiscussion.bind(this);
    this.updateComments = this.updateComments.bind(this);
    this.removeComments = this.removeComments.bind(this);
  }

  componentDidMount() {
    const { discussionId, bookId } = this.props.match.params;
    // api.get(`book/${bookId}`)
    // .then((res) => {
    //   console.log(res);
    //   const book = res.data;
    //   this.setState({
    //     bookId: book._id,
    //     bookTitle: book.name,
    //     author: book.author,
    //   });
    // })
    // .catch(err => {
    //   this.setState({
    //     isLoading: false,
    //   })
    //   console.log(err)
    // })
    api.get(`discussion/${discussionId}`)
    .then((res) => {
      console.log(res);
      const discussion = res.data;
      console.log(discussion.bookId._id);
      this.setState({
        discussionId: discussion._id,
        title: discussion.title,
        note: discussion.note,
        ownerId: discussion.userId._id,
        bookId: discussion.bookId._id,
        bookTitle: discussion.bookId.name,
        author: discussion.bookId.author,
        comments: discussion.comments,
        isLoading: false,
      });
    })
    .catch((err) => {
      this.setState({
        isLoading: false,
      })
      console.log(err)
    })
    // api.get(`comment?discussionId=${discussionId}`)
    // .then((res) => {
    //   console.log(res);
    //   const comments = res.data.data;
    //   console.log(comments)
    //   this.setState({
    //     comments,
    //   }, this.setState({
    //     isLoading: false,
    //   }));
    // })
    // .catch(err => {
    //   this.setState({
    //     isLoading: false,
    //   })
    //   console.log(err)
    // })
  }

  updateDiscussion(title, note) {
    this.setState({
      title,
      note,
    });
  }

  updateComments(comment) {
    const { comments } = this.state;
    const newComments = comments.filter(com => com._id !== comment._id);
    newComments.push(comment);
    this.setState({
      comments: newComments
    })
  }

  removeComments(commentId) {
    const { comments } = this.state;
    const newComments = comments.filter(comment => comment._id !== commentId)
    this.setState({
      comments: newComments,
    })
  }

  render() {
    const {
      isLoading,
      discussions,
      bookTitle,
      discussionId,
      author,
      readBy,
      personalStatus,
      bookId,
      comments,
      title,
      note,
      ownerId,
    } = this.state;
    const { userId } = this.props;
    return isLoading ? <Callback /> :
    <DiscussionView
      key={bookId}
      ownerId={ownerId}
      updateDiscussion={this.updateDiscussion}
      updateComments={this.updateComments}
      removeComments={this.removeComments}
      discussionId={discussionId}
      title={title}
      note={note}
      comments={comments}
      userId={userId}
      bookId={bookId}
      discussions={discussions}
      bookTitle={bookTitle}
      author={author}
      readBy={readBy}
      personalStatus={personalStatus}
    />
  }
}

DiscussionViewContainer.propTypes = {
  userId: PropTypes.string,
};

DiscussionViewContainer.defaultProps = {
  userId: undefined,
};

export default DiscussionViewContainer;
