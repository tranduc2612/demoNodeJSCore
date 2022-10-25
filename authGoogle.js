const cookie = require("cookie");
const http = require("http");
const url = require("url");
const fs = require("fs");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const passport = require("passport");
const { OAuth2Client } = require("google-auth-library");
const { GoogleAuth } = require("google-auth-library");
var jwt = require("jsonwebtoken");
const client = new OAuth2Client(
  "437807153200-gqgvdfqk1olqso036bn00gua4j4151po.apps.googleusercontent.com"
);

let server = http.createServer(async (req, res) => {
  const handleUrl = url.parse(req.url);
  const token_google = handleUrl.pathname.replace("/", "");
  //   console.log(token_google);
  let path = handleUrl.pathname;
  // let trimPath = path.replace(/^\/+|\/+$/g, "");
  let mimeTypes = {
    webp: "image/webp",
    jpg: "images/jpg",
    png: "images/png",
    js: "text/javascript",
    css: "text/css",
    svg: "image/svg+xml",
    ttf: "font/ttf",
    woff: "font/woff",
    woff2: "font/woff2",
    eot: "application/vnd.ms-fontobject",
  };
  const filesDefences = path.match(
    /\.js|\.css|\.png|\.svg|\.jpg|\.ttf|\.woff|\.woff2|\.eot|\.webp/
  );

  if (filesDefences) {
    const extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
    res.writeHead(200, { "Content-Type": extension });
    fs.createReadStream(
      "C:\\Users\\OSC\\Desktop\\" + PART + "\\src\\Views" + req.url
    ).pipe(res);
  } else {
    if (handleUrl.pathname == "/") {
      fs.readFile("./views/content.html", "utf-8", function (err, data) {
        // verify();
        // console.log(req);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    } else {
      const decoded = jwt.decode(token_google);
      if (decoded) {
        console.log(decoded.email);
      }
      fs.readFile("./views/footer.html", "utf-8", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  }
});

server.listen(3000, () => {
  console.log("listening !");
});
