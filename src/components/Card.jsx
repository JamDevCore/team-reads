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
  const heading =`${trimText(title, 160)}`;
  return (
    <div className={className}>
      <div className="column-1">
        <div className="titleBlock">
          <Link to={link || '#'}><h3>{heading}</h3></Link>
        </div>

        <h4>{author}</h4>
          {owner && (
              <p>
                {'Added by '}
                <span style={{ fontWeight: 'bold' }}>
                  {owner}
                </span>
              </p>)}
        <div className="iconList">


          <p>
              <i className="fas fa-lightbulb" />
            <span style={{ fontWeight: '700' }}>{lightbulbs || 0}</span>
            {pluralize(lightbulbs, ' insight')}
          </p>

          <p>
            <i className="fas fa-comments" />
            <span style={{ fontWeight: '700' }}>{contributions}</span>
            {isDiscussion ?
              `${pluralize(contributions, ' comment')}`
              : `${pluralize(contributions, ' discussion')}`}
          </p>

            <Button
              label="View"
              theme="highlight"
              link={link}
            />
        </div>
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
  box-shadow: ${theme.boxShadow};
   transition: box-shadow 0.1s ease-in-out;
  &:hover {
    box-shadow: ${theme.strongBoxShadow};
  }
  border-radius: ${theme.borderRadius}px;
  background-color: white;
  margin: 0px 0px;
  margin-bottom: 20px;
  padding: 20px;
  p {
    margin: 0px 10px;
  }
  h3 {
    padding-left: 10px;
    margin-bottom: 0;
    padding: bottom: 0;
  }
  h4 {
    font-size: 20px;
    font-weight: 400;
    color: ${theme.colors.black_75};
    padding-left: 10px;
    padding-bottom: 12px;
  }
  .column-1 {
    padding: 10px 10px 10px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    }
  }
  i {
    margin: 5px 10px;
    color: ${theme.colors.light};
  }

  .iconList {
    p {
      margin: 5px 0;
    }
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .Button {

      margin-left: auto;
      margin-right: 0;
    }
  @media(max-width: 768px) {
    .Button {
    margin-left: 0px;
    margin right: 5px;
  }
  }
    p {
      line-height: 24px;
      white-space: nowrap;
    }
  }

`;
