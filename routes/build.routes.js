const router=require("express").Router()
const build=require("../app/controllers/build.controller")
router.post("/createbuild",build.createBuild)
router.get("/showBuild/:id",build.showBuild)
router.get("/showAllBuilds",build.showAllBuilds)
module.exports=router