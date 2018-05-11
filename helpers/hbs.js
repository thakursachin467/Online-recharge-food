var moment= require('moment');
module.exports =  {
  limit: function(arr, limit) {
    if(!arr || arr.length == 5)
        return arr;

    var result = [ ];
    for(var i = 0; i < limit && i < arr.length; ++i)
        result.push(arr[i]);
    return result;
},
formatdate:function(date,format) {
      return moment(date).utcOffset("+05:30").format(format);
      //var local = moment(stillUtc).local().format(format);
      //return moment(date).format(format);
      //return local;
},
conditional: function(value1,value2){
  
  if (value1 == value2) {
    return true;
} else {
    return false;
}
},

size: function(obj){
  var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
},
total: function(obj) {

        if(obj) {
        var total= obj.reduce(function(prev,cur){
              return prev + cur.totalPrice;
        },0)

        return total;
      }
      else {
        return 0;
      }




},
totalitems: function(obj) {

        var total= obj.reduce(function(prev,cur){
              return prev + cur.quantity;
        },0)

        return total;




},
totalpay: function(obj) {

        if(obj) {
        var total= obj.reduce(function(prev,cur){
              return prev + cur.totalPrice;
        },0)

        return total*100;
      }
      else {
        return 0;
      }




}


}
