// var socket = io.connect('http://192.168.10.120:3000');//pierre IP 103 //thomas IP 144
//Le serveur détecte la connexion
//socket.on('logged', function(userID){
//$('body').append('<h1> Welcome user '+userID+'</h1>');
//});
var socket = io.connect('http://localhost:3000');
$("#formulaire").submit( function (event){
// prevent reload page
    event.preventDefault ();
    $(this).addClass ("hidden");

// affiche la liste des utilisateurs
    $("#connected_users").removeClass ("hidden");

// contact server
    var user = {
        username : $("#username").val(),
        email : $("#mail").val()
    };
    socket.emit ("logged", user);
    socket.on ('gestion_user', function(all_users){
		console.log(all_users);
		var $ul = $("#user_list");
		$ul.html ('');
    	for (var i = 0; i < all_users.length; i++) {
    		// for (var i in all_users) {
				$ul.append('<li>['+all_users[i].username+']</li>');	
	    	}
    	});
    });


$("#log").submit( function (event) {
    event.preventDefault();
    var message = $("#msg").val();
    socket.emit('send_msg', message);
    $('#msg').val('');
});

socket.on('all_msg', function (socketUser, message) {
    console.log(message);
    //console.log(msg);
    $("#list_message").append('<panel>['+socketUser.username+' :][ '+message+']</panel><br>');
});
