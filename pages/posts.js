import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import TagManager from 'react-gtm-module';
import Layout from '../components/Layout';
import AltHeader from '../components/header/AltHeader';
import TopBanner from '../components/header/TopBanner';
import InViewMonitor from '../components/scroll/InviewMonitor';
import 'isomorphic-fetch';

export default class Posts extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			posts: [],
			loading: false,
		};
	}
	componentWillMount () {
		this.loadData();
	}
	componentDidMount () {
		const tagManagerArgs = {
			gtmId: 'xxxxxxxxxxxx',
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
			})
			.catch(err =>
				this.setState({
					error: 'Could not load posts',
					errorMessage: err,
					loading: false,
				})
			);
	}

	render () {
		return (
			<Layout>
				<Head>
					<title>Kõik uudised</title>
					<meta name="description" content="xxxxx" />
					<meta name="keywords" content="" />
					<meta property="og:type" content="website"/>
					<meta property="og:title" content="xxxxx" />
					<meta property="og:url" content="https://www.xxxxxxxxxxx.ee/posts" />
					<meta property="og:description" content="xxxxx" />
					<meta property="og:image" content="https://www.xxxxxxxxxxx.ee/static/img/company/-c27CdugK2zDn_4C.jpg" />
				</Head>
				<AltHeader />
				<TopBanner />
				<InViewMonitor
				classNameNotInView='hidden'
				classNameInView='animated fadeInUp'>
					<div className="container-fluid all-posts-banner">
						<div className="row">
							<h1>Kõik uudised</h1>
						</div>
					</div>
				</InViewMonitor>
				<div className="container news-container">
					<div className="row">
						{ this.state.posts.map((post, i) => {
							const postsStyle1 = {
								color: '#fff',
								background: `url(${post.image.url ? post.image.url : 'static/img/news-mock-img-735x640px.jpg'}) no-repeat center`,
								backgroundSize: 'cover',
								marginBottom: '40px',
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
								color: '#fff',
								background: `url(${post.image.url ? post.image.url : 'static/img/news-mock-img-735x640px.jpg'}) no-repeat center`,
								backgroundSize: 'cover',
								marginBottom: '40px',
								WebkitMaskImage: 'url(static/img/featured-mask-2-rev.png)',
								WebkitMaskSize: 'contain',
								WebkitMaskRepeat: 'no-repeat',
								WebkitMaskPosition: 'center',
								maskImage: 'url(static/img/featured-mask-2-rev.png)',
								maskSize: 'contain',
								maskRepeat: 'no-repeat',
								maskPosition: 'center',
							};
							const date = new Date(post.publishedDate);
							const dateOptions = {
								day: '2-digit',
								month: 'short',
								year: 'numeric',
							};
							const datesFormatted = new Intl.DateTimeFormat('et-EE', dateOptions).format(date);
							return (
								
								<div className={`col-lg-4 col-md-4 col-sm-6 col-12 grid-item-${i}`} key={i}>
									<InViewMonitor
										classNameNotInView='hidden'
										classNameInView='animated fadeInUp'>
										<p className={`small-post-cat-${post.category}`}>{post.category}</p>
										<div className='post small-post' style={ (i + 1) % 2 ? postsStyle2 : postsStyle1 }>
											<div className="small-post-container">
												<div className="small-post-info">
													<p className="entry__meta-small">{datesFormatted}</p>
													<Link href={`/post?title=${post.title}&id=${post._id}`}>
														<a><h2 style={{ color: '#fff', textAlign: 'left' }}>{post.title}</h2></a>
													</Link>
												</div>
											</div>
										</div>
									</InViewMonitor>
								</div>
							);
						})
						}
					</div>
				</div>
			</Layout>
		);
	};
}
