var isIndex=require("./_isIndex");function baseNth(e,i){var n=e.length;if(n)return isIndex(i+=i<0?n:0,n)?e[i]:void 0}module.exports=baseNth;