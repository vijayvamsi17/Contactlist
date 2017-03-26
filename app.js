var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contacts',['contacts']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contact', function(req, res){
	console.log("received get request")
db.contacts.find(function(err, docs){
	console.log(docs);
	res.json(docs);
});

});

app.post('/contact', function(req, res){
	console.log(req.body);
	db.contacts.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/contact/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contacts.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});

});

app.get('/contact/:id', function(req, res){
	var id = req.params.id;

	db.contacts.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/contact/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);

	db.contacts.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, phone: req.body.phone, email: req.body.email}},
		new: true}, function(err, doc){
			res.json(doc);
		});
});

app.listen(3000);
console.log("server running on port 3000");