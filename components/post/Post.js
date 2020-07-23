import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import InViewMonitor from '../scroll/InviewMonitor';
import Lbox from './Lbox';
import Slider from 'react-slick';
import 'isomorphic-fetch';
import TagManager from 'react-gtm-module';


const utils = require('keystone-utils');
const dateOptions = {
	day: '2-digit',
	month: 'short',
	year: 'numeric',
};

export default class Post extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			posts: [],
			postTitle: '',
			postBrief: '',
			postPara1: '',
			postPara2: '',
			postPara3: '',
			postPara4: '',
			postCategory: '',
			postImg: '',
			postMeta: '',
			postGalleryVisible: false,
			postGalleryImages: ['static/img/noimages.jpg'],
			loading: false,
			error: null,
		};
	}

	componentDidMount () {
		this.loadData();
		const tagManagerArgs = {
			gtmId: 'xxxxxxxx',
		};
		TagManager.initialize(tagManagerArgs);
	}
	loadData () {
		this.setState({
			error: null,
			loading: true,
		});
		return fetch(`api/posts`)
			.then(res => {
				if (!res.ok) {
					return Promise.reject(res.statusText);
				}
				return res.json();
			})
			.then(data => {
				this.setState({
					posts: data,
				});
				const postData = data.filter(post => {
					if (post._id === this.props.id) {
						return post;
					}
				});
				return postData;
			})
			.then(postData => {
				const date = new Intl.DateTimeFormat('et-EE', dateOptions).format(new Date(postData[0].publishedDate));
				let galleryImgs = {};
				let galleryImgsUrls = [];
				if (postData[0].gallery.image) {
					galleryImgs = Object.values(postData[0].gallery.image);
				} else {
					galleryImgs = ['static/img/noimages.jpg'];
				}
				galleryImgs.map(img => galleryImgsUrls.push(img.url));
				this.setState({
					postTitle: postData[0].title,
					postDate: date,
					postBrief: postData[0].content.brief,
					postPara1: postData[0].content.paragraph1,
					postPara2: postData[0].content.paragraph2,
					postPara3: postData[0].content.paragraph3,
					postPara4: postData[0].content.paragraph4,
					postGalleryVisible: postData[0].gallery.visible,
					postGalleryImages: galleryImgsUrls,
					postCategory: postData[0].category,
					postImg: postData[0].image.url,
					postMeta: postData[0].metaText,
					loading: false,
				});
			})
			.catch(err =>
				this.setState({
					error: 'Could not load post',
					errorMessage: err,
					loading: false,
				})
			);
	}

	render () {
		const settings = {
			arrows: true,
			dots: false,
			lazyLoad: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: false,
			cssEase: 'linear',
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
						infinite: true,
					},
				},
				{
					breakpoint: 720,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						initialSlide: 1,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		};
		const briefStyle = {
			textAlign: 'center',
			wordWrap: `break-word`,
			marginBottom: '50px',
			fontSize: '0.8rem',
		};
		const bgImg = {
			backgroundImage: `url('${this.state.postImg ? this.state.postImg : 'static/img/news-mock-img-735x640px.jpg'}')`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover!important',
		};
		return (
			<div className="container">
				<Head>
					<title>{this.state.postTitle}</title>
					<meta name="description" content={utils.htmlToText(utils.decodeHTMLEntities(this.state.postBrief))} />
					<meta name="keywords" content="" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content={this.state.postTitle} />
					<meta property="og:url" content={`https://www.salonshop.ee/post?title=${this.props.title}&id=${this.props.id}/`} />
					<meta property="og:description" content={utils.htmlToText(utils.decodeHTMLEntities(this.state.postBrief))} />
					<meta property="og:image" content={`https://www.salonshop.ee/${this.state.postImg}`} />
				</Head>
				<InViewMonitor
					classNameNotInView="hidden"
					classNameInView="animated fadeInUp">
					<div className="container-fluid post-banner">
						<div className="row">
							<div className="col-12">
								<h1>{this.state.postTitle}</h1>
								{this.state.postDate && <p style={briefStyle}>Postitatud {this.state.postDate}</p>}
								<p style={briefStyle}>{utils.htmlToText(utils.decodeHTMLEntities(this.state.postBrief))}</p>
							</div>
						</div>
					</div>
				</InViewMonitor>
				<InViewMonitor
					classNameNotInView="hidden"
					classNameInView="animated fadeInUp">
				<div className="row post-container">
					<div className="col-lg-6 about-img post-mask-1" style={bgImg}></div>
					<div className="col-lg-6 about-texts">
						<p className="paragraph-1">{utils.htmlToText(utils.decodeHTMLEntities(this.state.postPara1))}</p>
						<p>{utils.htmlToText(utils.decodeHTMLEntities(this.state.postPara2))}</p>
						<p>{utils.htmlToText(utils.decodeHTMLEntities(this.state.postPara3))}</p>
						<p>{utils.htmlToText(utils.decodeHTMLEntities(this.state.postPara4))}</p>
					</div>
				</div>
				</InViewMonitor>
				<div className="row post-container">
				{ this.state.postGalleryVisible ? <Lbox urls={this.state.postGalleryImages} /> : '' }
				</div>
				<InViewMonitor
					classNameNotInView="hidden"
					classNameInView="animated fadeInUp">
				<div className="carousel navigation-carousel container-fluid" style={ { marginTop: '50px', marginBottom: '100px' } }>
					<h4 style={{ marginBottom: '30px' }}>Kõik uudised</h4>
					<Slider {...settings}>
					{ this.state.posts.map((post, i) => {
						const postDate = new Intl.DateTimeFormat('et-EE', dateOptions).format(new Date(post.publishedDate));
						const postsStyle1 = {
							marginTop: '30px',
							marginBottom: '10px',
							WebkitMaskImage: 'url(static/img/featured-mask-2.png)',
							WebkitMaskSize: 'contain',
							WebkitMaskRepeat: 'no-repeat',
							WebkitMaskPosition: 'center',
							maskImage: 'url(static/img/featured-mask-2.png)',
							maskSize: 'contain',
							maskRepeat: 'no-repeat',
							maskPosition: 'center',
						};
						const postsStyle2 = {
							marginTop: '30px',
							marginBottom: '10px',
							WebkitMaskImage: 'url(static/img/featured-mask-2-rev.png)',
							WebkitMaskSize: 'contain',
							WebkitMaskRepeat: 'no-repeat',
							WebkitMaskPosition: 'center',
							maskImage: 'url(static/img/featured-mask-2-rev.png)',
							maskSize: 'contain',
							maskRepeat: 'no-repeat',
							maskPosition: 'center',
						};
						return (
							<div className="posts-slider-container" key={'nav-id-' + i}>
								<img className="posts-carousel-img" style={ (i + 1) % 2 ? postsStyle2 : postsStyle1 } src={post.image.url}></img>
								<p style={ { fontSize: '0.75rem', color: '#000', textAlign: 'center', paddingTop: '10px', fontWeight: '100' } }>{postDate}</p>
								<a className="posts-slider-link" href={`post?title=${post.title}&id=${post._id}`}>
									<h5 style={ { fontSize: '0.9rem', padding: '0 30px', fontWeight: '300' } }>{post.title}</h5>
								</a>
								<p className={`xtra-small-post-cat-${post.category}`}>{post.category}</p>
							</div>
						);
					}) }
					</Slider>
				</div>
				</InViewMonitor>
			</div>
		);
	}
}
