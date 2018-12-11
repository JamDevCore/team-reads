import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Panel from './Panel';


const NoResults = ({ isDiscussion, isBook, className }) => (
  <Panel>
    <div className={className}>
      <i className="fas fa-edit" />
      {isDiscussion &&
        <React.Fragment>
        <h2>No discussions here</h2>
        <p>Create one now to start generating insights</p>
        </React.Fragment>
      }
      {isBook &&
        <React.Fragment>
        <h2>No books here</h2>
        <p>Add one now to start discussing your insights</p>
        </React.Fragment>
      }
    </div>
  </Panel>
);

NoResults.propTypes = {
  isDiscussion: PropTypes.bool,
  isBook: PropTypes.bool,
};

NoResults.defaultProps = {
  isDiscussion: undefined,
  isBook: undefined,
};

export default styled(NoResults)`
text-align: center;
i {
  font-size: 48px;
}
`;
