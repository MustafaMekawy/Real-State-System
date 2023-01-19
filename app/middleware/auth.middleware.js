const userModel = require("../../db/models/user.model")
const myHelper = require("../../app/helper")
const jwt = require("jsonwebtoken")
const RoleModel=require("../../db/models/roles.model")
const auth = async(req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
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
        const role= await RoleModel.findById(req.user.roleId)        
        const permessions=  role.urls.find(u => {
            console.log(req.url, u.url, req.method, u.method)
            return (req.url==u.url&&req.mehod==u.mehod)
        });
        console.log(permessions)
        if (!permessions) throw new Error("sorry cant acsses that route")
        next()
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e.message, "unauthorized")
    }
}
module.exports = {auth,permessions}