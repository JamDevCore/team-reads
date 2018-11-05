import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Panel from '../components/_common/Panel';
import Divider from '../components/_common/Divider';
import ButtonGroup from '../components/_common/ButtonGroup';
import Button from '../components/_common/Button';
import HighlightButton from '../components/_common/HighlightButton';
import Select from '../components/_common/form-components/Select';
import CreateDiscussionForm from '../components/forms/CreateDiscussionForm';


const comments = [
  1: {
    user: 'James',
  }
]

const AmazonLink = styled.a`
  text-decoration: underline;
  display: block;
  text-align: center;
  margin-top: 20px;
`;

class CreateDiscussionView extends React.Component {
constructor() {
  super();
  this.state = {
    bookTitle: undefined,
    author: undefined,
    readBy: ['James', 'Grant', 'Ralph'],
    personalStatus: undefined,
  }
}
  render() {
    const { className } = this.props;
    const { bookTitle, author, readBy, personalStatus } = this.state;
    return (
      <div className={className}>
        <div className="left">
        <Panel>
          <h2>{bookTitle || 'The Lean Startup'}</h2>
          <p>{author || 'Eric Reis'}</p>
          <Divider />
          <h3>Read by</h3>
          <div>
          {readBy.length > 0 ? readBy.map(reader => <li style={{display:'inline-block'}}>{reader}</li>) : null}
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
        </div>
      </div>
    );
  }
}

CreateDiscussionView.propTypes = {
  className: PropTypes.string,
};

CreateDiscussionView.defaultProps = {
  className: undefined,
};

export default styled(CreateDiscussionView)`
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 100%;
li {
  margin-right: 10px;
}
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
  margin: 40px auto;
}
@media(max-width: 1000px) {
  .right {
    margin: 30px auto;
    width: 100%;
  }
  .left {
    width: 500px;
    min-width: 300px;
    margin: 40px auto;
  }
}
`;
