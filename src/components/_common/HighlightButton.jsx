import Button from './Button';
import styled from 'styled-components';
import theme from '../../theme';

const HighlightButton = styled(Button)`
  background-color: ${theme.colors.highlight};
`;

export default HighlightButton;
