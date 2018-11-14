import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { openAlert } from 'simple-react-alert';
import api from '../../modules/api-call';
import Form from '../_common/form-components/Form';
import Button from '../_common/Button';
import Textarea from '../_common/form-components/Textarea';

class CreateDiscussionForm extends React.Component {

  render() {
    const { className, discussionId, isSubmitting } = this.props;
    return (
      <div className={className}>
        <Form>
          <Field
            name="title"
            type="text"
            label="Highlight"
            placeholder="Add a highlight, anchor, or small quote to start your discussion.."
            component={Textarea}
            rows={4}
            />
            <Field
              name="note"
              type="text"
              label="Notes"
              placeholder="Your notes.."
              component={Textarea}
              rows={6}
              />
            <Button
              type="submit"
              label="Update notes"
              isLoading={isSubmitting}
            />
          </Form>
      </div>
    );
  }
}

CreateDiscussionForm.propTypes = {
  className: PropTypes.string,
  discussionId: PropTypes.string,
  title: PropTypes.string,
  note: PropTypes.string,
  isSubmitting: PropTypes.bool,
  updateDiscussion: PropTypes.func,
};

CreateDiscussionForm.defaultProps = {
  className: undefined,
  discussionId: undefined,
  title: undefined,
  note: undefined,
  isSubmitting: undefined,
  updateDiscussion: undefined,
};

export default withFormik({
  mapPropsToValues: props => ({
    title: props.title || "",
    note: props.note || "",
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string(),
    note: Yup.string(),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    console.log('submitting')
    console.log(props)
    setSubmitting(true);
    api.put(`discussion/${props.discussionId}`, {
      title: values.title,
      note: values.note,
    })
      .then((response) => {
        setSubmitting(false);
        const discussion = response.data
        console.log(discussion);
        props.updateDiscussion(discussion.title, discussion.note);
        openAlert({ message: 'Success! You updated your discussion', type: 'success' });

      })
      .catch((error) => {
        openAlert({ message: `Error: ${error}`, type: 'danger' });
        setSubmitting(false);
      });
  },
})(styled(CreateDiscussionForm)`
  margin: 0;
`);
