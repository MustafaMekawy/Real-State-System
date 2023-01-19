const express=require("express")
const app=express()
app.use(express.json())
require("../db/connect")

const userRoutes=require("../routes/user.routes")
const roleRoutes=require("../routes/roles.routes")
const projectRoutes=require("../routes/project.routes")
const buildtRoutes=require("../routes/build.routes")
const uintRoutes=require("../routes/uint.routes")
const pdfRoutes =require("../pdf/routes/index")
app.use("/api/user/",userRoutes)
app.use("/api/role/",roleRoutes)
app.use("/api/project/",projectRoutes)
app.use("/api/build/",buildtRoutes)
app.use("/api/uint/",uintRoutes)
app.use("/api/pdf/",pdfRoutes)
app.all("*", (req, res)=> {
    res.status(404).send({
        apisStatus:false,
        message:"Invalid URL",
        data: {}
    })
})

module.exports=app
