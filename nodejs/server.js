var http = require('http')
http
.createServer(function (req, res) {
let date = new Date();
res.writeHead(200, { 'Content-Type': 'text/plain' })
res.end('pantakarn charoensri\n'+date)

})
.listen(2337, '127.0.0.1')
console.log('Server running at http://127.0.0.1:2337/')