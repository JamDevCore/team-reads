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

class FindUserForm extends React.Component {
  render() {
    const { isSubmitting, className } = this.props;
    return (
      <div className={className}>
        <Form>
          <p>Search for a user to add them to your team</p>
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
    margin: 0;
  }
`);
