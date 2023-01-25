const router=require("express").Router()
const User=require("../app/controllers/user.controller")
const {auth,permessions}=require("../app/middleware/auth.middleware")
const upload = require("../app/middleware/fileUpload.middleware")

router.post("/login",User.login)
router.post("/forgetpassword",User.forgetpassword)
router.post("/resetpassword/:token",User.resetpassword)

// router.post("/registerCustmoer",User.registerCustmoer)

router.post("/rejester",auth,permessions,User.register)
router.delete("/DeleteAnyUser/:id",auth,permessions,User.DeleteAnyUser)
router.use(auth)
router.patch("/editpassword",User.editpassword)
router.get("/profile",User.profile) 
router.patch("/editprofile",User.editprofile)
router.get("/logout",User.logOut)
router.get("/changeStatus",User.changeStatus)
router.delete("/deleteaccount",User.deleteaccount)
router.patch("/UpdateImage",upload.single("image"), User.uploadImage)



module.exports=router