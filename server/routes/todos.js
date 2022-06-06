const express = require('express');
const fs = require('fs');
const router = express.Router();
const todos = require('../data/todos.json');

/* GET users listing. */
router.get('/', function (req, res, next) {
	fs.readFile('./data/todos.json', 'utf-8', (err, data) => {
		if (err) console.log(err);
		res.send(JSON.parse(data));
	});
});

router.post('/', function (req, res, next) {

	fs.writeFile(
		'./data/todos.json',
		JSON.stringify(req.body),
		(err) => {
			if (err) console.log(err);
			res.send('ok');
		}
	);
});

module.exports = router;
