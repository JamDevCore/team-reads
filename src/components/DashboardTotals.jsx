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
      <h6>Books</h6>
      <h1>{bookTotal || 0}</h1>
    </div>
    <div className="total">
      <h6>Discussions</h6>
      <h1>{discussionTotal || 0}</h1>
    </div>
    <div className="total">
      <h6>Insights</h6>
      <h1>{insightTotal || 0}</h1>
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
  border: 1px solid ${theme.colors.grey}
  color: ${theme.colors.primary}
  padding: ${theme.baseMargin}px;
  background-color: ${theme.colors.white};
  h1 {
    font-size: 64px;
    text-align: center
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
        text-decoration: underline;
        padding-top: 10px;
        margin: 0;
        font-weight: bold;
        color: ${theme.colors.primaryLight};
        text-align:center;
      }
  }
`;
