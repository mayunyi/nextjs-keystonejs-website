var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Location Model
 * ==========
 */

var Location = new keystone.List('Location', {
  map: { name: 'name' }
});

Location.add({
  name: { type: Types.Text, min: 1, max: 250, initial: true },
  address: { type: String },
  city:  { type: String },
  zip:  { type: String },
  country: { type: String },
  phone: { type: String },
  latitude:  { type: Number },
  longitude: { type: Number },
  show: { type: Types.Boolean, default: true }
});

Location.defaultColumns = 'name, id, address, city, zip, country, phone, latitude, longitude, show';
Location.register();