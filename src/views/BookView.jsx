import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import api from '../modules/api-call';
import Panel from '../components/_common/Panel';
import Divider from '../components/_common/Divider';
import ButtonGroup from '../components/_common/ButtonGroup';
import Button from '../components/_common/Button';
import HighlightButton from '../components/_common/HighlightButton';
import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';
import Loading from '../components/Loading';
import theme from '../theme';

// const discussions = [
//   {
//     title:"'We must learn what customers really want, not what they say they want or what we think they should want.'",
//     readers: ['James', 'Mike', 'Rachel'],
//     lightbulbs:"16",
//     comments:"22",
//     author:"James",
//   },
//   {
//     title:"f you're not failing, you're not pushing your limits, and if you're not pushing your limits, you're not maximizing your potential",
//     readers: ['James', 'Mike', 'Rachel'],
//     lightbulbs:"16",
//     comments:"22",
//     author:"Ray Dalio",
//   },
//   {
//     title:"If you don't pay appropriate attention to what has your attention, it will take more of your attention than it deserves.",
//     readers: ['James', 'Mike', 'Rachel'],
//     lightbulbs:"16",
//     comments:"22",
//     author:"Gavin White",
//   },
//   {
//     title:"There is a time for many words, and there is also a time for sleep.",
//     readers: ['James', 'Mike', 'Rachel'],
//     lightbulbs:"16",
//     comments:"22",
//     author:"Homer",
//   },
// ];

const Container = styled.div`
  margin: 40px;
  min-width: 800px;
`;

const AmazonLink = styled.a`
  text-decoration: underline;
  display: block;
  text-align: center;
  margin-top: 20px;
`;

class DiscussionView extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        isLoading: false,
        discussions: [],
        bookTitle: undefined,
        author: undefined,
        readBy: ['James', 'Grant', 'Ralph'],
        personalStatus: undefined,
      }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({
      isLoading: true,
    });
    api.get(`book/${id}`)
    .then((res) => {
      console.log(res);
      const book = res.data;
      this.setState({
        bookTitle: book.name,
        author: book.author,
        readBy: book.readyBy,
      });
    })
    .catch(err => console.log(err))
    api.get(`discussion?bookId=${id}`)
      .then((res) => {
        console.log(res)
        const discussions = res.data;
        this.setState({
          discussions,
          isLoading: false,
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          isLoading: false,
        })
      })
  }

  renderDiscussions() {
    const { discussions, bookTitle, author, readBy, isLoading } = this.state;
    return discussions.length > 0 ? discussions.map(d =>
      <Card
        key={d.title}
        title={d.title}
        readers={d.readers}
        lightbulbs={d.lightbulbs}
        comments={d.comments}
        author={d.author}
      />
    ) : <Panel><h2>No discussions on this book yet</h2></Panel>;
  }
  render() {
    const { className } = this.props;
    const { bookTitle, author, readBy, isLoading } = this.state;
    return (
      <div className={className}>
        <div className="left">
        <Panel>
          <h2>{bookTitle}</h2>
          <p>{author}</p>
          <Divider />
          <h3>Read by</h3>
          <div>
          {readBy && readBy.length > 0 ? readBy.map(reader => <li key={reader} style={{display:'inline-block'}}>{reader}</li>) :
          <li style={{display:'inline-block'}}>No-one</li>}
        </div>
          <Divider />
          <Select
            label="Recommend this book"
          >
          <option>Select a team member</option>
        </Select>
        <ButtonGroup>
          <Button
            label="Add note"
          />
        <HighlightButton
            label="Delete book"
          />
        </ButtonGroup>
        </Panel>
          <AmazonLink href="http://www.amazon.co.uk">Purchase on Amazon</AmazonLink>
        </div>
        <div className="right">
          <Select>
            <option>All notes</option>
            <option>My notes</option>
         </Select>
        {isLoading ? <Panel><Loading /></Panel> : this.renderDiscussions()}
      </div>
      </div>
    );
  }
}

DiscussionView.propTypes = {

};

DiscussionView.defaultProps = {

};

export default styled(DiscussionView)`
h3 {
  font-size: ${theme.fontSize}px;
}
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  .left {
    margin: 40px auto;
    width: 400px;
    min-width: 300px;
    select {
      margin-left: 0 !important;
    }
  }
  .right {
    box-sizing: border-box;
    width: 60%;
    margin: 20px auto;
  }
  @media(max-width: 1000px) {
    .right {
      margin: 20px auto;
      width: 100%;

    }
    .left {
      width: 500px;
      min-width: 300px;
      margin: 40px auto;
    }
  }
  li {
    margin-right: 10px;
  }
`;
