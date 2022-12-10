$(document).ready(function(){

	var Cookiess= Cookies.get('e');
	if(Cookiess!=null){
		$.ajax({
		  url: "http://192.168.1.111:3030/check",
		  type: 'POST',
		  headers: {
			    "Content-Type": "application/x-www-form-urlencoded",
			    "Authorization": "Bearer "+Cookiess+""
		  	},
		  success: function(data) {
		    window.location.href="./"
		  }
		})
	}
	$('#inputUsername').focus()
})

$('#loginForm').submit(function(e){
	e.preventDefault();
	var username=$('#inputUsername').val()
	var password=$('#inputPassword').val()

$.ajax({
  url: "http://192.168.1.111:3030/login",
  type: 'POST',
  headers: {
	    "Content-Type": "application/x-www-form-urlencoded"
  	},
  	data:{
	    "username": username,
	    "password": password
  	},
  error : function(err) {
  	$('#PasswordError').hide()
    $('#PasswordError').show()
  	},
  success: function(data) {
    Cookies.set('e',data.token)
    window.location.href="./"
  }
})
})