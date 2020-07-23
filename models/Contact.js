var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Contact Model
 * ==========
 */

var Contact = new keystone.List('Contact', {
  defaultSort: '-createdAt',
  map: { name: 'name' },
});

var storage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  schema : {
    url: true,
	},
  fs: {
      path: './static/img/contacts/',
      publicPath: './static/img/contacts/',
  }
});

Contact.add({
	name: { type: Types.Name, required: true, index: true, initial: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true, initial: true },
  phone: { type: String, index: true, required: true, initial: true },
  image: { type: Types.File, storage: storage },
  position: { type: Types.Text, min: 1, max: 50 },
  category: { type: Types.Select, options: 'Müük, Turundus, Juhtimine, Koolitus', default: 'Müük', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true }
});

Contact.defaultColumns = 'name, email, phone, publishedDate';
Contact.register();
