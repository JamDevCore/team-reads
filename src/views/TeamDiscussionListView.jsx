import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { openAlert } from 'simple-react-alert';
import history from '../modules/history';
import api from '../modules/api-call';
import handleDeleteBook from '../modules/handle-delete-book';
import Panel from '../components/_common/Panel';
import Divider from '../components/_common/Divider';
import ButtonGroup from '../components/_common/ButtonGroup';
import Button from '../components/_common/Button';
import HighlightButton from '../components/_common/HighlightButton';
import Select from '../components/_common/form-components/Select';
import Card from '../components/Card';
import Fallback from './Fallback';
import theme from '../theme';

const AmazonLink = styled.a`
  text-decoration: underline;
  display: block;
  text-align: center;
  margin-top: 20px;
`;

class TeamDiscussionListView extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        isLoading: false,
        isDeleting: false,
      }
  }
  renderDiscussions() {
    const { discussions, bookId } = this.props;
    console.log(discussions)
    return discussions.length > 0 ? discussions.map(d =>
      <Card
        key={d._id}
        title={d.title || 'Untitled'}
        readers={d.readers}
        lightbulbs={d.lightbulbs}
        contributions={d.comments.length}
        author={d.username}
        link={`/book/${bookId}/discussion/${d._id}`}
      />
    ) : <Panel><h2>No discussions on this book yet</h2></Panel>;
  }

  render() {
    const { discussions, className } = this.props;
    const { isLoading } = this.state;
    return (
      <div className={className}>
        {discussions.length > 0 ? <React.Fragment>
              <Select>
                <option>All notes</option>
                <option>My notes</option>
             </Select>
             {this.renderDiscussions()}
        </React.Fragment> : <Panel><h2>There are no discussions yet!</h2></Panel>}
    </div>)
  }
}

TeamDiscussionListView.propTypes = {
 userId: PropTypes.string,
 bookId: PropTypes.string,
 discussions: PropTypes.arrayOf(PropTypes.object),
 bookTitle: PropTypes.string,
 author: PropTypes.string,
 readBy: PropTypes.arrayOf(PropTypes.string),
 personalStatus: PropTypes.string,
 username: PropTypes.string,
};

TeamDiscussionListView.defaultProps = {
 userId: undefined,
 bookId: undefined,
 discussions: undefined,
 bookTitle: undefined,
 author: undefined,
 readBy: undefined,
 personalStatus: undefined,
 username: undefined,
};

export default styled(TeamDiscussionListView)`
width: 95%;
`;
