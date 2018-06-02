/*
* @Author: heqingqiu
* @Date:   2018-05-26 21:28:20
* @Last Modified by:   heqingqiu
* @Last Modified time: 2018-06-02 11:32:13
*/
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
})

app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err)=>{
		if(err){
			console.log('Unable to append to server.log');
		}
	});

	//next tells express when the middleware is done
	next();// only if next is called, the handler can be called

})// register middleware, takes in a function

app.get('/', (req, res)=>{
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome Home'
	})
})

app.get('/about',(req, res)=>{
	res.render('about.hbs',{
		pageTitle: 'About Page'
	})
})

app.get('/bad',(req,res)=>{
	res.send({
		errorMessage:'errorMessage'
	})
})

app.get('/portfolio',(req,res)=>{
	res.render('portfolio.hbs',{
		pageTitle: 'Portfolio Page',
		portfolioMessage: 'This is my portfolio'
	})
})

app.listen(port,()=>{
	console.log(`Server is up on the port ${port}`);
});