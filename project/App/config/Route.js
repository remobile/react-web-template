'use strict';

const ROOT_SERVER = CONSTANTS.SERVER;
const API_SERVER = ROOT_SERVER + 'ss/api/';
const SERVER = API_SERVER + 'client/';

module.exports = {
    // 微信认证
    ROUTE_CHECK_WEIXIN_AUTHENTICATE: SERVER + 'checkWeixinAuthenticate',
    ROUTE_WEIXIN_AUTHENTICATE: SERVER + 'weixinAuthenticate',

    // 登录
    ROUTE_REGISTER: SERVER + 'register', // 注册
    ROUTE_SIGN: SERVER + 'sign', // 签到
    ROUTE_GET_ID_CARD_INFO: SERVER + 'getIdCardInfo', // 获取身份证信息
    ROUTE_GET_CLIENT_BY_IDNO: SERVER + 'getClientByIdNo', // 获取人员信息
    ROUTE_MODIFY_CLIENT_INFO: SERVER + 'modifyClientInfo', // 获取人员信息
    ROUTE_GET_FAMILY_MEMBER_LIST: SERVER + 'getFamilyMemberList', //  获取家庭成员列表
    ROUTE_GET_CLIENT_RECORD_LIST: SERVER + 'getClientRecordList', //  获取出行记录列表

    ROUTE_REGISTER_CASE: SERVER + 'registerCase', // 案件上报
    ROUTE_REGISTER_RESIDENCE: SERVER + 'registerResidence', // 登记入户
    ROUTE_REGISTER_DESTORYRESIDENCE: SERVER + 'destoryResidence', // 注销户口
    ROUTE_REGISTER_TURNOUTRESIDENCE: SERVER + 'turnOutResidence', // 迁出户口

    // 文件上传
    ROUTE_UPDATE_FILE: API_SERVER + 'uploadFile', // 上传文件
};
