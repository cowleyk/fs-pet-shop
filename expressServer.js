'use strict';

//REDO app.get & app.post to fit w/ assignment reqs

var fs = require('fs');
var path = require('path');
var PetsPath = path.join(__dirname, 'pets.json');


console.log('server is starting');

var express = require('express');

var app = express();

var morgan = require('morgan');
app.use(morgan('tiny'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));
//use express' ability to host static files (html, img, movie, etc)
var pets;

fs.readFile(PetsPath, 'utf8', function(err, data) {
  if (err) {
    throw err;
  }

  pets = JSON.parse(data);
});



app.get('/pets/:petIndex?', function(req,res){
  var petIndex = Number.parseInt(req.params.petIndex);
  if(!req.params.petIndex){
    //IF STATEMENT DOESN'T WORK W/ IF(!PETINDEX).... WHY NOT??
    res.send(pets);
  }
  if(req.params.petIndex<0 || req.params.petIndex > pets.length){
    return res.sendStatus(404);
  }
  res.send(pets[petIndex]);
});

app.post('/pets', function(req,res){
  var pet = req.body;
  if(!pet){
    return res.sendStatus(404);
  }
  pets.push(pet);
  res.send(pet);
});

app.put('/pets/:petIndex', function(req,res){
  var pet = req.body;
  var petIndex = req.params.petIndex;
  if(!req.params.petIndex || !pet || req.params.petIndex < 0 || req.params.petIndex > pets.length){
    return res.sendStatus(404);
  }
  pets[petIndex]=pet;
  res.send(pet);

});

// app.get('/search/:word/', function(req,res){
//   var word = req.params.word;
//   var reply;
//   if (words[word]){
//     reply = {
//       status: 'found',
//       word: word,
//       score: words[word]
//     }
//   }
//   else{
//     reply = {
//       status: 'not found',
//       word:word,
//     }
//   }
//   res.send(reply);
// })

app.listen(3000, function(){
  console.log('listening. . . ');
});
