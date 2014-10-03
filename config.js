var path = require('path')
    , root_path = path.normalize(__dirname)
    ,_=require('lodash');

module.exports = function (env){
    var main={
      database:'mongodb://localhost/cls',
      app_name:'CLS mobile app',
      app_root:root_path,
      temp:path.join('D:','temp'),
      certificates_dir:path.join('C:','self-signed'),
      mobile_app_root:path.join('D:','CLS-Mobile-App'),
      portal_app_root:path.join('D:','CLS-Portal-App'),
      mobile_app_debug_root:path.join('D:','CLS-Mobile-App-Debug')
    };

    var dev={
        database:'mongodb://localhost/clsdev',
        env:'development'
        };
    var prod={
        temp:path.join('/','tmp'),
        env:'production',
        certificates_dir:path.join('/','etc','ssl','self-signed'),
        mobile_app_root:path.join('/','opt','CLS-Mobile-App'),
        portal_app_root:path.join('/','opt','CLS-Portal-App'),
        mobile_app_debug_root:path.join('/','opt','CLS-Mobile-App-Debug')
    }

    return _.extend(main,(env=='dev')?dev:prod);
}

