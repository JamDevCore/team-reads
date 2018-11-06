import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreateBookForm from '../components/forms/CreateBookForm';
import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';
import Panel from '../components/_common/Panel';
import theme from '../theme';


const books = [
  {
    title:"The Lean Startup",
    readers: ['James', 'Mike', 'Rachel'],
    lightbulbs:"16",
    comments:"22",
    author:"Eric Reis",
  },
  {
    title:"Principles",
    readers: ['James', 'Mike', 'Rachel'],
    lightbulbs:"16",
    comments:"22",
    author:"Ray Dalio",
  },
  {
    title:"Gettings Things Done: The Art of Stress Free Time Management",
    readers: ['James', 'Mike', 'Rachel'],
    lightbulbs:"16",
    comments:"22",
    author:"Gavin White",
  },
  {
    title:"The Odyssey",
    readers: ['James', 'Mike', 'Rachel'],
    lightbulbs:"16",
    comments:"22",
    author:"Homer",
  },
]

class YourBooksView extends React.Component {

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <div className="container left">
        <Panel>
        <CreateBookForm />
        </Panel>
        </div>
        <div className="container right">
          <Select
            id="shelf"
          >
            <option>Select a shelf</option>
          </Select>
          {books.map(book => (
            <Card
              key={book.title}
              title={book.title}
              readers={book.readers}
              lightbulbs={book.lightbulbs}
              comments={book.comments}
              author={book.author}
            />))}
        </div>
      </div>
    );
  }
}

YourBooksView.propTypes = {
  className: PropTypes.string,
};

YourBooksView.defaultProps = {
  className: undefined,
};

export default styled(YourBooksView)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  .left {
    margin: 40px auto;
    width: 400px;
    min-width: 300px;
  }
  .right {
    box-sizing: border-box;
    width: 60%;
    margin: 20px auto;
  }
  @media(max-width: 1000px) {
    .right {
      margin: 30px auto;
      width: 100%;
    }
    .left {
      width: 500px;
      min-width: 300px;
      margin: 40px auto;
    }
  }
`;
