const alimtalk = module.exports;

alimtalk.senderKey = "f3a53907b520f41db5b15f231857be81ffba2489";

alimtalk.getPasswordReset = (name, key) => {
    return `[ara-360] 안녕하세요. ${name}님! ${name}님의 비밀번호 초기화를 위해 인증번호 [${key}]를 화면에 입력해주세요.`;
};

alimtalk.getReactiveUser = (name, key) => {
    return `[ara-360] 안녕하세요. ${name}님! ${name}님의 아이디 사용 정상화를 위해 인증번호 [${key}]를 화면에 입력해주세요.`;
};



alimtalk.templatePassword = 'LMSG_20200605134001721349';

alimtalk.templateReactive = "LMSG_20200608092821537081";