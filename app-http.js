const express = require('express');
const app = express();
const fs = require('fs');
const SerialPort = require('serialport');
const { Transform } = require('stream');
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
  delimiter: '\r\n'
});

let port;

// list available ports in console
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

// middleware
app.use(express.static('public'));

// create server
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// create route to get serial ports (lists both /dev/tty and /dev/cu)
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

  socket.on('open', function(data) {
    console.log('Opening port...');
    const { portName, baudRate, dataBits, parity, stopBits, flowControl } = data;
    port = new SerialPort(portName, {
      baudRate: parseInt(baudRate),
      dataBits: parseInt(dataBits),
      parity,
      stopBits: parseInt(stopBits),
      flowControl
    });
    port.pipe(parser);
  });

  socket.on('close', function() {
    console.log('Closing port...');
    port.close();
  });
});

// listen for data
parser.on('data', function(data) {
  console.log('Received data from port: ' + data);
  // send data to client
  io.emit('data', data);
});

