var baseAssignValue=require("./_baseAssignValue"),createAggregator=require("./_createAggregator"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,groupBy=createAggregator(function(e,r,o){hasOwnProperty.call(e,o)?e[o].push(r):baseAssignValue(e,o,[r])});module.exports=groupBy;