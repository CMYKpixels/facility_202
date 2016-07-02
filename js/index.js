var socket = io.connect('http://localhost:3000');


//Le serveur détecte la connexion
//socket.on('logged', function(userID){
//	$('body').append('<h1> Welcome user '+userID+'</h1>');
//});


$("formulaire").submit(function(event) {
    event.preventDefault();
    var user = {
        username : $("#username").val(),
        email : $("#mail").val()
        
    };
});

//L'utilisateur indique qu'il est connecté
//!=socket.on où le serveur surveille les connexions
socket.emit('logged', user);