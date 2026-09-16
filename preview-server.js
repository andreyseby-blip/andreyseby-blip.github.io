const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const types = { ".html":"text/html", ".css":"text/css", ".js":"text/javascript", ".png":"image/png", ".jpg":"image/jpeg", ".mp4":"video/mp4", ".pdf":"application/pdf", ".svg":"image/svg+xml" };

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end("Not found: " + p); }
    const ext = path.extname(file);
    res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
    res.end(data);
  });
}).listen(8811, () => console.log("listening on 8811"));
