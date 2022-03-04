
const app = require("./app");
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, async () => {
    console.log('HTTPS Server running on port ', port)
});
