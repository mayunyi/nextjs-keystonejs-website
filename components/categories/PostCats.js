import React from 'react';
import axios from 'axios';

function filterCategory(categories, catId) {
  categories.filter( category => {
    if (category._id == catId) {
      return category.name
    }
  })
};

export default class PostCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: false,
      error: null
    }
  }
  componentDidMount() {
    this.setState({
      loading: true,
      error: null
    });
    // get posts
    axios
      .get('/api/post-categories')
      .then((categories) => {
        this.setState({
          categories: categories.data,
          loading: false
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
          errMsg: 'Unable to load categories :('
        });
      });
  }

  

  render() {
    console.log(this.props)
    console.log(this.state.categories)
    return (
      <p>{filterCategory(this.state.categories, this.props.catId)}</p>
    );
  };
}