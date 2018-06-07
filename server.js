const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine','hbs');


app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log +'\n', (err)=>{
		if(err)	{
			console.log('unable to append to server log.');
		}
	});
	next();
});

app.use((req,res,next)=>{
	res.render('maintainance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('GetCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

app.get('/',(req, res)=>{
	//res.send('<h1>Hello Express!</h1>');
	res.render('welcome.hbs',{
		pageTitle: 'Welcome Page',
		content: 'Welcome to the website!'
	});
});

app.get('/about', (req, res)=>{
	//res.send('About Page');
	res.render('about.hbs', {
		pageTitle: 'AboutPage',
		
		
	});
});

app.get('/bad', (req, res)=>{
	res.send({
		status: 'ERROR',
		message: 'Unable to handle Request'	
	})
});

app.listen(port, ()=>{
	console.log(`server is up on port ${port}`);
});