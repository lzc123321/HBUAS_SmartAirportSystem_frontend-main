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
                  <el-menu-item index="/merchant">返回首页</el-menu-item>
                </el-sub-menu>
                <!-- <el-sub-menu index="2">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>商品管理</span>
                  </template>
                  <el-menu-item index="/merchant/goodsmanage">商品管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon><document /></el-icon>
                    <span>商品订单管理</span>
                  </template>
                  <el-menu-item index="/merchant/ordermanage">商品订单管理</el-menu-item>
                </el-sub-menu> -->
                <el-sub-menu index="4">
                    <template #title>
                    <el-icon><PieChart /></el-icon>
                    <span>个人中心</span>
                    </template>
                    <el-menu-item index="/merchant/selfmanage">个人中心</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="5">
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
                <el-tab-pane label="修改商户信息" name="first">
                    <div class="self"  @keyup.enter="keyPressed">
                        <h4>修改商户信息</h4>
                        <el-form :model="SelfForm" :rules="selfrules" ref="SelfForm" label-width="100px" status-icon="true">
                            <el-form-item label="商店名称" class="login_input_box" prop="shopnumber">
                                <el-input v-model="SelfForm.shopname" placeholder="请输入商店名称"></el-input>
                            </el-form-item>

                            <el-form-item label="身份证号" class="login_input_box" prop="idnumber">
                                <el-input v-model="SelfForm.idnumber" placeholder="请输入身份证号"></el-input>
                            </el-form-item>

                            <el-form-item label="联系方式" class="login_input_box" prop="email">
                                <el-input v-model="SelfForm.newemail" placeholder="请输入联系方式"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="changeInfo" class="button" type="primary">修改商户信息</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="second">
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
            </el-tabs>
          </el-main>
        </el-container>  
      </el-container>
    </div>
  </template>
  
  <script>
  import { ElMessage } from 'element-plus';
  import qs from 'qs';
  //import companyChange from '@/components/companyChange.vue';
  //import { useStore } from 'vuex';
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

        var validateRealID = (rule, value, callback) => {
            const regMerchantRealID_18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            const regMerchantRealID_15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
            if (regMerchantRealID_15.test(value) || regMerchantRealID_18.test(value)) {
                callback();
            }
            callback(new Error('身份证号不符合规范，请输入正确的身份证号'));
        };

        return {
            SelfForm:{
                email:"",
                shopname: "",
                idnumber: "",
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
                ],

                idnumber:[
                    { required: true, message: '身份证号不得为空', trigger: 'blur' },
                    { validator: validateRealID, trigger: 'blur' }
                ],

                shopname:[
                    { required: true, message: '商店名称不得为空', trigger: 'blur' },
                ]
            }
        }
    },

    methods:{
        returnHome(){
                    const merchanttoken = window.localStorage.getItem("merchanttoken");
                    this.$http({
                            method: "post" /* 指明请求方式，可以是 get 或 post */,
                            url: "/merchant/logout" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                            data: qs.stringify({
                            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                                token:merchanttoken,
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
        changeInfo(){
            this.$refs.SelfForm.validate((valid)=>{
                if(valid)
                {
                    const merchanttoken = window.localStorage.getItem("merchanttoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/merchant/updatemerchant" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:merchanttoken,
                            shopname: this.SelfForm.shopname,
                            idnumber: this.SelfForm.idnumber,
                            email: this.SelfForm.newemail,
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

        changePassword(){
            this.$refs.SelfForm.validate((valid)=>{
                if(valid)
                {
                    const merchanttoken = window.localStorage.getItem("merchanttoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/tourist/updatepassword" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:merchanttoken,
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
    },
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
  
  
  .merchant {
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