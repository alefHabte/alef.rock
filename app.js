const http = require('http')

http.createServer(function(req,res){
res.write("yishalhal");
	res.end();
}).listen(3000);
console.log("server started on 3000");
