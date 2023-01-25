const router=require("express").Router()
const uint=require("../app/controllers/uint.controller")
const upload=require("../app/middleware/fileUpload.middleware")
const {auth,permessions}=require("../app/middleware/auth.middleware")

router.post("/createuint",auth,permessions,upload.single("image"),uint.createuint)
router.get("/showuint/:id",uint.showuint)
router.get("/showAllUint",uint.showAllUint)
router.post("/buyuint/:id",auth,permessions,uint.buyuint)
router.get("/ShowAllUintsBought",uint.ShowAllUintsBought)
router.get("/ShowAllUintsAvalible",uint.ShowAllUintsAvalible)
router.get("/ShowMyUints",auth,uint.ShowMyUints)
router.get("/ShowMyPayments",auth,uint.ShowMyPayments)
router.post("/addInstallment",auth,permessions,uint.addInstallment)

module.exports=router