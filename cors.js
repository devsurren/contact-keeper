exports.cors=(req,res,next)=>{
	console.log("Firing CORS event");
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
	//res.header("Access-Control-Allow-Headers","*Origin,X-Requested-With,Content-Type,Accept*");
	res.header("Access-Control-Allow-Headers","*");
	next();
}
