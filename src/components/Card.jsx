import React from 'react';
import PropTypes from 'prop-types';
import history from '../modules/history';
import styled from 'styled-components';
import theme from '../theme'
import HighlightButton from './_common/HighlightButton';


class Card extends React.Component {
  render() {
    const {
      className,
      title,
      author,
      readers,
      lightbulbs,
      comments,
      bookId,
      link,
    } = this.props;
    return (
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
            {readers.map(name => <p key={name}>{name}</p>)}
          </div> : null}
        </div>
        <div className="column-2">
          <HighlightButton
            label="View"
            link={link}
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
  comments: PropTypes.number,
  author: PropTypes.string,
  link: PropTypes.string,
};

Card.defaultProps = {
  className: undefined,
  bookId: undefined,
  title: undefined,
  readers: undefined,
  lightbulbs: undefined,
  comments: undefined,
  author: undefined,
  link: undefined,
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
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  .column-1 {
    padding: ${theme.baseMargin / 2}px ${theme.baseMargin}px;
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
  h3 {
    margin: 10px 10px;
    font-family: 'Playfair Display', serif;

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
  .readerList {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`;
