const userModel=require("../../db/models/user.model")
const crypto = require('crypto');
const myHelper=require("../helper")
class User{
    //to ingore not intrested body
    static inputFilter = (body, ...options) => {
        options.forEach(o => {
        body[o] = undefined;
        });
        return body;
    };
    static register = async(req,res) => {
        try{
            if(req.user.roleId=="63a99e217a59b58658bfc909"&&req.body.roleId!="63a994ef7a59b58658bfc88b")
                 throw new Error("cant add role expect custmoer role")
            if(req.body.password.length<6) throw new Error("password must be more than 6")
            const user = new userModel(req.body)
           // const token =await user.generateToken();
            await user.save()
            myHelper.resHandler(res, 200, true, user, "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static login = async(req,res) => {
        try{
            const { email, password } = req.body;
            const user = await userModel.logincheck(email, password);
            const token = await user.generateToken();
            myHelper.resHandler(res, 200, true, {user, token}, "user login successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static profile = (req,res)=>{
        myHelper.resHandler(res, 200, true,{user: req.user},"user profile fetched")
    }
    static editprofile = async(req,res) => {
        try{
            const data = this.inputFilter(req.body, 'password')
            const user = await userModel.findByIdAndUpdate(req.user._id,data,{new:true})
            myHelper.resHandler(res, 200, true,user, "user ediet successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static logOut = async(req,res) => {
        try{
            req.user.tokens.pull({token:req.token})
            await req.user.save({validateBeforeSave: false})
            myHelper.resHandler(res, 200, true,null, "logout successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static editpassword = async(req,res) => {
        try{
            const password = req.body.password;
            //passcheck is function to compare input pass and pass in database if match if not res error
            if (!(await userModel.Passcheck(req.user, password)))
                throw new Error('invalid password');
            const newPassword = req.body.newPassword;
            req.user.password = newPassword;
            await req.user.save({ validateBeforeSave: false });
            myHelper.resHandler(res, 200, true,req.user, "password updated successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static forgetpassword = async(req,res) => {
        try{
            const user = await userModel.findOne({ email: req.body.email });
            if(!user)throw new Error("invalid email")
            /*create passToken to creat encrypted pass in database and remove it
            after reset process pass and send it with the link to resetpass function */
            const token = user.createPasswordResetToken();
            await user.save({ validateBeforeSave: false });
            myHelper.resHandler(res, 200, true,null,  ` Forget your password? If you willing to reset it please click on this link \n http://localhost:3000/api/user/resetpassword/${token} \n If you aren't willing to change it please kindly ignore this message. \nthanks`)
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static resetpassword = async (req, res) => {
        try {
          /* decrpted token that passing in params from forgetPass and compare with that in data base
          if match rest pass with new pass */ 
          const deecryptedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
          const user = await userModel.findOne({resetPasswordToken: deecryptedToken,resetExpiresTime: { $gt: Date.now() },});
          user.password = req.body.password;
          user.passwordConfirmation = req.body.passwordConfirmation;
          user.resetExpiresTime = user.resetPasswordToken = undefined;
          await user.save();
          myHelper.resHandler(res, 200, true, null, 'password reset ');
        } catch (e) {
            myHelper.resHandler(res, 500, false, e, e.message)
        }
      };
    static changeStatus = async(req,res) => {
        try{
            req.user.status=!req.user.status
            await req.user.save({validateBeforeSave: false})
            myHelper.resHandler(res, 200, true,req.user, "stats changed")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static deleteaccount = async(req,res) => {
        try{
            await userModel.findByIdAndDelete(req.user._id)
            myHelper.resHandler(res, 200, true,null, "deleted")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static uploadImage = async(req, res) =>{
        try{
            req.user.image = req.file.path
            await req.user.save({validateBeforeSave: false})
            myHelper.resHandler(res, 200, true, req.user, "image updated")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static DeleteAnyUser = async(req,res) => {
        try{
            await userModel.findByIdAndDelete(req.params.id)
            myHelper.resHandler(res, 200, true,null, "deleted user")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    
    }
    //informaton about website
    static LearnMore = async (req, res) => {
        myHelper.reshandeler(res, 200, true, null, 'polcey and terms');
    };
    //contact with admins
    static ContactUS = async (req, res) => {
        myHelper.reshandeler(
        res,
        200,
        true,
        null,
        'contact us in thses numbers'
        );
    };
    static homePage = async (req, res) => {
        const page=""
        myHelper.reshandeler(res, 200, true, null, page);
    };
}

module.exports=User