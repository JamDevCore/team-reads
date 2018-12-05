import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Field, withFormik } from 'formik';
import { openAlert } from 'simple-react-alert';
import api from '../../modules/api-call';
import Form from '../_common/form-components/Form';
import TextInput from '../_common/form-components/TextInput';
import Button from '../_common/Button';

class UpdatePasswordForm extends React.Component {
  render() {
    const { isSubmitting, className } = this.props;
    return (
      <div className={className}>
        <Form>
          <Field
            type="password"
            name="currentPassword"
            label="Current password"
            component={TextInput}
          />
          <Field
            type="password"
            name="newPassword"
            label="New password"
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

UpdatePasswordForm.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
  userSub: PropTypes.string,
};

UpdatePasswordForm.defaultProps = {
  userId: undefined,
  userSub: undefined,
};

export default withFormik({
  validationSchema: Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string().required('Please include a valid email address'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(true);
    console.log(values);
    console.log(props.userSub);
    api.put(`user/${props.userId}`, {
      currentPassword: values.username,
      newPassword: values.email,
      userSub: props.userSub,
    })
      .then((res) => {
        console.log(res)
        setSubmitting(false);
        openAlert({ message: 'Your password has been updated', type: 'success' });
      })
      .catch((error) => {
        openAlert({ message: `Error: ${error}`, type: 'danger' });
        setSubmitting(false);
      });
  },
})(styled(UpdatePasswordForm)`
  margin: 0;
  button {
    width: 200px;
    margin: 0;
  }
`);
