const mongoose=require("mongoose")
const UintSchema=mongoose.Schema({
    buildId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Build",
        required:true
    },
    avalible:{
        type:Boolean,
        default:true
    },
   unitNumber: {
       type: String,
       required:true,
       uniqe:true
   },
   price:{
       type:Number,
       required:true
   },
   area:{
       type:Number,
       default:90
   }
})
const uint=mongoose.model("Uint",UintSchema)
module.exports=uint