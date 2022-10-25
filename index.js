const http = require("http");
const axios = require("axios");
const fs = require("fs");
const qs = require("qs");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const dataFile = require("./products.json");
const database = require("./db");
const cookie = require("cookie");
// http
//   .createServer(function (req, res) {
//     // if (req.method === "GET") {
//     //   fs.readFile("./views/register.html", function (err, data) {
//     //     res.writeHead(200, { "Content-Type": "text/html" });
//     //     res.write(data);
//     //     return res.end();
//     //   });
//     // } else {
//     //   console.log(req.method);
//     //   let data = "";
//     //   req.on("data", (chunk) => {
//     //     data += chunk;
//     //   });
//     //   req.on("end", () => {
//     //     console.log(qs.parse(data));
//     //     return res.end("Register success!");
//     //   });
//     //   req.on("error", () => {
//     //     console.log("error");
//     //   });
//     // }

//     // demo routing
//     let parseUrl = url.parse(req.url, true);
//     // //get the path
//     let path = parseUrl.pathname;
//     let trimPath = path.replace(/^\/+|\/+$/g, "");
//     console.log(path);
//     res.end();
//   })
//   .listen(3000, () => {
//     // //get data tu json bang Promise
//     // function getJSONAPI() {
//     //   return new Promise(function (resolve) {
//     //     axios
//     //       .get("http://jsonplaceholder.typicode.com/posts/1")
//     //       .then(function (json) {
//     //         resolve(json.data.body);
//     //       });
//     //   });
//     // }
//     // getJSONAPI().then((result) => {
//     //   console.log(result);
//     // });
//     // //get data tu json bang async,await
//     // async function getJSONAsync() {
//     //   let json = await axios.get("http://jsonplaceholder.typicode.com/posts/1");
//     //   return json;
//     // }
//     // getJSONAsync().then((result) => console.log(result));
//   });

let server = http.createServer(async (req, res) => {
  let html = "";
  const handleUrl = url.parse(req.url);
  console.log(handleUrl);

  if (req.method === "GET" && handleUrl.pathname === "/") {
    // res.setHeader("Location", "/footer");
    const data = await database.loadData();
    res.writeHead(200, { "Content-Type": "application/json" });
    data.forEach((e) => {
      html += `<tr>
        <th scope="row">${e.id}</th>
        <td>${e.name}</td>
        <td>${e.price}</td>
        <td>
            <form method="post" action="/update">
              <button type="submit" class="btn btn-primary">Update</button>
            </form>

            <a class="btn btn-danger" href="/delete?id=${e.id}"> Delete</a>
        </td>
      </tr>`;
    });

    fs.readFile("./views/content.html", "utf-8", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      data = data.replace("{list product}", html);
      res.write(data);
      return res.end();
    });
  } else if (req.method === "POST" && handleUrl.pathname === "/create") {
    fs.readFile("./views/register.html", "utf-8", (e, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (req.method === "POST" && handleUrl.pathname === "/") {
    // create
    let data = "";
    let newName = "";
    let newPrice = 0;
    req.on("data", (chunk) => {
      data += chunk;
      newName = qs.parse(data).name;
      newPrice = parseInt(qs.parse(data).price);
      // database.createData({ newName, newPrice });
    });

    req.on("end", async () => {
      const dataS = await database.loadData();
      dataS.forEach((e) => {
        html += `<tr>
          <th scope="row">${e.id}</th>
          <td>${e.name}</td>
          <td>${e.price}</td>
          <td>
              <button type="submit" class="btn btn-primary">Update</button>
          </td>
        </tr>`;
      });

      fs.readFile("./views/content.html", "utf-8", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        data = data.replace("{list product}", html);
        res.write(data);
        return res.end();
      });

      let dataWrite = JSON.stringify(dataFile);
      fs.writeFile("products.json", dataWrite, (err) => {
        if (err) throw err;
        console.log("Data written to file");
      });
    });
  } else if (handleUrl.pathname === "/delete") {
    let id = parseInt(handleUrl.query.split("=")[1]);
    database.deleteData(id);

    req.url = "/";
    res.write("Delete");
    return res.end();
  } else {
    res.write("Hello");
    return res.end();
  }
});

server.listen(3000, () => {
  console.log("listening !");
});
