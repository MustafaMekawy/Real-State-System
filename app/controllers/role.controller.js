const RoleModel=require("../../db/models/roles.model")
const myHelper=require("../helper")
class Role{
    static CreatRole=async(req,res)=>{
        try{
            // const r={roleTitle:req.body.roleTitle,urls:{
            //     url:req.body.url,
            //     method:req.body.method
            // }}
            const role =new RoleModel(req.body)
            await role.save()
            myHelper.resHandler(res, 200, true, role, "role added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static AddUrl=async(req,res)=>{
        try{
            const role= await RoleModel.findById(req.params.id)
            role.urls.push(req.body)
            await role.save()
            myHelper.resHandler(res, 200, true, role, "role added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }   
}
module.exports=Role