const mongoose=require("mongoose")
const projectsSchema=mongoose.Schema({
        name:{
            type:String,
            trim:true,
            required:true,
        },
        projectType:{
            type:String,
            trim:true,
            required:true,
            enum:["show", "buy"]  
        },
        Areas:{
            type:[],
            required:true,
        },
        image:{
            type:String, 
            trim:true
        }
    })
const project=mongoose.model("Project",projectsSchema)
module.exports=project