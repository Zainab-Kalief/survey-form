var express = require('express')
var path = require('path')
var app = express()
app.use(express.static(path.join(__dirname, './static')))

app.get('/', (request, response) => {
  response.render('index.html')
})

var server = app.listen(8000, () => { console.log('listening on port  8000'); })
var io = require('socket.io').listen(server)
io.sockets.on('connection', function (socket) {
  // console.log(`socket connected on ${socket.id}`);
  socket.on('posting_form', function (data) {
    socket.emit('update_message', {response: data.post_data, random: Math.trunc(Math.random() * 1000)})
  })
})
