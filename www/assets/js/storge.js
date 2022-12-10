$(document).ready(function(){

})

$('#items-btn').click(function(){
    var rows='',
    table=$('#items-table')
    $.ajax({
        url:'http://192.168.1.111:3030/findstorge',
        type:'get',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization':'Bearer '+Cookies.get('e')
        },data:{
            'type':'I'
        },success:function(data){
            table.html('')
            $.each(data,(k,v)=>{
                // console.log(v)
                rows +=`<tr>`
                rows += `<td>${v.item}</td>`
                rows += `<td>${v.count}</td>`
                rows += `<td>${date_format(v.Edate)}</td>`
                rows += `<td>${date_format(v.Rdate)}</td>`
                rows += `<td>${v.note}</td>`
                rows +=`</tr>`
            })
            table.html(rows)
        }
    })
})

$('#food-btn').click(function(){
    var rows='',
    table=$('#food-table').html('')
    $.ajax({
        url:'http://192.168.1.111:3030/findstorge',
        type:'get',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization':'Bearer '+Cookies.get('e')
        },data:{
            'type':'F'
        },success:function(data){
            table.html('')
            $.each(data,(k,v)=>{
                // console.log(v)
                rows +=`<tr>`
                rows += `<td>${v.item}</td>`
                rows += `<td>${v.count}</td>`
                rows += `<td>${date_format(v.Edate)}</td>`
                rows += `<td>${date_format(v.Rdate)}</td>`
                rows += `<td>${v.note}</td>`
                rows +=`</tr>`
            })
            table.html(rows)
        }
    })
})

$('#money-btn').click(function(){
    var rows='',
    table=$('#money-table').html('')
    $.ajax({
        url:'http://192.168.1.111:3030/findstorge',
        type:'get',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization':'Bearer '+Cookies.get('e')
        },data:{
            'type':'M'
        },success:function(data){
            table.html('')
            $.each(data,(k,v)=>{
                // console.log(v)
                rows +=`<tr>`
                rows += `<td>${v.item}</td>`
                rows += `<td>${v.count}</td>`
                rows += `<td>${date_format(v.Edate)}</td>`
                rows += `<td>${date_format(v.Rdate)}</td>`
                rows += `<td>${v.note}</td>`
                rows +=`</tr>`
            })
            table.html(rows)
        }
    })
})

$('#r-btn').click(function(){
    $.ajax({
        url:'http://192.168.1.111:3030/report-storge',
        type:'get',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization':'Bearer '+Cookies.get('e')
        },data:{
            'type':$('#r-storge').val()
        },success:function(data){
            var x = data
            $.print(x)
        }
    })
})

function date_format(e){
    var d = new Date(e).getDate(),
    m = new Date(e).getMonth()+1,
    y = new Date(e).getFullYear()
    return d+'-'+m+'-'+y;
}