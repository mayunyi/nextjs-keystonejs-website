var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Banner Model
 * ==========
 */

var Banner = new keystone.List('Banner');

Banner.add({
  aboutBanner: { type: Types.Relationship, ref: 'AboutBanner' },
  brandBanner: { type: Types.Relationship, ref: 'BrandBanner' },
});

Banner.defaultColumns = 'brandBanner, aboutBanner';
Banner.register();
