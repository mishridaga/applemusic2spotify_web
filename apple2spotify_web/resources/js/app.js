const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '2a1d90ee16ec48abaaf43331a613d6be'
const redirectUri = 'http://www.apple2spotify.com/'
const scopes = [
	'playlist-modify-public'
  ];


window.onload = function() {
	document.getElementById('authorize').onclick = authorize;
}

function authorize() {
	window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
  });


$("#my_form").submit(function(event){

	event.preventDefault(); //prevent default action 
	
	var converting = document.getElementById("convert").innerHTML = "converting ..."
	
	try {
		var accessToken = window.location.href.split('access_token=')[1].split("&")[0]
	} catch (error) {
		document.getElementById("convert").innerHTML = "convert"
		alert("need to authorize first!");	
		return
	}

	var blob = document.getElementById("txtFile").files[0]
	var playlistName = document.getElementById("playlistName").value
	var reader = new FileReader();

	reader.onload = function(e) {
		var arrayBuffer = reader.result.replace(/['"]+/g, '');
		var post_data = "{ \"txtFile\" : \"" + arrayBuffer + "\", \"playlistName\" : \"" + playlistName + "\" , \"accessToken\" : \"" + accessToken + "\"}"
		$.ajax({
			url : "https://6r0fc4ij4m.execute-api.us-east-1.amazonaws.com/prod" ,
			type: "post",
			data : post_data,
			async  : true,
		}).always(function(jqXHR, textStatus){ //
			var success = document.getElementById("convert").innerHTML = "success!"
		})
	}

	reader.readAsText(blob);

});

