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

class AddUserForm extends React.Component {
  render() {
    const { isSubmitting, className } = this.props;
    return (
      <div className={className}>
        <h1>Add a new team member</h1>
        <Form>
          <Field
            name="teamName"
            label="Add a user's email to invite them"
            component={TextInput}
          />
          <Button
            type="submit"
            isLoading={isSubmitting}
            label="Add user"
            />
        </Form>
      </div>
    );
  }
}

AddUserForm.propTypes = {

};

AddUserForm.defaultProps = {

};

export default withFormik({
  mapPropsToValues: props => ({
    teamName: props.teamName || "",
  }),
  validationSchema: Yup.object().shape({
    teamName: Yup.string().required('Please add a name for your team!'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(true);
    console.log(values)
    console.log(values.teamName)
    api.post('team', {
      teamName: values.teamName,
      teamMembers: [props.userId],
      teamAdmins: [props.userId],
      numberOfUsers: 1,
      userId: props.userId,
    })
      .then((response) => {
        setSubmitting(false);
        const team = response.data
        openAlert({ message: 'Success! You created a team', type: 'success' });
        history.push(`team/${team._id}`)
      })
      .catch((error) => {
        openAlert({ message: `Error: ${error}`, type: 'danger' });
        setSubmitting(false);
      });
  },
})(styled(AddUserForm)`
  margin: 0;
  button {
    width: 200px;
    margin: 0;
  }
`);
