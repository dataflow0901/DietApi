const boardDAO = module.exports;

boardDAO.selectAll = async (data, category) =>{
    const query = "\
    SELECT board_no, title, content, view_cnt, writer, answer, create_date, update_date, create_user, update_user \
    FROM BOARD \
    WHERE notice = 'Y' \
    AND category = ? \
    AND category2 = ? \
    ORDER BY create_date desc ";

    const params = [
        category, data.category2
    ];

    return await conn.query(query, params).then((res) => {
        return res;
    }).catch((err)=>{
        console.log(err);
        throw Error(err);
    })
}

boardDAO.selectLastNotice = async()=>{
    const query = "\
    SELECT title, create_date\
    FROM BOARD\
    WHERE category = 'NOTICE'\
    ORDER BY create_date desc limit 1";

    return await conn.query(query).then( res =>{
        return res;
    }).catch(err=>{
        console.log(err);
        throw Error("최근 공지사항 조회 실패");
    })
}
