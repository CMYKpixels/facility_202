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


io.sockets.on('connection', function(socket) {
	var socketUser = false;
    socket.on('logged', function(user) {
        user.id = userID;
        users[user.id] = user;
        socketUser = user;
        userID++;
        console.log('User ['+socketUser.username+'] sign in...');
        //Socket.broadcast.emit() envoie à toutes les autres soquettes [sockets]
        io.sockets.emit('gestion_user', users.filter(Boolean));
        //tout le monde sauf le socket/user en court reçoit le broadcast
        //io.sockets.emit envoie à tout le monde moi y compris
    });


    socket.on('disconnect', function() {
    	if(socketUser !== false){
    		console.log('User ['+socketUser.username+'] déconnecté');
            delete users[socketUser.id];
            io.sockets.emit('gestion_user', users.filter(Boolean));

            console.log(users);
    	}
    });

    socket.on('send_msg', function (msg) {
        io.sockets.emit('all_msg', socketUser, msg);
    });
});



