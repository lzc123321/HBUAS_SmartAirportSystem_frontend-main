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
              <!-- <el-sub-menu index="4">
                <template #title>
                  <el-icon><FolderChecked /></el-icon>
                  <span>停车订单管理</span>
                </template>
                <el-menu-item index="/tourist/ordermanage">管理停车订单</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="5">
                <template #title>
                  <el-icon><CircleCheck /></el-icon>
                  <span>商品订单管理</span>
                </template>
                <el-menu-item index="/tourist/purchasemanage">管理商品订单</el-menu-item>
              </el-sub-menu> -->
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
                <el-tab-pane label="查看实名信息" name="first">
                    <el-table :data="InformationList" stripe style="width: 100%">
                            <el-table-column prop="personid" label="实名信息ID" width="120" />
                            <el-table-column prop="touristid" label="旅客ID" width="120"/>
                            <el-table-column prop="realname" label="真实姓名" width="120"/>
                            <el-table-column prop="idnumber" label="身份证号" width="300"/>
                            <el-table-column prop="email" label="联系方式" width="200"/>
                            <el-table-column fixed="right" label="Opeations" width="120">
                            <template #default="scope">
                                <el-button link type="primary" style="margin-left: 16px" size="small" @click="openDiager(scope.row)">修改实名信息</el-button>
                                <el-button link type="primary" style="margin-left: 16px" size="small" @click="deleteSelfInformation(scope.row)">删除实名信息</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="button">
                        <el-button @click="checkSelfInformation" class="submit_btn" type="primary">查询实名信息</el-button>
                    </div>
                    <el-drawer
                        v-model="drawer"
                        title="修改个人信息"
                        :direction="direction"
                    >
                        <el-form :model="InformationForm" :rules="rules" ref="InformationForm" label-width="100px" status-icon="true">
                                <el-form-item label="真实姓名" class="login_input_box" prop="RealName">
                                    <el-input v-model="InformationForm.RealName" placeholder="请输入真实姓名"></el-input>
                                </el-form-item>

                                <el-form-item label="身份证号" class="login_input_box" prop="IDNumber">
                                    <el-input v-model="InformationForm.IDNumber" placeholder="请输入身份证号"></el-input>
                                </el-form-item>

                                <el-form-item label="联系方式" class="login_input_box" prop="Email">
                                    <el-input v-model="InformationForm.Email" placeholder="请输入联系方式"></el-input>
                                </el-form-item>

                                <div class="button">
                                    <el-button @click="changeSelfInformation" class="button" type="primary">修改实名信息</el-button>
                                </div>
                        </el-form>
                    </el-drawer>    
                </el-tab-pane>
                <el-tab-pane label="添加实名信息" name="second">
                    <div class="Addperson"  @keyup.enter="keyPressed">
                            <h4>添加实名信息</h4>
                            <el-form :model="InformationForm" :rules="rules" ref="InformationForm" label-width="100px" status-icon="true">

                                <el-form-item label="真实姓名" class="login_input_box" prop="RealName">
                                    <el-input v-model="InformationForm.RealName" placeholder="请输入真实姓名"></el-input>
                                </el-form-item>

                                <el-form-item label="身份证号" class="login_input_box" prop="IDNumber">
                                    <el-input v-model="InformationForm.IDNumber" placeholder="请输入身份证号"></el-input>
                                </el-form-item>

                                <el-form-item label="联系方式" class="login_input_box" prop="Email">
                                    <el-input v-model="InformationForm.Email" placeholder="请输入联系方式"></el-input>
                                </el-form-item>

                                <div class="button">
                                    <el-button @click="addSelfInformation" class="button" type="primary">添加实名信息</el-button>
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
  import { ref } from 'vue';
  import qs from 'qs';
  const direction = ref("btt"); 
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

        var validateRealID = (rule, value, callback) => {
            const regMerchantRealID_18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            const regMerchantRealID_15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
            if (regMerchantRealID_15.test(value) || regMerchantRealID_18.test(value)) {
                callback();
            }
            callback(new Error('身份证号不符合规范，请输入正确的身份证号'));
        };

        var validateRealName = (rule, value, callback) => {
            const regMerchantRealName = /^[\u4e00-\u9fa5a-zA-Z]{1,30}$/;
            if (regMerchantRealName.test(value)) {
                callback();
            }
            callback(new Error('姓名只能由中英文组成，不超过30位'));
        };
        return {
            drawer: false,
            direction: direction,
            InformationList:[{
                TIID:"",
                TouristId: "",
                RealName: "",
                IDNumber: "",
                Email: "",
            }],
            InformationForm:{
                TIID:"",
                TouristId: "",
                RealName: "",
                IDNumber: "",
                Email: "",
            },
            rules:{
                RealName:[
                    { required: true, message: '真实姓名不能为空', trigger: 'blur' },
                    { validator: validateRealName, trigger: 'blur' }
                ],
                IDNumber:[
                    { required: true, message: '身份证号不能为空', trigger: 'blur' },
                    { validator: validateRealID, trigger: 'blur' }
                ],
                Email:[
                    { required: true, message: '联系方式不能为空', trigger: 'blur' },
                    { validator: validateEmail, trigger: 'blur' }
                ],
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
        checkSelfInformation(){
            const touristtoken = window.localStorage.getItem("touristtoken");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/tourist/listperson" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token:touristtoken
                }),
            })
            .then((res) => {
                /* res 是 response 的缩写 */
                console.log(res.data);
                if(!res.data.success){
                    this.$message.error(res.data.message);
                }
                else{
                    this.InformationList = res.data.message;
                }
            });
        },

        addSelfInformation(){
            this.$refs.InformationForm.validate((vaild)=> {
                if(vaild)
                {
                    const touristtoken = window.localStorage.getItem("touristtoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/tourist/addperson" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:touristtoken,
                            realname: this.InformationForm.RealName,
                            idnumber: this.InformationForm.IDNumber,
                            email: this.InformationForm.Email
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
                        message: "请完成填写",
                        duration: 2000,
                    })
                }
            });
        },

        openDiager(row){
            if(!row.personid)
            {
                ElMessage({
                        type: 'error',
                        message: "个人信息不存在",
                        duration: 2000,
                    })
            }
            else
            {
                this.drawer = true;
                window.localStorage.setItem("personid", row.personid);
            }
        },

        changeSelfInformation(){
            this.$refs.InformationForm.validate((vaild)=> {
                if(vaild)
                {

                        const touristtoken = window.localStorage.getItem("touristtoken");
                        const personid = window.localStorage.getItem("personid");
                        this.$http({
                            method: "post" /* 指明请求方式，可以是 get 或 post */,
                            url: "/tourist/updateperson" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                            data: qs.stringify({
                            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                                token:touristtoken,
                                personid: personid,
                                realname: this.InformationForm.RealName,
                                idnumber: this.InformationForm.IDNumber,
                                email: this.InformationForm.Email
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
                        message: "请完成填写",
                        duration: 2000,
                    })
                }
            });
        },

        deleteSelfInformation(row){
                    const touristtoken = window.localStorage.getItem("touristtoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/tourist/removeperson" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:touristtoken,
                            personid: row.personid,
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
  
  
  .Addperson {
    margin-top: 50px;
    margin-left: 200px;
    position: relative;
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

  .card{
    top: 200px;
    margin: auto;
    margin-top: 50px;
    margin-left: 200px;
    height: 100%;
    width: 70%;
    border-color: black;
}
  </style>