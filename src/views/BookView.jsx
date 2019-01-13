import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { openAlert } from 'simple-react-alert';
import history from '../modules/history';
import api from '../modules/api-call';
import handleDeleteBook from '../modules/handle-delete-book';
import Panel from '../components/_common/Panel';
import Divider from '../components/_common/Divider';
import ButtonGroup from '../components/_common/ButtonGroup';
import Button from '../components/_common/Button';
import NoResults from '../components/_common/NoResults';
import Select from '../components/_common/form-components/Select';
import Icon from '../components/_common/Icon';
import Card from '../components/Card';
import Fallback from './Fallback';
import theme from '../theme';

class BookView extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        isLoading: false,
        isDeleting: false,
      }
  }

  deleteBook() {
    const { bookId, userId } = this.props
    this.setState({
      isDeleting: true,
    })
    handleDeleteBook({ bookId, userId })
    .then(() => {
      this.setState({ isDeleting: false });
      openAlert({ message: "Success! Your book has been removed", type: "success" });
      history.push('/')
    })
    .catch((err) => {
      this.setState({ isDeleting: false })
      openAlert({ message: `Error: ${err}` });
      history.push('/')
    });
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

  renderDiscussions() {
    const { discussions, bookId } = this.props;
    console.log(discussions)
    return discussions.length > 0 ? discussions.map(d => (
      <Card
        key={d._id}
        owner={d.username}
        title={d.title || 'Untitled'}
        readers={d.readers}
        lightbulbs={d.lightbulbs}
        isDiscussion
        contributions={d.comments.length}
        link={`/book/${bookId}/discussion/${d._id}`}
      />)) : <NoResults isDiscussion />;
  }

  render() {
    const { className, bookTitle, author, bookId, ownerId, userId  } = this.props;
    console.log(ownerId, userId)
    const { isLoading, isDeleting } = this.state;
    return (
      <div className={className}>
        {bookId ? (
          <React.Fragment>
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
                    label="Delete book"
                    isLoading={isDeleting}
                    onClick={() => this.deleteBook()}
                  />)}
                </ButtonGroup>
                <Button
                  theme="link"
                  status="secondary"
                  isFullWidth
                  link="http://www.amazon.co.uk"
                  icon="fab fa-amazon"
                  label="Get this on amazon"
                />

              </Panel>
            </div>
            <div className="right">
              {this.renderDiscussions()}
            </div>
          </React.Fragment>) : <Fallback />}
      </div>);
  }
}

BookView.propTypes = {
  userId: PropTypes.string,
  ownerId: PropTypes.string,
  bookId: PropTypes.string,
  discussions: PropTypes.arrayOf(PropTypes.object),
  bookTitle: PropTypes.string,
  author: PropTypes.string,
  personalStatus: PropTypes.string,
  username: PropTypes.string,
};

BookView.defaultProps = {
  userId: undefined,
  ownerId: undefined,
  bookId: undefined,
  discussions: undefined,
  bookTitle: undefined,
  author: undefined,
  personalStatus: undefined,
  username: undefined,
};

export default styled(BookView)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  h3 {
    margin: 20px;
  }
  h4{
    margin: 20px;
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
    margin: 40px auto;
    margin-left: 500px;
  }
  @media(max-width: 1124px) {
    .right {
      margin: 20px auto;
      width: 100%;

    }
    .left {
      position: relative;
      width: 100%;
      margin: 40px 0px auto;
    }
  }
  li {
    margin-right: 10px;
  }
`;
