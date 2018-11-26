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

class CreateTeamForm extends React.Component {
  render() {
    const { isSubmitting, className, userId } = this.props;
    console.log(userId)
    return (
      <div className={className}>
        <Form>
          <Field
            name="teamName"
            label="Give your team a name"
            component={TextInput}
          />
        <Button
          type="submit"
          isLoading={isSubmitting}
          label="Create team"
          />
        </Form>
      </div>
    );
  }
}

CreateTeamForm.propTypes = {
  userId: PropTypes.string,
};

CreateTeamForm.defaultProps = {
  userId: undefined,
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
})(styled(CreateTeamForm)`
  margin: 0;
  button {
    width: 200px;
    margin: 0;
  }
`);
