import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../theme'
import trimText from '../modules/trim-text';
import Button from './_common/Button';
import pluralize from '../modules/pluralize';

const Card = ({
  className,
  title,
  author,
  lightbulbs,
  isDiscussion,
  contributions,
  bookId,
  link,
  owner,
}) => {
  const heading = author ? `${trimText(title, 160)} - ${author}` : trimText(title, 160);
  return (
    <div className={className}>
      <div className="column-1">
        <Link to={link || '#'}><h4>{heading}</h4></Link>
        {owner && (
          <div className="owner">
            <i className="fas fa-book" />
            <p>
              {'Added by '}
              <span style={{ fontWeight: 'bold' }}>
                {owner}
              </span>
            </p>
          </div>)}
        <div className="iconList">
          <i className="fas fa-lightbulb" />
          <p>
            <span style={{ fontWeight: '600' }}>{lightbulbs || 0}</span>
            {pluralize(lightbulbs, ' insight')}
          </p>
          <i className="fas fa-comments" />
          <p>
            <span style={{ fontWeight: '600' }}>{contributions}</span>
            {isDiscussion ?
              `${pluralize(contributions, ' comment')}`
              : `${pluralize(contributions, ' discussion')}`}
          </p>
        </div>
      </div>
      <div className="column-2">
        <Button
          label="View"
          theme="info"
          link={link}
          isFullWidth
        />
      </div>
    </div>);
};

Card.propTypes = {
  className: PropTypes.string,
  bookId: PropTypes.string,
  title: PropTypes.string,
  lightbulbs: PropTypes.number,
  contributions: PropTypes.number,
  author: PropTypes.string,
  link: PropTypes.string,
  owner: PropTypes.string,
  isDiscussion: PropTypes.bool,
};

Card.defaultProps = {
  className: undefined,
  bookId: undefined,
  title: undefined,
  lightbulbs: undefined,
  contributions: undefined,
  author: undefined,
  link: undefined,
  owner: undefined,
  isDiscussion: undefined,
};

export default styled(Card)`
  display: flex;
  flex-direction: row;
  width: 95%;
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.borderRadius}px;
  background-color: white;
  box-sizing: border-box;
  margin: 0px 20px ${theme.baseMargin}px 10px;
  padding: 15px;
  h4 {
    padding-left: 10px;
  }
  .column-1 {
    padding: 10px 10px 10px 20px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .column-2 {
    padding: 0 ${theme.baseMargin}px ${theme.baseMargin / 2}px 0;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  i {
    margin: 10px 10px;
    color: ${theme.colors.light};
  }
  p {
    margin: 5px 5px;
  }
  .iconList {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .owner {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    p {
      padding-top: 2px;
    }
  }
`;
