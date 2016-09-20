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
		var ppsobj = [];
		var resultStr = "";

		//读取properties文件,保存到ppsobj中;
		fs.readFile(rdfile,"utf8",function(err,data){
			if(err){
				console.error("文件读取出错:"+err);
				return;
			}
			datarry = data.split("\n");

			for(var i=0; i<datarry.length; i++){
				var tempstr = datarry[i];
				//注释行,作为String存入数组
				if(tempstr.indexOf("#") == 0 || tempstr.indexOf("!") ==0){
					ppsobj.push(tempstr);
				//键值对作为Object存入数组
				}else if(tempstr != ""){
					var temparry = tempstr.split("=");
					var objvalue = temparry[1].replace(/^\ {0,}/,"");
					var objkey = temparry[0].replace(/\ {0,}$/,"");
					var tempobj= {};
					tempobj[objkey] = objvalue;
					ppsobj.push(tempobj);
				}else if(tempstr == ""){
					ppsobj.push("");
				}
			}

			if(modarry.length>0){ 
				var malen = modarry.length;
				for(var i=0;i<malen ;i++){
					var modobj = modarry[i];
					console.log();
					for(p in modobj){
						for(var j=0;j<ppsobj.length;j++){
							if(ppsobj[j].hasOwnProperty(p)){
								ppsobj[j][p] = modobj[p];
							}
						}
					}
				}
			}

			for(var k=0; k<ppsobj.length; k++){
				if(ppsobj[k].constructor ===  String || ppsobj[k] == ""){
					resultStr += ppsobj[k]+"\n";
				}else{
					for(q in ppsobj[k]){
						resultStr += q+"="+ppsobj[k][q]+"\n";
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
