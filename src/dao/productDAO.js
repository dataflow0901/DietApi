const productDAO = module.exports;

productDAO.insert = async (data, date) =>{

       
    const query = "\
    INSERT INTO \
    LOAN (applier, creditor, debtor, creditor_name, debtor_name, creditor_address, debtor_address, \
        principal_amount, interest_amount, total_amount, interest_rate, \
        start_date, expire_date, apply_date, creditor_bank_code, creditor_bank_account, debtor_bank_code, debtor_bank_account, \
        nick_name_device, mobile_no_device, desc_info,  \
        creditor_mobile_no_device,  debtor_mobile_no_device, \
        create_date, update_date, create_user, update_user) \
    VALUES \
        ( ?, ?, ?, ?, ?, ?, ?,  ? , ?, ?, ?,   date_format(?,'%Y-%m-%d'), ?, ?, ?, ?, ?, ?,  ?,?,?,  ?,?,?,  ?,?,?,?)";

        
    const params = [
        //'1',
        data.applier,
        data.creditor,
        data.debtor,
        data.creditorName,
        data.debtorName,
        data.creditorAddress,
        data.debtorAddress,
        
        data.principalAmount,
        data.interestAmount,
        data.totalAmount,
        data.interestRate,
        
        date,
        data.expireDate,
        date,
        data.creditorBankCode,
        data.creditorBankAccount,        
        data.debtorBankCode,
        data.debtorBankAccount,       

        data.nickNameDevice,
        data.mobileNoDevice,
        data.descInfo,

        data.creditorMobileNoDevice,
        data.debtorMobileNoDevice,
        data.registrationTokens,

        date,
        date,
        data.userId,
        data.userId
    ];

    return await conn.query(query, params).then((res) => {;
        return res.affectedRows;
    }).catch((err)=>{
        console.log(err);
        throw Error(err);
    })
}


productDAO.selectProductList = async(data, date)=>{
    const query = "\
    SELECT    t1.sales_stand_code , \
              t1.sales_stand_name, \
              t1.product_code ,  \
              t1.product_name ,\
              t1.company_code ,\
              t1.company_name ,\
              t1.qty ,\
              t1.unit ,\
              t1.price ,\
              t1.delivery_cost ,\
              t2.gpa ,\
              t1.ranking, \
              t2.review_count \
       FROM   SALES_STAND t1, PRODUCT t2\
       WHERE sales_stand_code = ? \
         AND t1.PRODUCT_CODE = t2.PRODUCT_CODE \
       order by ranking asc ; "

//       const params = [data.sales_stand_id, data.startDate, data.endDate];
       const params = [data.salesStandCode];
    
    return await conn.query(query, params).then( res => {
        //console.log(res);
        return res;
    }).catch(err =>{
        console.log(err);
        throw Error("차용증 Debt 정보 기간별 조회 실패");
    })
}



productDAO.selectProduct = async(data, date)=>{
    const query = "\
    SELECT    t1.sales_stand_code , \
              t1.sales_stand_name, \
              t1.product_code ,  \
              t1.product_name ,\
              t1.company_code ,\
              t1.company_name ,\
              t1.qty ,\
              t1.unit ,\
              t1.price ,\
              t1.delivery_cost ,\
              t2.gpa ,\
              t1.ranking, \
              t2.review_count \
       FROM   SALES_STAND t1, PRODUCT t2\
       WHERE t1.product_code = ? \
         AND t1.sales_stand_code = ? \
         AND t1.product_code = t2.product_code \
       order by ranking asc ; "

//       const params = [data.sales_stand_id, data.startDate, data.endDate];
       const params = [data.productCode, data.salesStandCode];
    
    return await conn.query(query, params).then( res => {
        //console.log(res);
        return res;
    }).catch(err =>{
        console.log(err);
        throw Error("차용증 Debt 정보 기간별 조회 실패");
    })
}



productDAO.updateProduct = async(data, date)=>{
    const query = "\
    update LOAN \
       set confirm_date = ?\
    where loan_no = ?" ;

    const params = [date, data.loanNo];
    
    return await conn.query(query, params).then( res => {
        return res;
    }).catch(err =>{
        console.log(err);
        throw Error("차용증 Confirm 정보 Update 실패");
    })
}


productDAO.deleteProduct = async(data, date)=>{
    const query = "\
    update LOAN \
       set cancel_date = ?,\
           cancel_desc = ?,\
    where loan_no = ?" ;

    const params = [date, data.cancel_desc, data.loanNo];
    
    return await conn.query(query, params).then( res => {
        return res;
    }).catch(err =>{
        console.log(err);
        throw Error("차용증 취소 정보 Update 실패");
    })
}

