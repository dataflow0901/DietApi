const formatter = require('../utils/formatter');

const userDAO = module.exports;


userDAO.insert = async (data, date) =>{
    const query = "\
    INSERT INTO \
    USER(\
        user_seq_no, user_id, password, name, user_info, user_cell_no, \
        user_gender, user_email, reg_date,\
        approved, approved_date, auth_id, address, registrationtokens,\
        last_login_time, create_date, update_date, create_user, update_user )\
        VALUES( \
            ?,?,?,?,?,?, \
            ?,?,?,\
            ?,?,?,?,?,\
            ?,?,?,?,?\)";

    const params = ['1000','steveyou7@gmail.com', data.password, '유승열', '750327', '01039423324',
    'M', 'steveyou7@gmail.com', '2020-08-31',
    'Y', date, '1', data.address, data.registrationTokens,
    date, date, date, 'steveyou7', 'steveyou7'
    ];

    return await conn.query(query, params).then((res) => {
        return res.affectedRows;
    }).catch((err)=>{
        console.log(err);
        throw Error("유저 정보 삽입 실패");
    })
}


userDAO.selectByUserId = async(data)=>{
    const query =
    `
        SELECT user_id, password, name, user_cell_no, address , registrationtokens
        FROM USER 
        WHERE user_id = ?
    `;

    const params = [data.userId]

    return await conn.query(query, params).then((res)=>{
        return res;
    }).catch( err => {
        console.log(err);
        throw Error("유저 아이디로 유저 조회 실패")
    })
}

userDAO.selectRegisteredUsersByUserCellNo = async(data)=>{
    const query = `
        SELECT user_id, name, user_cell_no, address, registrationtokens
        FROM USER
        WHERE user_cell_no in (?)
    `

    const params = [ data.userCellNo ]
    return await conn.query(query, params).then((res)=>{
        return res;
    }).catch( err => {
        console.log(err);
        throw Error("가입된 회원 조회 실패")
    })
}

userDAO.selectRegisteredUserByUserCellNo = async(data)=>{
    const query = `
        SELECT user_id, name, user_cell_no, address, registrationtokens
        FROM USER
        WHERE user_cell_no = ?
    `

    const params = [ data.userCellNo ]
    return await conn.query(query, params).then((res)=>{
        return res;
    }).catch( err => {
        console.log(err);
        throw Error("가입된 회원 조회 실패")
    })
}
