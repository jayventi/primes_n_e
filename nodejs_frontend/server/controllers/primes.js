// this is our prime.js file located at /server/controllers/prime.js
// note NO immediate function and the object that is returned

// set prime parameter max boundary conditions, hard fixed minimum
// to 1 in each case lesser values make no sense given context.
// DOTO move system constants into separate js or yaml file called 
// in server.js  
var maxLen = 12,
    maxOrd = 9;

// load primeData from file
var fs = require('fs');
var primeData = JSON.parse(
        fs.readFileSync('./server/datafiles/prime_n_e_12-20.json', 'utf8'));

// setup a csv to json converter
var Converter = require("csvtojson").Converter;


// require multer to handle file uplode for adding a user
var multer = require('multer');
// multers disk storage settings
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' +
            file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});
// setup multer upload with multer settings
var upload = multer({
                    storage: storage
                    }).single('file');

function lookupPrimeData(len, ord) {
    // looks up prime given parameters if they are within bounds
    // otherwise builds human readable error message and returns
    
    var results = {};
    var error_code = 0,
        err_desc = '';
    var key = len + '-' + ord;
    var xykey = ord + '-' + len;
    results.key = key;
    results.xykey = xykey;    
    // if within allowable X Y bounds lookup prime
    if(len >= 1 && len <=maxLen
       && ord >= 1 && ord <=maxOrd){        
            results.data = primeData[key];
            console.log("results = " + results.xykey);
    } else {
        // X Y parameters out of bounds, built error message
        if (ord < 1 || ord > maxOrd){
            err_desc = '0 > X <= ' + maxOrd.toString() ;
            error_code = 1;
        }
        if(len < 1 || len > maxLen){
            if (err_desc !== ''){
                err_desc += ' and ';
            }
           err_desc += '0 > Y <= ' + maxLen.toString();
           error_code = 1;
        }
        err_desc = 'err: '+ err_desc;
        console.log("err_desc: "+err_desc );
        results.error_code = error_code;
        results.err_desc = err_desc;
    }
    return results;
}

module.exports =  {
    getPrimeData: function (req, res) {
        var results = lookupPrimeData(req.body.len, req.body.ord);
        res.json(results);
    },
    getPrimeByUplode: function (req, res) {
        // TODO file housekeeping delete file after processing
        upload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            // extract data from file and convert from csv to json
            console.log("Uploded file: ./uploads/"+req.file.filename );
            var converter = new Converter({noheader:true});
            converter.fromFile("./uploads/"+req.file.filename,function(err,result){
                console.log(result );
                // iterate through csv list extract parameters
                primeRes = [];
                for (var i = 0; i < result.length; i++) {
                    ///console.log(result[i].field1 );
                    // build list of results using lookupPrimeData
                    primeRes[i]=(lookupPrimeData(result[i].field2, result[i].field1));
                }
                ///console.log( primeRes );
                res.json({error_code:0,err_desc:null,data:primeRes});
            });
        });
    },
};