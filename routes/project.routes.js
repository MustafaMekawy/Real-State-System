const router=require("express").Router()
const project=require("../app/controllers/project.controller")
router.post("/createProject",project.createProject)
router.get("/showallprojects",project.showallprojects)
router.get("/showproject/:id",project.showproject)
module.exports=router