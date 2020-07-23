import React, { Component } from "react";
import Slider from "react-slick";
import 'isomorphic-fetch';

export default class Carousel extends Component {
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
    const settings = {
      arrows: false,
			dots: false,
			lazyLoad: true,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover: false,
      speed: 5000,
      autoplaySpeed: 0.1,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
          }
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };
    return (
      <div className="carousel partner-carousel container">
        <h3>Meie koostööpartnerid</h3>
        <Slider {...settings}>
        { this.state.partners.map((partner, i) => {
            return (
              <a href={`https://${partner.partnerHomepage}`} target="_blank" rel="noopener" key={i}>
                <img src={partner.carouselImage.url} alt={partner.carouselAltText}></img>
              </a>
            )
          }) }
        </Slider>
      </div>
    );
  }
}
