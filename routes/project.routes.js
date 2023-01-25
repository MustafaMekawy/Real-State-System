const router=require("express").Router()
const project=require("../app/controllers/project.controller")
const upload=require("../app/middleware/fileUpload.middleware")
const {auth,permessions} =require("../app/middleware/auth.middleware")
router.post("/createProject",auth,permessions,upload.single("image"),project.createProject)
router.get("/showallprojects",project.showallprojects)
router.get("/showproject/:id",project.showproject)
module.exports=router