var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Slide Model
 * ==========
 */

var Slide = new keystone.List('Slide',{
  sortable: true,
  map: { name: 'title' },
});

var storage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  schema : {
    url: true,
	},
  fs: {
      path: './static/img/slides/',
      publicPath: './static/img/slides/',
  }
});

Slide.add({
	title: { type: Types.Text, min: 1, max: 250, index: true, initial: true },
	image: { type: Types.File, storage: storage, required: true, initial: true, thumb: true },
	imageAltText: { type: String, initial: true },
	icon: { type: Types.File, storage: storage, thumb: true },
	iconAltText: { type: String, initial: true },
	paragraph: { type: Types.Html, wysiwyg: true, height: 100 },
	buttonText: { type: String, initial: true },
	link: { type: String, initial: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true, initial: true }
});

Slide.defaultColumns = 'title, image, state';
Slide.register();
