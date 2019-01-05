import ReactTable from 'react-table';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Table = ({ data, columns, defaultPageSize, theme }) => (
  <div className="Table">
    <ReactTable
      className={theme}
      data={data}
      columns={columns}
      defaultPageSize={defaultPageSize || 5}
    />
  </div>
);

Table.propTypes = {

};

Table.defaultProps = {

};

export default styled(Table)`



`;
