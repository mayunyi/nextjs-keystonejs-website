import React, { Component } from "react";
import 'isomorphic-fetch';
const utils = require('keystone-utils');

export default class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      firstParagraph: '',
      secondParagraph: '',
      bodyImage: '',
      bodyImageAltText: '',
      error: null,
      loading: false
    };
  }
  componentDidMount() {
    this.loadData();
  }
  
  loadData() {
    this.setState({
      error: null,
      loading: true
    });
    return fetch(`/api/company-details`)
      .then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          title: data[0].title,
          firstParagraph: data[0].firstParagraph,
          secondParagraph: data[0].secondParagraph,
          bodyImage: data[0].bodyImage,
          bodyImageAltText: data[0].bodyImageAltText,
          loading: false
        });
      })
      .catch(err =>
        this.setState({
          error: 'Could not load company details',
          errorMessage: err,
          loading: false
        })
      );
  }

  render() {
    const bgImg = { 
      background: `url('${this.state.bodyImage.url}')  no-repeat center center`, 
      WebkitBackgroundSize: 'cover',
      MozBackgroundSize: 'cover',
      OBackgroundSize: 'cover',
      backgroundSize: 'cover',
      WebkitMaskImage: 'url(static/img/featured-mask-1.png)',
      WebkitMaskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskImage: 'url(static/img/featured-mask-1.png)',
      maskSize: 'contain',
      maskRepeat: 'no-repeat',
      maskPosition: 'center' };
    return (
      <div className="container about-container">
        <div className="row">
          <div className="col-lg-12  col-xl-6 about-img" style={bgImg}></div>
          <div className="col-lg-12 col-xl-6 about-texts about-page-texts">
            <h2>{utils.htmlToText(utils.decodeHTMLEntities(this.state.title))}</h2>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  
                  <div className="row">
                    <div className="first-paragraph col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    {utils.htmlToText(utils.decodeHTMLEntities(this.state.firstParagraph))}
                    </div>
                    <div className="second-paragraph col-sm-12 col-md-12 col-lg-12 col-xl-6">
                    {utils.htmlToText(utils.decodeHTMLEntities(this.state.secondParagraph))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
