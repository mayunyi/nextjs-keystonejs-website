import React, { Component } from "react";
import Slider from "react-slick";
import 'isomorphic-fetch';

export default class Carousel extends Component {
  
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
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 720,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="carousel container">
        <h3>Esindame neid kaubamärke</h3>
        <Slider {...settings}>
          { this.state.brands.map((brand, i) => {
            return (
              <a href={`https://${brand.brandHomepage}`} target="_blank" rel="noopener" key={i}>
                <img src={brand.carouselImage.url} alt=""></img>
              </a>
            )
          }) }
        </Slider>
      </div>
    );
  }
}
