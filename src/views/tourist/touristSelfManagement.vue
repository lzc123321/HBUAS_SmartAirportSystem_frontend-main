<template>
    <div class="common-layout">
      <el-container>
        <el-header>
          <div class="headerContainer">
            <img src="@/assets/logo.png" class="logo" fit="contain"/>
          </div> 
        </el-header>
        <el-container>
          <el-aside width="200px" class="aside">
            <el-menu
              class="el-menu-vertical-demo"
              align="left" 
              unique-opened :collapse="isCollapse"
              router>
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><House /></el-icon>
                  <span>首页</span>
                </template>
                <el-menu-item index="/tourist">返回首页</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>实名信息管理</span>
                </template>
                <el-menu-item index="/tourist/touristSelfInformation">实名信息管理</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><document /></el-icon>
                  <span>机票管理</span>
                </template>
                <el-menu-item index="/tourist/ticketmanage">管理机票信息</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="6">
                <template #title>
                    <el-icon><PieChart /></el-icon>
                  <span>个人中心</span>
                </template>
                <el-menu-item index="/tourist/selfmanage">个人中心</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="7">
                <template #title>
                    <el-icon><HomeFilled /></el-icon>
                  <span>退出登录</span>
                </template>
                <el-menu-item @click="returnHome">退出登录</el-menu-item>
              </el-sub-menu> 
            </el-menu>
          </el-aside>  
          <el-main>
            <el-tabs tab-position="left" class="card">
                <el-tab-pane label="修改密码" name="first">
                    <div class="self"  @keyup.enter="keyPressed">
                        <h4>修改密码</h4>
                        <el-form :model="SelfForm" :rules="selfrules" ref="SelfForm" label-width="100px" status-icon="true">
                            <el-form-item label="密码" class="login_input_box" prop="TouristId">
                                <el-input v-model="SelfForm.password" placeholder="请输入密码"></el-input>
                            </el-form-item>

                            <el-form-item label="新密码" class="login_input_box" prop="RealName">
                                <el-input v-model="SelfForm.newpassword" placeholder="请输入新密码"></el-input>
                            </el-form-item>

                            <el-form-item label="再次输入" class="login_input_box" prop="IDNumber">
                                <el-input v-model="SelfForm.renewpassword" placeholder="请输入再次输入新密码"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="changePassword" class="button" type="primary">修改密码</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="改绑邮箱" name="second">
                    <div class="self"  @keyup.enter="keyPressed">
                        <h4>修改邮箱</h4>
                        <el-form :model="SelfForm" :rules="selfrules" ref="SelfForm" label-width="100px" status-icon="true">
                            <el-form-item label="新邮箱" class="login_input_box" prop="TouristId">
                                <el-input v-model="SelfForm.newemail" placeholder="请输入新邮箱"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="changeEmail" class="button" type="primary">改绑邮箱</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>  
      </el-container>
    </div>
  </template>
  
  <script>
  //import companyChange from '@/components/companyChange.vue';
  //import { useStore } from 'vuex';
  import { ElMessage } from 'element-plus';
  import qs from 'qs';
  export default{
  //
    data() {
        var validateEmail = (rule, value, callback) => {
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            if (regEmail.test(value)) {
                callback();
            }
            callback(new Error('请输入合法邮箱地址'));
        };

        var validatePass = (rule, value, callback) => {
            const regPass = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
            if (regPass.test(value)) {
                callback();
            }
            callback(new Error('密码必须包含字母、数字和特殊字符，且长度不低于8位'));
        };

        var validatePass2 = (rule, value, callback) => {
            if (value == this.registerForm.pass) {
                callback();
            }
            callback(new Error('两次密码不一致'));
        };

        return {
            SelfForm:{
                email:"",
                newemail: "",
                password: "",
                newpassword: "",
                renewpassword: "",
            },
            selfrules:{
                newemail:[
                    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
                    { validator: validateEmail, trigger: 'blur' }
                ],

                password:[
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],

                newpassword:[
                    { required: true, message: '新密码不能为空', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],

                renewpassword:[
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }    
    },


    methods:{
      returnHome(){
                    const touristtoken = window.localStorage.getItem("touristtoken");
                    this.$http({
                            method: "post" /* 指明请求方式，可以是 get 或 post */,
                            url: "/tourist/logout" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                            data: qs.stringify({
                            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                                token:touristtoken,
                            }),
                        })
                        .then((res) => {
                            /* res 是 response 的缩写 */
                            console.log(res.data);
                            if(!res.data.success){
                                this.$message.error(res.data.message);
                            }
                            else{
                                this.$message.success(res.data.message);
                                this.$router.push("/");
                            }
                        });
    },
        changePassword(){
            this.$refs.SelfForm.validate((valid)=>{
                if(valid)
                {
                    const touristtoken = window.localStorage.getItem("touristtoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/tourist/updatepassword" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:touristtoken,
                            passwords: this.SelfForm.password,
                            newpasswords: this.SelfForm.newpassword,
                            renewpasswords: this.SelfForm.renewpassword,
                        }),
                    })
                    .then((res) => {
                        /* res 是 response 的缩写 */
                        console.log(res.data);
                        if(!res.data.success){
                            this.$message.error(res.data.message);
                        }
                        else{
                            this.$message.success(res.data.message);
                        }
                    });
                }
                else
                {
                    ElMessage({
                        type: 'error',
                        message: "请完成输入",
                        duration: 2000,
                    })
                }
            });
        },
        changeEmail(){
            this.$refs.SelfForm.validate((valid)=>{
                if(valid)
                {
                    const touristtoken = window.localStorage.getItem("touristtoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/tourist/updateemail" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:touristtoken,
                            newemail: this.SelfForm.newemail,
                        }),
                    })
                    .then((res) => {
                        /* res 是 response 的缩写 */
                        console.log(res.data);
                        if(!res.data.success){
                            this.$message.error(res.data.message);
                        }
                        else{
                            this.$message.success(res.data.message);
                        }
                    });
                }
                else
                {
                    ElMessage({
                        type: 'error',
                        message: "请完成输入",
                        duration: 2000,
                    })
                }
            });
        },
        
    }
  }
  
  </script>
  
  <style>
  #app {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -99999;
  }
  
  * {
    margin: 0;
    padding: 0;
  }
  
  
  
  .headerContainer{
  position: fixed;
  top: 0px;
  height: 100px;
  width: 100%;
  border-top: blue solid 2px;
  border-bottom: lightgrey solid 2px;
  background-color: white;
  display: flex;
  z-index: 99999999;
  }
  
  .aside{
  position: fixed;
  top: 110px;
  width: 100%;
  }
  
  .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 1000px;
  }


.self {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    border: 1px solid black;
    padding: 20px;
    border-radius: 5px;
    background-color: white;
}

h4 {
    text-align: center;
    padding: 5px;
}

.parking_btn {
    width: 40%;
    margin: auto;
}
  
  </style>