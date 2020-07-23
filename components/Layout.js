import Footer from './footer/Footer'

const Layout = (props) => (
  <div className="container-fluid">
    {props.children}
    <Footer />
  </div>
);

export default Layout