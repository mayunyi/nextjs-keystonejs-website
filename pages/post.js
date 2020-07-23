import { withRouter } from 'next/router';
import Layout from '../components/Layout';
import AltHeader from '../components/header/AltHeader';
import TopBanner from '../components/header/TopBanner';
import Post from '../components/post/Post';

const Content = withRouter((props) => (
  <div>
    <Post title={props.router.query.title} id={props.router.query.id} />
  </div>
));

const Page = () => (
	<Layout>
		<AltHeader />
		<TopBanner />
		<Content />
	</Layout>
);

export default Page;
