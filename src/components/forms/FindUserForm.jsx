import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Field, withFormik } from 'formik';
import { openAlert } from 'simple-react-alert';
import history from '../../modules/history';
import api from '../../modules/api-call';
import Form from '../_common/form-components/Form';
import TextInput from '../_common/form-components/TextInput';
import Button from '../_common/Button';
import AlertButton from '../_common/AlertButton';
import ButtonGroup from '../_common/ButtonGroup';

class FindUserForm extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    }
  }

  sendEmailInvitation() {
    const email = document.querySelector('#userSearch').value;
    console.log(email);
  }

  render() {
    const { isSubmitting, className } = this.props;
    const { isLoading } = this.state;
    return (
      <div className={className}>
        <Form>
          <p>Find existing users or invite team members to the platform</p>
          <Field
            name="userSearch"
            label="Add a users email address"
            component={TextInput}
            searchBar
          />
          <Button
            type="submit"
            isLoading={isSubmitting}
            label="Find user"
            />
        </Form>
      </div>
    );
  }
}

FindUserForm.propTypes = {
  userId: PropTypes.string,
};

FindUserForm.defaultProps = {
  userId: undefined,
};

export default withFormik({
  mapPropsToValues: props => ({
    userSearch: props.userSearch || "",
  }),
  validationSchema: Yup.object().shape({
    userSearch: Yup.string(),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(true);
    api.get(`user?search=${values.userSearch}`)
      .then((response) => {
        setSubmitting(false);
        const users = response.data.data;
        props.setSearchResults(users);
      })
      .catch((error) => {
        openAlert({ message: `Error: ${error}`, type: 'danger' });
        setSubmitting(false);
      });
  },
})(styled(FindUserForm)`
  margin: 0;
  button {
    width: 200px;
  }
`);
