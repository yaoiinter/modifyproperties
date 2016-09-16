var pps2obj = require("./properties2obj");

var p2o = new pps2obj();
var testarry = [{"src.dir":"xxxx"},{"res.dir":"mytestdir"}];
p2o._init_("./test.properties");
p2o.modifyfile(testarry);
