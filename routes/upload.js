var mongoose = require('mongoose');
var User=mongoose.model('User');
var formidable=require('formidable');
var fs=require('fs');
var path=require('path');
var s3c = require('../includes/s3client');
var util=require('util')
//  Modified the above client for Sandbox perspective. We will remove the above creds once success.
client = s3c.createClient({
    key: "AKIAIWALPQUADXAMILEQ",
    secret: "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",
    bucket: "cimsandbox"
});

module.exports = function (app){

    app.post('/upload', function file_uploads(req,res){

        var form = new formidable.IncomingForm();
        // form.uploadDir=path.join(app.get('config').temp);
        form.uploadDir=path.join('builds',form.providerName);
        form.type=true;
        form.parse(req, function(err, fields, files) {
            if (!files.file || files.file.size == 0) {
                return res.send(500,{message:'No file added.'});
            }
            var file = files.file;
            var rand=new Date().getTime();
            var new_file_name=file.name.replace(/\s+/g, '-').toLowerCase() + '_' + rand;

            client.upload(file.path, escape(new_file_name), { 'x-amz-acl': 'public-read','Content-Type':file.type }).
                on('error',function (err) {
                    res.send(500, err);
                }).on('end', function (url) {
                    res.send({build_path:url});
                    fs.unlink(file.path,function (err){
                       if(err)console.log('delete file error'+err)
                    })
                });

        });
    });

}




