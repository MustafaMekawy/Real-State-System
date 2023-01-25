const userModel = require("../../db/models/user.model")
const myHelper = require("../../app/helper")
const jwt = require("jsonwebtoken")
const RoleModel=require("../../db/models/roles.model")
const auth = async(req, res, next) => {
    try{
        let token 
        if (req.header("Authorization").startsWith('Bearer'))
          token = req.header("Authorization").replace("Bearer ", "")
        const decodedToken = jwt.verify(token, process.env.tokenPass)
        const userData = await userModel.findOne({
            _id: decodedToken._id,
            "tokens.token": token
        })
        if(!userData) throw new Error("invalid token")
        req.user = userData
        req.token = token
        next()
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e.message, "unauthorized")
    }
}
const permessions=async(req,res,next)=>{
    try{
        console.log("-------------------------------------------");
    const role= await RoleModel.findById(req.user.roleId)    
    let newUrl;
	let url = req.originalUrl;
    console.log("requestUrl: "+url);
	const reqParamsKey = Object.keys(req.params);
	const reqQueryKey = Object.keys(req.query);
    console.log(reqParamsKey);
    console.log(Object.values(req.params));
    if( reqParamsKey==0&&reqQueryKey==0) url=`${url}`+"/"

	newUrl = role.urls.find((u) => {
		if (reqParamsKey.length > 0) {
			reqParamsKey.forEach((paramKey) => {
                u.params.forEach(param=>{
                    console.log(param+"  " +paramKey);
                    if(paramKey==param){
                        url = url.replace(`${req.params[paramKey]}`, "");
                    }
                    url = url.replace("//", "/");
                    console.log(url);
                })
			});
		}
		if (reqQueryKey.length > 0) {
			reqQueryKey.forEach((queryKey) => {
                u.query.forEach(query=>{
                    if(queryKey==query){
                        url = url.replace(`${req.params[paramKey]}`, "");
                    }
                    url = url.replace("?", "");
                })
		}
    )}
        console.log(u.url +" " +url);
        console.log(u.url == url);
		return u.url == url;
	});
    console.log(!newUrl);
    console.log(req.method+" "+(newUrl.method).toUpperCase());
    console.log(req.method==(newUrl.method).toUpperCase());
	if (!newUrl) throw new Error("sorry cant acsses that route");
	if (!(req.method==(newUrl.method).toUpperCase())) throw new Error("sorry cant acsses that route");

        // const permessions=  role.urls.find(u => {
            
        //     let paramsCheck=false
        //     u.params.forEach(p => {
        //         paramsCheck=(p==Object.keys(req.params)[0])
        //         return p==Object.keys(req.params)
        //     })
        
        //     return (req.url==u.url&&req.mehod==u.mehod)
        // });
        // console.log(permessions)
        // if (!permessions) throw new Error("sorry cant acsses that route")
        next()
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e.message, "unauthorized")
    }
}
module.exports = {auth,permessions}