import React from 'react';
import PropTypes from 'prop-types';
import { TAPi18n } from 'meteor/tap:i18n';

const t = (key, options) => TAPi18n.__(`Icon.${key}`, options);

const Icon = (props) => (
  <div className="Icon">

  </div>
);

Icon.propTypes = {

};

Icon.defaultProps = {

};

export default Icon;
