const http = require("http");
const fs = require("fs");
const qs = require("qs");
const url = require("url");

const server = http.createServer((req, res) => {
  fs.readFile("./views/home.html", "utf-8", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

server.listen(3000, () => {
  console.log("run!!!");
});
