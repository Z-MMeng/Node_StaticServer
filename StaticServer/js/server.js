/*引入模块*/
var port = 6060;
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var mime = require('./mime').types;
var config = require('./config');
var rootUrl="E:/node/StaticServer/assets";

/*创建http服务端*/
http.createServer(function(request,response){
    //防止非法访问。 比如path是 /../server/server.js 会替换成 /server/server.js
    var pathname = url.parse(request.url).pathname;
    if(pathname === '/'){
        pathname += config.Expires.index;
    }
    console.log(pathname);
    pathname = path.normalize(pathname.replace(/\.\./g, ""));

    /*读取静态文件*/
    //通过path模块的path.exists方法来判断静态文件是否存在磁盘上,不存在我们直接响应给客户端404错误。 
    var realPath = rootUrl + pathname;
    console.log(realPath);

    fs.exists(realPath,function(exists){
        //如果找不到文件，则：
        if (!exists) {
            response.writeHead(404,{'Content-Type': 'text/plain'});
            response.write("Oh mama ah, what this monster, you can't find：" + realPath);
            response.end();
        }
        //找到的话，则:
        else{

            /*1. mime类型支持*/

            //根据请求的mime类型返回相应的content-type；
            //我们通过path.extname来获取文件的后缀名。由于extname返回值包含”.”，所以通过slice方法来剔除掉”.”，对于没有后缀名的文件，我们一律认为是unknown。 
            var  mimename = path.extname(realPath);
            mimename = mimename ? mimename.slice(1): "unknown";
            console.log(mimename)
            //获取文件信息
            var contentType = mime[mimename]||'text/plain';
            response.setHeader('Content-Type',contentType);

            /*2. 缓存机制*/
            //异常参数err, 文件信息数组 stats
            fs.stat(realPath,function(err,stat){
                //首先，读取文件的最后修改时间。
                var lastModified = stat.mtime.toUTCString();//为所有请求添加Last-Modified头
                var ifModifiedSince = 'If-Modified-Since'.toLowerCase();//同时检测浏览器是否发送了If-Modified-Since请求头
                response.setHeader('Last-Modified',lastModified);//设置最后修改时间

                if (mimename.match(config.Expires.fileMatch)) {
                    var expires = new Date();
                    //设置缓存时长，通常浏览器 Cache-Control高于Expires
                    expires.setTime(expires.getTime()+config.Expires.maxAge*1000);
                    response.setHeader('Expires',expires.toUTCString());
                    response.setHeader('Cache-Control','max-age='+config.Expires.maxAge);
                }

                if (request.headers[ifModifiedSince] && request.headers[ifModifiedSince] == lastModified) {
                    console.log("从浏览器cache里取");
                    response.writeHead(304,"Not Modified");
                    response.end();
                }else{
                    /*调用fs.readFile方法读取文件：*/
                    fs.readFile(realPath,"binary",function(err,file){
                        //如果发生错误，我们响应给客户端500错误，表明存在内部错误
                        if (err) {
                            response.writeHead(500,{'Content-Type': 'text/plain'});
                            response.edd(err);
                        }
                        //斗则正常状态下则发送读取到的文件给客户端，表明200状态。
                        else{
                            response.writeHead('200','Ok');
                            response.write(file,'binary');
                            response.end();
                        }
                    });
                }
            })      
        }
    });
}).listen(port);
console.log('Server runnig at port:'+port+".");



