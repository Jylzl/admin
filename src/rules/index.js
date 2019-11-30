/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-07-30 16:34:42
 * @LastAuthor: lizlong
 * @lastTime: 2019-08-27 16:49:46
 */
// import axios from "axios";
import request from '@/utils/request'
import api from '@/api/api';
import code from '@/code/code';

let passWord = "";

function required(message, trigger) { //必填
    return {
        required: true,
        validator: (rule, value, callback) => {
            const reg = new RegExp(/^\s*$/g);
            if (reg.test(value)) {
                callback(new Error(message || '此项必填'));
            } else {
                callback();
            }
        },
        trigger: trigger || 'blur',
        message: message || '此项必填'
    }
}

function notRequired() { //非必填
    return {
        required: false,
        validator: (rule, value, callback) => {
            callback();
        },
        trigger: 'blur',
        message: ''
    }
}

function email(message) { //email
    return {
        validator: (rule, value, callback) => {
            if (value === '') {
                callback();
            }
            const reg = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/);
            if (!reg.test(value)) {
                callback(new Error(message || '请输入正确的邮箱地址'));
            } else {
                callback();
            }
        },
        trigger: 'change'
    }
}

function number(message) { //数字
    return {
        validator: (rule, value, callback) => {
            if (value === '') {
                callback();
            }
            const reg = new RegExp(/^[0-9]+$/);
            if (!reg.test(value)) {
                callback(new Error(message || '只能输入数字'));
            } else {
                callback();
            }
        },
        trigger: 'blur'
    }
}

function space(message) { //不能为空
    return {
        validator: (rule, value, callback) => {
            if (value.trim() === '') {
                callback(new Error(message || '不能为空'));
            }
        },
        trigger: 'blur'
    }
}

function minNumber(message) { //数字且大小在1-19
    return {
        validator: (rule, value, callback) => {
            if (value === '') {
                callback();
            }
            const reg = new RegExp(/^([1-9]|1\d)$/);
            if (!reg.test(value)) {
                callback(new Error(message || '只能输入数字且大小在1-19之间'));
            } else {
                callback();
            }
        },
        trigger: 'blur'
    }
}

function double(message) { //浮点型数字
    return {
        validator: (rule, value, callback) => {
            const reg = new RegExp(/[0-9]+$/);
            if (!reg.test(value)) {
                callback(new Error(message || "只能是数字"));
            } else {
                callback();
            }
        },
        trigger: 'blur'
    }
}

function numberLim(message) { //数字限制最大长度
    return {
        validator: (rule, value, callback) => {
            const reg = new RegExp(/^[0-9]{0,5}$/);
            if (!reg.test(value)) {
                callback(new Error(message || "只能输入正整数,并且长度不能超过5"));
            } else {
                callback();
            }
        },
        trigger: 'blur'
    }
}

function string(message) { //只能输入英文
    return {
        validator: (rule, value, callback) => {
            const reg = new RegExp(/^[a-zA-Z0-9]+$/);
            if (!reg.test(value)) {
                callback(new Error(message || '只能输入英文或数字'));
            } else {
                callback();
            }
        },
        trigger: 'blur'
    }
}

function NumAndStr(message) { //只能小写字母或者数字
    return {
        validator: (rule, value, callback) => {
            const reg = new RegExp(/^[a-z0-9]+$/);
            if (!reg.test(value)) {
                callback(new Error(message || '只能是小写字母和数字'));
            } else {
                callback();
            }
        },
        trigger: 'blur'
    }

}

function isCardNo(message) { //身份证校验
    return {
        validator: (rule, value, callback) => {
            const reg = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
            if (!reg.test(value)) {
                callback(new Error(message || '身份证格式不正确'));
            } else {
                callback();
            }
        },
        trigger: 'blur'
    }

}

function mobile(message) { //移动手机号
    return {
        validator: (rule, value, callback) => {
            if (value === '') {
                callback(new Error('手机号不能为空'));
            } else {
                const reg = new RegExp(/^1\d{10}$/);
                if (!reg.test(value)) {
                    callback(new Error(message || '请输入正确的手机号'));
                } else {
                    callback();
                }
            }
        },
        trigger: 'blur'
    }
}

function tel(message) { //固定电话
    return {
        validator: (rule, value, callback) => {
            if (value === '') {
                callback();
            } else {
                const reg = new RegExp(/^0\d{2,3}-?\d{7,8}$/);
                if (!reg.test(value)) {
                    callback(new Error(message || '请输入正确的固定电话'));
                } else {
                    callback();
                }
            }
        },
        trigger: 'blur'
    }
}

function verificationCode(message) { //6位手机验证码
    return {
        validator: (rule, value, callback) => {
            const reg = new RegExp(/\d{6}$/);
            if (!value) {
                return callback(new Error(message || "验证码不能为空"));
            } else if (!reg.test(value)) {
                return callback(new Error("请输入6位数字验证码"));
            } else {
                callback();
            }
        },
        trigger: 'blur'
    }
}

function checkChinese(message) { // 中文数据验证 --ASCII码
    return {
        validator: (rule, value, callback) => {
            let flag = true;
            if (value && value != null) {
                for (let i = 0; i < value.length; i++) {
                    if (value.charCodeAt(i) > 255) {
                        callback(new Error(message || '不能含有汉字'));
                        flag = false;
                        break;
                    }
                }
            }
            if (flag) {
                callback();
            }
        },
        trigger: 'blur'
    }
}

function isURL(message) { // URL格式验证
    return {
        validator: (rule, value, callback) => {
            const reg = new RegExp("^(http://|https://).*$");
            if (!reg.test(value)) {
                callback(new Error(message || 'URL格式不正确!'));
            } else {
                callback();
            }
        },
        trigger: 'blur'
    }
}

function pswd(message) { //密码校验，及复杂度校验
    console.log("1pass------");

    let grade;
    return {
        validator: (rule, value, callback) => {
            passWord = value;
            // 密码中必须包含大小字母、数字、特称字符，至少8个字符，最多16个字符。
            const reg1 = new RegExp("(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,16}");
            // 密码中必须包含字母、数字、特称字符，至少8个字符，最多16个字符。
            const reg2 = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}");
            // 密码中必须包含字母、数字，至少8个字符，最多16个字符。
            const reg3 = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}");

            if (reg1.test(value)) {
                grade = 1;
            } else if (reg2.test(value)) {
                grade = 2;
            } else if (reg3.test(value)) {
                grade = 3;
            } else {
                grade = 0;
            }

            if (!reg3.test(value)) {
                callback(new Error(message || '您输入的密码不满足要求!'));
            } else {
                callback();
            }
        },
        trigger: 'blur',
        grade: grade
    }
}

function pswdcheck(message) { // 密码二次校验
    console.log("pass------");
    console.log(message);
    console.log(passWord);

    return {
        validator: (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== passWord) {
                callback(new Error(message || '您输入的密码不匹配!'));
            } else {
                callback();
            }
        },
        trigger: 'blur'
    }
}

function accountCheck() { //必填
    return {
        required: true,
        validator: (rule, value, callback) => {
            request.get(api.accountCheck, {
                params: {
                    account: value
                }
            }).then(res => {
                if (res.code == code.request_abort) {
                    callback(new Error('用户名已存在'));
                } else if (res.code == code.success) {
                    callback()
                } else {
                    callback(new Error('服务器响应异常'));
                }
            })
        },
        trigger: 'blur'
    }
}
export default {
    required,
    notRequired,
    email,
    number,
    space,
    minNumber,
    double,
    numberLim,
    string,
    NumAndStr,
    isCardNo,
    mobile,
    tel,
    verificationCode,
    checkChinese,
    isURL,
    pswd,
    pswdcheck,
    accountCheck
}