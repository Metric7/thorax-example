var express = require('express'),
  argv = require('optimist').argv,
  path = require('path'),
  port = argv._[0] || 8000,
  spawn = require('child_process').spawn;

if (argv.watch) {
  var lumbar = spawn('lumbar', ['build', path.join(__dirname, 'lumbar.json'), path.join(__dirname, 'public')]);
  lumbar.stdout.on('data', function(data) {
    process.stdout.write(data.toString());
  });
  lumbar.stderr.on('data', function(data) {
    process.stdout.write(data.toString());
  });
}

var server = express.createServer();
server.use(express.static(path.join(__dirname, 'public')));
console.log('Express server listening on port ' + port);
server.listen(port);
