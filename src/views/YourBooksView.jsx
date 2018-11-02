import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreateBookForm from '../components/CreateBookForm';
import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';
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
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

`;

class YourBooksView extends React.Component {

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <h1>Your books</h1>
        <Container>
        <CreateBookForm />
        <div style={{'min-width':'800px', margin: '40px'}}>
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
      </Container>
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
  h1 {
  margin: 20px ${theme.baseMargin * 3}px 0 0;
  font-family: 'Playfair Display', serif;
  font-size: 54px;
  text-align: right;
  }
`;
