let path = require('path');
let http = require('http');
let express = require('express');

let app = express();

let inputs = [{ pin: '11', gpio: '17', value: 1 },
              { pin: '12', gpio: '18', value: 0 }];

 app.use('/client/', express.static(path.join(__dirname, '../client/')));

// Express route for incoming requests for a customer name
app.get('/inputs/:id', function(req, res) {
  res.status(200).send(inputs[req.params.id]);
});

// Express route for any other unrecognised incoming requests
app.use(function(req, res, next) {
  res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
});

// start the server
app.listen(3000);
console.log('App Server running at port 3000');