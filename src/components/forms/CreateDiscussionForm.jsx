import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, withFormik } from 'formik';
import Form from '../_common/form-components/Form';
import Button from '../_common/Button';
import Textarea from '../_common/form-components/Textarea';

class CreateDiscussionForm extends React.Component {

  render() {
    const { className } = this.props;
    return (
      <div className="CreateDiscussionForm">
        <Form>
          <Field
            name="title"
            type="text"
            label="Title"
            placeholder="Add a highlight, anchor, or small quote to start your discussion.."
            component={Textarea}
            rows={2}
            />
            <Field
              name="note"
              type="text"
              label="Notes"
              placeholder="Your notes.."
              component={Textarea}
              rows={5}
              />
            <Button
              label="Update notes"
            />
          </Form>
      </div>
    );
  }
}

CreateDiscussionForm.propTypes = {
  className: PropTypes.string,
};

CreateDiscussionForm.defaultProps = {
  className: undefined,
};

export default withFormik({
  mapPropsToValues: () => ({}),
})(styled(CreateDiscussionForm)`
  margin: 0;
`);
