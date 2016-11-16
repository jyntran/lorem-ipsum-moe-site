var express = require('express');

var port = process.env.PORT || 8080;

var app = express();

app.use(express.static('./dist/'));
app.use(express.static('./src/client/'));
app.use(express.static('./'));

var api = require('./src/api/routes/routes');
app.use('/api', api);

app.use('/*', function(req, res, next) {
  res.status(404).send();
})

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status).send({error: err});
  });
}

app.use(function (req, res, next){
    res.status(404).send();
})

app.use(function(err, req, res, next) {
    console.log(err)
  res.sendStatus(err.status || 500);
});

app.listen(port, function(){
    console.log('--- SERVER ---');
    console.log('Port: ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());    
});
