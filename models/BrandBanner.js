var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * BrandBanner Model
 * ==========
 */

var BrandBanner = new keystone.List('BrandBanner', {
  map: { name: 'title' },
});

var storage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  schema : {
    url: true,
	},
  fs: {
      path: './static/img/banner/',
      publicPath: './static/img/banner/',
  }
});

BrandBanner.add({
  title: { type: String, index: true, initial: true },
  image: { type: Types.File, storage: storage },
  altText: { type: String },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true }
});

BrandBanner.relationship({ ref: 'Banner', path: 'banners', refPath: 'brandBanner' });

BrandBanner.defaultColumns = 'title, image, altText, state';
BrandBanner.register();
