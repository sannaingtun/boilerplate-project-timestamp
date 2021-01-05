// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

/**
 * A request to /api/timestamp/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds
 */
app.get("/api/timestamp/:date?", async(req, res) => {
  var date = req.params.date;
  console.log(date);
  if (!isNaN(date)) {
    var unixTimeStamp = Date.parse(date);
    var utc = new Date(date).toUTCString();
    if (isNaN(unixTimeStamp)) {
      utc = new Date(date * 1).toUTCString();
      if (utc == "Invalid Date") {
        return res.send({ error : "Invalid Date" });
      } else {
        unixTimeStamp = date;
      }
    }
    
    res.send({unix : unixTimeStamp, utc: utc});
  } else {
    console.log(Date.now())
    var utc = new Date(Date.now()).toUTCString();
    console.log(utc)
    res.send({unix : Date.now(), utc: utc});
  }
  
});


// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
