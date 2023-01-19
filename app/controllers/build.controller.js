const buildModel=require("../../db/models/build.model")
const projectModel=require("../../db/models/project.model")
const myhelper=require("../helper")
class Build{
    static createBuild=async(req,res)=>{
        try{
           const project = await projectModel.findById(req.body.projectId)    
           const areaCheck= project.Areas.find(a=>{
                if(req.body.area==a) return true
            })
            if(!areaCheck) throw new Error(`area ${req.body.area} not exist in project Areas`)

            const build= new buildModel(req.body)
            await build.save()
            myhelper.resHandler(res,200,true,build,"build added successfully")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static showAllBuilds=async(req,res)=>{
        try{
            const builds= await buildModel.find()
            myhelper.resHandler(res,200,true,builds,"show all builds successfully")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static showBuild=async(req,res)=>{
        try{
            const build= await buildModel.findById(req.params.id)
            myhelper.resHandler(res,200,true,build,"show single build successfully")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }


}
module.exports=Build