var path = require('path')
    , root_path = path.normalize(__dirname)
    ,_=require('lodash');

module.exports = function (env){
    var main={
      database:'mongodb://localhost/cls',
      app_name:'CLS mobile app',
      app_root:root_path,
      temp:path.join('D','temp')
    };

    var dev={
        database:'tingodb://'+root_path+'/data/',
        env:'development'
        };
    var prod={
        temp:path.join('/','tmp'),
        env:'production'
    }

    return _.extend(main,(env=='dev')?dev:prod);
}

