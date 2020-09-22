generator = module.exports;

generator.generateKey = (date)=>{
    const length = 6;
    let token = "";
    let left = 0;

    const digits = parseInt(Math.random() * 1000000 ).toString();
    if(digits.length < length) left = (length - digits.length); 

    for(var i = 0; i < left; i++){
        token = "0";
    }
    token += digits;
    return {
        key: token,
        expireDate: dateFormat(new Date().setTime(date.getTime() + 1000 * 60 * 10), "yyyy-mm-dd HH:MM:ss")
    };
}