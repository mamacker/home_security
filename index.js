var fs = require('fs');
const { exec } = require('child_process');

function playFile(filename) {
  filename = "/home/pi/home_security/audio/" + filename
  console.log("Playing:", filename);
  exec('aplay ' + filename, (error, stdout, stderr) => { console.log(error); });
}

var files = [];
var index = 0
fs.readdir("/home/pi/home_security/audio",(err, dirs) => {
  console.log(dirs);
  files = dirs; 
  playAtIndex();
});

function playAtIndex() {
  playFile(files[index]);
  index++;
  if (index > files.length) {
    index = 0;
  }
}

setInterval(() => {
  playAtIndex()
},  5 * 60 * 1000);

process.on('uncaughtException', function (err) {
    console.log('----------------------------------------------------------------------');
    console.log('----------------------------------------------------------------------');
    console.log('Caught exception: ' + err);
    console.log(err.stack);
    console.log('----------------------------------------------------------------------');
    console.log('----------------------------------------------------------------------');
});
