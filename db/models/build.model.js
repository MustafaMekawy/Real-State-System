const mongoose=require("mongoose")
const bulidSchema=mongoose.Schema({
        projectId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project",
            required:true
        },
        area:{
            type:String,
            trim:true,
            required:true,
        },
        buildNum:{
            type:Number,
            required:true,
            unique:true
        },
        numoffloors:{
            type:Number,
            required:true
        },
        numofuints:{
            type:Number,
            
    }
})

bulidSchema.pre('save', function() {
    this.numofuints = this.numoffloors  * 4;
})
const bulid=mongoose.model("Build",bulidSchema)
module.exports=bulid