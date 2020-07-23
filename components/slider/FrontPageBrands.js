import React, { Component } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from "react-slick";
import InViewMonitor from '../scroll/InviewMonitor';
import 'isomorphic-fetch';

const utils = require('keystone-utils');

export default class DoubleRow extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			brands: [],
			error: null,
			loading: false
		};
	}
	componentDidMount() {
		this._isMounted = true;
		this.loadData();
	}

	componentWillUnmount() {
		this._isMounted = false;
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
				if (this._isMounted) {
					this.setState({
						brands: brands,
						loading: false
					});
				}
			})
			.catch(err =>
				this.setState({
					error: 'Uhoh.. Unable to load brand slider :(',
					errorMessage: err,
					loading: false
				})
			);
	}
	render() {
		const brands = this.state.brands;
		const settings = {
			customPaging: function(i) {
				return (
					<a key={i}>
						<LazyLoadImage
						className="brand-thumb"
						src={`${brands[i].carouselImage.url}`}
						alt={`${brands[i].carouselAltText}`}
						effect="black-and-white"
						/>
					</a>
				);
			},
			dots: true,
			dotsClass: "slick-thumbs",
			className: "center",
			centerMode: true,
			lazyLoad: true,
			infinite: true,
			centerPadding: "0px",
			slidesToShow: 1,
			speed: 800,
			autoplay: false,
			rows: 1,
			slidesPerRow: 1
		};
		return (
			<InViewMonitor
			classNameNotInView='hidden'
			classNameInView='animated fadeInUp'>
				<div className="dblrow-slider front-page-brand-slider container-fluid">
					<h2>Esindame neid kaubamärke</h2>
					<div className="">
						<div className="row append-dots"></div>
					</div>
					<Slider {...settings}>
						{ this.state.brands.map((brand, i) => {
							return (
								<div key={i}>
									<div className="sync-slider-col">
										<img className="sync-slider-img sync-slider-img-large" src={brand.presentationImage.url} alt={brand.presentationAltText}></img>
									</div>
									<div className="sync-slider-col">
										<div className="sync-slider-logo"> 
											<img className="sync-slider-img" src={brand.brandLogo.url} alt={brand.brandAltText}></img>
										</div>
										<div>
											<div className="sync-slider-paragraphs">
											<p className="sync-slider-p">{utils.htmlToText(utils.decodeHTMLEntities(brand.paragraph1))}</p>
											<p className="sync-slider-p">{utils.htmlToText(utils.decodeHTMLEntities(brand.paragraph2))}</p>
											<p className="sync-slider-p">{utils.htmlToText(utils.decodeHTMLEntities(brand.paragraph3))}</p>
											</div>
										</div>
										<div className="sync-slider-links" style={{ clear: 'both' }}>
											<a className="sync-slider-a" href={`https://${brand.brandHomepage}`} target="_blank" rel="noopener">Tootja koduleht</a>
											<a className="sync-slider-a" href={`https://${brand.storeLink}`} target="_blank" rel="noopener">Tutvu valikuga e-poes</a>
										</div>
									</div>
								</div>
							)
						}) }
					</Slider>
				</div>
			</InViewMonitor>
		);
	}
}
