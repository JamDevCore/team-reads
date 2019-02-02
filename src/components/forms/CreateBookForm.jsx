import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, withFormik } from 'formik';
import { openAlert } from 'simple-react-alert';
import * as Yup from 'yup';
import history from '../../modules/history';
import api from '../../modules/api-call';
import TextInput from '../_common/form-components/TextInput';
import Form from '../_common/form-components/Form';
import Button from '../_common/Button';
import SelectInput from '../_common/form-components/SelectInput';
import Divider from '../_common/Divider';
import theme from '../../theme';

const CreateBookForm = ({ className, isSubmitting }) => (
  <div className={className}>
    <h2>Add a new book</h2>
    <Form>
      <Field
        name="title"
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
      <Button
        isFullWidth
        icon="fas fa-plus"
        type="submit"
        label="Add new book"
        isLoading={isSubmitting}
      />
    </Form>
  </div>
);


CreateBookForm.propTypes = {
  className: PropTypes.string,
  userId: PropTypes.string,
  isSubmitting: PropTypes.bool,
  addBookToState: PropTypes.func,
};

CreateBookForm.defaultProps = {
  className: undefined,
  userId: undefined,
  isSubmitting: undefined,
  addBookToState: undefined,
};

export default withFormik({
  mapPropsToValues: props => ({
    userId: props.userId,
    title: '',
    author: '',
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Tell us the title!'),
    author: Yup.string().required('Let us know who wrote it'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, { setSubmitting, props }) => {
    console.log('submitting')
    setSubmitting(true);
    api.post(`book`, {
      name: values.title,
      author: values.author,
      ownerId: values.userId,
    })
      .then((response) => {
        openAlert({ message: 'This book has been added to your collection', type: 'success' });
        setSubmitting(false);
        const book = response.data
        console.log(book);
        history.push(`/book/${book._id}`);
      })
      .catch((error) => {
        openAlert({ message: `Error: ${error}`, type: 'danger' });
        setSubmitting(false);
      });
  },
})(styled(CreateBookForm)`
background-color: white;
padding: 50px;
border: 1px solid ${theme.colors.grey};
border-radius: ${theme.borderRadius}px;
box-shadow: ${theme.boxShadow};
&:hover {
  box-shadow: ${theme.strongBoxShadow};
}
label {
  margin-top: 12px;
}
input {
  margin-bottom: 12px;
}
button {
  margin-top: 24px;
}
h2 {
  font-size: 38px;
  margin-bottom: 24px;
  font-weight: 700;
}
`);
