# node-steam-controller

## Description

  The module lets you interact with the Steam Controller from valve. Its been tested on OSX so far and works great - it should be compatible with Windows and Linux as well.

##Usage

```js
var steam = require('steam-controller');

var controller = new steam.steamController();

controller.connect();

controller.read(function(data){
  console.log(data);
});

```

## Response

```json
"button": {
  "A": false,
  "B": false,
  "X": false,
  "Y": false,
  "LB": false,
  "RB": false
},
"pad": {
  "value": "idle",
  "touched": false
},
"mouse": {
  "a": 0,
  "b": 0,
  "c": 0,
  "d": 0,
  "touched": false
},
"center": {
  "L": false,
  "R": false,
  "STEAM": false
},
"joystick": {
  "xdir": 0,
  "x": 0,
  "ydir": 0,
  "y": 0
},
"bottom": {
  "left": false,
  "right": false
},
"thumbstick": {
  "pressed": false,
  "xdir": 0,
  "x": 0,
  "ydir": 0,
  "y": 0
},
"trigger":{
  "left": 0,
  "right": 0
}
```


**Note:** sometimes it won't disconnect and reconnect to the controller right away when you restart a script. This is a fresh project so I'm working on making it more consistent, just keep in mind you may need to unplug and restart your controller if your script won't reconnect.
