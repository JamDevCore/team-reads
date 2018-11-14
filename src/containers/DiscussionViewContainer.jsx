import React from 'react';
import PropTypes from 'prop-types';
import DiscussionView from '../views/DiscussionView';
import Loading from '../components/Loading';
import api from '../modules/api-call';

class DiscussionViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bookId: props.match.params.bookId,
    }
  }

  componentDidMount() {
    const { discussionId, bookId } = this.props.match.params;
    api.get(`book/${bookId}`)
    .then((res) => {
      console.log(res);
      const book = res.data;
      this.setState({
        bookId: book._id,
        bookTitle: book.name,
        author: book.author,
        readBy: book.readyBy,
      });
    })
    .catch(err => {
      this.setState({
        isLoading: false,
      })
      console.log(err)
    })
    api.get(`discussion/${discussionId}`)
    .then((res) => {
      console.log(res);
      const discussion = res.data.data;
      console.log(res);
      this.setState({
        discussionId: discussion._id,
        title: discussion.title,
        note: discussion.note,
        comments: discussion.comments,
      });
    })
    .catch(err => {
      this.setState({
        isLoading: false,
      })
      console.log(err)
    })
  }
  render() {
    const {
      isLoading,
      discussions,
      bookTitle,
      author,
      readBy,
      personalStatus,
      bookId,
    } = this.state;
    const { userId } = this.props;
    return isLoading ? <Loading /> :
    <DiscussionView
      key={bookId}
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
