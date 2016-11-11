'use strict';

var fs = require('fs');
var path = require('path');
var PetsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
//sets node equal to path.basename(/usr/local/bin/node)
//path.basename returns  /file_name of file path
//process.argv[0] is first word input into command line of terminal
var file = path.basename(process.argv[1]);
//sets file to second work input into command line of terminals
var cmd = process.argv[2];
//sets cmd to 'create/read/update/delete' input as 3rd word into cmd line of terminal

if (cmd === 'read') {
  fs.readFile(PetsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    //sets pet as data returned from fs.readfile
    var petIndex = process.argv[3];
    //sets var for index of which pet obj to read

    //PSEUDO: if petIndex > pets.length-1
    //          console.err(`Usage: ${node} ${file} ${cmd} INDEX
    //        if petIndex < pets.length-1
    //          log pets[petIndex]

    if(!petIndex){
      console.log(pets);
      process.exit(1);
    }

    if(petIndex >= (pets.length) || petIndex < 0){
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    console.log(pets[petIndex]);


  });
}


else if (cmd === 'create') {
  fs.readFile(PetsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var pets = JSON.parse(data);

    var pet = {
      age: parseInt(process.argv[3]),
      kind: process.argv[4],
      name: process.argv[5]
    };

    //4th word input into cmd line of terminal creates string of new pet to create

    if (!pet.age || !pet.kind || !pet.name) {
      //if 'create' cmd used but no pet provided
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(1);
    }

    pets.push(pet);
    //add pet string created into the pets array generated from pets.json

    var petsJSON = JSON.stringify(pets);
    //re-create json string including the added process.argv[3]

    fs.writeFile(PetsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      //write new petsJSON into pets.json file

      console.log(pet);
    });
  });
}

else if(cmd === 'update'){
  fs.readFile(PetsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    var petIndex = parseInt(process.argv[3]);
    var pet = {
      age: parseInt(process.argv[4]),
      kind: process.argv[5],
      name: process.argv[6]
    };

    if (!pet.age || !pet.kind || !pet.name){
      //if 'update' cmd used but no pet provided
      console.error(`Usage: ${node} ${file} ${cmd} INDEX AGE KIND NAME`);
      process.exit(1);
    }

    pets[petIndex] = pet;

    var petsJSON = JSON.stringify(pets);
    //re-create json string including the added process.argv[3]

    fs.writeFile(PetsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      //write new petsJSON into pets.json file

      console.log(pet);
    });

    console.log(pets);
    //create if(){} to confirm pet input exists to be updated
    //use fs.fxn that modifies pets, make sure to use
    //var petsJSON = JSON.stringify(pets);
    //to create new data array
  });
}

else if (cmd === 'destroy'){
  fs.readFile(PetsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var pets = JSON.parse(data);
    var petIndex = parseInt(process.argv[3]);
    console.log(petIndex);

    if(!process.argv[3]){
      //if 'delete' cmd used but no index provided
      console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
      process.exit(1);
    }

    pets.splice(petIndex, 1);

    var petsJSON = JSON.stringify(pets);
    //re-create json string including the added process.argv[3]

    fs.writeFile(PetsPath, petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
      //write new petsJSON into pets.json file

      console.log(pets);
    });


  });
}

else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}
