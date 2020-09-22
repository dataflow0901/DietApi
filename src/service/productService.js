//const advService = require('../service/advService');
const path = require('path');
const fs = require('fs');

const formatter = require('../utils/formatter');
const productDAO = require('../dao/productDAO');
//const contentHistDAO = require('../dao/contentHistDAO');


const productService = module.exports;


productService.addProduct = async (data)=>{
    const date = formatter.getFullDate(new Date());
    //if(data.uploadName == '' || data.uploadName == undefined || data.fileName == '' || data.fileName == undefined){
    //    return setResult("", statusCode.ERR_NULL);
    // }
    
    try{
        await conn.query("START TRANSACTION");

        //const select = await contentDAO.selectByFileName(data);
        let result = await productDAO.insert(data, date);
        
        if(result == 0){
            throw Error("product insert 실패");
        }
        
        await conn.query("COMMIT");

        return setResult("", statusCode.SUCCESS);
        
    }catch(err){
        await conn.query("ROLLBACK");
        
        console.log("error", err);
        if(err.message == 'product_NOT_FOUND'){
            return setResult("", statusCode.NOT_FOUND);
        }

        return setResult("", statusCode.ERR_SERVER);
    }
}



productService.getProductList = async(data)=>{
    const date = new Date().toLocaleString();
    try{
        console.log(data);
        let result;

        result = await productDAO.selectProductList(data);

        return setResult(setValuesAsProductArray(result), statusCode.SUCCESS);

    }catch(err){
        console.log(err);
        return setResult("", statusCode.ERR_SERVER);
    }
}




productService.getProduct = async(data)=>{
    const date = new Date().toLocaleString();
    try{
        console.log(data);
        let result;

        result = await productDAO.selectProduct(data);

        return setResult(setValues(result[0]), statusCode.SUCCESS);


    }catch(err){
        console.log(err);
        return setResult("", statusCode.ERR_SERVER);
    }
}


productService.updateProduct = async (data)=>{
    const date = formatter.getFullDate(new Date());
    //if(data.uploadName == '' || data.uploadName == undefined || data.fileName == '' || data.fileName == undefined){
    //    return setResult("", statusCode.ERR_NULL);
    // }
    
    try{
        await conn.query("START TRANSACTION");

        let result = await productDAO.updateProduct(data, date);
        
        if(result == 0){
            throw Error("product update 실패");
        }
        
        await conn.query("COMMIT");

        return setResult("", statusCode.SUCCESS);
        
    }catch(err){
        await conn.query("ROLLBACK");
        
        console.log("error", err);
        if(err.message == 'product_NOT_FOUND'){
            return setResult("", statusCode.NOT_FOUND);
        }

        return setResult("", statusCode.ERR_SERVER);
    }
}


productService.deleteProduct = async (data)=>{
    const date = formatter.getFullDate(new Date());
    //if(data.uploadName == '' || data.uploadName == undefined || data.fileName == '' || data.fileName == undefined){
    //    return setResult("", statusCode.ERR_NULL);
    // }
    
    try{
        await conn.query("START TRANSACTION");

        let result = await productDAO.deleteProduct(data, date);
        
        if(result == 0){
            throw Error("product update 실패");
        }
        
        await conn.query("COMMIT");

        return setResult("", statusCode.SUCCESS);
        
    }catch(err){
        await conn.query("ROLLBACK");
        
        console.log("error", err);
        if(err.message == 'product_NOT_FOUND'){
            return setResult("", statusCode.NOT_FOUND);
        }

        return setResult("", statusCode.ERR_SERVER);
    }
}




const setValuesAsProductArray = (res)=>{
    var array = new Array();
    for(var i = 0; i < res.length; i++){
        array.push(setValuesAsProduct(res[i]));
    }
    return array;
}



const setValuesAsProduct = (res)=>{
    return {
        salesStandCode: (res.sales_stand_code != null && res.sales_stand_code != undefined)?res.sales_stand_code:"",
        salesStandName: (res.sales_stand_name != null && res.sales_stand_name != undefined)?res.sales_stand_name:"",
        productId: (res.product_id != null && res.product_id != undefined)?res.product_id:"",
        productCode: (res.product_code != null && res.product_code != undefined)?res.product_code:"",
        productName: (res.product_name != null && res.product_name != undefined)?res.product_name:"",
        companyCode: (res.company_code != null && res.company_code != undefined)?res.company_code:"",
        companyName: (res.company_name != null && res.company_name != undefined)?res.company_name:"",
        qty: (res.qty != null && res.qty != undefined)?res.qty:"",
        unit: (res.unit != null && res.unit != undefined)?res.unit:"",
        price: (res.price != null && res.price != undefined)?res.price:"",
        deliveryCost: (res.delivery_cost != null && res.delivery_cost != undefined)?res.delivery_cost:"",
        gpa: (res.gpa != null && res.gpa != undefined)?res.gpa:"",
        ranking: (res.ranking != null && res.ranking != undefined)?res.ranking:"",
        review: (res.review_count != null && res.review_count != undefined)?res.review_count:""
    }
}

function setResult(res, message){
    return {
        result: res,
        message: message
    }
}

const setValueAsContentReportArray = (res)=>{
    let result = new Array()
    for(var i=0; i<res.length; i++){
        result.push(setValuesAsContentReport(res[i]));
    }
    return result;
}
const setValueAsContentDetailReportArray = (res)=>{
    let result = new Array()
    for(var i=0; i<res.length; i++){
        result.push(setValuesAsContentDetailReport(res[i]));
    }
    return result;
}

const setValueArray = (res)=>{
    let result = new Array()

    for(var i=0; i<res.length; i++){
        result.push(setValues(res[i]));
    }

    return result;
}

const sendMessageAsResult = (message) => {
    return {
        message: message
    }
}