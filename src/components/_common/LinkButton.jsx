import Button from './Button';
import styled from 'styled-components';
import theme from '../../theme';

const LinkButton = styled(Button)`
  background-color: transparent;
  color: ${theme.colors.primary};
  i {
    text-decoration: none !important;
  }
  &:hover {
    background-color: ${theme.colors.lightGrey};
  }
`;

export default LinkButton;
