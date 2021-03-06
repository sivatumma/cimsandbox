var path = require('path'),
    root_path = path.normalize(__dirname),
    _ = require('lodash');
module.exports = function(env) {
    var main = {
        // database:'mongodb://localhost/cls',
        database: 'mongodb://172.19.1.11/cls',
        app_name: 'CLS mobile app',
        app_root: root_path,
        temp: path.join('D:', 'temp'),
        certificates_dir: path.join('C:', 'self-signed'),
        mobile_app_root: path.join('D:', 'cisco-sandbox-mobile-app'),
        portal_app_root: path.join('D:', 'cisco-sandbox-portal-app'),
        mobile_app_debug_root: path.join('D:', 'cisco-sandbox-mobile-app-Debug')
    };
    var dev = {
        database: 'mongodb://localhost/clsdev',
        env: 'development',
        sandbox_app_root: path.join('C:','Program Files (x86)','Apache Software Foundation','Apache2.2','htdocs','sandbox'),
        services_json_path: path.join('C:','Program Files (x86)','Apache Software Foundation','Apache2.2','htdocs','sandbox','services.json')
    };
    var prod = {
        temp: path.join('/', 'tmp'),
        env: 'production',
        // certificates_dir:path.join('/','etc','ssl','self-signed'),
        // mobile_app_root:path.join('/','opt','cisco-sandbox-mobile-app'),
        // portal_app_root:path.join('/','opt','cisco-sandbox-portal-app'),
        // mobile_app_debug_root:path.join('/','opt','cisco-sandbox-mobile-app-Debug'),
        sandbox_app_root: path.join('/', 'opt', 'sandbox'),
        services_json_path: path.join('/', 'opt', 'sandbox', 'assets', 'services.json')
    }
    return _.extend(main, (env == 'dev') ? dev : prod);
}