import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import api from '../modules/api-call';
import Panel from '../components/_common/Panel';
import Divider from '../components/_common/Divider';
import ButtonGroup from '../components/_common/ButtonGroup';
import Button from '../components/_common/Button';
import IconButton from '../components/_common/IconButton';
import HighlightButton from '../components/_common/HighlightButton';
import Select from '../components/_common/form-components/Select';
import CreateDiscussionForm from '../components/forms/CreateDiscussionForm';
import AddCommentForm from '../components/forms/AddCommentForm';



const comments = [
  {
    user: 'James',
    lightbulbs: 1,
    text: 'Maecenas elementum nisl laoreet, tristique arcu ut, mattis urna. Etiam aliquam viverra pharetra. Suspendisse eu pretium eros, in rutrum leo. Donec sed ex porttitor, posuere felis ut, vulputate felis. Praesent porta vulputate varius. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  },
  {
    user: 'Harry',
    lightbulbs: 9,
    text: 'Phasellus accumsan feugiat nulla a malesuada. Vivamus suscipit tincidunt odio, eu euismod mi congue at. Vivamus condimentum dui at dolor ultricies pharetra.',
  },
  {
    user: 'Michelle',
    lightbulbs: 5,
    text: 'Proin semper dapibus arcu, ac porta tortor aliquam tempor. Sed id lectus sem. Quisque hendrerit elit at urna feugiat, id pharetra tortor faucibus. Nam a tellus turpis.',
  },
  {
    user: 'James',
    lightbulbs: 2,
    text: 'Maecenas elementum nisl laoreet, tristique arcu ut, mattis urna. Etiam aliquam viverra pharetra. Suspendisse eu pretium eros, in rutrum leo. Donec sed ex porttitor, posuere felis ut, vulputate felis. Praesent porta vulputate varius. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
  },
  {
    user: 'Harry',
    lightbulbs: 0,
    text: 'Phasellus accumsan feugiat nulla a malesuada. Vivamus suscipit tincidunt odio, eu euismod mi congue at. Vivamus condimentum dui at dolor ultricies pharetra.',
  },
  {
    user: 'Michelle',
    lightbulbs: 1,
    text: 'Proin semper dapibus arcu, ac porta tortor aliquam tempor. Sed id lectus sem. Quisque hendrerit elit at urna feugiat, id pharetra tortor faucibus. Nam a tellus turpis.',
  }
];

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
  }
}

componentDidMount() {

}
  render() {
    const { className, bookTitle, author, readBy, personalStatus } = this.props;
    console.log(readBy)
    return (
      <div className={className}>
        <div className="left">
        <Panel>
          <h2>{bookTitle || 'The Lean Startup'}</h2>
          <p>{author || 'Eric Reis'}</p>
          <Divider />
          <h3>Read by</h3>
          <div>
          {readBy && readBy.length > 0 ? readBy.map(reader => <li style={{display:'inline-block'}}>{reader}</li>) : null}
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
          />
        </ButtonGroup>
        </Panel>
          <AmazonLink href="http://www.amazon.co.uk">Purchase on Amazon</AmazonLink>
        </div>
        <div className="right">
          <Panel>
            <CreateDiscussionForm />

          </Panel>
          {comments && comments.length > 0 ?
          comments.map(comment =>
            <Panel>
              <h3>{comment.user}</h3>
              <p>{comment.text}</p>
                  <IconButton
                    icon="fas fa-lightbulb"
                  />
                <p className="lightbulbs">{comment.lightbulbs}</p>
                {comment.user === 'James' &&
                  <div className="editButton">
                    <Button
                      label="Edit"
                    />
                  </div>}
            </Panel>
          ) : null}
            <Panel>
              <AddCommentForm
                />
            </Panel>
        </div>
      </div>
    );
  }
}

DiscussionView.propTypes = {
  className: PropTypes.string,
  userId: PropTypes.string,
  bookId: PropTypes.string,
  bookTitle: PropTypes.string,
  author: PropTypes.string,
  readBy: PropTypes.string,
};

DiscussionView.defaultProps = {
  className: undefined,
  userId: undefined,
  bookId: undefined,
  bookTitle: undefined,
  author: undefined,
  readBy: undefined,
};

export default styled(DiscussionView)`
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 100%;
.editButton {
  float: right;
  display: inline-block;
}
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
    font-weight: bold;
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
