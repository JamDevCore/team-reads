import React from 'react';
import PropTypes from 'prop-types';


class Fallback extends React.Component {

  render() {
    return (
      <div className="Fallback">
        <h1>404 Cannot find</h1>
      </div>
    );
  }
}

Fallback.propTypes = {

};

Fallback.defaultProps = {

};

export default Fallback;
