import { Component } from 'react';

class TopSearch extends Component {
  render() {
    return (

      <section className="top-search-area">
        <div className="search-inner">
          <input type="text" placeholder="Sisesta otsingu termin" />
          <i className="far fa-window-close ti-close"></i>
        </div>
      </section>
    );
  }
}

export default TopSearch;