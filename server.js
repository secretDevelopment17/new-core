const http = require('http');
const express = require('express');
const app = express();
const { KeyMongo } = require("key-mongo");
const mongo = new KeyMongo({
	dbName: "data",
	dbUrl: "mongodb+srv://secretDevelopment17:secretdev170720@core-database.quzlg.mongodb.net/data"
});
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
    res.send(mongo.list("case"))
});

app.set('json spaces', 2);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});