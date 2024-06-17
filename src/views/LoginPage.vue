<template>
    <el-container>
        <el-header>
            <div class="headerContainer">
                <img src="@/assets/logo.png" class="logo" />
                <pageChange class="pageChange"></pageChange>
            </div>
        </el-header>
        <el-main>
            <title>登录</title>
            <div class="login1" @keyup.enter="keyPressed">
                <h4>用户登录</h4>
                <el-form :model="loginForm" label-width="70px" :rules="loginRules">
                    <el-form-item label="登陆选项" class="login_input_box" prop="uType">
                        <el-select v-model="loginForm.uType" placeholder="请选择用户类型">
                            <el-option label="普通用户" value="user" />
                            <el-option label="航空公司" value="company" />
                            <el-option label="管理员" value="admin" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="邮箱" class="login_input_box" prop="email">
                        <el-input v-model="loginForm.email" placeholder="请输入邮箱地址"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" class="login_input_box" prop="pass">
                        <el-input show-password v-model="loginForm.pass" type="password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    
                    <div class="button">
                        <el-button @click="submit_btn" class="submit_btn" type="primary">登录</el-button>
                        <el-button @click="goRegister_btn" class="goRegister_btn" type="plain">注册</el-button>
                    </div>
                </el-form>
            </div>
        </el-main>
    </el-container>
</template>



<script>
import router from "@/routes/router"
import qs from "qs"
import { ElMessage } from "element-plus";
//import { useStore } from "vuex";
import pageChange from '@/components/pageChange.vue';
import { getCurrentInstance } from 'vue';

var isLogin = getCurrentInstance()?.appContext.config.globalProperties.$isLogin;

export default {
    components: {
        pageChange,
    },
    name: "LoginPage",
    data() {
        return {
            isLogin,

            loginRules: {
                email: [
                    { message: '邮箱地址不能为空', trigger: 'blur' }
                ]
            },

            loginForm: {
                uType: 'user',
                email: '',
                pass: '',
            }
        }
    },

    mounted() {

    },

    methods: {
        submit_btn() {
            if (!this.loginForm.email || !this.loginForm.pass) {
                ElMessage({
                    type: 'error',
                    message: "账号或密码不能为空！",
                    duration: 2000,
                })
            }
            else {
                switch (this.loginForm.uType) {
                    case "user":
                        this.userLogin();
                        break;
                    case "admin":
                        this.adminLogin();
                        break;
                    case "company":
                        this.companyLogin();
                        break;
                    case "merchant":
                        this.merchantLogin();
                        break;
                }
            }
            /*
            else if (登录信息匹配并成功登录) {
                 ElMessage({
                     type: 'success',
                     message: "登录成功！",
                     duration: 2000,
                })
                router.push('/'); //回到主页面
            }
            else {
                ElMessage({
                    type: 'error',
                    message: "账号或密码不正确！",
                    duration: 2000,
                })
            }
            */

        },

        goRegister_btn() {
            router.push('/register');
        },

        keyPressed() {
            this.submit_btn();
        },

        userLogin() {
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/tourist/login" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data:{
                  /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                  email: this.loginForm.email,
                  passwords: this.loginForm.pass,
                },
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if (!res.data.success) {
                        this.$message.error(res.data.message);
                    }
                    else {
                        this.$message.success(res.data.message);
                        /* 将后端返回的 user 信息使用 vuex 存储起来 */
                        this.$isLogin = true;
                        this.$loginType = "user";
                        window.localStorage.setItem("touristtoken", res.data.token);
                        //登录成功后跳转到about页面
                        setTimeout(() => { this.$router.push("/tourist") }, 1000);
                    }
                });
        },

        adminLogin() {
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/staff/login" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                  /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                  email: this.loginForm.email,
                  passwords: this.loginForm.pass,
                }),
            })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if (!res.data.success) {
                        this.$message.error(res.data.message);
                    }
                    else {
                        this.$message.success(res.data.message);
                        /* 将后端返回的 user 信息使用 vuex 存储起来 */
                        this.$isLogin = true;
                        this.$loginType = "admin";
                        window.localStorage.setItem("admintoken", res.data.token);
                        window.localStorage.setItem("positionpost", res.data.positionpost);
                        //this.$message.success(res.data.positionpost)
                        //登录成功后跳转到about页面
                        setTimeout(() => { this.$router.push("/admin") }, 1000);
                    }
                });
        },

        
        companyLogin() {
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/company/login" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                  /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                  email: this.loginForm.email,
                  passwords: this.loginForm.pass,
                }),
            })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if (!res.data.success) {
                        this.$message.error(res.data.message);
                    }
                    else {
                        this.$message.success(res.data.message);
                        /* 将后端返回的 user 信息使用 vuex 存储起来 */
                        this.$isLogin = true;
                        this.$loginType = "company";
                        window.localStorage.setItem("companytoken", res.data.token)
                        //登录成功后跳转到about页面
                        setTimeout(() => { this.$router.push("/company") }, 1000);
                    }
                });
        },

        merchantLogin() {
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/merchant/login" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                  /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                  email: this.loginForm.email,
                  passwords: this.loginForm.pass,
                }),
            })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if (!res.data.success) {
                        this.$message.error(res.data.message);
                    }
                    else {
                        this.$message.success(res.data.message);
                        /* 将后端返回的 user 信息使用 vuex 存储起来 */
                        this.$isLogin = true;
                        this.$loginType = "merchant";
                        window.localStorage.setItem("merchanttoken", res.data.token);
                        //登录成功后跳转到about页面
                        setTimeout(() => { this.$router.push("/merchant") }, 1000);
                    }
                });
        }
    }
}
</script>


<style>
.login1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    border: 1px solid black;
    padding: 20px;
    border-radius: 5px;
    background-color: white;
    margin-top: 50px;
}

h4 {
    text-align: center;
    padding: 5px;
}

.button {
    width: 100%;
    display: flex;
    margin: auto;
}

.submit_btn {
    width: 40%;
    margin: auto;
}

.goRegister_btn {
    width: 40%;
    margin: auto;
}

.login_input_box {
    margin: 10px;
    width: 89%;
}

.headerContainer{
  position: absolute;
  top: 0px;
  margin-left: -20px;
  height: 100px;
  width: 100%;
  border-top: blue solid 2px;
  border-bottom: lightgrey solid 2px;
  background-color: white;
  display: flex;
  z-index: 99999999;
}
</style>

