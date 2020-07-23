import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'isomorphic-fetch';

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  }
  render() {
    return (
      <Formik
        initialValues={this.state}
        validationSchema={Yup.object().shape({
          name: Yup.string()
              .required('Nime väli on tühi'),
          email: Yup.string()
              .email('Vale e-posti aadressi formaat')
              .required('E-posti väli on tühi'),
          phone: Yup.number('Sa ei sisestanud numbreid')
              .required('Telefoninumbri väli on tühi'),
          message:  Yup.string()
              .required('Sõnumi väli on tühi')
        })}
        onSubmit={fields => {
          fetch('/api/enquiry', {
            method: 'POST',
            body: JSON.stringify(fields), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
            .then(response => {
              console.log(fields)
              console.log('Success:', JSON.stringify(response))
              alert('Teade on edastatud! Täname!')
              document.getElementById("js-form-reset-btn").click();
            })
            .catch(error => console.error('Error:', error));
        }}
        render={({ errors, status, touched }) => (
          <div className="col-lg-6">
            <div className="contact_form">
              <div>
                <h2>Võta ühendust</h2>
              </div>
              <Form>
                <div className="form-group">
                    <label htmlFor="name">Sinu nimi</label>
                    <Field name="name" type="text" placeholder="Sinu nimi" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Sinu e-post</label>
                    <Field name="email" type="text" placeholder="Sinu e-post" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefon</label>
                    <Field name="phone" type="text" placeholder="Sinu telefon" className={'form-control' + (errors.phone && touched.phone ? ' is-invalid' : '')} />
                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Sinu sõnum</label>
                    <Field name="message" component="textarea" rows="4" placeholder="Sinu sõnum" className={'form-control' + (errors.message && touched.message ? ' is-invalid' : '')} />
                    <ErrorMessage name="message" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-2">Saada sõnum</button>
                    <button id="js-form-reset-btn" type="reset" className="btn btn-secondary">Tühjenda väljad</button>
                </div>
              </Form>
              </div>
          </div>
        )}
      />
    )
  }
}