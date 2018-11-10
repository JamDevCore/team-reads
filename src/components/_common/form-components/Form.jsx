import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form } from 'formik';
import theme from '../../../theme';

const FormComponent = ({ className, children }) => (
  <Form className={className}>
    {children}
  </Form>
);

FormComponent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]).isRequired,
};

FormComponent.defaultProps = {
  className: undefined,
};

export default styled(FormComponent)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
`;
