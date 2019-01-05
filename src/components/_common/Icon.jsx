import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon }) => (
  <div className="Icon">
    <i className={icon} />
  </div>
);

Icon.propTypes = {
icon: PropTypes.string,
};

Icon.defaultProps = {
icon: undefined,
};

export default Icon;
