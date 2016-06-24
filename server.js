var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.use(function(req,res,next){
    res.status(404).send('<h1>404</h1><br><h2> Page Non Trouvée</h2>');
});

http.listen(3000, function () {
  console.log('listening on port', this.address().port);
});

/*GESTION SOCKET*/
var users= [];
var userID = 0;

io.sockets.on('connection', function(socket){
    socket.on('logged', function(user){
        user.id = userID;
        users.push(user);
        userID++;
    });
});
// var current_user = userID;
// userID++;
// console.log("New user connected "+current_user);
// socket.emit('logged', current_user);
// socket.on('disconnect', function(){
// console.log("User Disconnected "+current_user);




