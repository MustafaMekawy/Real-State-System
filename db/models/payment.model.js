const mongoose =require("mongoose")
const PaymentSchema=mongoose.Schema({
    uintId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Uint"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    payment:{
        type:String,
        enum:["cash","semi-yearly","quarter-yearly"]
    },
    restofthepayments:[{
        date:Date,
        amount:Number,
        paied:Boolean
    }]
})
const payment=mongoose.model("payment",PaymentSchema)
module.exports=payment