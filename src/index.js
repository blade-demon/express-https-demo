const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const app = express();
const httpsPort = 443;
const httpPort = 80;

const key = fs.readFileSync(__dirname + "/../certs/selfsigned.key");
const cert = fs.readFileSync(__dirname + "/../certs/selfsigned.crt");
const options = {
  key: key,
  cert: cert,
};

app.use(function (req, res, next) {
  if (req.secure) {
    return next();
  }
  res.redirect(`https://${req.headers.host}${req.url}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user", (req, res) => {
  res.send("Hello user!");
});

app.all("*", (req, res) => {
  res.redirect(301, `https://${req.headers.host}${req.url}`);
});

http.createServer(app).listen(httpPort, () => {
  console.log(`Http server listening on port ${httpPort}`);
});

https.createServer(options, app).listen(httpsPort, () => {
  console.log(`Https server listening on http://localhost:${httpsPort}`);
});
