import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { openAlert } from 'simple-react-alert';
import history from '../modules/history';
import api from '../modules/api-call';
import handleDeleteBook from '../modules/handle-delete-book';
import Panel from '../components/_common/Panel';
import Divider from '../components/_common/Divider';
import ButtonGroup from '../components/_common/ButtonGroup';
import Button from '../components/_common/Button';
import HighlightButton from '../components/_common/HighlightButton';
import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';
import Fallback from './Fallback';
import theme from '../theme';

const AmazonLink = styled.a`
  text-decoration: underline;
  display: block;
  text-align: center;
  margin-top: 20px;
`;

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
    return discussions.length > 0 ? discussions.map(d =>
      <Card
        key={d._id}
        owner={d.username}
        title={d.title || 'Untitled'}
        readers={d.readers}
        lightbulbs={d.lightbulbs}
        contributions={d.comments.length}
        link={`/book/${bookId}/discussion/${d._id}`}
      />
    ) : <Panel><h2>No discussions on this book yet</h2></Panel>;
  }

  render() {
    const { className, bookTitle, author, readBy, bookId  } = this.props;
    const { isLoading, isDeleting } = this.state;
    return (
      <div className={className}>
        {bookId ?
        <React.Fragment>
            <div className="left">
              <Panel>
                <h2>{bookTitle}</h2>
                <p>{author}</p>
                <Divider />
              <ButtonGroup>
                <Button
                  label="Start new discussion"
                  isLoading={isLoading}
                  onClick={() => this.addNote()}
                />
              <HighlightButton
                  label="Delete book"
                  isLoading={isDeleting}
                  onClick={() => this.deleteBook()}
                />
              </ButtonGroup>
              </Panel>
              <AmazonLink isLoading={isLoading} href="http://www.amazon.co.uk">Purchase on Amazon</AmazonLink>
            </div>
            <div className="right">
              <Select>
                <option>All notes</option>
                <option>My notes</option>
             </Select>
             {this.renderDiscussions()}
          </div>
        </React.Fragment> : <Fallback />}
    </div>)
  }
}

BookView.propTypes = {
 userId: PropTypes.string,
 bookId: PropTypes.string,
 discussions: PropTypes.arrayOf(PropTypes.object),
 bookTitle: PropTypes.string,
 author: PropTypes.string,
 readBy: PropTypes.arrayOf(PropTypes.string),
 personalStatus: PropTypes.string,
 username: PropTypes.string,
};

BookView.defaultProps = {
 userId: undefined,
 bookId: undefined,
 discussions: undefined,
 bookTitle: undefined,
 author: undefined,
 readBy: undefined,
 personalStatus: undefined,
 username: undefined,
};

export default styled(BookView)`
h3 {
  font-size: ${theme.fontSize}px;
}
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
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
    margin: 20px auto;
  }
  @media(max-width: 1124px) {
    .right {
      margin: 20px auto;
      width: 100%;

    }
    .left {
      width: 100%;
      margin: 40px 0px auto;
    }
  }
  li {
    margin-right: 10px;
  }
`;
