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
import Loading from '../components/Loading';
import theme from '../theme';

const Container = styled.div`
  margin: 40px;
  min-width: 800px;
`;

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
      }
  }

  deleteBook() {
    this.setState({
      isLoading: true,
    })
    const { id } = this.props.match.params;
    const { userId } = this.props;
    handleDeleteBook({ bookId: id, userId })
    .then(() => {
      this.setState({ isLoading: false });
      openAlert({ message: "Success! Your book has been removed", type: "success" });
      history.push('/')
    })
    .catch((err) => {
      this.setState({ isLoading: false })
      openAlert({ message: `Error: ${err}` });
      history.push('/')
    });
  }

  renderDiscussions() {
    const { discussions, bookTitle, author, readBy } = this.props;
    return discussions.length > 0 ? discussions.map(d =>
      <Card
        key={d.title}
        title={d.title}
        readers={d.readers}
        lightbulbs={d.lightbulbs}
        comments={d.comments}
        author={d.author}
      />
    ) : <Panel><h2>No discussions on this book yet</h2></Panel>;
  }

  render() {
    const { className, bookTitle, author, readBy, bookId, discussions  } = this.props;
    const { isLoading } = this.state;
    return (
      <div className={className}>
        {bookId && discussions ?
        <React.Fragment>
            <div className="left">
              <Panel>
                <h2>{bookTitle}</h2>
                <p>{author}</p>
                <Divider />
                <h3>Read by</h3>
                <div>
                {readBy && readBy.length > 0 ? readBy.map(reader => <li key={reader} style={{display:'inline-block'}}>{reader}</li>) :
                <li style={{display:'inline-block'}}>No-one</li>}
              </div>
                <Divider />
                <Select
                  label="Recommend this book"
                >
                <option>Select a team member</option>
              </Select>
              <ButtonGroup>
                <Button
                  label="Add note"
                />
              <HighlightButton
                  label="Delete book"
                  isLoading={isLoading}
                  onClick={() => this.deleteBook()}
                />
              </ButtonGroup>
              </Panel>
              <AmazonLink href="http://www.amazon.co.uk">Purchase on Amazon</AmazonLink>
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
 discussions: PropTypes.arrayOf(PropTypes.string),
 bookTitle: PropTypes.string,
 author: PropTypes.string,
 readBy: PropTypes.arrayOf(PropTypes.string),
 personalStatus: PropTypes.string,
};

BookView.defaultProps = {
 userId: undefined,
 bookId: undefined,
 discussions: undefined,
 bookTitle: undefined,
 author: undefined,
 readBy: undefined,
 personalStatus: undefined,
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
    width: 400px;
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
  @media(max-width: 1000px) {
    .right {
      margin: 20px auto;
      width: 100%;

    }
    .left {
      width: 500px;
      min-width: 300px;
      margin: 40px auto;
    }
  }
  li {
    margin-right: 10px;
  }
`;
