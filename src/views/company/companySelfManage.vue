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
              <el-sub-menu index="/company">
                <template #title>
                  <el-icon><House /></el-icon>
                  <span>首页</span>
                </template>
                <el-menu-item index="/company">返回首页</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><location /></el-icon>
                  <span>航班管理</span>
                </template>
                <el-menu-item index="/company/manage">查看航班信息</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="2">
                  <template #title>
                    <el-icon><PieChart /></el-icon>
                    <span>个人中心</span>
                  </template>
                  <el-menu-item index="/company/selfmanage">个人中心</el-menu-item>
                </el-sub-menu>
              <el-sub-menu index="3">
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
                            <el-form-item label="密码" class="login_input_box" prop="password">
                                <el-input v-model="SelfForm.password" placeholder="请输入密码"></el-input>
                            </el-form-item>

                            <el-form-item label="新密码" class="login_input_box" prop="newpassword">
                                <el-input v-model="SelfForm.newpassword" placeholder="请输入新密码"></el-input>
                            </el-form-item>

                            <el-form-item label="再次输入" class="login_input_box" prop="renewpassword">
                                <el-input v-model="SelfForm.renewpassword" placeholder="请输入再次输入新密码"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="changePassword" class="button" type="primary">修改密码</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="修改个人信息" name="second">
                    <div class="self"  @keyup.enter="keyPressed">
                        <h4>修改公司信息</h4>
                        <el-form :model="SelfForm" :rules="selfrules" ref="SelfForm" label-width="100px" status-icon="true">
                            <el-form-item label="新邮箱" class="login_input_box" prop="newemail">
                                <el-input v-model="SelfForm.newemail" placeholder="请输入新邮箱"></el-input>
                            </el-form-item>

                            <el-form-item label="公司名称" class="login_input_box" prop="realname">
                                <el-input v-model="SelfForm.realname" placeholder="请输入名称"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="changeSelfInfo" class="button" type="primary">修改个人信息</el-button>
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
  import { ElMessage } from 'element-plus';
  import qs from 'qs';
  //import { useStore } from 'vuex';
  export default{
  //
    data() {
        var validateRealName = (rule, value, callback) => {
            const regMerchantRealName = /^[\u4e00-\u9fa5a-zA-Z]{1,30}$/;
            if (regMerchantRealName.test(value)) {
                callback();
            }
            callback(new Error('姓名只能由中英文组成，不超过30位'));
        };

        var validateRealID = (rule, value, callback) => {
            const regMerchantRealID_18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            const regMerchantRealID_15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
            if (regMerchantRealID_15.test(value) || regMerchantRealID_18.test(value)) {
                callback();
            }
            callback(new Error('身份证号不符合规范，请输入正确的身份证号'));
        };

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
                realname: "",
                idnumber: "",
                positionpost: "",
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
                ],

                idnumber:[
                    { required: true, message: '身份证号不得为空', trigger: 'blur' },
                    { validator: validateRealID, trigger: 'blur' }
                ],

                realname:[
                    { required: true, message: '真实姓名不得为空', trigger: 'blur' },
                    { validator: validateRealName, trigger: 'blur' }
                ],
                
                positionpost:[
                    { required: true, message: '职位不得为空', trigger: 'blur' },
                ]
            }
        }
    },
    methods:{
        returnHome(){
                    const companytoken = window.localStorage.getItem("companytoken");
                    this.$http({
                            method: "post" /* 指明请求方式，可以是 get 或 post */,
                            url: "/company/logout" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                            data: qs.stringify({
                            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                                token:companytoken,
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
                    const companytoken = window.localStorage.getItem("companytoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/company/updatepassword" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:companytoken,
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

        changeSelfInfo(){
            this.$refs.SelfForm.validate((valid)=>{
                if(valid)
                {
                    const companytoken = window.localStorage.getItem("companytoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/company/updatecompany" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:companytoken,
                            email: this.SelfForm.newemail,
                            name: this.SelfForm.realname,
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
            })
        }
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
  
  
  .admin {
    margin-left: 200px;
    padding: 10px;
    position: absolute;
    top: 110px;
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
  </style>