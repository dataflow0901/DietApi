const statusCode = module.exports;

statusCode.SUCCESS = "SUCCESS";

statusCode.NOT_FOUND = "NOT_FOUND";
statusCode.NOT_MATCHED = "NOT_MATCHED";
statusCode.NOT_AUTHED = "NOT_AUTHED";

// Login
statusCode.DORMANCY = "DORMANCY_USER";
statusCode.LOGIN_INACTIVE = "LOGIN_INACTIVE";
statusCode.EXPIRED_PW = "EXPIRED_PASSWORD";

// register
statusCode.DUP = "DUPLICATED";

statusCode.EXPIRED = "EXPIRED_VALUE";

statusCode.WRONG_TYPE = "WRONG_TYPE_FILE";

statusCode.ERR_NULL = "ERROR_NULL_VALUE";
statusCode.ERR_DB = "ERROR_DB";
statusCode.ERR_SERVER = "ERROR_SERVER";
