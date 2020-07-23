import React from 'react';
import Link from 'next/link';
import 'isomorphic-fetch';

export default class BrandLogo extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			logo: '',
			error: null,
			loading: false,
		};
	}
	componentWillMount () {
		this.loadData();
	}

	loadData () {
		this.setState({
			error: null,
			loading: true
		});
		return fetch(`api/company-details`)
			.then(res => {
				if (!res.ok) {
					return Promise.reject(res.statusText);
				}
				return res.json();
			})
			.then(data => {
				this.setState({
					logo: data[0].logo.url,
					loading: false,
				});
			})
			.catch(err =>
				this.setState({
					error: 'Uhoh.. Unable to load company logo :(',
					errorMessage: err,
					loading: false,
				})
			);
	}

	render () {
		return (
			<Link href="/">
				<a className={`navbar-brand`} ><img src={`${this.state.logo}`} alt=""  aria-hidden="true"/></a>
			</Link>
		);
	}
}
