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

class UpdateTeamNameForm extends React.Component {
  render() {
    const { isSubmitting, className } = this.props;
    return (
      <div className={className}>
        <h2>Details</h2>
        <Form>
          <Field
            name="teamName"
            label="Change your team name"
            component={TextInput}
          />
        <Button
          type="submit"
          isLoading={isSubmitting}
          label="Update name"
          />
        </Form>
      </div>
    );
  }
}

UpdateTeamNameForm.propTypes = {
  userId: PropTypes.string,
  teamId: PropTypes.string,
  teamName: PropTypes.string,
  updateName: PropTypes.func,
};

UpdateTeamNameForm.defaultProps = {
  userId: undefined,
  teamId: undefined,
  teamName: undefined,
  updateName: undefined,
};

export default withFormik({
  mapPropsToValues: props => ({
    teamName: props.teamName || "",
  }),
  validationSchema: Yup.object().shape({
    teamName: Yup.string().required(),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(true);
    api.put(`team/${props.teamId}`, {
      teamName: values.teamName,
    })
      .then(() => {
        setSubmitting(false);
        props.updateName(values.teamName);
        openAlert({ message: 'Success! Your team name has been updated', type: 'success' });
      })
      .catch((error) => {
        openAlert({ message: `Error: ${error}`, type: 'danger' });
        setSubmitting(false);
      });
  },
})(styled(UpdateTeamNameForm)`
  margin: 0;
  button {
    width: 200px;
    margin: 0;
  }
`);
