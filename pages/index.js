import React from 'react';
import dynamic from 'next/dynamic';
import TagManager from 'react-gtm-module';
import Layout from '../components/Layout';
import Head from 'next/head';
import Header from '../components/header/Header';
import BrandSlider from '../components/slider/FrontPageBrands';
import SlitSlider from '../components/slider/SlitSlider';
import FeaturedNews from '../components/featured/FeaturedNews';
import PartnersList from '../components/brands/PartnersList';
import InViewMonitor from '../components/scroll/InviewMonitor';

const PartnerCarousel = dynamic(import('../components/slider/PartnerCarousel'));

export default class Index extends React.Component {
	componentDidMount () {
		const tagManagerArgs = {
			gtmId: 'xxxxxxxxxx',
		};
		TagManager.initialize(tagManagerArgs);
	}
	render() {
		const indexPage = true;
		return (
			<Layout>
				<Head>
					<title>Salonshop Baltic AS - 25 aastat kogemust ilumaailmas</title>
					<meta name="description" content="xxxxxxx" />
					<meta name="keywords" content="" />
					<meta property="og:type" content="website"/>
					<meta property="og:title" content="xxxxxx" />
					<meta property="og:url" content="https://www.xxxxxxxxxxxx.ee/" />
					<meta property="og:description" content="xxxxx" />
					<meta property="og:image" content="https://www.xxxxxxxxxxxx.ee/static/img/company/-c27CdugK2zDn_4C.jpg" />
				</Head>
        <Header isIndexPage={indexPage} />
				<InViewMonitor
					classNameNotInView='hidden'
					classNameInView='animated fadeInDown'>
					<SlitSlider />
				</InViewMonitor>
				<InViewMonitor
					classNameNotInView='hidden'
					classNameInView='animated fadeInUp'>
					<BrandSlider />
				</InViewMonitor>
				<InViewMonitor
					classNameNotInView='hidden'
					classNameInView='animated fadeInUp'>
					<FeaturedNews />
				</InViewMonitor>
				<InViewMonitor
					classNameNotInView='hidden'
					classNameInView='animated fadeInUp'>
					<PartnersList />
				</InViewMonitor>
				<InViewMonitor
					classNameNotInView='hidden'
					classNameInView='animated fadeInUp'>
					<PartnerCarousel />
				</InViewMonitor>
			</Layout>
		)
	}
}