const buildModel=require("../../db/models/build.model")
const projectModel=require("../../db/models/project.model")
const myhelper=require("../helper")
class Build{
    static createBuild=async(req,res)=>{
        try{
           const project = await projectModel.findById(req.body.projectId)    
           if(!project)throw new Error("project not found!!!")
           const obj={projectId:req.body.projectId,area:req.body.area,buildNum:req.body.buildNum,numoffloors:req.body.numoffloors ,image:req.file.path}
           const areaCheck= project.Areas.find(a=>{
                 return obj.area==a
            })
            if(!areaCheck) throw new Error(`area ${req.body.area} not exist in project Areas`)
            const uniqeBuildNum=await buildModel.findOne({projectId:obj.projectId,buildNum:obj.buildNum,area:obj.area})
            if(uniqeBuildNum)throw new Error("build Number must be uinqe ")
            const build= new buildModel(obj)
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