import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import InViewMonitor from '../scroll/InviewMonitor';

function LightBox(props) {
const [lightboxController, setLightboxController] = useState({
toggler: false,
slide: 1
});

function openLightboxOnSlide (number) {
	setLightboxController({
			toggler: !lightboxController.toggler,
			slide: number,
			}
		);
	}
	return (
	<section>
		<div className="container" style={{marginBottom: '50px'}}>
		<InViewMonitor
			classNameNotInView='hidden'
			classNameInView='animated fadeInUp'>
			<div className="row">
				<h2 className="post-gallery-header">Ürituse galerii</h2>
			</div>
			</InViewMonitor>
			<div className="row gallery-container">
				{ props.urls.map((url, i) => {
					return (
						<InViewMonitor
							classNameNotInView='hidden'
							classNameInView='animated fadeInUp'
							key={i + 1}>
							<a style={{margin: '0 auto'}} onClick={ () => openLightboxOnSlide(i + 1) }>
								<img src={url} alt=""></img>
							</a>
						</InViewMonitor>
						);
					})
				}
			</div>
		</div>

		<FsLightbox
			toggler={ lightboxController.toggler }
			slide={ lightboxController.slide }
			sources={props.urls}
		/>
		</section>
	);
}

export default LightBox;
