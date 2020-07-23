import React from 'react';
import TagManager from 'react-gtm-module';
import Layout from '../components/Layout';
import AltHeader from '../components/header/AltHeader';
import TopBanner from '../components/header/TopBanner';
import InViewMonitor from '../components/scroll/InviewMonitor';
import ContactsBanner from '../components/contacts/ContactsBanner';
const utils = require('keystone-utils');

export default class Contacts extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			contacts: [],
			loading: false,
		};
	}
	componentWillMount () {
		this.loadData();
	}
	componentDidMount () {
		const tagManagerArgs = {
			gtmId: 'xxxxxxxxxx',
		};
		TagManager.initialize(tagManagerArgs);
	}
	loadData () {
		this.setState({
			error: null,
			loading: true,
		});
		return fetch(`api/contacts`)
			.then(res => {
				if (!res.ok) {
					return Promise.reject(res.statusText);
				}
				return res.json();
			})
			.then(data => {
				this.setState({
					contacts: data,
				});
			})
			.catch(err =>
				this.setState({
					error: 'Could not load contacts',
					errorMessage: err,
					loading: false,
				})
			);
	}

	render () {
		return (
			<Layout>
				<AltHeader />
				<TopBanner />
				<InViewMonitor
				classNameNotInView='hidden'
				classNameInView='animated fadeInUp'>
					<ContactsBanner />
				</InViewMonitor>
				<div className="container-fluid contacts-list">
					<div className="container">
						<div className="row">
							{ this.state.contacts.map((contact, i) => {
								const postsStyle1 = {
									margin: '15px 15px 0',
									WebkitMaskImage: 'url(static/img/featured-mask-2.png)',
									WebkitMaskSize: 'contain',
									WebkitMaskRepeat: 'no-repeat',
									WebkitMaskPosition: 'center',
									maskImage: 'url(static/img/featured-mask-2.png)',
									maskSize: 'contain',
									maskRepeat: 'no-repeat',
									maskPosition: 'center'
								}
								const postsStyle2 = {
									margin: '15px 15px 0',
									WebkitMaskImage: 'url(static/img/featured-mask-2-rev.png)',
									WebkitMaskSize: 'contain',
									WebkitMaskRepeat: 'no-repeat',
									WebkitMaskPosition: 'center',
									maskImage: 'url(static/img/featured-mask-2-rev.png)',
									maskSize: 'contain',
									maskRepeat: 'no-repeat',
									maskPosition: 'center'
								}
								return (
									<div className="col-lg-4 col-md-6" key={i}>
										
										<InViewMonitor
										classNameNotInView='hidden'
										classNameInView='animated fadeInUp'>
											<div className="contact-item">
												<div className="contact-img" style={
													(i + 1) % 2 ? postsStyle2 : postsStyle1}>
													<img
													className="img-fluid"
													alt=""
													src={contact.image.url}
													effect="black-and-white"
													/>
												</div>
												<div className="contact-content">
													<h2>{utils.decodeHTMLEntities(contact.name.first)} {utils.decodeHTMLEntities(contact.name.last)}</h2>
													<p>{utils.decodeHTMLEntities(contact.position)}</p>
													<div className="unit-member-email">
														<a href={`mailto:${contact.email}`}>{contact.email}</a>
														<a href={`tel:${contact.phone}`}>{contact.phone}</a>
													</div>
												</div>
											</div>
										</InViewMonitor>
									</div>
								)
							}) }
						</div>
					</div>
				</div>
			</Layout>
		);
	};
}
