
var express = require('express');
var router = express.Router();
const formatter = require('../src/utils/formatter');

const admin = require('firebase-admin');
//const date = formatter.getFullDate(new Date());


router.post('/notify', function(req, res) {
  //  var payload = {
  //  data: {
  //    //title: req.body.title,
  //    //message: req.body.message
  //    //title: " 차용증이 발급되었습니다. ",
  //    title: req.body.creditorName,
  //    body: req.body.creditorName
  //    //message: req.body.loanNo
  //  }
  //};

  var payload = {
    notification: {
      //title: "bildo test ysy",
      title: '차용증이 승인요청 되었습니다.',
      //title: req.body.title,
      body: "채권자 : " + req.body.creditorName + ",  " + "채무자 : " + req.body.debtorName ,
      //body: req.body.message
      loanNo: String(req.body.loanNo)
    }
  }

var  registrationTokens = 'erj0HAVWQ8edjkahxbwT8-:APA91bEfWhOjKgST2CTjw143fCr5CqZnc7KHPpruOYo32h06dB3pewCqbmz2tSJV8BqcOXXlv7yeYaNYlmJYB0ojMwxhO8AA7AVblJ6tN7eq0-lsAhio_aAU2kD5HEwdK3CzTSyeVYNx'

admin.messaging().sendToDevice(registrationTokens, payload)
    .then(function(response) {
      console.log("req.body ", req.body);
      console.log("req.body ", req.body.creditorName);
      console.log("req.body ", req.body.debtorName);
      console.log("payload ", payload);
      console.log("registrationTokens ", registrationTokens);
      console.log("Successfully sent message:", response);
    })
    .catch(function(error) {
      console.log("Error sending message:", error);
  });

});



 module.exports = router;
