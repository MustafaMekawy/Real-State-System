const validator = require("validator")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoose=require("mongoose")
const crypto = require('crypto');
const UserSchema=mongoose.Schema({
    roleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role",
        required:true
    },
    uints:[
        {type:mongoose.Schema.Types.ObjectId,
        ref: 'Uint'}
    ],
    fName:{
        type:String, 
        trim:true,
        lowercase:true,
        minLength: 3,
        maxLength:20,
        required:true
    }, 
    lName:{
        type:String, 
        trim:true,
        lowercase:true,
        minLength: 3,
        maxLength:20,
        required:true
    }, 
    age:{
        type:Number,
        min:21,
        max:60,
        default:21
    }, 
    email:{
        type:String, 
        trim:true,
        lowercase:true,
        required:true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email format")
            }
        }
    }, 
    image:{
        type:String, 
        trim:true
    },
    status:{
        type:Boolean,
        default: false
    }, 
    image:{
        type:String, 
        trim:true
    }, 
    password:{
        type:String, 
        trim:true,
        minLength: 5,
        required:true,
        // match: ''
    }, 
    passwordConfirmation: {
        type: String,
        required: true,
        validate: {
          validator: function (p) {
            return this.password == p;
          },
          message: 'invalid password confirmation',
        },
      },
    gender:{
        type:String, 
        trim:true,
        lowercase:true,
        enum: ["male", "female"]
    }, 
    dOfBirth:{
        type: Date
    }, 
    phoneNum:{
        type: String,
        validate(value){
            if(!validator.isMobilePhone(value, "ar-EG"))
                throw new Error ("invalid number")
        }
    },
    resetPasswordToken: String,
    resetExpiresTime: Date,
    addresses: [
        {
            addressType:{
                type:String, 
                trim:true,
                required:true
            },
            details:{}
        }
    ], 
//     tokens:[{
//         token:{ type:String, required: true}
// }]
}, {
    timestamps:true
})
UserSchema.pre("save", async function(){
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password, 8)
        this.passwordConfirmation = undefined;
    }
})
UserSchema.statics.Passcheck = async function (user, password) {
    const passVaild = await bcryptjs.compare(password, user.password);
    console.log(passVaild);
    // if (!passVaild) throw new Error('invalid password');
    return passVaild;
  };
  UserSchema.statics.logincheck = async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('invalid email');
    if (!(await this.Passcheck(user, password))) {
      throw new Error('invalid password');
    }
    return user;
  };

UserSchema.methods.toJSON = function(){
    const data = this.toObject()
    delete data.__v
    delete data.password
    // delete data.tokens
    return data
}
UserSchema.methods.generateToken = async function(req){
    const user= this
    const token = jwt.sign({_id: user._id}, process.env.tokenPass)
    // user.tokens = user.tokens.concat({token})
    // if(req.url == '/rejester') await user.save()
    // await user.save({validateBeforeSave: false})
    return token
}
UserSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetExpiresTime = Date.now() + 10 * 60 * 1000;
    return resetToken;
  };
const User=mongoose.model("User",UserSchema)
module.exports=User