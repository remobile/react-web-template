module.exports = {
    checkPhone (phone) {
        return /^1\d{10}$/.test(phone);
    },
    // 验证座机号
    checkSeatPhone (phone) {
        return /^(([0+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(phone);
    },
    checkIdentifyNumber (number) {
        const W = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子
        const ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X
        if (!number || number.length !== 18) {
            return false;
        }
        let sum = 0; // 声明加权求和变量
        if (number[17].toLowerCase() == 'x') {
            // number[17] = 10;// 将最后位为x的验证码替换为10方便后续操作
            return /^(^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)$/.test(number);
        }
        for (var i = 0; i < 17; i++) {
            sum += W[i] * number[i];// 加权求和
        }
        const valCodePosition = sum % 11;// 得到验证码所位置
        if (number[17] == ValideCode[valCodePosition]) {
            return true;
        } else {
            return false;
        }
    },
    checkPassword (pwd) {
        return /^[\d\w_]{6,20}$/.test(pwd);
    },
    checkVerificationCode (code) {
        return /^\d{6}$/.test(code);
    },
    checkMailAddress (code) {
        const reg = /^([a-zA-Z0-9]+[_.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return reg.test(code);
    },
    checkName (name) { // 2-4个汉字
        return /^[\u4E00-\u9FA5]{2,4}$/.test(name);
    },
    /**
     * 验证银行卡号(16位或19位数字)
    */
    checkBankCardCode (code) {
        return /^(\d{16}|\d{19})$/.test(code);
    },
    /**
     * 验证出生日期(平年日期格式为YYYY-MM-DD的正则表达式)
    */
    checkBirthDate (str) {
        var re = /^([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))$/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    /**
    * 验证字符串是否包含特殊符号
    */
    checkStr (str) {
        let re = /^[\u4E00-\u9FA5A-Za-z0-9-]+$/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 验证数字(可以包含两个小数点)
    */
    check2PointNum (code) {
        return /^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/.test(code);
    },
    /**
     * 验证数字(包含不限小数点)
    */
    checkNum (str) {
        var re = /^[0-9]+.?[0-9]*$/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 验证数字(正整数)
    */
    checkIntNum (str) {
        var re = /^[0-9]*[1-9][0-9]*$/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 验证非负整数
    */
    checkUnIntNum (str) {
        var re = /^\d+$/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 验证二维码数据是否合法
    */
    checkQRCodeData (str) {
        var re = /[a-z0-9]{24}/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 验证数字为正数且最多包含两位小数
    */
    checkInt2PointNum (str) {
        let re = /^[0-9]+(.[0-9]{1,2})?$/;
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    /**
    * 验证车牌
    */
    checkPlate (code) {
        return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(code);
    },
    /**
    * 验证ID
    */
    checkID (code) {
        return /^[0-9a-fA-F]{24}$/.test(code);
    },
};
