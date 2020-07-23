import React from 'react';
import TopSearch from './TopSearch';
import HeaderNav from './HeaderNav';

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <TopSearch />
        <HeaderNav isIndexPage={this.props.isIndexPage} />
      </div>
    );
  }
}