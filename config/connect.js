var configvalues = require('./database');

module.exports = {

    databaseurluser :function() {
        return "mongodb://"+configvalues.uname + ":" + configvalues.upwd + "@ds253959.mlab.com:53959/onlinerechargeusers";
    }


}
