var rows='',table = $('#c-table')
$(document).ready(function(){
    $.ajax({
        url:"http://192.168.1.111:3030/campaignsfind",
        type:"get",
        headers:{
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Bearer "+Cookie()
		},
		success:function(data){
            function calc(e){
                e=new Date(e)
                return e.getFullYear() * 8760 + (e.getMonth()+1) * 730 + e.getDate() * 24
            }
            var time =new Date().getFullYear() * 8760 + (new Date().getMonth()+1) * 730 + new Date().getDate() * 24
            var i= 1;
            $.each(data,(k,v)=>{
                if(calc(v.end_c)<time){
                rows +=`<tr>`
                rows +=`<td>${i}</td>`
                rows +=`<td>${v.item}</td>`
                rows +=`<td>${v.count}</td>`
                rows +=`<td>${date_format(v.start_c)}`+'\n'+`${date_format(v.end_c)}</td>`
                rows += zones(v.zone)
                rows +=`<td>`
                $.each(v.houses,(key,value)=>{
                    rows +=value.housename+'\n'
                })
                rows +=`</td>`
                rows +=`</tr>`
                i++
            }
            })
            table.html(rows)
		}
    })
    
})
function Cookie (){
	var Cookiess= Cookies.get('e')
	return Cookiess
}	
function zones(e){
    var x
    if(e=='N'){
        x=`<td>Northern zone</td>`
        return x
    }else if(e=='W'){
        x=`<td>Western Zone</td>`
        return x
    }else if(e=='E'){
        x=`<td>Eastern Zone</td>`
        return x
    }else if(e=='S'){
        x=`<td>Southern Zone</td>`
        return x
    }
}

$('#r-btn').click(function(){
    var month = new Date($('#r-monthvalue').val())
    if(!isNaN(month)){
        $.ajax({
            url:'http://192.168.1.111:3030/reportnowcampaign',
            type:'get',
            headers:{
                'Content-type':'application/x-www-form-urlencoded',
                'Authorization':'Bearer '+Cookie()
            },data:{
                'type':'END',
                'Mdate':month
            },success:function(data){
                var x = data
                if(x!==undefined){
                    $.print(x)
                }
            },error: function (err) {
                alert('Date is empty')
                location.reload()
            }
        })
    }else{
        $('#r-monthvalue').addClass('is-invalid')
    }
})

function date_format(e){
    var d = new Date(e).getDate(),
    m = new Date(e).getMonth()+1,
    y = new Date(e).getFullYear()
    return d+'-'+m+'-'+y;
}