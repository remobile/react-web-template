'use strict';
// 注意：常量部分必须和服务器保持一致
// 通知类型

const NT_SM_INVITATION_RQ = 30000; // 业务员邀请下级的通知
const NT_SM_INVITATION_RS = 30001; // 业务员邀请下级的通知的应答
const NT_SM_BEEN_SUSPEND_NF = 30002; // 被解除了业务员的通知
const NT_SM_BEEN_NOMINATE_NF = 30003; // 被设置为业务员的通知
const NT_SM_BEEN_APPRAISE_NF = 30004; // 业务员被评价的通知

module.exports = {
    // 通知类型
    NT_SM_INVITATION_RQ,
    NT_SM_INVITATION_RS,
    NT_SM_BEEN_SUSPEND_NF,
    NT_SM_BEEN_NOMINATE_NF,
    NT_SM_BEEN_APPRAISE_NF,
};
