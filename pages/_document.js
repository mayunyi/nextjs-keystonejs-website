import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

export default class MyDocument extends Document {
	static getInitialProps ({ renderPage }) {
		const { html, head, errorHtml, chunks } = renderPage();
		const styles = flush();
		return { html, head, errorHtml, chunks, styles };
	}

	render () {
		return (
			<html lang="ET">
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
					<link rel="stylesheet" type="text/css" href="/static/css/modern-normalize.css" />
					<link async rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossOrigin="anonymous"/>
					<link async rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:100,300,500,700,900&display=swap&subset=cyrillic"/>
					<link async rel="stylesheet" type="text/css" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"></link>
					<link rel="stylesheet" type="text/css" href="static/css/layout.css" />
					<link rel="stylesheet" type="text/css" href="static/css/slick.min.css" />
					<link rel="stylesheet" type="text/css" href="static/css/slick-theme.css" />
					<link rel="stylesheet" type="text/css" href="static/css/queries.css" />
					<link rel="stylesheet" type="text/css" href="static/css/animate.min.css"/>
					<script src="../static/js/jquery.modrnzr.min.js"></script>
				</Head>
				<body>
					<Main />
					<script src="../static/js/bootstrap.min.js" async></script>
					<script src="../static/js/custom.js" async></script>
					<script src="https://cdn.polyfill.io/v2/polyfill.js?features=IntersectionObserver" async></script>
					<NextScript />
				</body>
			</html>
		);
	}
}
