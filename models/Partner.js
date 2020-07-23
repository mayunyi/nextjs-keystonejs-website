var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Partner Model
 * ==========
 */

var Partner = new keystone.List('Partner', {
  map: { name: 'partnerName' },
});

var storage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  schema : {
    url: true,
	},
  fs: {
      path: './static/img/partner/',
      publicPath: './static/img/partner/',
  }
});

Partner.add({
  partnerName: { type: Types.Text, min: 1, max: 250, initial: true },
  partnerHomepage: { type: String },
  quoteText: { type: Types.Html, wysiwyg: true, height: 250 },
  quotedPerson: { type: Types.Text, min: 1, max: 250 },
  quoteImage: { type: Types.File, storage: storage },
  quoteImageAltText: { type: String },
  carouselImage: { type: Types.File, storage: storage },
  carouselAltText: { type: String },
  metaText: { type: Types.Html, wysiwyg: true, height: 150 },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' }
});

Partner.defaultColumns = 'partnerName, partnerHomepage, quoteText, quotedPerson, quoteImage, quoteAltText, carouselImage, carouselAltText, metaText, state';
Partner.register();