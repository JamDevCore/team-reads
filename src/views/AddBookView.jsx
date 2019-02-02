import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreateBookForm from '../components/forms/CreateBookForm';
import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';
import NoResults from '../components/_common/NoResults';
import Panel from '../components/_common/Panel';
import Callback from '../components/Callback';
import Divider from '../components/_common/Divider';
import theme from '../theme';
import api from '../modules/api-call';

class AddBookView extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    }
  }

  render() {
    const { className, userId, addBookToState  } = this.props;
    return (
      <div className={className}>

        <div className="container">
        <CreateBookForm
          userId={userId}
          addBookToState={addBookToState}
          />
      </div>
      </div>
    );
  }
}

AddBookView.propTypes = {
  className: PropTypes.string,
  userId: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.object),
  addBookToState: PropTypes.func,
};

AddBookView.defaultProps = {
  className: undefined,
  userId: undefined,
  books: undefined,
  addBookToState: undefined,
};

export default styled(AddBookView)`
  margin: 80px 10px;
  .container{
    max-width: 500px;
    margin: 40px auto;
}
  h1 {
    text-align: left;

  }
`;
