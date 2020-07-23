import React, { Component } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import promise from 'es6-promise';
import 'isomorphic-fetch';

import SlitSliderInit from './SlitSliderInit';

promise.polyfill();

export default class SlitSlider extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			slides: [],
			error: null,
			loading: false,
		};
	}

	componentDidMount () {
		SlitSliderInit();
	}

	render () {

		return (
			<div id="sl-slider" className="sl-slider-wrapper">
				<div className="sl-slider">

				<div className="sl-slide" data-orientation="horizontal" data-slice1-rotation="-25" data-slice2-rotation="-25" data-slice1-scale="2" data-slice2-scale="2">
						<div className="sl-slide-inner">
							<LazyLoadComponent
							delayTime={300}
							>
								<div className="bg-img bg-img-1" style={{ backgroundImage: 'url(../img/slides/SS-Kodukas-Eelised-KOGEMUS-salonplus3.jpg)' }}>
								</div>
								<h2>25 aastat kogemust</h2>
								<blockquote>
									<p>Salonshop Baltic AS on enam kui 25-aastase kogemusega pereettevõte.
										<br/>
										Pakume tunnustatud kaubamärkide ilu- ja juuksehooldustooteid nii edasimüüjatele kui ka salongidele.
										Meie tooteportfell on hoolikalt valitud ning sobitub seetõttu hästi koduturu vajadustega.
										<br/>
										Salonshop tooted on kindel valik Sinu tooteriiulil. Juhuse hooleks ei jää miski!
									</p>
								</blockquote>
							</LazyLoadComponent>
						</div>
					</div>

					<div className="sl-slide" data-orientation="horizontal" data-slice1-rotation="-25" data-slice2-rotation="-25" data-slice1-scale="2" data-slice2-scale="2">
						<div className="sl-slide-inner">
							<LazyLoadComponent
							delayTime={300}
							>
							<div className="bg-img bg-img-2" style={{ backgroundPosition: 'left', backgroundImage: 'url(../img/slides/SS-Kodukas-turundus-salonplus.jpg)' }}></div>
							<h2>Müük ja turundus</h2>
							<blockquote>
								<p>
								Meile on ladus ja sisukas koostöö partnerite ja klientidega väga oluline ja seepärast pakume täisteenust: 
								esindame erinevaid tooteid, mille hulgast aitame teha sobiva valiku, 
								nõustame toodete väljapanekute osas, 
								toetame kampaaniate ettevalmistamist ning vajadusel aitame kliente kampaaniamaterjalide teostamisega.
								<br></br>
								Selle kõige nimel teevad meie turundus- ja müügiosakond tihedat koostööd.
								</p>
							</blockquote>
							</LazyLoadComponent>
						</div>
					</div>

					<div className="sl-slide" data-orientation="horizontal" data-slice1-rotation="3" data-slice2-rotation="3" data-slice1-scale="2" data-slice2-scale="1">
						<div className="sl-slide-inner">
							<LazyLoadComponent
							delayTime={300}
							>
							<div className="bg-img bg-img-3" style={{ backgroundImage: 'url(../img/slides/SS-Kodukas-Eelised-KOGEMUS-Transport.jpg)' }}></div>
							<h2>Kiire transport</h2>
							<blockquote>
								<p>Hästitoimiv koostöö pikaajaliste logistikapartneritega võimaldab meil pakkuda turvalist ja kiiret toodete transporti kogu Baltikumis. Sealjuures ei jäta me tähelepanuta ka saadetiste esteetilist poolt.</p>
							</blockquote>
							</LazyLoadComponent>
						</div>
					</div>

					<div className="sl-slide" data-orientation="horizontal" data-slice1-rotation="-25" data-slice2-rotation="-25" data-slice1-scale="2" data-slice2-scale="2">
						<div className="sl-slide-inner">
							<LazyLoadComponent
							delayTime={300}
							>
							<div className="bg-img bg-img-4" style={{ backgroundImage: 'url(../img/slides/Xs4cAxmeDIGyeRHz.jpg)' }}></div>
							<h2>Koolituskeskus</h2>
							<blockquote>
								<p>
								Oleme ilutegijaid koolitanud juba ligi 13 aastat. Salonshop koolituskeskuses toimuvad seminarid ja töötoad juuksuritele, barberitele, ilusalongide juhtidele ning müügikonsultantidele. Lisaks juukselõikuse- ja värvimistehnikatele paneme rõhku ka uute oskuste rakendamisele igapäevatöös, see aitab meil anda omapoolse panuse iluvaldkonna teenindus- ja teenuse arengusse.
								</p>
							</blockquote>
							</LazyLoadComponent>
						</div>
					</div>

				</div>
				<nav id="nav-arrows" className="nav-arrows">
					<span className="nav-arrow-prev">Previous</span>
					<span className="nav-arrow-next">Next</span>
				</nav>
				<nav id="nav-dots" className="nav-dots">
					<span className="nav-dot-current" />
					<span />
					<span />
					<span />
				</nav>
			</div>
		);

	}
}
