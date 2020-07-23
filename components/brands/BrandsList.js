import React, { Component } from "react";
import 'isomorphic-fetch';

export default class BrandsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      brandsCount: 0,
      error: null,
      loading: false
    };
  }
  componentDidMount() {
    this.loadData();
  }
  
  loadData() {
    this.setState({
      error: null,
      loading: true
    });
    return fetch(`/api/brands`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then(brands => {
        this.setState({
          brands: brands,
          brandsCount: brands.length,
          loading: false
        });
      })
      .catch(err =>
        this.setState({
          error: 'Uhoh.. Unable to load brand carousel :(',
          errorMessage: err,
          loading: false
        })
      );
  }

  render() {
    return (
      <div className="brands-list-container container">
        <h3>Esindame neid kaubamärke</h3>
        <ul className="brands-list-ul">
          { this.state.brands.map((brand, i) => {
            return (
              <li className="brands-list-li" key={i}>
                <a href={`https://${brand.brandHomepage}`} target="_blank" rel="noopener">
                  <img src={brand.carouselImage.url} alt=""></img>
                </a>
              </li>
            );
          }) }
        </ul>
      </div>
    );
  }
}
