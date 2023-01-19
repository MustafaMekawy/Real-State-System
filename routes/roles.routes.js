const router=require("express").Router()
const role=require("../app/controllers/role.controller")
const {auth,permessions}=require("../app/middleware/auth.middleware")
router.post("/creatrole",auth,permessions,role.CreatRole)
router.post("/AddUrl/:id",auth,role.AddUrl)




module.exports=router