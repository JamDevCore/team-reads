import React from 'react';
import PropTypes from 'prop-types';
import DashboardView from '../views/DashboardView';
import Loading from '../components/Loading';
import api from '../modules/api-call';

class DashboardViewContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      shelves: [],
      currentShelf: 'all',
      isLoading: true,
    }
  }
  componentDidMount() {
    const { userId } = this.props;
    console.log(userId)
    api.get(`book?ownerId=${userId}`)
    .then((response) => {
      console.log(response);
      const books = response.data.data;
      this.setState({
        books: books,
      });
    })
    .catch((err) => {
      console.log(err)
      this.setState({ isLoading: false });
    });
    api.get(`shelf?ownerId=${userId}`)
    .then((response) => {
      console.log(response)
      const shelves = response.data.data;
      this.setState({
        shelves,
      }, this.setState({
        isLoading: false,
      }))
    });
  }
  render() {
    const {
      isLoading,
      userId,
      books,
      currentShelf,
      shelves,
    } = this.state;
    return isLoading ? <Loading /> :
    <DashboardView
      userId={userId}
      books={books}
      currentShelf={currentShelf}
      shelves={shelves}
    />
  }
}

DashboardViewContainer.propTypes = {
  userId: PropTypes.string,
};

DashboardViewContainer.defaultProps = {
  userId: undefined,
};

export default DashboardViewContainer;
