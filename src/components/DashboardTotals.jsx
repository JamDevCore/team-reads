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
      <h5>Books</h5>
    </div>
    <div className="total">
      <h1>{discussionTotal || 0}</h1>
      <h5>Discussions</h5>
    </div>
    <div className="total">
      <h1>{insightTotal || 0}</h1>
      <h5>Insights</h5>
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
  margin: 20px 20px;
  color:${theme.colors.primary};
  padding: ${theme.baseMargin}px;
  border: 1px solid ${theme.colors.grey}
  h1 {
    text-align: center;
    padding: 0;
    margin: 0;
  }
  border-radius: ${theme.borderRadius}px;
  .totals {

    display: flex;
    justify-content: space-around;
  }
  .total {
    display: flex;
    flex-direction: column;
      h5 {
        padding-top: 10px;
        margin: 0;
        text-align:center;
      }
  }
`;
