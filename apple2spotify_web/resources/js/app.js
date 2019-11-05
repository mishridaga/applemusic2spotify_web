$("#my_form").submit(function(event){
	event.preventDefault(); //prevent default action 
	var post_url = $(this).attr("action"); //get form action url
	var request_method = $(this).attr("method"); //get form GET/POST method
    var form_data = $(this).serialize(); //Encode form elements for submission
    var fileName = document.getElementById("txtFile").value
    var playlistName = document.getElementById("playlistName").value
    var post_data = "{ \"txtFile\" : \"" + fileName + "\", \"playlistName\" : \"" + playlistName + "\" }"
    var actual_data = "{\n\t\"txtFile\" : \"Walk To Class.txt\", \n\t\"playlistName\" : \"postman\"\n}"
    
    
	$.ajax({
		url : "https://cors-anywhere.herokuapp.com/https://6r0fc4ij4m.execute-api.us-east-1.amazonaws.com/prod" ,
		type: "post",
		data : post_data
    }).done(function(response){ //
        console.log("yay")
	});
});