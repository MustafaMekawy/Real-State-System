const router=require("express").Router()
const build=require("../app/controllers/build.controller")
const upload=require("../app/middleware/fileUpload.middleware")
const {auth,permessions} =require("../app/middleware/auth.middleware")

router.post("/createbuild",auth,permessions,upload.single("image"),build.createBuild)
router.get("/showBuild/:id",build.showBuild)
router.get("/showAllBuilds",build.showAllBuilds)
module.exports=router