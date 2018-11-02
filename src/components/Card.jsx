import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import theme from '../theme'
import HighlightButton from './_common/HighlightButton';


class Card extends React.Component {
  constructor() {
    super();

    this.state = {
      image: undefined,
    }
  }
  componentDidMount() {
    axios.get('https://api.unsplash.com/photos/random/?query=reading&&h=120&&orientation=squarish&&client_id=764c89ce522bd5e345651a8304300fa1d4826877dd671606f5f92dfb446ef8dd')
      .then(json => {
        console.log(json)
        this.setState({
          image: json.data.urls.regular,
      });
    })
  }
  render() {
    const { className, title, author, readers, lightbulbs, comments } = this.props;
    const { image } = this.state;
    return (
      <div className={className}>
        <div className="column-1">
          {image && <img src={image} alt="random-book"></img>}
        </div>
        <div className="column-2">
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
        <div className="column-3">
          <HighlightButton
            label="View"
          />
        </div>
      </div>);
    }
}

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
  width: 100%;
  min-height: 120px;
  border: 1px solid ${theme.colors.grey};
  border-radius: ${theme.borderRadius}px;
  background-color: white;
  margin-bottom: ${theme.baseMargin}px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  .column-1 {
    width: 20%;
    background: ${theme.colors.grey};
    img {
      width: 100%;
      height: 100%;
    }
  }
  .column-2 {
    padding: ${theme.baseMargin / 2}px ${theme.baseMargin}px;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .column-3 {
    padding: ${theme.baseMargin / 2}px;
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
