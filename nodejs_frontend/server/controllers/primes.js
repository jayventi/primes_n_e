// this is our prime.js file located at /server/controllers/prime.js
// note NO immediate function and the object that is returned

// load primeData from file
var fs = require('fs');
var primeData = JSON.parse(
        fs.readFileSync('./server/datafiles/prime_n_e_12-5.json', 'utf8'));

// setup a csv to json converter
var Converter = require("csvtojson").Converter;
var converter = new Converter({noheader:true});

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
    var maxLen = 12,
        maxOrd = 5;
    var results = {};
        //console.log("len "+ len +" ord "+ ord );
    if(len >= 1 && len <=maxLen && ord >= 1 && ord <=maxOrd){
        var key = len + '-' + ord;
            results = primeData[key];
            results.key = key;
            console.log("in results = " + results["seq"]);
    } else {
        console.log("len or ord out of bounds" );
    }
    return results;
}

module.exports =  {
    getPrimeData: function (req, res) {
        var results = lookupPrimeData(req.body.len, req.body.len);
        if(results!={}){
        res.json(results);
        }
    },
    getPrimeByUplode: function (req, res) {
        // TODO file housekeeping delete file after processing
        upload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            // extract data from file and convert from csv to json
            console.log("./uploads/"+req.file.filename );
            converter.fromFile("./uploads/"+req.file.filename,function(err,result){
                console.log(result );
                // iterate through csv list extract parameters
                primeRes = [];
                for (var i = 0; i < result.length; i++) {
                    console.log(result[i].field1 );
                    // build list of results using lookupPrimeData
                    primeRes[i]=(lookupPrimeData(result[i].field1, result[i].field2));
                }
                console.log( primeRes );
            });
            
            res.json({error_code:1,err_desc:err});
        });
    },
};