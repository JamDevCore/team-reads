import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import HighlightButton from './HighlightButton';
import ButtonGroup from './ButtonGroup';
import theme from '../../theme';
import styled from 'styled-components';

const BannerMessage = ({
  className,
  message,
  action,
  actionLabel,
  closeLabel,
  closeAction,
  meta,
  actionLoading,
}) => (
  <div className={className}>
    <div className="message">
      <p>{message}</p>
    </div>
    <div className="actions">
      <ButtonGroup>
        <Button
          label={actionLabel}
          isLoading={actionLoading}
          onClick={() => action(meta)}
          />
        <HighlightButton
          label={closeLabel}
          onClick={() => closeAction(meta)}
          />
      </ButtonGroup>
    </div>
  </div>
);

BannerMessage.propTypes = {
  message: PropTypes.string,
  action: PropTypes.func,
  closeAction: PropTypes.func,
  actionLabel: PropTypes.string,
  closeLabel: PropTypes.string,
  actionLoading: PropTypes.bool,
  meta: PropTypes.string,
};

BannerMessage.defaultProps = {
  message: undefined,
  action: undefined,
  closeAction: undefined,
  actionLabel: undefined,
  closeLabel: undefined,
  actionLoading: PropTypes.bool,
  meta: PropTypes.string,
};

export default styled(BannerMessage)`
  box-sizing: border-box !important;
  width: 95%;
  display: flex;
  .message {
    width: 70%;
    padding: 0;
    margin: auto 0;
    color: ${theme.colors.primary};
  }
  background: white;
  margin: 0px 20px ${theme.baseMargin}px 10px;
  padding: 0px 10px;
`;
