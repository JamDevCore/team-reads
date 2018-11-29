import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Field, withFormik } from 'formik';
import { openAlert } from 'simple-react-alert';
import history from '../../modules/history';
import handleUpdateUserEmail from '../../modules/handle-update-user-email';
import api from '../../modules/api-call';
import Form from '../_common/form-components/Form';
import TextInput from '../_common/form-components/TextInput';
import Button from '../_common/Button';

class UserDetailsForm extends React.Component {
  render() {
    const { isSubmitting, className } = this.props;
    return (
      <div className={className}>
        <Form>
          <Field
            name="username"
            label="Username"
            component={TextInput}
          />
          <Field
            name="email"
            label="Email address"
            component={TextInput}
          />
          <Button
            type="submit"
            isLoading={isSubmitting}
            label="Update your details"
            />
        </Form>
      </div>
    );
  }
}

UserDetailsForm.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
  email: PropTypes.string,
  userSub: PropTypes.string,
};

UserDetailsForm.defaultProps = {
  username: undefined,
  userId: undefined,
  email: undefined,
  userSub: undefined,
};

export default withFormik({
  mapPropsToValues: props => ({
    username: props.username || "",
    email: props.email || "",
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Add your name'),
    email: Yup.string().email('Please include a valid email address'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(true);
    console.log(values)
    api.put(`user/${props.userId}`, {
      username: values.username,
      email: values.email,
    })
      .then((response) => {
        console.log(response)
        if(props.email !== values.email) {
          handleUpdateUserEmail({
            userId: props.userSub,
            email: values.email,
          })
        }
        setSubmitting(false);
        const team = response.data
        openAlert({ message: 'Your details have been updated', type: 'success' });
        history.push(`team/${team._id}`)
      })
      .catch((error) => {
        openAlert({ message: `Error: ${error}`, type: 'danger' });
        setSubmitting(false);
      });
  },
})(styled(UserDetailsForm)`
  margin: 0;
  button {
    width: 200px;
    margin: 0;
  }
`);
