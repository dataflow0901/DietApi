const mail = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');

mailer = module.exports;

const config = {
    mailer:{
        service: 'Gmail',
        host: 'localhost',
        port: '465',
        secure: true,
        user: 'Master00E360@gmail.com',
        password: 'tusgxgmlftjmhrzn'
    }
}
const from = "<Master00E360@gmail.com>"

mailer.sendMail = (data) => {

    const mailOptions = {
        from,
        to: data.email,
        subject: "[e-360] 비밀번호 초기화 이메일입니다.",
        html: "비밀번호 초기화를 위해 아래 인증번호를 앱에 입력해주세요.<br><br>"+data.key
    }

    const transporter = mail.createTransport(smtpPool({
        service: config.mailer.service,
        host: config.mailer.host,
        port: config.mailer.port,
        auth: {
            user: config.mailer.user,
            pass: config.mailer.password
        },
        tls: {
            rejectUnauthorized: false,
        },
        maxConnection: 5,
        maxMessages: 10
    }));

    return transporter.sendMail(mailOptions, (err, res)=>{
        transporter.close();
        if(err){
            console.log("failed ... ", err);
            throw Error(err);
        }else{
            console.log("success... ", res);
            return "success";
        }
    })
}