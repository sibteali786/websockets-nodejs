const http = require("http");
const WebSocketServer = require("websocket").server;

global.connection = null; // Attach to global object

const httpServer = http.createServer((req, res) => {
  console.log("Received a request");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("HTTP server is running\n");
});

const webSocket = new WebSocketServer({
  httpServer: httpServer,
});

webSocket.on("request", (request) => {
  global.connection = request.accept(null, request.origin);
  console.log("WebSocket connection accepted");

  global.connection.on("open", () => console.log("Connection opened!"));
  global.connection.on("close", () => console.log("Connection closed!"));
  global.connection.on("message", (message) => {
    console.log(`Received message: ${message.utf8Data}`);
  });
  sendEvery5Seconds();
});

httpServer.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
function sendEvery5Seconds() {
  connection.send(`Message: ${Math.random()}`);
  setTimeout(sendEvery5Seconds, 5000);
}
