var mongoose = require('mongoose');
var User=mongoose.model('User');
var formidable=require('formidable');
var fs=require('fs');
var path=require('path')
module.exports = function (app){

    app.post('/upload', function file_uploads(req,res){
        var form = new formidable.IncomingForm();
        form.uploadDir=path.join(app.get('config').temp);
        form.type=true;
        form.parse(req, function(err, fields, files) {
            if (!files.file || files.file.size == 0) {
                return res.send(500,{message:'No file added.'});
            }
            var file = files.file;
            var rand=new Date().getTime();
            var user_dir=path.join(app.get('config').app_root,'public','offer-images');
            var new_file_name=rand+"-"+file.name.replace(/\s+/g, '-').toLowerCase();
            var file_path=path.join(user_dir,new_file_name);
            fs.rename(file.path,file_path,function (err){
                if(err)return res.send(500,{message:err.stack});
                res.send({image:"/offer-images/"+new_file_name})
            })

        });
    });

}


