import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
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
  closeLoading,
  isAlert,
}) => (
  <div className={className}>
    <div className="message">
      <p>{message}</p>
    </div>
    <div className="actions">
      <ButtonGroup>
        {action && <Button
          label={actionLabel}
          isLoading={actionLoading}
          onClick={() => action(meta)}
          />}
        {closeAction && <Button
          theme="danger"
          label={closeLabel}
          isLoading={closeLoading}
          onClick={() => closeAction(meta)}
          />}
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
  closeLoading: PropTypes.bool,
  meta: PropTypes.string,
  isAlert: PropTypes.bool,
};

  BannerMessage.defaultProps = {
  message: undefined,
  action: undefined,
  closeAction: undefined,
  actionLabel: undefined,
  closeLabel: undefined,
  actionLoading: undefined,
  closeLoading: undefined,
  meta: undefined,
  isAlert: false,
};

export default styled(BannerMessage)`
  border-radius: ${theme.borderRadius}px;
  border: 1px solid ${theme.colors.grey};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  button {
    margin: auto 0;
  }
  .actions {
    flex: 1;
    display: inline-block;
    padding: 0;
    margin-top: 5px;
    .ButtonGroup {
      flex-direction: row;
      align-content: flex-end;
      justify-content: flex-end;
    }
  }
  .message {
    flex: 4;
    display: inline-block;
    max-width: 65%;
    padding: 0 10px;
    margin: auto 0;
    color:  ${({ isAlert }) => !isAlert ? theme.colors.black : '#fff'};
    p {
      margin: 0;
      font-size: 18px;
      padding:  0;
      font-weight: bold !important;
      color:  ${({ isAlert }) => !isAlert ? theme.colors.black : '#fff'};
    }
  }
  background: ${({ isAlert }) => isAlert ? theme.colors.alert : '#fff'};
`;
