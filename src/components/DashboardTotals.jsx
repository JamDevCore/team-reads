import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../theme';
import Panel from './_common/Panel';


const DashboardTotals = ({
  bookTotal,
  discussionTotal,
  insightTotal,
  className,
}) => (
  <div className={className}>
    <div className="totals">
    <div className="total">
      <h1>{bookTotal || 0}</h1>
      <h6>Books</h6>
    </div>
    <div className="total">
      <h1>{discussionTotal || 0}</h1>
      <h6>Discussions</h6>
    </div>
    <div className="total">
      <h1>{insightTotal || 0}</h1>
      <h6>Insights</h6>
    </div>
    </div>
  </div>
);

DashboardTotals.propTypes = {
  bookTotal: PropTypes.number,
  discussionTotal: PropTypes.number,
  insightTotal: PropTypes.number,
};

DashboardTotals.defaultProps = {
  bookTotal: undefined,
  discussionTotal: undefined,
  insightTotal: undefined,
};

export default styled(DashboardTotals)`
  display: flex;
  flex-direction: column;
  background: white;
  margin: 20px 0px;
  color: ${theme.colors.primaryBright};
  padding: ${theme.baseMargin}px;
  background-color: ${theme.colors.white};
  box-shadow: ${theme.boxShadow};
  h1 {
    font-size: 64px;
    text-align: center
    font-weight: 800;
    padding: 0;
    margin: 0;
  }
  border-radius: ${theme.borderRadius}px;
  .totals {
    display: flex;
  }
  .total {
    flex: 1;
    margin: 0px 10px;
    display: flex;
    flex-direction: column;
      h6 {
        padding-top: 10px;
        margin: 0;
        font-weight: 700;
        color: ${theme.colors.primaryLight};
        text-align:center;
      }
  }
`;
