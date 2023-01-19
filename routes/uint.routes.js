const router=require("express").Router()
const uint=require("../app/controllers/uint.controller")
const {auth,permessions}=require("../app/middleware/auth.middleware")
router.post("/createuint",uint.createuint)
router.get("/showuint/:id",uint.showuint)
router.get("/showAllUint",uint.showAllUint)
router.post("/buyuint/:id",uint.buyuint)
router.get("/ShowAllUintsBought",uint.ShowAllUintsBought)
router.get("/ShowAllUintsAvalible",uint.ShowAllUintsAvalible)
router.get("/ShowMyUints",auth,uint.ShowMyUints)
router.get("/ShowMyPayments",auth,uint.ShowMyPayments)
router.post("/addInstallment",auth,uint.addInstallment)

module.exports=router