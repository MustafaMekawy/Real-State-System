const mongoose=require("mongoose")
const rolesSchema=mongoose.Schema({
        roleTitle:{
            type:String,
            trim:true,
            required:true,
            // enum:["customer", "employee", "admin"]
        },
        urls:[{
            url:{type:String},
            method:{type:String},
            params:[],
            query:[]
    }]
    }
)
const roles=mongoose.model("Role",rolesSchema)
module.exports=roles