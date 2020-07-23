import React, { Component } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'isomorphic-fetch';

export default class PartnersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [],
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
    return fetch(`/api/partners`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then(partners => {
        this.setState({
          partners: partners,
          loading: false
        });
      })
      .catch(err =>
        this.setState({
          error: 'Uhoh.. Unable to load partner carousel :(',
          errorMessage: err,
          loading: false
        })
      );
  }

  render() {
    return (
      <div className="brands-list-container container">
        <h3>Meie koostööpartnerid</h3>
        <ul className="brands-list-ul">
          { this.state.partners.map((partner, i) => {
            return (
              <li className="brands-list-li" key={i}>
                <a href={`https://${partner.partnerHomepage}`} target="_blank" rel="noopener">
									<LazyLoadImage
									alt=""
									src={partner.carouselImage.url}
									effect="black-and-white"
									/>
                </a>
              </li>
            );
          }) }
        </ul>
      </div>
    );
  }
}
