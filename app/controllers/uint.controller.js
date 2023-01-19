const uintModel=require("../../db/models/uint.model")
const userModel=require("../../db/models/user.model")
const PaymentModel=require("../../db/models/payment.model")
const myhelper=require("../helper")
class Uint{
    static createuint=async(req,res)=>{
        try{
            const splitUnit=req.body.unitNumber.split("")
            if(splitUnit[1]>4) throw new Error("max num of unit is 4")
            const uint= new uintModel(req.body)
            await uint.save()
            myhelper.resHandler(res,200,true,uint,"uint added successfully")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static showAllUint=async(req,res)=>{
        try{
            const uints=await uintModel.find()
            myhelper.resHandler(res,200,true,uints,"All uints shoewd successfully")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static showuint=async(req,res)=>{
        try{
            const uint=await uintModel.findById(req.params.id)
            myhelper.resHandler(res,200,true,uint,"uint shoewd successfully")

        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static buyuint=async(req,res)=>{
        try{
            const uint=await uintModel.findById(req.params.id)
            if(!uint)throw new Error("uint not exist")
            if(uint.avalible==false)throw new Error("sorry this uint is bought")
            const user=await userModel.findById(req.body.customer)
            if(!user)throw new Error("user not exist")
            const payment= new PaymentModel({uintId:uint._id,userId:user._id,payment:req.body.payment})
            await payment.save()
            console.log(payment);
            // uint.payment=req.body.payment
            const p=this.SetPayment(payment.payment,uint.price)
            p.forEach(p=>{
                payment.restofthepayments.push(p)
            })
            uint.avalible=false
            await uint.save()
            user.uints.push(uint)
            await payment.save()
            console.log(payment);
            await user.save()
            myhelper.resHandler(res,200,true,payment,"uint bought successfully")

        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static SetPayment =(paymentMethod,price)=>{
        const date=new Date()
        if(paymentMethod=="cash") {
            const Payment1= {date:new Date(date),amount:price,paied:true}
            return [Payment1]
        }
        if(paymentMethod=="semi-yearly") {
            const Payment1= {date:new Date(date),amount:price/2,paied:true}
            const Payment2= {date:new Date(date.setMonth(date.getMonth()+6)),amount:price/2,paied:false}
            return [Payment1,Payment2]
        }
        if(paymentMethod=="quarter-yearly") {
            const Payment1= {date:new Date(date),amount:price/4,paied:true}
            const Payment2= {date:new Date(date.setMonth(date.getMonth()+4)),amount:price/4,paied:false}
            const Payment3= {date:new Date(date.setMonth(date.getMonth()+4)),amount:price/4,paied:false}
            const Payment4= {date:new Date(date.setMonth(date.getMonth()+4)),amount:price/4,paied:false}
            return [Payment1,Payment2,Payment3,Payment4]
        }
    }
    static addInstallment=async(req,res)=>{
        try{
            const uint=await uintModel.findById(req.body.uint)
            if(!uint)throw new Error("uint not exist")
            const user=await userModel.findById(req.body.customer)
            if(!user)throw new Error("user not exist")
            let payment=await PaymentModel.findOne({userId:user.id,uintId:uint.id})
            for (let i = 0; i < payment.restofthepayments.length; i++) {
                if(payment.restofthepayments[i].paied!=true){
                    console.log(i);
                    payment.restofthepayments[i].paied=true    
                    break
                }
            }
            await payment.save()
            myhelper.resHandler(res,200,true,  payment.restofthepayments,"addInstallment")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static ShowAllUintsBought=async(req,res)=>{
        try{
            let uints= await uintModel.find()
            uints =uints.filter(u=>{
                return u.avalible==false
            })
            console.log(uints);
            myhelper.resHandler(res,200,true, uints,"All uints bought")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static ShowAllUintsAvalible=async(req,res)=>{
        try{
            let uints= await uintModel.find()
            uints=uints.filter(u=>{
                return u.avalible==true
            })
            console.log(uints);
            myhelper.resHandler(res,200,true, uints,"All uints Avalible")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static ShowMyUints=async(req,res)=>{
        try{        
           const myuints =  await req.user.populate('uints')
           console.log(myuints.uints)
            myhelper.resHandler(res,200,true, myuints.uints,"my uints")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static ShowMyPayments=async(req,res)=>{
        try{        
            let mypyments=await PaymentModel.find({userId:req.user._id})
            myhelper.resHandler(res,200,true, mypyments,"my payments")
        }
        catch(e){
            myhelper.resHandler(res, 500, false, e, e.message)
        }
    }
    


}
module.exports=Uint