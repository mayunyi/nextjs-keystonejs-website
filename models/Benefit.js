var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Benefit Model
 * ==========
 */

var Benefit = new keystone.List('Benefit', {
  map: { name: 'title' },
});

var storage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  schema : {
    url: true,
	},
  fs: {
      path: './static/img/benefit/',
      publicPath: './static/img/benefit/',
  }
});

Benefit.add({
  title: { type: Types.Text, min: 1, max: 250, initial: true },
  body: { type: Types.Html, wysiwyg: true, height: 150, initial: true },
  image: { type: Types.File, storage: storage },
  altText: { type: String, initial: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, initial: true }
});

Benefit.defaultColumns = 'title, body, image, altText';
Benefit.register();
