const projectModel=require("../../db/models/project.model")
const myhelper=require("../helper")
class Project{
    static createProject=async(req,res)=>{
        try{
            const obj={image:req.file.path,name:req.body.name,projectType:req.body.projectType,Areas:req.body.Areas}
            const project= new projectModel(obj)
            await project.save()
            myhelper.resHandler(res,200,true,project,"project added successfully")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static showallprojects=async(req,res)=>{
        try{
            const projects = await projectModel.find()
            myhelper.resHandler(res,200,true,projects,"All projects")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static showproject=async(req,res)=>{
        try{
            const project = await projectModel.findById(req.params.id)
            await project.save()
            myhelper.resHandler(res,200,true,project,"project showed")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }

}
module.exports=Project