<template>
    <el-header>
        <div class="headerContainer">
            <img src="@/assets/logo.png" class="logo" />
            <pageChange class="pageChange"></pageChange>
        </div>
    </el-header>

    <el-main>
        <el-tabs tab-position="left" class="tab" type="border-card">
            <el-tab-pane label="个人中心">
                <p class="boxHeader">个人信息设置</p>
                <div class="boxItem">
                    <div class="subItem">
                        <p class="item">邮箱:</p>
                        <div class="item2">
                            <p>{{ email }}</p>
                        </div>
                    </div>


                    <div class="subItem">
                        <p class="item">密码:</p>
                        <div class="item2">
                            <p>{{ password }}</p>
                            <el-button @click="changePass" text class="edit"
                                style="color: rgba(255, 255, 255, 0); background-color: rgba(255, 255, 255, 0);">
                                <p class="hoverEdit">编辑</p>
                                <el-icon size="20px">
                                    <Edit />
                                </el-icon>
                            </el-button>
                        </div>
                    </div>


                    <el-dialog v-model="changePassword" title="修改密码" width="450px"
                        style="border-radius: 5px; position: relative; top: 150px;">

                        <el-form :model="editPassForm" :rules="editRules" ref="editPassForm" label-width="80px"
                            class="editPassFormStyle">

                            <el-form-item label="旧密码" prop="oldPass">
                                <el-input v-model="editPassForm.oldPass" placeholder="请输入旧密码" type="password"
                                    autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="密码" prop="editPass">
                                <el-input v-model="editPassForm.editPass" placeholder="请输入新密码" type="password"
                                    autocomplete="off"></el-input>
                            </el-form-item>

                            <el-form-item label="确认密码" prop="checkEditPass">
                                <el-input v-model="editPassForm.checkEditPass" placeholder="请确认新密码"
                                    type="password"></el-input>
                            </el-form-item>
                        </el-form>

                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="closePass">取消</el-button>
                                <el-button type="primary" @click="confirmChangePass">确认</el-button>
                            </span>
                        </template>
                    </el-dialog>

                </div>
            </el-tab-pane>
            <el-tab-pane label="我的消息">
                <div class="messageTab">
                    <div v-for="info in infoList" :key="info" class="infoList">
                        <p class="content">{{ info.content }}</p>
                        <p class="sendTime">{{ info.sendTime }}</p>
                    </div>
                </div>

            </el-tab-pane>
        </el-tabs>
    </el-main>
</template>


<script>
import { Edit } from '@element-plus/icons';
import pageChange from '@/components/pageChange.vue';
import { ElMessage } from 'element-plus';
import qs from 'qs';

export default {
    components: {
        Edit,
        pageChange,
    },

    data() {
        var validateEditPass = (rule, value, callback) => {
            const regEditPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
            if (regEditPass.test(value)) {
                callback();
            }
            callback(new Error('密码必须由字母、数字组成，且长度不低于8位'));
        };

        var validateEditPass2 = (rule, value, callback) => {
            if (value == this.editPassForm.editPass) {
                callback();
            }
            callback(new Error('两次密码不一致'));
        };

        var getMessage = () => {
            var msgList = []
            //请求该用户消息列表，并加入列表
            // while(还有数据){
            //     msgList.push({ content: , sendTime:  });
            // }

            //测试用
            msgList.push({ content: "航班MF870即将起飞", sendTime: "13:20" }, { content: "航班MF870即将起飞", sendTime: "13:20" }, { content: "航班MF870即将起飞", sendTime: "13:20" }, { content: "航班MF870即将起飞", sendTime: "13:20" });
            msgList.push({ content: "航班MF779即将起飞", sendTime: "12:00" }, { content: "航班MF779即将起飞", sendTime: "12:00" }, { content: "航班MF779即将起飞", sendTime: "12:00" }, { content: "航班MF779即将起飞", sendTime: "12:00" }, { content: "航班MF779即将起飞", sendTime: "12:00" }, { content: "航班MF779即将起飞", sendTime: "12:00" });
            return msgList;
        };

        return { //从数据库获取用户数据
            email: "无",
            type: "",
            infoList: getMessage(),
            password: '********',
            changePassword: false,

            editPassForm: {
                editPass: '',
                checkEditPass: '',
            },

            editRules: {
                oldPass: [
                    { required: true, message: '旧密码不能为空', trigger: 'blur' },
                ],
                editPass: [
                    { required: true, message: '新密码不能为空', trigger: 'blur' },
                    { validator: validateEditPass, trigger: 'blur' }
                ],

                checkEditPass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: validateEditPass2, trigger: 'blur' }
                ],
            }



        };
    },

    methods: {

        changePass() {
            this.changePassword = true;
        },

        closePass() {
            this.changePassword = false;
            ElMessage({
                type: 'info',
                message: '取消修改'
            })
        },

        confirmChangePass() {
            this.$refs.editPassForm.validate((valid) => {
                if (valid) {
                    this.changePassword = false;
                    //请求写入数据库
                    switch (this.$loginType) {
                        case 'user':
                            this.userChangePass();
                            break;
                        case 'company':
                            this.companyChangePass();
                            break;
                        case 'merchant':
                            this.merchantChangePass();
                            break;
                        case 'admin':
                            this.adminChangePass();
                            break;
                    }
                } else {
                    ElMessage({
                        type: 'error',
                        message: '密码修改失败！',
                    })
                }
            })
        },

        userChangePass() {
            const usertoken = this.$store.getters.getUser.user.usertoken;
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/tourist/updatepassword" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token: usertoken,
                    passwords: this.editPassForm.oldPass,
                    newpasswords: this.editPassForm.editPass,
                    renewpasswords: this.editPassForm.checkEditPass,
                }),
            })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    //console.log(res.data);
                    if (res.data.success) {
                        ElMessage({
                            type: 'success',
                            message: '密码修改成功！',
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '密码修改失败！',
                        })
                    }
                })
                .catch((err) => {
                    console.log(err); /* 若出现异常则在终端输出相关信息 */
                });
        },

        companyChangePass() {
            const companytoken = this.$store.getters.getcompany.company.companytoken;
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/company/updatepassword" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token: companytoken,
                    passwords: this.editPassForm.oldPass,
                    newpasswords: this.editPassForm.editPass,
                    renewpasswords: this.editPassForm.checkEditPass,
                }),
            })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    //console.log(res.data);
                    if (res.data.success) {
                        ElMessage({
                            type: 'success',
                            message: '密码修改成功！',
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '密码修改失败！',
                        })
                    }
                })
                .catch((err) => {
                    console.log(err); /* 若出现异常则在终端输出相关信息 */
                });
        },

        adminChangePass() {
            const admintoken = this.$store.getters.getadmin.admin.admintoken;
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/admin/updatepassword" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token: admintoken,
                    passwords: this.editPassForm.oldPass,
                    newpasswords: this.editPassForm.editPass,
                    renewpasswords: this.editPassForm.checkEditPass,
                }),
            })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    //console.log(res.data);
                    if (res.data.success) {
                        ElMessage({
                            type: 'success',
                            message: '密码修改成功！',
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '密码修改失败！',
                        })
                    }
                })
                .catch((err) => {
                    console.log(err); /* 若出现异常则在终端输出相关信息 */
                });
        },

        merchantChangePass() {
            const merchanttoken = this.$store.getters.getmerchant.merchant.merchanttoken;
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/merchant/updatepassword" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token: merchanttoken,
                    passwords: this.editPassForm.oldPass,
                    newpasswords: this.editPassForm.editPass,
                    renewpasswords: this.editPassForm.checkEditPass,
                }),
            })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    //console.log(res.data);
                    if (res.data.success) {
                        ElMessage({
                            type: 'success',
                            message: '密码修改成功！',
                        })
                    } else {
                        ElMessage({
                            type: 'error',
                            message: '密码修改失败！',
                        })
                    }
                })
                .catch((err) => {
                    console.log(err); /* 若出现异常则在终端输出相关信息 */
                });
        },
    }
}
</script>

<style>
.title {
    position: relative;
    left: 0px;
    top: 0px;
}

.tab {
    margin: auto;
    margin-bottom: 30px;
    border-radius: 20px;
    margin-top: 50px;
    height: 100%;
    width: 70%;
    border-color: black;
}

.boxHeader {
    background-color: rgb(243, 245, 255);
    text-align: center;
    padding: 10px;
}

.boxItem {
    border-bottom: solid 1px lightgrey;
    border-top: solid 1px lightgrey;
}

.item {
    height: 30px;
    width: 100px;
    padding: 15px;
    padding-bottom: 10px;
    margin: 10px;
    margin-left: 100px;
}

.subItem {
    display: flex;
}

.item2 {
    position: absolute;
    left: 250px;
    display: flex;
    align-items: center;
    height: 35px;
    padding-top: 10px;
    margin-top: 7px;
}

.edit {
    display: flex;
    justify-content: center;
}

.edit :hover {
    color: rgb(67, 67, 255);
    background: white !important;
}

.infoList {
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 20px;
    width: 90%;
    height: 50px;
    background-color: rgb(243, 245, 255);
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
}

.sendTime {
    font-size: 10px;
    margin-top: 5px;
    color: grey;
}

.content {
    font-size: 15px;
}

.messageTab {
    margin-top: 10px;
    height: 650px;
    overflow: auto;
}
</style>