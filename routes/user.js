var express = require('express');
var router = express.Router();

const crypto = require('crypto') ; 

const formatter = require('../src/utils/formatter');

const fs = require('fs');
const userService = require('../src/service/userService');

router.get("/searchAddressAndroid", (req, res, next)=>{
  fs.readFile("views/addressSearchAndroid.html", (err, data)=>{
    if( err) {
      console.log(err);
      res.send("에러가 발생했습니다.")
    }else{
      res.write(data.toString());
      res.end();
    }
  });
})

router.get("/searchAddressIOS", (req, res, next)=>{
  fs.readFile("views/addressSearchIOS.html", (err, data)=>{
    if( err) {
      console.log(err);
      res.send("에러가 발생했습니다.")
    }else{
      res.write(data.toString());
      res.end();
    }
  });
})

router.post("/register", async (req, res, next)=>{
    console.log("user.register() => ", req.body);

    req.body.log = { activity: null, status: null, old: null, new: null};
    const ip = req.headers['x-forwareded-for'] || req.connection.remoteAddress;
    req.body.ip = ip.substr(ip.lastIndexOf(":")+1);
    const result = await userService.register(req.body);

    if(result.message != statusCode.SUCCESS){
      res.status(500).send(result.message);
    }else{
      res.status(200).send(result);
    }
})

router.post("/findRegisteredUsersByUserCellNo", async(req, res)=>{
  console.log("user.findRegisteredUsersByUserCellNo => ", req.body);
  
  const result = await userService.selectRegisteredUsersByUserCellNo(req.body);
  if(result.message != statusCode.SUCCESS){
    res.status(500).send(result.message);
  }else{
    res.status(200).send(result);
  }
})
router.post("/findRegisteredUserByUserCellNo", async(req, res)=>{
  console.log("user.findRegisteredUserByUserCellNo => ", req.body);
  
  const result = await userService.selectRegisteredUserByUserCellNo(req.body);
  if(result.message != statusCode.SUCCESS){
    res.status(500).send(result.message);
  }else{
    res.status(200).send(result);
  }
})


// router.post("/login", async(req, res, next)=>{
//     console.log("login");
    
//     req.body.log = { activity: null, status: null, old: null, new: null};
//     const ip = req.headers['x-forwareded-for'] || req.connection.remoteAddress;
//     req.body.ip = ip.substr(ip.lastIndexOf(":")+1);
//     const result = await userService.login(req.body);

//     console.log("user.login() -> result", result)
//     if(result.message != statusCode.SUCCESS  && result.message != statusCode.DORMANCY && result.message != statusCode.EXPIRED_PW){
//         res.status(500).send(result.message);
//     }else{
//         res.status(200).send(result);
//     }
// })

// router.post("/getAuthIdByUserId", async(req, res, next)=>{
//     console.log("getAuthIdByUserId");
//     const result = await userService.selectAuthIdByUserId(req.body);

//     if(result.message != statusCode.SUCCESS){
//       res.status(500).send(result.message);
//     }else{
//         res.status(200).send(result);
//     }
// })

router.post("/getUserByUserId", async(req, res, next)=>{
    console.log("user.getUserByUserId() => ", req.body);

    const result = await userService.selectByUserId(req.body);

    console.log(result);
    if(result.message != statusCode.SUCCESS){
        res.status(500).send(result.message);
    }else{
        res.status(200).send(result);
    }
});

module.exports = router;
