const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoceode = require('./utils/geoceode');
const forecast = require('./utils/forecast');

const app = express();

// defines paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars templet engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static location to serve
app.use(express.static(publicDirectoryPath));

// routes
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather Node.js app',
		author_name: "Mihail Tudos"
	})
})
app.get('/help', (req, res) => {
	res.render('help/help', {
		title: 'We are here to help you',
		author_name: "Mihail Tudos",
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis natus voluptates eos? Iusto aut, culpa consectetur voluptatum inventore blanditiis dolorem adipisci laboriosam. Qui ratione vitae reiciendis impedit repudiandae dicta sed ex voluptates. Consequatur illo earum inventore tenetur reprehenderit ut vel animi atque, modi ipsum eligendi placeat beatae rerum provident explicabo quaerat alias deserunt perferendis, voluptates voluptate error esse id? Hic sit nostrum beatae aperiam perferendis. Placeat temporibus quidem perspiciatis ratione deserunt. Sint eum, consequuntur ex sunt sit eveniet quidem eius, praesentium hic eos, blanditiis est odio. Vel maiores quo libero ratione laborum culpa quas cupiditate perferendis iste ipsam. Reprehenderit, animi!'
	})
})

app.get('/about', (req, res) => {
	res.render('about/about', {
		title: 'This page tells more about the author',
		author_name: "Mihail Tudos"
	});
})

app.get('/weather', (req, res) => {
	const address = req.query.address;
	if (!address) {
		return res.send({
			error: 'You must provide an address'
		})
	}
	geoceode(address, (error, {lat, lon, location} = {}) => {
		if (error) {
			return res.send({error})
		}
		forecast(lat,lon, (error, response) => {
			if (error) {
				return res.send({error});
			} 
			res.send({
				address,
				location,
				response
			});
		});
	})
})

app.get('/products', (req, res) => {
	if(!req.query.search) {
		return res.send({
			error: 'You must provide a location'
		});
	}
	res.send({
		products: []
	});
})

app.get('/help/*', (req, res) => {
	res.render('404/404-page', {
		title: '404',
		message: 'Please try different route to find the article you are looking for',
		author_name: "Mihail Tudos"
	})
});

app.get('*', (req, res) => {
	res.render('404/404-page', {
		title: '404',
		message: 'Please, click this link to return to the home page',
		author_name: "Mihail Tudos"
	});
});


const port = 3000;

// starting server
app.listen(port, () => {
	console.log('Server is up on port ' + port);
});