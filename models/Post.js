var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	sortable: true
});

var storage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  schema : {
		url: true,
	},
  fs: {
      path: './static/img/posts/',
      publicPath: './static/img/posts/',
  }
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	author: { type: Types.Relationship, ref: 'User', index: true },
	category: { type: Types.Select, options: 'Koolitus, Uudis' },
	image: { type: Types.File, storage: storage, thumb: true, url: true },
	content: {
		paragraph1: { type: Types.Html, wysiwyg: true, height: 100 },
		paragraph2: { type: Types.Html, wysiwyg: true, height: 100 },
		paragraph3: { type: Types.Html, wysiwyg: true, height: 100 },
		paragraph4: { type: Types.Html, wysiwyg: true, height: 100 },
	},
	metaText: { type: Types.Html, wysiwyg: true, height: 150 },
	gallery: {
		visible: { type: Types.Boolean },
		image: {
			no01: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no02: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no03: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no04: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no05: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no06: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no07: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no08: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no09: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no10: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no11: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no12: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no13: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no14: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no15: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no16: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no17: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no18: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no19: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true },
			no20: { type: Types.File, storage: storage, thumb: true, url: true, collapse: true }
		},
	},
});

Post.defaultColumns = 'title, state, author, publishedDate, category';
Post.register();
