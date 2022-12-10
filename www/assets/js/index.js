$(document).ready(function(){
	
	var Cookiess = Cookies.get('e')
	var res_z_data =''
	var res_data = ''
	if(Cookiess!=null){
		$.ajax({
			url:"http://192.168.1.111:3030/zones",
			type:"POST",
			headers:{
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Bearer "+Cookiess+""
			},
			success:function(data){
				$('#zones-page').empty() 
				$.each(data,function(k,v){
					res_z_data +=`<button type="button" onclick="ZoneRequest(${v.ID})" class="btn btn-secondary btn-block">${v.AreaName}</button>`
				})
				$('#zones-page').html(res_z_data)
			}
		})
		$.ajax({
			url:"http://192.168.1.111:3030/zones",
			type:"POST",
			headers:{
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Bearer "+Cookiess+""
			},
			success:function(data){
				$('#s2_demo1').empty() 
				$.each(data,function(k,v){
					res_data +=`<option value="${v.ID}">${v.AreaName}</option>`
				})
				$('#s2_demo1').html(res_data)
			}
		})

	}
})
$('#campaignaddbtn').click(function(){
	window.location = './campaignadd.html'
})

$('#campaignsnowbtn').click(function(){
	window.location = './campaignsnow.html'
})

$('#campaignsendedbtn').click(function(){
	window.location = './campaignsended.html'
})

$('#addtostorebtn').click(function(){
	window.location = './storgeadd.html'
})

$('#storeinfobtn').click(function(){
	window.location = './storgedetails.html'
})

$('#Report_Zone').click(function(){
	ZoneReport($('#s2_demo1 option:selected').val())
})


function ZoneRequest(e){
	window.location ='./houses.html?zone='+e
}
function ZoneReport(e){
	console.log(e)
}

