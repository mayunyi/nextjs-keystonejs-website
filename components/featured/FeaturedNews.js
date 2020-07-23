import React from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import 'isomorphic-fetch';

const utils = require('keystone-utils');

export default class Featured extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			firstPostId: '',
			firstPostTitle: '',
			firstPostBrief: '',
			firstPostCategory: '',
			firstPostImg: '',
			firstPostDate: '',
			secondPostId: '',
			secondPostTitle: '',
			secondPostBrief: '',
			secondPostCategory: '',
			secondPostImg: '',
			secondPostDate: '',
			thirdPostId: '',
			thirdPostTitle: '',
			thirdPostBrief: '',
			thirdPostCategory: '',
			thirdPostImg: '',
			thirdPostDate: '',
			loading: false,
			error: null
		}
	}
	componentDidMount () {
		this.loadData();
	}
	loadData () {
		this.setState({
			error: null,
			loading: true
		});
		return fetch(`/api/posts`)
			.then(res => {
				if (!res.ok) {
					return Promise.reject(res.statusText);
				}
				return res.json();
			})
			.then(data => {
				const dateOptions = { 
					day: '2-digit',
					month: 'short',
					year: 'numeric',
				};
				const date1 = new Intl.DateTimeFormat('et-EE', dateOptions).format(new Date(data[0].publishedDate));
				const date2 = new Intl.DateTimeFormat('et-EE', dateOptions).format(new Date(data[1].publishedDate));
				const date3 = new Intl.DateTimeFormat('et-EE', dateOptions).format(new Date(data[2].publishedDate));
				this.setState({
					firstPostId: data[0]._id,
					firstPostTitle: data[0].title,
					firstPostBrief: data[0].content.brief,
					firstPostCategory: data[0].category,
					firstPostImg: data[0].image.url,
					firstPostDate: date1,
					secondPostId: data[1]._id,
					secondPostTitle: data[1].title,
					secondPostBrief: data[1].content.brief,
					secondPostCategory: data[1].category,
					secondPostImg: data[1].image.url,
					secondPostDate: date2,
					thirdPostId: data[2]._id,
					thirdPostTitle: data[2].title,
					thirdPostBrief: data[2].content.brief,
					thirdPostCategory: data[2].category,
					thirdPostImg: data[2].image.url,
					thirdPostDate: date3,
					loading: false
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

	render() {
		return (
			<div>
			<div className="container featured-wrapper">
				<div className="row">
					<LazyLoadComponent
					delayTime={300}
					>
					<div className="featured__column featured__column--big col-sm-12 col-md-7 col-lg-7">
						<span className={`entry__category entry__category_${this.state.firstPostCategory} entry__category_${this.state.firstPostCategory}-Big`}>
							{this.state.firstPostCategory}
						</span>
						<div className="spacer"></div>
						<a href={`/post?${this.state.firstPostTitle}&id=${this.state.firstPostId}`}>
							<div className="entry entry-featured-big" style={{
								backgroundImage: `url('${this.state.firstPostImg ? this.state.firstPostImg : 'static/img/news-mock-img-735x640px.jpg'}')`, 
								borderRadius: '15px 0 0 15px', 
								backgroundRepeat: 'no-repeat', 
								backgroundSize: 'cover',
								WebkitMaskImage: 'url(static/img/featured-mask-1.png)',
								WebkitMaskSize: 'contain',
								WebkitMaskRepeat: 'no-repeat',
								WebkitMaskPosition: 'center',
								maskImage: 'url(static/img/featured-mask-1.png)',
								maskSize: 'contain',
								maskRepeat: 'no-repeat',
								maskPosition: 'center'}}>
								
								<div className="entry__content">
									
									<div className="entry-container">
										<span className="entry__meta">{this.state.firstPostDate}</span>
										<h1>{utils.decodeHTMLEntities(this.state.firstPostTitle)}</h1>
										{utils.htmlToText(utils.decodeHTMLEntities(this.state.firstPostBrief))}
									</div>
								</div> {/* end entry__content */}
							</div> {/* end entry */}
						</a>
					</div>
					</LazyLoadComponent>
					<LazyLoadComponent
					delayTime={300}
					>
					<div className="featured__column featured__column--small col-sm-12 col-md-5 col-lg-5">
						<div>
							<span className={`entry__category entry__category_${this.state.secondPostCategory}_Small_1 entry__category_${this.state.secondPostCategory}`}>
								{this.state.secondPostCategory}
							</span>
							<a href={`/post?title=${this.state.secondPostTitle}&id=${this.state.secondPostId}`}>
								<div className="entry  entry-featured-small-1" style={{
									backgroundImage: `url('${this.state.secondPostImg ? this.state.secondPostImg : 'static/img/news-mock-img-735x640px.jpg'}')`, 
									backgroundRepeat: 'no-repeat', 
									backgroundSize: 'cover',
									WebkitMaskImage: 'url(static/img/featured-mask-2.png)',
									WebkitMaskSize: 'contain',
									WebkitMaskRepeat: 'no-repeat',
									WebkitMaskPosition: 'center',
									maskImage: 'url(static/img/featured-mask-2.png)',
									maskSize: 'contain',
									maskRepeat: 'no-repeat',
									maskPosition: 'center'}}>
									<div className="entry__content entry__content-small entry__content-small-1">
										<div className="entry-container-small">
											<span className="entry__meta-small">{this.state.secondPostDate}</span>
											<h1>{utils.decodeHTMLEntities(this.state.secondPostTitle)}</h1>
										</div>
									</div> {/* end entry__content */}
								</div> {/* end entry */}
							</a>
						</div>
						<span className={`entry__category entry__category_${this.state.secondPostCategory}_Small_2 entry__category_${this.state.thirdPostCategory} entry__category_${this.state.thirdPostCategory}_2`}>
							{this.state.thirdPostCategory}
						</span>
						<a href={`/post?${this.state.thirdPostTitle}&id=${this.state.thirdPostId}`}>
							<div className="entry  entry-featured-small-2" style={{
								backgroundImage: `url('${this.state.thirdPostImg ? this.state.thirdPostImg : 'static/img/news-mock-img-735x640px.jpg'}')`, 
								backgroundRepeat: 'no-repeat', 
								backgroundSize: 'cover',
								WebkitMaskImage: 'url(static/img/featured-mask-3.png)',
								WebkitMaskSize: 'contain',
								WebkitMaskRepeat: 'no-repeat',
								WebkitMaskPosition: 'center',
								maskImage: 'url(static/img/featured-mask-3.png)',
								maskSize: 'contain',
								maskRepeat: 'no-repeat',
								maskPosition: 'center'}}>
								<div className="entry__content entry__content-small entry__content-small-2">
									<div className="entry-container-small entry-container-small-2 ">
										<span className="entry__meta-small">{this.state.thirdPostDate}</span>
										<h1>{utils.decodeHTMLEntities(this.state.thirdPostTitle)}</h1>
									</div>
								</div> {/* end entry__content */}
							</div> {/* end entry */}
						</a>
					</div> 
					<div style={{position: 'relative', width: '100%'}}>
						<a className="featured-link col-sm-12 col-md-3" href="/posts">VAATA KÕIKI <img src="static/img/right-arrow.svg" alt=""></img></a>
					</div>
					</LazyLoadComponent>
				</div>
			</div>
			<svg className="img-fluid" height="0" width="0">
					<defs>
							<clipPath id="svgPath">
									<path fill="#FFFFFF" stroke="#000000" strokeWidth="1.5794" strokeMiterlimit="10" d="M215,100.3c97.8-32.6,90.5-71.9,336-77.6
			c92.4-2.1,98.1,81.6,121.8,116.4c101.7,149.9,53.5,155.9,14.7,178c-96.4,54.9,5.4,269-257,115.1c-57-33.5-203,46.3-263.7,20.1
			c-33.5-14.5-132.5-45.5-95-111.1C125.9,246.6,98.6,139.1,215,100.3z"></path>
							</clipPath>
					</defs>
			</svg>
			</div>
				
		) 
	}
}