require('../../shopify-wholesale-environment-demo/node_modules/dotenv').config();

const keystone = require('keystone');
const nodemailer = require("nodemailer");

// Setup Route Bindings
exports = module.exports = nextApp => keystoneApp => {
	const handle = nextApp.getRequestHandler();
	keystoneApp.use(sslRedirect());
	keystoneApp.all('/api*', [keystone.middleware.api, keystone.middleware.cors]);
	keystoneApp.options('/api*', function(req, res) {
    res.send(200);
	});
	keystoneApp.get('/api/posts', (req, res, next) => {
		const Post = keystone.list('Post');
		Post.model
			.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.exec(function (err, results) {
				if (err) throw err;
				res.json(results);
			});
	});
	keystoneApp.get('/api/contacts', (req, res, next) => {
		const Contact = keystone.list('Contact');
		Contact.model
			.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.exec(function (err, results) {
				if (err) throw err;
				res.json(results);
			});
	});
	keystoneApp.get('/api/company-details', (req, res, next) => {
		const CompanyDetails = keystone.list('CompanyDetails');
		CompanyDetails.model
			.find()
			.exec(function (err, results) {
				if (err) throw err;
				res.json(results);
			});
	});
	keystoneApp.get('/api/slides', (req, res, next) => {
		const Slide = keystone.list('Slide');
		Slide.model
			.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.exec(function (err, results) {
				if (err) throw err;
				res.json(results);
			});
	});
	keystoneApp.get('/api/brands', (req, res, next) => {
		const Brand = keystone.list('Brand');
		Brand.model
			.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.exec(function (err, results) {
				if (err) throw err;
				res.json(results);
			});
	});
	keystoneApp.get('/api/partners', (req, res, next) => {
		const Partner = keystone.list('Partner');
		Partner.model
			.find()
			.where('state', 'published')
			.exec(function (err, results) {
				if (err) throw err;
				res.json(results);
			});
	});
	keystoneApp.get('/api/benefits', (req, res, next) => {
		const Benefit = keystone.list('Benefit');
		Benefit.model
			.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.exec(function (err, results) {
				if (err) throw err;
				res.json(results);
			});
	});
	keystoneApp.get('/api/about', (req, res, next) => {
		const About = keystone.list('CompanyDetails');
		About.model
			.find()
			.exec(function (err, results) {
				if (err) throw err;
				res.json(results);
			});
	});
	keystoneApp.get('/api/brand-banner', (req, res, next) => {
		const BrandBanner = keystone.list('BrandBanner');
		BrandBanner.model
			.find()
			.where('state', 'published')
			.exec(function (err, results) {
				if (err) throw err;
				res.json(results);
			});
	});
	keystoneApp.get('/api/about-banner', (req, res, next) => {
		const AboutBanner = keystone.list('AboutBanner');
		AboutBanner.model
			.find()
			.where('state', 'published')
			.exec(function (err, results) {
				if (err) throw err;
				res.json(results);
			});
	});
	keystoneApp.get('/api/locations', (req, res, next) => {
		const Location = keystone.list('Location');
		Location.model
			.find()
			.exec(function (err, results) {
				if (err) throw err;
				res.json(results);
			});
	}); 
	keystoneApp.post('/api/enquiry', (req, res, next) => {
		const Enquiry = keystone.list('Enquiry');
		var newEnquiry = new Enquiry.model({
			name: req.body.name,
			email: req.body.email,
			phone: req.body.phone,
			message: req.body.message,
		});
		newEnquiry.save(function(err) {
			if (err) console.error(err);
			let transport = nodemailer.createTransport({
				host: "xxxxxxxxxxx",
				port: xxx,
				secure: true,
				auth: {
					user: process.env.xxxxx,
					pass: process.env.xxxxx
				}
			});
			transport.verify(function(error, success) {
				if (error) {
					console.log(error);
				} 
			});
			const message = {  
				from: 'xxxxxxxxx',
				replyTo: `xxxxxxxx`,
				to: 'xxxxxxx',
				subject: 'Uus teade xxxxxx kodulehelt',
				html: `
					<p>Saatja nimi: ${req.body.name}</p>
					<p>Saatja e-post: ${req.body.email}</p>
					<p>Saatja telefon: ${req.body.phone}</p>
					<p>Sõnumi sisu: ${req.body.message}</p>
				`};
			transport.sendMail(message, function(err, info) {  
					if (err) {
						console.log(err)
					} else {
						console.log(info);
					}
			});
			res.json({ message: 'Teade edukalt edastatud' })
		});
	}); 
	keystoneApp.get('*', (req, res) => {
		return handle(req, res);
	});
};