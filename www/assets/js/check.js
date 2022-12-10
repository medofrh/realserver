if($.Cookies.get('e')){
  var Cookiess= $.Cookies.get('e');
  $.ajax({
    url: "http://192.168.1.111:3030/check",
    type: 'POST',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer "+Cookiess+""
      },
    error : function(err) {
      window.location.href="./login.html";
      // console.log('Error!', err)
    },
    success: function(data) {
      // console.log('Success!',data)
    }
  })
}else{
  window.location.href="./login.html";
}
$(document).ready(function(){
  
  if($('input').val()){
    window.location.reload()
  }

})

$('.back-btn').click(function(){
  window.history.back();
  // window.location=document.referrer;
  // history.back(window.location.reload());
})

$('#Logout').click(function(){
  var Cookiess= Cookies.get('e')
    $.ajax({
    url: "http://192.168.1.111:3030/logout",
    type: 'POST',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer "+Cookiess+""
      },
    error : function(err) {

      console.log('Error!', err)
    },
    success: function(data) {
      console.log('Success!',data)
      Cookies.remove('e')
      window.location.href="./login.html"
    }
})
});

$('#logoo').click(function(){
  window.location='./'
});