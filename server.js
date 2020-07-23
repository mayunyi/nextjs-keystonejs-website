require('dotenv').config();

const next = require('next'); 
const dev = process.env.xxxxx !== 'production'; 
const app = next({ dev });
var keystone = require('keystone');
const ConnectMemcached = require('connect-memcached');

keystone.init({
	'name': '',
	'brand': '',
	'static': 'static',
	'favicon': 'static/favicon.ico',
	'logger': ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
	'mongo': process.env.xxxxx,
	'port': process.env.xxxxx,
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'view cache': true,
	'static options': {
		cacheControl: {
			maxAge: '1d',
		},
	},
	'session store': function(session){
		return new (ConnectMemcached(session))({
			hosts: [
				'0.0.0.0:1111',
			],
		});
	},
});
keystone.import('models');
// Start Next app
app.prepare()
 .then(() => {
  keystone.set('locals', {
   _: require('lodash'),
	 env: keystone.get('env'),
   utils: keystone.utils,
   editable: keystone.content.editable,
	});
	keystone.set('cors allow origin', true);
	keystone.set('cors allow methods', true);
	keystone.set('cors allow headers', true);

	keystone.init({
		'wysiwyg override toolbar': false,
		'wysiwyg menubar': true,
		'wysiwyg skin': 'lightgray',
		'wysiwyg additional buttons': 'searchreplace visualchars,'
		 + ' charmap ltr rtl pagebreak paste, forecolor backcolor,'
		 +' emoticons media, preview print ',
		'wysiwyg additional plugins': 'example, table, advlist, anchor,'
		 + ' autolink, autosave, bbcode, charmap, contextmenu, '
		 + ' directionality, emoticons, fullpage, hr, media, pagebreak,'
		 + ' paste, preview, print, searchreplace, textcolor,'
		 + ' visualblocks, visualchars, wordcount',
	});
	keystone.set('routes', require('./routes')(app));
	keystone.set( 'signin logo', '../static/img/Salonshop-logo-wht-on-blk-crcl-150px.svg');
	keystone.set( 'nav', {
			posts: 'posts',
			contacts: 'contacts',
			brands: 'brands',
			partners: 'partners',
			enquiries: 'enquiries',
			companyDetails: 'company-details'
		}
	);
	keystone.start();
});
