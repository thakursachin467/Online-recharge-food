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
}
}
