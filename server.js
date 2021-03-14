const express = require('express');
const bodyParser = require('body-parser');
const mySql = require('mysql');
const hbs = require('hbs');
const con = require('./config/db');
const path = require('path');

const port = process.env.PORT || 4000;
const app = express();

app.use(express.static(path.join(__dirname + '/public')));
// const partialPath = path.join(__dirname + './views/partials');

app.set('views', './views/main');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

const indexRouting = require('./route/index');

// Routing start
app.use('/', indexRouting);

app.listen(port, (err) => {
	if (err) throw err;
	console.log(`server is running on http://localhost:${port}`);
});
