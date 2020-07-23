import React, { Component } from 'react';
import Slider from 'react-slick';
import 'isomorphic-fetch';
const utils = require('keystone-utils');

export default class MainSlider extends Component {
	constructor (props) {
		super(props);
		this.state = {
			slides: [],
			error: null,
			loading: false,
		};
	}
	componentDidMount () {
		this.loadData();
	}
	loadData () {
		this.setState({
			error: null,
			loading: true,
		});
		return fetch(`/api/slides`)
			.then(res => {
				if (!res.ok) {
					return Promise.reject(res.statusText);
				}
				return res.json();
			})
			.then(slides => {
				this.setState({
					slides: slides,
					loading: false,
				});
			})
			.catch(err =>
				this.setState({
					error: 'Uhoh.. Unable to load slides :(',
					errorMessage: err,
					loading: false,
				})
			);
	}

	render () {
		const settings = {
			dots: true,
			arrows: true,
			infinite: true,
			autoplay: true,
			pauseOnHover: false,
			speed: 2000,
			autoplaySpeed: 10000,
			vertical: true,
			verticalSwiping: true,
			slidesToShow: 1,
			slidesToScroll: 1,
		};

		return (
				<div className="main-slider">
					<Slider {...settings}>
						{ this.state.slides.map((slide, i) => {
							return (
								<div className="slide" key={i} >
									<div class="slide-row" style={ { 
										backgroundImage: `url(${slide.image.url})`,
										backgroundPosition: 'center', 
										backgroundRepeat: 'no-repeat', 
										backgroundSize: 'cover',
										height: '100vh',
										} }>
										<div class="slide-column">
										<div className="slide-icon">
											<img src={slide.icon.url} alt={slide.iconAltText}></img>
										</div>
										</div>
										<div class="slide-column">
											<div className="slide-texts">
												<h2>{slide.title}</h2>
												<p>{utils.htmlToText(utils.decodeHTMLEntities(slide.paragraph))}</p>
											</div>
										</div>
									</div>
								</div>
								);
							// }
						}) }
					</Slider>
				</div>
		);
	}
}
