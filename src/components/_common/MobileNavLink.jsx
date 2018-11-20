import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../theme';


const MobileNavLink = styled(Link)`
  padding: 5px 0px;
  border-bottom: 2px solid white;
  display: block !important;
  margin: 20px;
  font-size: 28px;
  font-weight: bold;
  color: ${theme.colors.black};
  &:focus,
  &:active {
  color: ${theme.colors.primary};
  }
`;

export default MobileNavLink;
