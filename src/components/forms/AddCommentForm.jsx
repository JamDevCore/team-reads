import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, withFormik } from 'formik';
import Form from '../_common/form-components/Form';
import Textarea from '../_common/form-components/Textarea';
import Button from '../_common/Button';

class AddCommentForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Form>
          <Field
            label="Add a comment"
            name="comment"
            component={Textarea}
            rows={5}
          />
        <Button
          type="submit"
          label="Add comment"
          />
        </Form>
      </React.Fragment>
    );
  }
}

AddCommentForm.propTypes = {

};

AddCommentForm.defaultProps = {

};

export default withFormik({
  mapPropsToValues: () => ({}),
})(styled(AddCommentForm)`
  margin: 0;
`);
