import { Component } from 'react';
import 'isomorphic-fetch';

export default class CompanyDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      bank: '',
      email: '',
      phone: '',
      zip: '',
      country: '',
      logo: '',
      open: {
        workDays: '',
        weekends: ''
      },
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
          name: data[0].name,
          address: data[0].address,
          bank: data[0].bank,
          email: data[0].email,
          phone: data[0].phone,
          city: data[0].city,
          zip: data[0].zip,
          country: data[0].country,
          logo: data[0].logo.secure_url,
          open: {
            workDays: data[0].openHours.workDays,
            weekends: data[0].openHours.weekends
          },
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
    return (
      <div className="col-lg-6 company-details">
        <div className="contact_text">
          <div className="contact_d_list container">
          <div>
            <h2>Peakontor ja esinduskauplus</h2>
          </div>
          <div className="contact_d_list_data">
            <div className="contact_d_list_item row">
              <div className="col-2">
                <i className="fas fa-map-marker-alt" style={{paddingRight: '3px'}}></i>
              </div>
              <div className="col-10">
                <p>{this.state.address}, {this.state.zip} {this.state.city}</p>
              </div>
            </div>
              <div className="contact_d_list_item row">
                <div className="col-2 footer-phone">
                  <i className="fas fa-mobile-alt" style={{paddingRight: '4px'}}></i>
                </div>
                <div className="col-10 footer-phone">
                  <a href={`tel:${this.state.phone}`}><p>{this.state.phone}</p></a>
                </div>
              </div>
              <div className="contact_d_list_item row">
                <div className="col-2">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="col-10">
                  <a href={`mailto:${this.state.email}`}><p>{this.state.email}</p></a>
                </div>
              </div>
              <div className="contact_d_list_item row">
                <div className="col-2">
                  <i className="far fa-clock"></i>
                </div>
                <div className="col-10">
                  <p>{this.state.open.workDays} <br></br>{this.state.open.weekends}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}