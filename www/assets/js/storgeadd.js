$(document).ready(function(){

})
$('#new-items').submit(function(e){
    e.preventDefault();
    var 
    datex =calc(new Date($('#s-edate').val())),
    datey=calc(new Date($('#s-rdate').val()))
    function calc(e){
		return e.getFullYear() * 8760 + (e.getMonth()+1) * 730 + e.getDate() * 24
    }
    console.log(datex+'\n'+datey)
    if(datex>datey){
        $('#s-edate').addClass('is-invalid')
        $('#s-rdate').addClass('is-invalid')
    }else{

        $.ajax({
            url:'http://192.168.1.111:3030/addstorge',
            type:'post',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':'Bearer '+Cookies.get('e')
            },data:{
                'type':$('#s-type option:selected').val(),
                'item':$('#s-item').val(),
                'count':$('#s-count').val(),
                'Edate':$('#s-edate').val(),
                'Rdate':$('#s-rdate').val(),
                'note':$('#s-note').val()
            },success:function(){
                window.location='./storgedetails.html'
            }
        })
}
    console.log('ohhh honey')
})