const userModel=require("../../db/models/user.model")
const myHelper=require("../helper")
class User{
    static register = async(req,res) => {
        try{
            if(req.body.password.length<6) throw new Error("password must be more than 6")
            const userData = new userModel(req.body)
            
            await userData.save()
            myHelper.resHandler(res, 200, true, userData, "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static login = async(req,res) => {
        try{
            const userData = await userModel.loginUser(req.body.email, req.body.password)
            const token = await userData.generateToken()
            myHelper.resHandler(res, 200, true, {user:userData, token}, "user login successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static profile = (req,res)=>{
        myHelper.resHandler(res, 200, true,{user: req.user},"user profile fetched")
    }
    static editprofile = async(req,res) => {
        try{
            const data =req.body
            const user = await userModel.findByIdAndUpdate(req.user._id,data,{new:true})
            myHelper.resHandler(res, 200, true,user, "user ediet successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static logOut = async(req,res) => {
        try{
            req.user.tokens.pull({token:req.token})
            await req.user.save()
            myHelper.resHandler(res, 200, true,null, "logout successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static editpassword = async(req,res) => {
        try{
            req.user.password=req.body.password
            await req.user.save()
            myHelper.resHandler(res, 200, true,req.user, "password updated successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static forgetpassword = async(req,res) => {
        try{

            myHelper.resHandler(res, 200, true,req.user, "to reset your password please click on this link, if you don't please ignore this message")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static changeStatus = async(req,res) => {
        try{
            if(req.user.status==false)req.user.status=true
            else if(req.user.status==true)req.user.status=false
            await req.user.save()
            myHelper.resHandler(res, 200, true,req.user, "stats changed")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static deleteaccount = async(req,res) => {
        try{
            await userModel.findByIdAndDelete(req.user._id)
            myHelper.resHandler(res, 200, true,null, "deleted")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static registerCustmoer = async(req,res) => {
        try{
            if(req.body.roleId!='63a994ef7a59b58658bfc88b') throw new Error("customer id only  this action")
            if(req.body.password.length<6) throw new Error("password must be more than 6")
            const userData = new userModel(req.body)
            await userData.save()
            myHelper.resHandler(res, 200, true, userData, "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static DeleteAnyUser = async(req,res) => {
        try{
            await userModel.findByIdAndDelete(req.params.id)
            myHelper.resHandler(res, 200, true,null, "deleted user")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    
    }
}
module.exports=User