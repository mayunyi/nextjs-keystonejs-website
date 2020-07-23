var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Brand Model
 * ==========
 */

var Brand = new keystone.List('Brand', {
	map: { name: 'brandName' },
});

var storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	schema: {
		url: true,
	},
	fs: {
		path: './static/img/brand/',
		publicPath: './static/img/brand/',
	},
});

Brand.add({
	brandName: { type: Types.Text, min: 1, max: 250, index: true, initial: true },
	brandHomepage: { type: String },
	storeLink: { type: String },
	paragraph1: { type: Types.Html, wysiwyg: true, height: 100 },
	paragraph2: { type: Types.Html, wysiwyg: true, height: 100 },
	paragraph3: { type: Types.Html, wysiwyg: true, height: 100 },
	presentationImage: { type: Types.File, storage: storage },
	presentationAltText: { type: String },
	brandLogo: { type: Types.File, storage: storage },
	brandAltText: { type: String },
	carouselImage: { type: Types.File, storage: storage },
	carouselAltText: { type: String },
	metaText: { type: Types.Html, wysiwyg: true, height: 150 },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
});

Brand.defaultColumns = 'brandName, brandHomepage, storeLink, presentationImage, presentationAltText, carouselImage, carouselAltText, metaText, state';
Brand.register();
