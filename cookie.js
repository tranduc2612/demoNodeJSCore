const cookie = require("cookie");
const http = require("http");
const url = require("url");
const fs = require("fs");

// function checkingSession(req) {
//   let cookies = req.headers.cookie
//     ? cookie.parse(req.headers.cookie).login
//     : "";
//   let tokenData = fs.existsSync("./token/" + cookies + ".txt")
//     ? JSON.parse(fs.readFileSync("./token/" + cookies + ".txt", "utf-8"))
//     : [""];
//   return tokenData[0];
// }

function onRequest(req, res) {
  // Parse the query string
  let parseUrl = url.parse(req.url, true).query;
  console.log(Date.now());
  if (parseUrl && parseUrl.name) {
    // Set a new cookie with the name
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("key", String(parseUrl.name), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })
    );

    res.statusCode = 302;
    res.setHeader("Location", req.headers.referer || "/");
    res.end();
    return;
  }

  // Parse the cookies on the request
  let cookies = cookie.parse(req.headers.cookie || "");
  console.log(cookies.key);
  // Get the visitor name set in the cookie
  let key = cookies.key;
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  if (key) {
    res.write("<p>Welcome back, <b>" + "</b>!</p>");
  } else {
    res.write("<p>Hello, new visitor!</p>");
  }
  res.write('<form method="GET">');
  res.write(
    '<input placeholder="enter your age" name="age"> <input placeholder="enter your name" name="name"> <input placeholder="enter your pass" name="passwork"><input type="submit" value="Set Name"></ br> '
  );
  res.end("</form>");
}

http.createServer(onRequest).listen(3000);
