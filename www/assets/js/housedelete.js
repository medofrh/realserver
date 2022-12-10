$(document).ready(function () {

	var zonee=Zone(),coo=Cookie()
	HousesRequest(coo,zonee)
})

function HousesRequest(Cookiess,Zone){
	var housestable=$('#HousesTable')
	var rows=''

	if(Cookiess!=null){

		$.ajax({
			url:"http://192.168.1.111:3030/housesfind",
			type:"get",
			headers:{
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Bearer "+Cookiess+""
			},
			data:{
				"zone":Zone
			},
			success:function(data){
				housestable.html('')
				$.each(data,(k,v)=>{

					rows+=`<div class="form-check col ">
                                <input class="form-check-input" type="checkbox" value="${v._id}" name="${v.HouseName}">
                                <label class="form-check-label" for="defaultCheck1">
                                    ${v.HouseName}
                                </label>
                            </div>`
				
				})
				housestable.html(rows)
			}
		})

	}
}

function Cookie (){
	var Cookiess= Cookies.get('e')
	return Cookiess
}	

function Zone(){
	$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + `=([^&#]'*)`).exec(window.location.href)
		if(results !=null){
		return results[1] || 0
		}
	}
	console.log($.urlParam('zone'))
	var Zone = $.urlParam('zone')
	return Zone
}

function housedel(){
	event.preventDefault()
	var checkbox=[]
	$("#HousesTable input:checked").each(function (){
		checkbox.push($(this).val())
	})
    $.ajax({
			url:"http://192.168.1.111:3030/housedel",
			type:"POST",
			headers:{
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Bearer "+Cookie()+""
			},
			data:{
				"houseid":checkbox
			},
			success:function(data){
				window.location.href="./"
			}
		})
}