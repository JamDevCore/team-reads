import React from 'react';
import PropTypes from 'prop-types';
import history from '../modules/history';
import styled from 'styled-components';
import theme from '../theme'
import trimText from '../modules/trim-text';
import Button from './_common/Button';

class Card extends React.Component {
  render() {
    const {
      className,
      title,
      author,
      lightbulbs,
      contributions,
      bookId,
      link,
      owner,
    } = this.props;
    const heading = author ? `${trimText(title, 160)} - ${author}` : trimText(title, 160);
    return (
      <div className={className}>
        <div className="column-1">
          <h4>{heading}</h4>
            {owner && <div className="owner">
                <i className="fas fa-book"></i>
                <p>{owner}</p>
            </div>}
          <div className="iconList">
            <i className="fas fa-lightbulb"></i>
            <p>{lightbulbs || 0}</p>
            <i className="fas fa-comments"></i>
            <p>{contributions}</p>
          </div>

        </div>
        <div className="column-2">
          <Button
            label="View"
            link={link}
            isFullWidth
          />
        </div>
      </div>);
    }
}

Card.propTypes = {
  className: PropTypes.string,
  bookId: PropTypes.string,
  title: PropTypes.string,
  readers: PropTypes.arrayOf(PropTypes.string),
  lightbulbs: PropTypes.number,
  contributions: PropTypes.number,
  author: PropTypes.string,
  link: PropTypes.string,
  owner: PropTypes.string,
};

Card.defaultProps = {
  className: undefined,
  bookId: undefined,
  title: undefined,
  readers: undefined,
  lightbulbs: undefined,
  contributions: undefined,
  author: undefined,
  link: undefined,
  owner: undefined,
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
  .column-1 {
    padding: 10px 10px 10px 20px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .column-2 {
    padding: ${theme.baseMargin / 2}px;
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
