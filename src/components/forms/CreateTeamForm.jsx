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
    const { isSubmitting } = this.props;
    return (
      <React.Fragment>
        <Form>
          <Field
            label="Give your team a name"
            name="teamName"
            component={TextInput}
          />
        <Button
          type="submit"
          isLoading={isSubmitting}
          label="Create team"
          />
        </Form>
      </React.Fragment>
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
  }),
  validationSchema: Yup.object().shape({
    teamName: Yup.string().required('Please add a name for your team!'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(true);
    api.post('team', {
      userId: props.userId,
      teamName: props.teamName,
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
`);
