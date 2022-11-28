// import { createRequire } from "module";
// const require = createRequire(import.meta.url);


const express=require("express")
const router=express.Router();

const newController = require('../app/controllers/NewControllers');

router.get('/:slug',newController.show)
router.get('/',newController.index)



module.exports=router;