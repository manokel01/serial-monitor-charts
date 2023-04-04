const express = require('express');
const app = express();
const fs = require('fs');
const index = fs.readFileSync( 'index.html');
const SerialPort = require('serialport');
const { Transform } = require('stream');


// how to parse data
const parsers = SerialPort.parsers;
// one value per line
const parser = new parsers.Readline({
   delimiter: '\r\n'
});
// Parse CSV data
// const parser = new parsers.Transform({
//    objectMode: true,
//    transform(chunk, encoding, callback) {
//      const lines = chunk.toString().split('\n');
//      lines.forEach(line => {
//        if (line) {
//          this.push(line);
//        }
//      });
//      callback();
//    }
//  });

// list available ports in concole 
// (lists both /dev/tty and /dev/cu with "trick" described
SerialPort.list().then(ports => {
   let allPorts = [...ports];
   ports.forEach(port => {
     if (port.path.includes('/dev/tty')) {
       const cuPort = {
         ...port,
         path: port.path.replace('/dev/tty', '/dev/cu')
       };
       allPorts.push(cuPort);
     }
   });
   console.log('Available serial ports:');
   allPorts.forEach(port => {
     console.log(`${port.path} - ${port.manufacturer}`);
   });
 });


// open port
const port = new SerialPort('/dev/cu.usbmodem143201',{
   baudRate: 9600,
   dataBits: 8,
   parity: 'none',
   stopBits: 1,
   flowControl: false
});
// pipe data
port.pipe(parser);

// middleware
app.use(express.static('public'));

// create server
app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});

// create route to get serial ports (lists both /dev/tty and /dev/cu)
// This function checks if each port is a "tty" port, and if so, creates a new object 
// with the same properties but with the "tty" prefix replaced with "cu". 
//If a port is not a "tty" port, it is simply returned as-is. 
//The filter(Boolean) call removes any null values from the resulting array.
app.get('/serialports', (req, res) => {
   SerialPort.list().then(ports => {
     const cuPorts = ports.map(port => {
       if (port.path.startsWith('/dev/tty.')) {
         return {
           ...port,
           path: port.path.replace('/dev/tty.', '/dev/cu.'),
         };
       }
       return null;
     }).filter(Boolean);
     const allPorts = [...ports, ...cuPorts];
     res.json(allPorts);
   });
 });
// create route to get serial ports (lists only ports with /dev/tty)
// app.get('/serialports', (req, res) => {
//    SerialPort.list().then(ports => {
//      res.json(ports);
//    });
//  }); 

// load css
app.get('/style.css', function(req, res) {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(__dirname + '/public/style.css');
 });
 // open server port
 const server = app.listen(3000, function () {
   console.log('Server is listening on port 3000!');
});

// create socket
const io = require('socket.io')(server);
io.on('connection', function(socket) {
   console.log('Node is listening to port');
});

// listen for data
parser.on('data', function(data) {
   console.log('Received data from port: ' + data);
   // send data to client
   io.emit('data', data);
});
