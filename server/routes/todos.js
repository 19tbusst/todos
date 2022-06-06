const e = require('express');
const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', function (req, res, next) {
	fs.readFile('./data/todos.json', 'utf-8', (err, data) => {
		if (err) console.log(err);
		res.send(JSON.parse(data));
	});
});

router.post('/', function (req, res, next) {
	if (req.query.remove) {
		const todos = JSON.parse(fs.readFileSync('./data/todos.json')).todos;
		todos.splice(todos.indexOf(req.query.remove), 1);
		fs.writeFile(
			'./data/todos.json',
			JSON.stringify({ todos: todos }),
			(err) => {
				if (err) console.log(err);
				res.send('ok');
			}
		);
	} else {
		fs.writeFile(
			'./data/todos.json',
			JSON.stringify(req.body),
			(err) => {
				if (err) console.log(err);
				res.send('ok');
			}
		);
	}
});

module.exports = router;
