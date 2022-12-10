$(document).ready(function(){
	houseid() 
	pagerequest()
})

function pagerequest(){
	var pTable = $('#priporitylist'),
	personsbtn = $('#personsbtn'),
	housename  = $('#housename'),
	houseaddress=$('#houseaddress'),
	pTabler='',
	personsbtnr=''

	$.ajax({

		url: "http://192.168.1.111:3030/personsrequest",
		method: "GET",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Bearer "+Cookie()+""
		},
		data: {
		    "houseid":houseid()
	  	},
	  	success:function(data){
			pTable.html(' ')
			personsbtn.html(' ')
			$.each(data,(k,v)=>{
				if(v.Priority==1){
					pTabler +=`	<tr>
	                            <td>${v.fullname}</td>
	                        	</tr>`
				}
			})
			$.each(data,(k,v)=>{
				personsbtnr +=`<button type="button" class="btn btn-secondary btn-block btn-house" data-toggle="modal" data-target="#infoperson" onclick="personsbutton('${v._id}')">${v.fullname}</button>`
			})
			personsbtn.html(personsbtnr)
			pTable.html(pTabler)
	  	}
	})

	$.ajax({
		url: "http://192.168.1.111:3030/personhousedata",
		method: "GET",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Bearer "+Cookie()+""
		},
		data: {
			id:houseid()
		},
		success:function(data){
			housename.append(data[0].HouseName)
			houseaddress.append(data[0].addresses.addresstetxt)
		},error:function(err){
			if(err){window.location.href="./"}
		}
	})
}

function personsbutton(buttonid){
	
	var view = $('#view-list-person'),
	btnvalue = $('#btn-value')
	view.html(' ')
	btnvalue.html(' ')
	var rows='',
	btnnn=''

	$.ajax({

		url: "http://192.168.1.111:3030/personrequest",
		method: "GET",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Bearer "+Cookie()+""
		},
		data: {
		    "personid":buttonid
	  	},
	  	success:function(data){
  			rows += `<label class="control-label text-left" id="text_fullname">${data[0].fullname}</label>`
  			rows += `<br>`
  			rows += `<label class="control-label text-left" id="text_nationality">${data[0].nationality}</label>`
  			rows += `<br>`
  			rows += `<label class="control-label text-left" id="text_phonenummber">${data[0].phonenummber}</label>`
  			rows += `<br>`
  			rows += `<label class="control-label text-left" id="text_deprtement">${data[0].deprtement}</label>`
  			rows += `<br>`
  			rows += `<label class="control-label text-left" id="text_birthday">${data[0].birthday}</label>`
  			rows += `<br>`
  			rows += `<label class="control-label text-left" id="text_tc">${data[0].tc}</label>`
  			rows += `<br>`
  			rows += `<label class="control-label text-left" id="text_dateadd">${data[0].dateadd}</label>`
  			rows += `<br>`
  			rows += `<label class="control-label text-left" id="text_sex">${data[0].sex}</label>`
  			rows += `<br>`
  			rows += `<label class="control-label text-left" id="text_Priority">${data[0].Priority}</label>`  			
  			rows += `<br>`
  			rows += `<label class="control-label text-left" id="text_note">${data[0].note}</label>`

  			btnnn +=`<button type="button" class="btn btn-success btn-block" onclick="personupdate('${data[0]._id}')">Add</button>`
		  			 
		  	view.html(rows)
			btnvalue.html(btnnn)
	  	}
	})
}

function changepersontext(){
	var 
	textfullname = $('#text_fullname').text(),
	textnationality = $('#text_nationality').text(),
	textphonenummber = $('#text_phonenummber').text(),
	textdeprtement = $('#text_deprtement').text(),
	textbirthday = $('#text_birthday').text(),
	texttc = $('#text_tc').text(),
	textsex = $('#text_sex').text(),
	textnote = $('#text_note').text(),
	textPriority = $('#text_Priority').text()

	$('#update_fullname').val(textfullname)	
	$('#update_nationality').val(textnationality)
	$('#update_phonenumber').val(textphonenummber)
	$('#update_department').val(textdeprtement)
	$('#update_birthday').val(textbirthday)
	$('#update_tc').val(texttc)
	$('#update_sex').val(textsex)
	$('#update_note').val(textnote)
	$('#update_priority').val(textPriority)	
}

function personupdate(id){
	// console.log(id)

	var
	fullname=$('#update_fullname').val(),	
	nationality=$('#update_nationality').val(),
	phonenummber=$('#update_phonenumber').val(),
	deprtement=$('#update_department').val(),
	birthday=$('#update_birthday').val(),
	tc=$('#update_tc').val(),
	sex=$('#update_sex').val(),
	priority=$('#update_priority').val(),	
	note=$('#update_note').val()

	$.ajax({
		url:"http://192.168.1.111:3030/personupdate",
		method:"POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": "Bearer "+Cookie()+""
		},
		data:{

		    "_id":id, 
			"fullname":fullname,
		    "nationality":nationality,
		    "phonenummber":phonenummber,
		    "deprtement":deprtement, 
		    "birthday":birthday,
		    "tc":tc ,
		    "sex":sex ,
		    "priority":priority,
		    "note":note

		},
		success:function(data){
			location.reload()
		}
	})
}

function addperson(){

	var 
	fullname=$('#fullname-input').val(),
	nationality=$("#s-add option:selected").text(),
	phonenummber=$('#phonenummber-input').val(),
	birthday=$('#birthday-input').val(),
	tc=$('#tc-input').val(),
	sex=$('#sex-input option:selected').val(),
	note=$('#note-input').val(),
	_id=houseid(),
	deprtement=$('#deprtement-input').val()

$.ajax({
	url: "http://192.168.1.111:3030/personadd",
	method: "POST",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Authorization": "Bearer "+Cookie()+""
	},
	data: {
	    "fullname":fullname ,
	    "nationality":nationality ,
	    "phonenummber":phonenummber ,
	    "birthday":birthday,
	    "tc":tc ,
	    "sex":sex ,
	    "note":note ,
	    "_id":_id ,
	    "deprtement":deprtement 
  	},
  	success:function(data){
  		location.reload()
  	}
})

}

function personsdeletetable(){
	var priority_table =$('#personsdeletetable')
	var rows=''

	$.ajax({
	url: "http://192.168.1.111:3030/personsrequest",
	method: "GET",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Authorization": "Bearer "+Cookie()+""
	},
	data: {
	    "houseid":houseid()
  	},
  	success:function(data){
		priority_table.html(' ')
		$.each(data,(k,v)=>{
			console.log(v.Priority)

				rows+=`<div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${v._id}">
                    <label class="form-check-label" for="defaultCheck1">
                    ${v.fullname}
                    </label>
                	</div>`

		})
		priority_table.html(rows)
  	}
	})

}

function persondelete(){
	event.preventDefault()

    var searchID = $("#personsdeletetable input:checkbox:checked").map(function(){
      	return $(this).val()
    }).get()

    $.ajax({
			url:"http://192.168.1.111:3030/delperson",
			type:"POST",
			headers:{
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": "Bearer "+Cookie()+""
			},
			data:{
				"personid":searchID
			},
			success:function(data){
				location.reload()
			}
		})
}

function personspriority(){
	var priority_table =$('#personsprioritytable')
	var rows=''
	$.ajax({
	url: "http://192.168.1.111:3030/personsrequest",
	method: "GET",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Authorization": "Bearer "+Cookie()+""
	},
	data: {
	    "houseid":houseid()
  	},
  	success:function(data){
		priority_table.html(' ')
		$.each(data,(k,v)=>{
			console.log(v.Priority)
			if(v.Priority==1){
				rows+=`<div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${v._id}" checked>
                    <label class="form-check-label" for="defaultCheck1">
                    ${v.fullname}
                    </label>
                	</div>`
                }else{
                	rows+=`<div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${v._id}">
                    <label class="form-check-label" for="defaultCheck1">
                    ${v.fullname}
                    </label>
                	</div>`
                }
		})
		priority_table.html(rows)
  	}
})

}

function addpriority(){
	event.preventDefault()

    var searchID = $("#personsprioritytable input:checkbox:checked").map(function(){
      	var z = $(this).val()
      	call(z,1)
    }).get()

    var unchecked = $("#personsprioritytable input:checkbox:not(:checked)").map(function(){
      	var y=$(this).val()
      	call (y,0)
    }).get()

function call(I,P){
	    $.ajax({
				url:"http://192.168.1.111:3030/addpersonpriority",
				type:"POST",
				headers:{
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": "Bearer "+Cookie()+""
				},
				data:{
					"personid":I,
					"priority":P
				},
				success:function(data){
					location.reload()
				}
		})
	}
}
$('#r-houseinfo').click(function(){
	$.ajax({
		url:'http://192.168.1.111:3030/reporthouse',
		type:'get',
		headers:{
			'Content-Type':'application/x-www-form-urlencoded',
			'authorization':'Bearer '+Cookie()
		},data:{
			houseid:houseid()
		},success:function(data){
			$.print(data);
		}
	});
});

function Cookie (){
	var Cookiess= Cookies.get('e')
	return Cookiess
}	

function houseid(){

	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	var houseid = urlParams.get('id')
	if(houseid==undefined){window.location.href="./"}
	return houseid.cleanup()
}

String.prototype.cleanup = function() {
   return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
}