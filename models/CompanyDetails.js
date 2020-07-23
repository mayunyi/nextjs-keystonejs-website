var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * CompanyDetails Model
 * ==========
 */

var CompanyDetails = new keystone.List('CompanyDetails', {
	map: { name: 'name' },
	nocreate: false,
	nodelete: true,
  autocreate: true
});

var storage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  schema : {
    url: true,
	},
  fs: {
      path: './static/img/company/',
      publicPath: './static/img/company/',
  }
});

CompanyDetails.add({
	name: { type: Types.Text, min: 1, max: 100, initial: true },
	email: { type: Types.Email },
	phone: { type: String },
	address: { type: Types.Text, min: 1, max: 100 },
	city: { type: Types.Text, min: 1, max: 100 },
	zip: { type: Types.Number },
	country: { type: Types.Text, min: 1, max: 100 },
	facebook: { type: String },
	instagram: { type: String },
	shop: { type: String },
	bank: { type: Types.Text, min: 1, max: 100 },
	openHours: {
		workDays: { type: Types.Text, min: 1, max: 100 },
		weekends: { type: Types.Text, min: 1, max: 100 }
	},
	logo: { type: Types.File, storage: storage },
  title: { type: Types.Text, min: 1, max: 250 },
	firstParagraph: { type: Types.Html, wysiwyg: true, height: 150 },
	secondParagraph: { type: Types.Html, wysiwyg: true, height: 150 },
  bodyImage: { type: Types.File, storage: storage },
  bodyImageAltText: { type: String }
});

CompanyDetails.defaultColumns = 'name, email, phone, address, city, zip, bank, facebook, instagram, logo';
CompanyDetails.register();
