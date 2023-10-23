const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 7100;

const PUBLIC_DIRECTORY = path.join(__dirname, 'public');

function getHTML(filename) {
  const htmlFile = path.join(PUBLIC_DIRECTORY, filename)

  return fs.readFileSync(htmlFile, 'utf8');
}

function onRequest(req, res) {
  switch (req.url) {
    case "/":
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(getHTML("index.html"));

      break;
    case "/about":
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(getHTML("about.html"));

      break;
    default:
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(getHTML("404.html"));

      break;
  }
}

const server = http.createServer(onRequest);

server.listen(PORT, () => {
  console.log(`HTTP Server running on http://localhost:${PORT}`)
})