import React from 'react';
import Link from 'next/link';
import FixedNavBar from './FixedNavBar';
import BrandLogo from './BrandLogo';

export default class HeaderNav extends React.Component {
	componentDidMount () {
		FixedNavBar();
	}
	render () {
		return (
			<header className="main-menu-area alt-main-menu-area">
				<nav className="navbar navbar-expand-lg navbar-light">
					<BrandLogo isIndexPage={this.props.isIndexPage} />
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						Menüü
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link href="/posts"><a className="nav-link">Uudised</a></Link>
							</li>
							<li className="nav-item"><a href="https://www.salon24.eu/asa" className="nav-link" target="_blank" rel="noopener">Koolitused</a></li>
							<li className="nav-item">
								<Link href="/contacts"><a className="nav-link">Kontaktid</a></Link>
							</li>
							<li className="nav-item"><a href="https://www.salon24.eu" className="nav-link" target="_blank" rel="noopener">E-pood</a></li>
						</ul>
						<ul className="navbar-nav nav-icons justify-content-end">
							<li className="nav-fb"><a href="https://www.facebook.com/salon24.eu/" target="_blank" rel="noopener"><i className="fab fa-facebook-square"></i></a></li>
							<li className="nav-insta"><a href="https://www.instagram.com/salon24.eu/" target="_blank" rel="noopener"><i className="fab fa-instagram"></i></a></li>
							<li className="nav-linkedin"><a href="https://www.linkedin.com/company/salonshop-baltic-as/" target="_blank" rel="noopener"><i className="fab fa-linkedin"></i></a></li>
						</ul>
					</div>
				</nav>
			</header>
		);
	}
}
