import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../theme'
import Button from './_common/Button';


const Card = ({ className, title, author, readers, lightbulbs, comments }) => (
  <div className={className}>
    <div className="column-1">
      <h3>{`${title} - ${author}`}</h3>
      <div className="iconList">
        <i className="fas fa-lightbulb"></i>
        <p>{lightbulbs}</p>
        <i className="fas fa-comments"></i>
        <p>{comments}</p>
      </div>
      {readers ? <div className="readerList">
        <i className="fas fa-book"></i>
        {readers.map(name => <p>{name}</p>)}
      </div> : null}
    </div>
    <div className="column-2">
      <Button
        label="View"
      />
    </div>
  </div>
);

Card.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  readers: PropTypes.arrayOf(PropTypes.string),
  lightbulbs: PropTypes.string,
  comments: PropTypes.string,
  author: PropTypes.string,
};

Card.defaultProps = {
  className: undefined,
  title: undefined,
  readers: undefined,
  lightbulbs: undefined,
  comments: undefined,
  author: undefined,
};

export default styled(Card)`
  display: flex;
  flex-direction: row;
  padding: ${theme.baseMargin / 2}px;
  width: 100%;
  min-height: 120px;
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.borderRadius}px;
  background-color: white;
  margin-bottom: ${theme.baseMargin}px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  .column-1 {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .column-2 {
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    button {
      margin: 10px;
    }
  }
  h3 {
    margin: 10px 10px;
    font-family: 'Playfair Display', serif;

  }
  i {
    margin: 10px 10px;
    color: ${theme.colors.primary};
  }
  p {
    margin: 10px 10px;
  }
  .iconList {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .readerList {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`;
