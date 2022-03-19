const http = require('http');
const express = require('express');
const app = express();
const bot = require("./index.js");
const PORT = 3000;

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendStatus(200);
});

app.set('trust proxy', true);
app.use((req, res, next) => {
  if(!req.secure) return res.redirect('https://' + req.get('host') + req.url);
  next();
});

app.get("/case", function (req, res) {
    res.send(bot.mongo.list("case"))
});

//app.set('json spaces', 2);
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });