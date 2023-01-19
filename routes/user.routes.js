const router=require("express").Router()
const User=require("../app/controllers/user.controller")
const {auth,permessions}=require("../app/middleware/auth.middleware")
router.post("/rejester",User.register)
router.post("/login",User.login)

router.post("/registerCustmoer",User.registerCustmoer)
router.delete("/DeleteAnyUser/:id",User.DeleteAnyUser)
router.use(auth,permessions)

router.get("/profile",User.profile) 
router.patch("/editprofile",User.editprofile)
router.get("/logout",User.logOut)
router.patch("/editpassword",User.editpassword)
router.get("/changeStatus",User.changeStatus)
router.delete("/deleteaccount",User.deleteaccount)


module.exports=router