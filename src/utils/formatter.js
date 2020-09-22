formatter = module.exports

formatter.formatDate = (date)=>{
    return dateFormat(date, "yyyy-mm-dd");
}

formatter.dateToMonth = (date)=>{
    return dateFormat(date, "yyyy-mm");
}

formatter.getFullDate = (date) =>{
    return dateFormat(date, "yyyy-mm-dd HH:MM:ss");
}