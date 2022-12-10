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
            $.each(data,(k,v)=>{
                if(calc(v.end_c)>=time){
                rows +=`<tr>`
                rows +=`<td></td>`
                rows +=`<td>${v.item}</td>`
                rows +=`<td>${v.count}</td>`
                rows +=`<td>${date_format(v.start_c)}`+'\n'+`${date_format(v.end_c)}</td>`
                rows += `<td>`
                $.each(v.zone,(k,v)=>{rows +=zones(v)})
                rows +=`</td>`
                rows +=`<td>`
                $.each(v.houses,(key,value)=>{
                    rows +=value.housename+'\n'
                })
                rows +=`</td>`
                rows +=`</tr>`
            }
            })
            table.html(rows)
		}
    })
    
})

function date_format(e){
    var d = new Date(e).getDate(),
    m = new Date(e).getMonth()+1,
    y = new Date(e).getFullYear()
    return d+'-'+m+'-'+y;
}
function Cookie (){
	var Cookiess= Cookies.get('e')
	return Cookiess
}	
function zones(e){
    console.log(e)
    var x
    if(e=='N'){
        x=` Northern Zone `
        return x
    }else if(e=='W'){
        x=` Western Zone `
        return x
    }else if(e=='E'){
        x=` Eastern Zone `
        return x
    }else if(e=='S'){
        x=` Southern Zone `
        return x
    }else{
        console.log('err')
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
                'type':'NOW',
                'Mdate':month
            },success:function(data){
                var x = data
                if(x!==undefined){
                    $.print(x)
                }
            }
        })
    }else{
        $('#r-monthvalue').addClass('is-invalid')
    }
})
