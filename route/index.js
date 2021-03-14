const express = require('express');
const router = express.Router();
const con = require('../config/db');

const app = express();

router.get('/', (req, res) => {
	let sql = 'select * from book';
	con.query(sql, (err, result) => {
		if (err) throw err;
		res.render('books', { result: result });
	});
	// res.send('Book site');
});
router.get('/add-book', (req, res) => {
	res.render('book');
});
router.post('/book-add', (req, res) => {
	console.log(req.body);
	const { title, description, price, author } = req.body;
	let sql =
		"insert into book values (NULL,'" +
		title +
		"','" +
		description +
		"','" +
		price +
		"','" +
		author +
		"') ";
	con.query(sql, (err, result) => {
		if (err) throw err;
		console.log('1 Book Inserted');
		res.redirect('/');
	});
});

router.get('/book/:id', (req, res) => {
	con.query(
		"select * from book where id = '" + req.params.id + "'",
		(err, result) => {
			res.render('books', { result: result });
		}
	);
});

router.get('/book/:id/book-edit', (req, res) => {
	con.query(
		"select * from book where id = '" + req.params.id + "'",
		(err, result) => {
			res.render('bookedit', { result: result });
		}
	);
});

router.post('/book/:id/book-edit', (req, res) => {
	const { title, description, price, author } = req.body;
	let sql =
		'update book set title = "' +
		title +
		'", description = "' +
		description +
		'", price = "' +
		price +
		'", author = "' +
		author +
		'" where id = "' +
		req.params.id +
		'" ';
	// console.log(sql);
	con.query(sql, (err, result) => {
		if (err) throw err;
		// console.log(result);
		res.redirect('/');
	});
});

router.get('/book/delete/:id', (req, res) => {
	let sql = "delete from book where id = '" + req.params.id + "'";
	con.query(sql, (err, result) => {
		if (err) throw err;
		console.log('Product has been deleted');
		res.redirect('/');
	});
});

module.exports = router;
