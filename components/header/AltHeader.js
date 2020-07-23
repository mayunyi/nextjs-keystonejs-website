import React from 'react';
import TopSearch from './TopSearch';
import AltHeaderNav from './AltHeaderNav';

export default class Header extends React.Component {
  render() {
    return(
      <div>
        <TopSearch />
        <AltHeaderNav />
      </div>
    );
  }
}