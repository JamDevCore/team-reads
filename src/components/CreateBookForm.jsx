import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './_common/form-components/TextInput';
import Form from './_common/form-components/Form';
import { Field, withFormik } from 'formik';
import styled from 'styled-components';
import Button from './_common/Button';
import SelectInput from './_common/form-components/SelectInput';
import Divider from './_common/Divider';
import theme from '../theme';

class CreateBookForm extends React.Component {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <h2>To start a discussion, try adding a book to your collection</h2>
        <Divider />
        <Form>
          <Field
            name="bookTitle"
            type="text"
            label="Title"
            placeholder="The lean startup"
            component={TextInput}
            />
            <Field
              name="author"
              type="text"
              label="Who wrote it"
              placeholder="Eric Reis"
              component={TextInput}
              />
          <Field
            name="shelf"
            component={SelectInput}
            label="Select a shelf"
            >
            <option>Select</option>
          </Field>
          <Button
            label="Create book"
          />
        </Form>
      </div>
    );
  }
}

CreateBookForm.propTypes = {
  className: PropTypes.string,
};

CreateBookForm.defaultProps = {
  className: undefined
};

export default withFormik({
  mapPropsToValues: () => ({}),
})(styled(CreateBookForm)`
  margin: 0;

`);
