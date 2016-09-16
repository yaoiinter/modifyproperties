/* 
 * 用于读取和写入properties文件
 */
function pps2obj(){
	var fs = require("fs");
	var file;

	this._init_ = function(pth){
		if(!pth){
			console.error("请输入正确的文件路径!")
			return;
		}else{
			this.file = pth;
		}
	}

	//修改成直接读取文件,并修改对键值
	this.modifyfile = function(modarry){
		if(modarry.constructor !== Array){
			console.error("参数必须是数组!");
			return;	
		}
		var rdfile = this.file;
		var datarry = [];
		var ppsobj = {"result":[]};
		var resultStr = "";
		fs.readFile(rdfile,"utf8",function(err,data){
			if(err){
				console.error("文件读取出错:"+err);
				return;
			}
			datarry = data.split("\n");

			for(var i=0; i<datarry.length; i++){
				var tempstr = datarry[i];
				if(tempstr.indexOf("#") == 0 || tempstr.indexOf("!") ==0){
					ppsobj["result"].push(tempstr);
				}else if(tempstr != ""){
					var temparry = tempstr.split("=");
					var objvalue = temparry[1].replace(/^\ {0,}/,"");
					var objkey = temparry[0].replace(/\ {0,}$/,"");
					var tempobj= {};
					tempobj[objkey] = objvalue;
					ppsobj["result"].push(tempobj);
				}else if(tempstr == ""){
					ppsobj["result"].push("");
				}
			}

			var srcarry = ppsobj["result"];

			if(modarry.length>0){ 
				var malen = modarry.length;
				for(var i=0;i<malen ;i++){
					var modobj = modarry[i];
					console.log();
					for(p in modobj){
						for(var j=0;j<srcarry.length;j++){
							if(srcarry[j].hasOwnProperty(p)){
								srcarry[j][p] = modobj[p];
							}
						}
					}
				}
			}

			for(var k=0; k<srcarry.length; k++){
				if(srcarry[k].constructor ===  String || srcarry[k] == ""){
					resultStr += srcarry[k]+"\n";
				}else{
					for(q in srcarry[k]){
						resultStr += q+"="+srcarry[k][q]+"\n";
					}
				}
			}

			fs.writeFile(rdfile,resultStr,function(err){
				if(err){
					console.log("文件保存出错:"+err);
					return;
				}

				console.log("修改成功!");
			});
		});
	}
}

module.exports = pps2obj;
