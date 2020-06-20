const net = require('net');

process.env.ELECTRON_START_URL = 'http://localhost:3000';

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({ port: 3000 }, () => {
  client.end();
  if (!startedElectron) {
    console.log('starting electron');
    startedElectron = true;
    const exec = require('child_process').exec;
    const electron = exec('yarn electron');
    electron.stdout.on("data", function (data) {
      console.log("stdout: " + data.toString());
    });
  }
});

tryConnection();

client.on('error', (error) => {
  setTimeout(tryConnection, 1000);
});