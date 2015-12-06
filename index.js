var HID = require('node-hid');

var vid = 10462;
var pid = 4418;
var commands = require('./commands.json');
var current;
var device;

function steamController(){

steamController.prototype.connect = function(){
    device = new HID.HID(vid,pid);
  device.read(function(err,data) {
    console.log(data);
  });

  device.on("error", function(err) {
    console.log(err);
  });

  process.stdin.resume();//so the program will not close instantly

  function exitHandler(options, err) {
    if (options.cleanup) device.close();
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
  }

  //do something when app is closing
  process.on('exit', exitHandler.bind(null,{cleanup:true}));

  //catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, {exit:true}));

  //catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

  };
};

steamController.prototype.read = function(callback){

  device.on("data", function(data) {

    current = commands;

    // buttons
    switch(data[8]) {
      case 128:
        current.button.A = true;
        break;
      case 32:
        current.button.B = true;
        break;
      case 16:
        current.button.Y = true;
        break;
      case 64:
        current.button.X = true;
        break;
      case 8:
        current.button.LB = true;
        break;
      case 4:
        current.button.RB = true;
        break;
      default:
        current.button.RB = false;
        current.button.LB = false;
        current.button.A = false;
        current.button.B = false;
        current.button.Y = false;
        current.button.X = false;
    }

    // Bottom buttons + center buttons

    switch(data[9]) {
      case 128:
        current.bottom.left  = true;
        break;
      case 16:
        current.center.L = true;
        break;
      case 64:
        current.center.R = true;
        break;
      case 32:
        current.center.STEAM = true;
        break;
      case 8:
        current.pad.value = 'DOWN';
        break;
      case 2:
        current.pad.value = 'RIGHT';
        break;
      case 4:
        current.pad.value = 'LEFT';
        break;
      case 1:
        current.pad.value = 'UP';
        break;
      default:
        current.pad.value = 'idle';
        current.bottom.left = false;
        current.center.L = false;
        current.center.R = false;
        current.center.STEAM = false;
    }

    switch(data[10]) {
      case 24:
        current.mouse.touched = true;
        current.pad.touched = true;
        break;
      case 17:
        current.mouse.touched = true;
        current.bottom.right = true;
        break;
      case 25:
        current.mouse.touched = true;
        current.bottom.right = true;
        current.pad.touched = true;
        break;
      case 2:
        current.thumbstick.pressed = true;
        break;
      case 1:
        current.bottom.right = true;
        break;
      case 16:
        current.mouse.touched = true;
      case 8:
        current.pad.touched = true;
        break;
      default:
        current.mouse.touched = false;
        current.bottom.right = false;
        current.pad.touched = false;
        current.thumbstick.pressed = false;
    }

    // triggers
    current.trigger.left = data[11];
    current.trigger.right = data[12];

    // joystick
    current.joystick.xdir = data[16];
    current.joystick.x = data[17];
    current.joystick.ydir = data[18];
    current.joystick.y = data[19];

    // mouse
    current.mouse.a = data[20];
    current.mouse.b = data[21];
    current.mouse.c = data[22];
    current.mouse.d = data[23];

    //console.log(current);
    callback(current);
  });

};


exports.steamController = steamController;
