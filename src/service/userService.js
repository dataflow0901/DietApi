//const generator = require('../utils/generator');
//const alimtalk = require('../utils/alimtalk');

//const kmpDAO = require('../dao/kmpDAO');
//const syslogDAO = require('../dao/syslogDAO');
const userDAO = require('../dao/userDAO');
//const passwordDAO = require('../dao/passwordDAO');

const userService = module.exports;


userService.register = async (data)=>{
    const date = new Date();

    try{
//        const isDuplicated = await userDAO.phoneDuplicate(data);
//       if(isDuplicated){
//            return setResult("", statusCode.DUP);
//        }

        let result = await userDAO.insert(data, date);
        // result == affectedRows
        if(result > 0){
            //data.log.activity = "REGISTER";
            //const systemLog = syslogDAO.insertSystemLog(data, date);

            return setResult("", statusCode.SUCCESS);
        }else {
            throw Error("회원가입 실패");
        }
    }catch(err){
        console.log(err);
        return setResult("", statusCode.ERR_SERVER);
    }
}

userService.selectByUserId = async (data)=>{
    try{

        let result = await userDAO.selectByUserId(data);
        // result == Object
        if(result.length > 0){
            return setResult(setValues(result[0]), statusCode.SUCCESS);
        }else {
            throw Error("유저 조회 실패");
        }
    }catch(err){
        console.log(err);
        return setResult("", statusCode.ERR_SERVER);
    }
}

userService.selectRegisteredUsersByUserCellNo = async(data)=>{
    try{
        const result = await userDAO.selectRegisteredUsersByUserCellNo(data);
       
            return setResult(setValueArray(result), statusCode.SUCCESS);
    }catch(err){
        console.log(err);
        return setResult("", statusCode.ERR_SERVER);
    }
    
}

userService.selectRegisteredUserByUserCellNo = async(data)=>{
    try{
        const result = await userDAO.selectRegisteredUserByUserCellNo(data);
       
            return setResult(setValues(result[0]), statusCode.SUCCESS);
    }catch(err){
        console.log(err);
        return setResult("", statusCode.ERR_SERVER);
    }
    
}

const setValues = (res) => {
    return  {
        userId: (res.user_id != null && res.user_id != undefined)?res.user_id: "",
        password: (res.password != null && res.password != undefined)?res.password:"",
        name: (res.name != null && res.name != undefined)?res.name: "",
        userCellNo: (res.user_cell_no != null && res.user_cell_no != undefined)?res.user_cell_no:"",
        address: (res.address != null && res.address != undefined)? res.address:"",

        // userId: (res.user_id != null && res.user_id != undefined)?res.user_id: "",
        // password: (res.password != null && res.password != undefined)?res.password:"",
        // name: (res.name != null && res.name != undefined)?res.name: "",
        // mobileNo: (res.mobile_no != null && res.mobile_no != undefined)?res.mobile_no:"",
        // telNo: (res.tel_no != null && res.tel_no != undefined)?res.tel_no:"",
        // regDate: (res.reg_date != null && res.reg_date != undefined)? res.reg_date:"",
        // channelCode: (res.channel_code != null && res.channel_code != undefined)?res.channel_code: "",
        // channelName: (res.channel_name != null && res.channel_name != undefined)?res.channel_name: "",
        // approved: (res.approved != null && res.approved != undefined)?res.approved:"",
        // authId: (res.auth_id != null && res.auth_id != undefined)?res.auth_id:"",
        // email: (res.email != null && res.email != undefined)?res.email:"",
        // companyCode: (res.company_code != null && res.company_code != undefined)?res.company_code:"", 
        // companyName: (res.company_name != null && res.company_name != undefined)?res.company_name:"",
        // managerTelNo: (res.manager_tel_no != null && res.manager_tel_no != undefined)?res.manager_tel_no:"",
        // address: (res.address != null && res.address != undefined)? res.address:"",
        // deptName: (res.dept_name != null && res.dept_name != undefined)? res.dept_name:"",
        // rank: (res.rank != null && res.rank != undefined)? res.rank:"",
        // dormancyYn: (res.dormancy_yn != null && res.dormancy_yn != undefined)?res.dormancy_yn:"",
        // passwordErrorCnt: (res.password_error_cnt != null && res.password_error_cnt != undefined)?res.password_error_cnt:"",
        // lastLoginTime: (res.last_login_time != null && res.last_login_time != undefined)?res.last_login_time:"",
        // updateDate: (res.update_date != null && res.update_date != undefined)? res.update_date:""
    }
}

const setPrivacyTermList = (res) =>{
    const result = new Array();
    for(let i = 0; i < res.length; i++){
        result.push(setPrivacyTerm(res[i]));
    }
    return result;
}

const setPrivacyTerm = (res)=>{
    return {
        ruleNo: (res.rule_no != null && res.rule_no != undefined)?res.rule_no:0,
        version: (res.version != null && res.version != undefined)?res.version:'',
        changed: (res.changed != null && res.changed != undefined)?res.changed:'',
        content: (res.content != null && res.content != undefined)?res.content:'',
        ruleNo: (res.rule_no != null && res.rule_no != undefined)?res.rule_no:'',
        createDate: (res.create_date != null && res.create_date != undefined)?res.create_date:'',
        createUser: (res.create_user != null && res.create_user != undefined)?res.create_user:'' 
    }
}

function setResult(res, message){
    return {
        result: res,
        message: message
    }
}

const setValueArray = (res) => {
    let result = new Array()

    for(var i=0; i<res.length; i++){
        result.push(setValues(res[i]));
    }

    return result;
}

const sendMessageAsResult = (message)=>{
    return {
        message: message
    }
}