import React from 'react';
import InViewMonitor from '../scroll/InviewMonitor';
import 'isomorphic-fetch';

const utils = require('keystone-utils');

export default class Featured extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			benefits: [],
			isActive: 0,
			error: null,
			loading: false,
			ssrDone: false,
		};
		this.viewBenefit = this.viewBenefit.bind(this);

	}

	viewBenefit (key) {
		this.setState({
			isActive: key,
		});
	}

	componentDidMount () {
		this.setState({
			error: null,
			loading: true,
		});
		return fetch(`/api/benefits`)
			.then(res => {
				if (!res.ok) {
					return Promise.reject(res.statusText);
				}
				return res.json();
			})
			.then(benefits => {
				this.setState({
					benefits: benefits,
					loading: false,
					ssrDone: true,
				});
			})
			.catch(err =>
				this.setState({
					error: 'Uhoh.. Unable to load benefits :(',
					errorMessage: err,
					loading: false,
				})
			);
	}
	render () {
		return (
			<InViewMonitor
				classNameNotInView='hidden'
				classNameInView='animated fadeInDown'>
				<div className="container-fluid">
					<div className="row">
						<div className="benefit-container">
						{ this.state.benefits.map((benefit, i) => {
							return (
								<div className={`benefit-large benefits-bg-${i + 1} col-sm-12 col-md-12 col-lg-12 animated fadeInDown ${this.state.isActive === i ? '' : 'inactive'}`} key={i}>
									<img style={{ display: 'block', margin: '0 auto' }} src={benefit.image.url} alt={benefit.image.alt} />
									<div className="benefit-text">
										<h3 style={{ textAlign: 'center' }}>{benefit.title}</h3>
										<p>{utils.htmlToText(utils.decodeHTMLEntities(benefit.body))}</p>
									</div>
								</div>
							);
						})
						}
						<div className="benefit-thumbs">
						{ this.state.benefits.map((benefit, i) => {
							return (
								<div className={`benefit-thumb ${this.state.isActive !== i ? '' : 'inactive'}`} onClick={() => this.viewBenefit(i)} key={i}>
									<img style={{ display: 'block', margin: '0 auto' }} src={benefit.image.url} alt={benefit.image.alt} />
								</div>
							);
						})
						}
						</div>
						</div>
					</div>
				</div>
			</InViewMonitor>
		);
	}
}
