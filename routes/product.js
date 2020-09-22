var express = require('express');
var router = express.Router();
const productService = require('../src/service/productService');


router.post("/addProduct", async (req, res, next)=>{;
  console.log(req.body);
  const result = await productService.addProduct(req.body);

  console.log(result);
  if(result.message != statusCode.SUCCESS){
    res.status(500).send(result.message);
  }else{
    res.status(200).send(result);
  }
})



router.post("/modifyProduct", async (req, res, next)=>{;
  console.log(req.body);
  const result = await productService.modifyProduct(req.body);

  console.log(result);
  if(result.message != statusCode.SUCCESS){
    res.status(500).send(result.message);
  }else{
    res.status(200).send(result);
  }
})


router.post("/deleteProduct", async (req, res, next)=>{;
  console.log(req.body);
  const result = await productService.deleteProduct(req.body);

  console.log(result);
  if(result.message != statusCode.SUCCESS){
    res.status(500).send(result.message);
  }else{
    res.status(200).send(result);
  }
})



router.post("/getProductList", async (req, res, next)=>{
  console.log("getProduct");
  const result = await productService.getProductList(req.body);

  console.log(result);
  if(result.message != statusCode.SUCCESS){
    res.status(500).send(result.message);
  }else{
    res.status(200).send(result);
  }
})



router.post("/getProduct", async (req, res, next)=>{
  console.log("getProduct");
  const result = await productService.getProduct(req.body);

  console.log(result);
  if(result.message != statusCode.SUCCESS){
    res.status(500).send(result.message);
  }else{
    res.status(200).send(result);
  }
})


module.exports = router;
