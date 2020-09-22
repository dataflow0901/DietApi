var express = require('express');
var router = express.Router();

const boardService = require('../src/service/boardService');

router.post("/getAllNotice", async (req, res, next)=>{
  console.log(req.body);
  const result = await boardService.selectAll(req.body, "notice");

  if(result == "error"){
    res.sendStatus(500);
  }else{
    res.send(result);
  };
})

router.post("/getAllFAQ", async (req, res, next)=>{
  console.log(req.body);
  const result = await boardService.selectAll(req.body, "faq");

  if(result == "error"){
    res.sendStatus(500);
  }else{
    res.send(result);
  }
})

router.post("/getRecentNotice",async(req, res, next)=>{
  console.log(req.body);
  const result = await boardService.getLatestBoard();
  
  if(result == "error"){
    res.sendStatus(500);
  }else{
    res.send(result);
  }
})

module.exports = router ;


