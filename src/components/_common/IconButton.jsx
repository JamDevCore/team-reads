import Button from './Button';
import styled, { keyframes } from 'styled-components';
import theme from '../../theme';

const pulse = keyframes`
0% {
  transform: scale(0.9);
  box-shadow: 0 0 0 10px rgba(7, 102, 208, 0.2);
}
70% {
  transform: scale(1);
  box-shadow: 0 0 0 5px rgba(7, 102, 208, 0);
}
  100% {
  transform: scale(0.9);
  box-shadow: 0 0 0 0 rgba(7, 102, 208, 0));
}
`;

const IconButton =  styled(Button)`
  background-color: transparent;
  border: 1px solid ${theme.colors.grey};
  color: ${theme.colors.primary};
  min-width: 30px;
  padding: 0;
  height: 40px;
  width: 40px;
  border-radius: 50%;

  &:hover,
  &:active,
  &:focus {
    animation: ${pulse} 1s 1; /* animation set */
  }
`;

export default IconButton;
