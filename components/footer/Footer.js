import React from 'react';
import Link from 'next/link';
import Locator from '../locator/Locator';
import CompanyDetails from './CompanyDetails';
import Formik from './Formik';
import InViewMonitor from '../scroll/InviewMonitor';

export default class Footer extends React.Component {
  render() {
    const year = new Date().getFullYear();
    return(
      <div>
        <div className='container-fluid'>
          <InViewMonitor
          classNameNotInView='hidden'
          classNameInView='animated fadeInUp'>
            <Locator />
          </InViewMonitor>
        </div>
        <div className="footer container-fluid">
          <InViewMonitor
          classNameNotInView='hidden'
          classNameInView='animated fadeInUp'>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  {/* <h2>Võta ühendust</h2> */}
                </div>
                <CompanyDetails />
                <Formik />
              </div>
            </div>
        </InViewMonitor>
        <InViewMonitor
          classNameNotInView='hidden'
          classNameInView='animated fadeInUp'
          intoViewMargin='0%'>
            <div className="footer-logo">
            </div>
            <div className="footer-social">
              <Link href="https://www.facebook.com/salon24.eu/">
                <a target="_blank" rel="noopener"><i className="fab fa-facebook-square"></i></a>
              </Link>
              <Link href="https://www.instagram.com/salon24.eu/">
                <a target="_blank" rel="noopener"><i className="fab fa-instagram"></i></a>
              </Link>
              <Link href="https://www.linkedin.com/company/salonshop-baltic-as/">
                <a target="_blank" rel="noopener"><i className="fab fa-linkedin nav-item"></i></a>
              </Link>
            </div>
            <div className="copy_right_area">
              <div className="text-center">
                  <h6>&copy;{year} Salonshop Baltic AS | Kõik õigused kaitstud.</h6>
              </div>
            </div>
          </InViewMonitor>
        </div>
      </div>
    );
  }
}