const formatter = require('../utils/formatter');

const boardDAO = require('../dao/boardDAO');
 
const boardService = module.exports;

boardService.selectAll = async (data, category)=>{

    try{
        const result = await boardDAO.selectAll(data, category);
       
        return setResult(setValueArray(result))

    }catch(err){
        console.log(err);
    }
}

boardService.getLatestBoard = async()=>{
    try{
        const result = await boardDAO.selectLastNotice();

        if(result < 1 ){
            return setResult(sendMessageAsResult("not_found"));
        }else{
            return setResult(setValues(result[0]));
        }
    }catch(err){
        console.log(err);
    }
}


const setValues = (res)=>{
    return  {
        boardNo: (res.board_no != null && res.board_no != undefined)?res.board_no:0,
        title: (res.title != null && res.title != undefined)?res.title:"",
        content: (res.content != null && res.content != undefined)?res.content:"",
        viewCnt: (res.view_cnt != null && res.view_cnt != undefined)?res.view_cnt:0,
        writer: (res.writer != null && res.writer != undefined)?res.writer:"",
        answer: (res.answer != null && res.answer != undefined)?res.answer:"",
        createDate: (res.create_date != null && res.create_date != undefined)?formatter.formatDate(res.create_date):"",
        updateDate: (res.update_date != null && res.update_date != undefined)?formatter.formatDate(res.update_date):"",
        createUser: (res.create_user != null && res.create_user != undefined)?res.create_user:"",
        updateUser: (res.update_user != null && res.update_user != undefined)?res.update_user:""
        
    }
}

const setResult = (res) => {
    return {
        result: res
    }
}


const setValueArray = (res)=>{
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
