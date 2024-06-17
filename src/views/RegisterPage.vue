<template>
    <el-container>
        <el-header>
            <div class="headerContainer">
                <img src="@/assets/logo.png" class="logo" />
                <pageChange class="pageChange"></pageChange>
            </div>
        </el-header>
        <el-main>
            <title>注册</title>
            <div class="register" @keyup.enter="keyPressed">
                <h4>注册新账号</h4>
                <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="120px" class="registerFormStyle"
                    status-icon="true">

                    <el-form-item label="用户类型" prop="uType" class="register_input_box">
                        <el-select v-model="registerForm.uType" placeholder="请选择用户类型">
                            <el-option label="普通用户" value="user" />
                            <el-option label="航空公司" value="company" />
                            <el-option label="管理员" value="admin" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="用户名称" prop="name" v-if="registerForm.uType == 'user'" class="register_input_box">
                        <el-input v-model="registerForm.name" placeholder="请输入名称"></el-input>
                    </el-form-item>

                    <el-form-item label="公司名称" prop="airlineName" v-if="registerForm.uType == 'company'" class="register_input_box">
                        <el-input v-model="registerForm.airlineName" placeholder="请输入名称"></el-input>
                    </el-form-item>

                    <el-form-item label="员工名称" prop="adminName" v-if="registerForm.uType == 'admin'" class="register_input_box">
                        <el-input v-model="registerForm.adminName" placeholder="请输入名称"></el-input>
                    </el-form-item>

                    <!-- <el-form-item label="商店名称" prop="merchantName" v-if="registerForm.uType == 'merchant'"
                        class="register_input_box">
                        <el-input v-model="registerForm.merchantName" placeholder="请输入商店名称"></el-input>
                    </el-form-item>

                    <el-form-item label="商户姓名" prop="merchantRealName" v-if="registerForm.uType == 'merchant'"
                        class="register_input_box">
                        <el-input v-model="registerForm.merchantRealname" placeholder="请输入姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="商户身份证号" prop="merchantRealID" v-if="registerForm.uType == 'merchant'"
                        class="register_input_box">
                        <el-input v-model="registerForm.merchantRealID" placeholder="请输入身份证号"></el-input>
                    </el-form-item> -->

                    <el-form-item label="员工号" prop="adminID" v-if="registerForm.uType == 'admin'" class="register_input_box">
                        <el-input v-model="registerForm.adminID" placeholder="请输入员工号"></el-input>
                    </el-form-item>

                    <el-form-item label="员工身份证号" prop="adminRealID" v-if="registerForm.uType == 'admin'" class="register_input_box">
                        <el-input v-model="registerForm.adminRealID" placeholder="请输入员工身份证号"></el-input>
                    </el-form-item>

                    <el-form-item label="员工职位" prop="
                    " v-if="registerForm.uType == 'admin'" class="register_input_box">
                        <!--el-input v-model="registerForm.positionpost" placeholder="请输入员工职位"></el-input-->
                        <el-select v-model="registerForm.positionpost" class="m-2" placeholder="Select">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email" class="register_input_box">
                        <el-input v-model="registerForm.email" placeholder="请输入邮箱地址"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="pass" class="register_input_box">
                        <el-input show-password v-model="registerForm.pass" placeholder="请输入密码" type="password" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="checkPass" class="register_input_box">
                        <el-input show-password v-model="registerForm.checkPass" placeholder="请确认密码" type="password"></el-input>
                    </el-form-item>


                    <div class="button">
                        <el-button @click="register_btn" class="register_btn" type="primary">注册</el-button>
                        <el-button @click="goback_btn" class="goback_btn" type="plain">返回</el-button>
                    </div>
                </el-form>


            </div>
        </el-main>
    </el-container>
</template>

<script>
import router from '@/routes/router';
import qs from 'qs';
import { ElMessage } from 'element-plus';
import pageChange from '@/components/pageChange.vue';
//import { throwStatement } from '@babel/types';


export default {
    components: {
        pageChange
    },
    name: "RegisterPage",
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

        var validateAdminID = (rule, value, callback) => {
            const regID = /^\d{5}$/;
            if (regID.test(value)) {
                callback();
            }
            callback(new Error('员工号为5位数字'));
        };

        var validateName = (rule, value, callback) => {
            const regName = /^[\u4e00-\u9fa5a-zA-Z0-9_]{1,12}$/;
            if (regName.test(value)) {
                callback();
            }
            callback(new Error('名称只能由中英文、数字和下划线组成，不超过12位'));
        };

        var validateName2 = (rule, value, callback) => {
            const regAirlineName = /^[\u4e00-\u9fa5a-zA-Z0-9_]{1,30}$/;
            if (regAirlineName.test(value)) {
                callback();
            }
            callback(new Error('名称只能由中英文、数字和下划线组成，不超过30位'));
        };

        // var validateRealName = (rule, value, callback) => {
        //     const regMerchantRealName = /^[\u4e00-\u9fa5a-zA-Z]{1,30}$/;
        //     if (regMerchantRealName.test(value)) {
        //         callback();
        //     }
        //     callback(new Error('姓名只能由中英文组成，不超过30位'));
        // };

        var validateRealID = (rule, value, callback) => {
            const regMerchantRealID_18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            const regMerchantRealID_15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
            if (regMerchantRealID_15.test(value) || regMerchantRealID_18.test(value)) {
                callback();
            }
            callback(new Error('身份证号不符合规范，请输入正确的身份证号'));
        };

        return {
            options:[
                {
                    value: 0,
                    label: "ADMINISTRATOR(管理人员)",
                },

                {
                    value: 1,
                    label: "COMMONSTAFF(普通员工)",
                },

                {
                    value: 2,
                    label: "CUSTOMERSERVICE(客服人员)",
                },

            ],
            registerForm: {
                email: '',
                name: '',
                airlineName: '',
                pass: '',
                checkPass: '',
                uType: 'user',
                adminID: '',
                adminName: '',
                merchantName: '',
                merchantRealname: '',
                merchantRealID: '',
                adminRealID: '',
                positionpost: '',
            },

            rules: {
                name: [
                    { required: true, message: '用户名称不能为空', trigger: 'blur' },
                    { validator: validateName, trigger: 'blur' }
                ],

                airlineName: [
                    { required: true, message: '公司名称不能为空', trigger: 'blur' },
                    { validator: validateName2, trigger: 'blur' }
                ],

                adminName: [
                    { required: true, message: '员工名称不能为空', trigger: 'blur' },
                    { validator: validateName, trigger: 'blur' }
                ],

                adminID: [
                    { required: true, message: '员工号不能为空', trigger: 'blur' },
                    { validator: validateAdminID, trigger: 'blur' }
                ],

                email: [
                    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
                    { validator: validateEmail, trigger: 'blur' }
                ],

                pass: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePass2, trigger: 'blur' }
                ],

                uType: [
                    { required: true, message: '用户类型不能为空', trigger: 'blur' }
                ],

                adminRealID: [
                    {required: true, message: '工作人员身份证号不能为空', trigger: 'blur'},
                    {validator: validateRealID, trigger: 'blur'}
                ],

                positionpost:[
                    {required: true, message: '工作人员职位不能为空', trigger: 'blur'},
                    {validator: validateName, trigger: 'blur'}
                ]
            },

        }
    },

    methods: {
        register_btn() {
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    /*把数据写入数据库
                        ？？
                    */
                    switch(this.registerForm.uType)
                    {
                        case "user":
                            this.userRegister();
                            break;
                        case "admin":
                            this.adminRegister();
                            break;
                        case "company":
                            this.companyRegister();
                            break;
                    }
                    //router.push('/');
                } else {
                    ElMessage({
                        type: 'error',
                        message: "请完成填写",
                        duration: 2000,
                    })
                }
            })
        },

        keyPressed() {
            this.register_btn();
        },

        goback_btn() {
            router.push('/login');
        },

        userRegister()
        {
            
            this.$http({
              method: "post" /* 指明请求方式，可以是 get 或 post */,
              url: "/tourist/logup" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
              data: qs.stringify({
              /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                email:this.registerForm.email,
                passwords: this.registerForm.pass,
                repasswords: this.registerForm.checkPass,
              }),
          })
            .then((res) => {
              /* res 是 response 的缩写 */
              //console.log(res.data);
              if (res.data.success) {
                this.$message.success("注册成功！");
                setTimeout(() => {this.$router.push("/login")}, 1000);
              } else {
                if(res.data.message=="邮箱已被注册！"){
                    this.$message.error("邮箱已被注册！");
                }else if(res.data.message=="邮箱格式有误！"){
                    this.$message.error("邮箱格式不正确！");
                }else{
                    this.$message.error("注册失败！");
                }
              }
            })
            .catch((err) => {
              console.log(err); /* 若出现异常则在终端输出相关信息 */
            });
            
        },

        adminRegister()
        {
            this.$http({
              method: "post" /* 指明请求方式，可以是 get 或 post */,
              url: "/staff/logup" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
              data: qs.stringify({
              /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                realname: this.registerForm.adminName,
                positionpost: this.registerForm.positionpost,
                email: this.registerForm.email,
                idnumber: this.registerForm.adminRealID,
                passwords: this.registerForm.pass,
                repasswords: this.registerForm.checkPass,
              }),
          })
            .then((res) => {
              /* res 是 response 的缩写 */
              //console.log(res.data);
              if (res.data.success) {
                this.$message.success("注册成功！");
                setTimeout(() => {this.$router.push("/login")}, 1000);
              } else {
                this.$message.error("注册失败！");
              }
            })
            .catch((err) => {
              console.log(err); /* 若出现异常则在终端输出相关信息 */
            });
        },

        companyRegister()
        {
            this.$http({
              method: "post" /* 指明请求方式，可以是 get 或 post */,
              url: "/company/logup" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
              data: qs.stringify({              
                /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                email: this.registerForm.email,
                name: this.registerForm.airlineName,
                passwords: this.registerForm.pass,
                repasswords: this.registerForm.checkPass,
            }),
          })
            .then((res) => {
              /* res 是 response 的缩写 */
              //console.log(res.data);
              if (res.data.success) {
                this.$message.success("注册成功！");
                setTimeout(() => {this.$router.push("/login")}, 1000);
              } else {
                this.$message.error("注册失败！");
              }
            })
            .catch((err) => {
              console.log(err); /* 若出现异常则在终端输出相关信息 */
            });
        },

        // merchantRegister()
        // {
        //     this.$http({
        //       method: "post" /* 指明请求方式，可以是 get 或 post */,
        //       url: "/merchant/logup" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        //       data: qs.stringify({
        //       /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
        //         realname: this.registerForm.merchantRealname,
        //         shopname: this.registerForm.merchantName,
        //         idnumber: this.registerForm.merchantRealID,
        //         email: this.registerForm.email,
        //         passwords: this.registerForm.pass,
        //         repasswords: this.registerForm.checkPass,
        //       }),
        //   })
        //     .then((res) => {
        //       /* res 是 response 的缩写 */
        //       //console.log(res.data);
        //       if (res.data.success) {
        //         this.$message.success("申请成功！请耐心等待。");
        //         setTimeout(() => {this.$router.push("/login")}, 1000);
        //       } else {
        //         this.$message.error("申请失败！");
        //       }
        //     })
        //     .catch((err) => {
        //       console.log(err); /* 若出现异常则在终端输出相关信息 */
        //     });
        // }
    },

}
</script>

<style>
.register {
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

.register_input_box {
    margin: 10px;
    width: 89%;
}

.register_btn {
    width: 40%;
    margin: auto;
}

.goback_btn {
    width: 40%;
    margin: auto;
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
</style>