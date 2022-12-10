var checkedd = []
$(document).ready(function() {
		
})
function Cookie (){
	var Cookiess= Cookies.get('e')
	return Cookiess
}	

$('#addnewcampaign').click(function(){
	
	checkedd = []
	$(".houses-checkbox input:checked").each(function (){
		var person = {
			HouseName:$(this).attr('name'),
			houseID:$(this).val()
		}
		checkedd.push(person)
	})

	var zones = $('#zonescard').val(),
	item = $('#input-item').val(),
	count = $('#input-count').val(),
	start_time = new Date($('#picker-start').val()),
	end_time = new Date($('#picker-end').val())

	$.ajax({
		url:"http://192.168.1.111:3030/addcampaign",
		type:"post",
		headers:{
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Bearer "+Cookie()
		},
		data:{
			"zone":zones,
			"houses":checkedd,
			"item":item,
			"count":count,
			"startc":start_time,
			"endc":end_time
			
		},
		success:function(data){
			window.location='./campaignsnow.html'
		}
	})

})

$('#zonescard').on('change', function () {
	checkedd = []
	$('.houses-checkbox input:checkbox').prop('checked',false)
})


$('#compaigntime').on('hidden.bs.modal', function(){
	var datex = $('#picker-start').val(),
	datey = $('#picker-end').val()
	// x = calc(datex)
	if(!datex || !datey){
		$(this).modal('show')
		$('#picker-start').addClass('is-invalid')
		$('#picker-end').addClass('is-invalid')
		$('#picker-span').addClass('badge badge-danger')
		$('#invalid-time').show(600).delay(2000).hide('slow')
	}else{
		if(datex>datey){
			$(this).modal('show')
			$('#picker-start').addClass('is-invalid')
			$('#picker-end').addClass('is-invalid')
			$('#picker-span').addClass('badge badge-danger')
			$('#invalid-time').show(600).delay(2000).hide('slow')
		}else{
			$('#picker-start').removeClass('is-invalid')
			$('#picker-end').removeClass('is-invalid')
			$('#picker-span').removeClass('badge badge-danger')
		}
	}
	function calc(e){
		return e.getFullYear() * 8760 + (e.getMonth()+1) * 730 + e.getDate() * 24
	}
  })

$('#houses-query').click(function(){
	var zone = $('#zonescard').val()
	var coo=Cookie()
	$("#compaignhouses").on('shown.bs.modal', function(){
		if($('#zonescard').val().length!==0){
			HousesRequest(coo,zone)
		}else{

			$('#compaignhouses').modal('toggle');
			$('#compaignzone').modal('show')
		}
	  });
})

$("#select_allhouses").click(function(){

	if (! $('.houses-checkbox input:checkbox').prop('checked')) {
		$('.houses-checkbox input:checkbox').prop('checked',true)
		$('#compaignhouses').modal('hide')
	}/* else {
		$('.houses-checkbox input:checkbox').prop('checked',false)
		$('#compaignhouses').modal('hide')
	}*/      

})

function zone_selected (zone){
	var x
	if(zone==='N'){
		return x = 'N'
	}
	else if(zone==='E'){
		return x = 'E'
	}
	else if(zone==='W'){
		return x = 'W'
	}
	else if(zone==='S'){
		return x = 'S'
	}else{
		x = []
		return x = 'error'
	}
}

function HousesRequest(Cookiess,Zone){
	var housestable=$('#houses-query-card')
	var rows=''

	if(Cookiess!=null){

		$.ajax({
			url:"http://192.168.1.111:3030/housesfind",
			type:"get",
			headers:{
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Bearer "+Cookiess
			},
			data:{
				"zone":Zone
			},
			success:function(data){
				housestable.html('')
				$.each(data,(k,v)=>{
					rows+=`<div class="col-12 col-sm-12 col-md-2 col-lg-2 m-3 houses-checkbox">`
					rows+=`<input class="form-check-input h_check" type="checkbox" name="${v.HouseName}" id="${v._id}" value="${v._id}">`
					rows+=`<label class="form-check-label" for="${v._id}">`
					rows+=`${v.HouseName}`
					rows+=`</div>`
				})
				housestable.html(rows)
			}
		})

	}
}
