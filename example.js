

var steam = require('./index.js');

var controller = new steam.steamController();

controller.connect();

controller.read(function(data){
  console.log(data);
});
