import Button from './Button';
import styled, { keyframes } from 'styled-components';
import theme from '../../theme';

const pulse = keyframes`
0% {
  box-shadow: 0 0 0 1px rgba(7, 102, 208, 0.9);
}
5% {
  box-shadow: 0 0 0 2px rgba(7, 102, 208, 0.8);
}
10% {
  box-shadow: 0 0 0 3px rgba(7, 102, 208, 0.7);
}
15% {
  box-shadow: 0 0 0 4px rgba(7, 102, 208, 0.6);
}
20% {
  box-shadow: 0 0 0 5px rgba(7, 102, 208, 0.5);
}
25% {
  box-shadow: 0 0 0 6px rgba(7, 102, 208, 0.4);
}
30% {
  box-shadow: 0 0 0 7px rgba(7, 102, 208, 0.3);
}
35% {
  box-shadow: 0 0 0 8px rgba(7, 102, 208, 0.2);
}
40% {
  box-shadow: 0 0 0 9px rgba(7, 102, 208, 0.1);
}
50% {
  box-shadow: 0 0 0 10px rgba(7, 102, 208, 0.05);
}
100% {
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
