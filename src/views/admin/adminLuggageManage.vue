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
                  <el-menu-item index="/admin">返回首页</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon><document /></el-icon>
                    <span>行李信息管理</span>
                  </template>
                  <el-menu-item index="/admin/luggagemanage">行李管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="4">
                  <template #title>
                    <el-icon><Promotion /></el-icon>
                    <span>申请管理</span>
                  </template>
                  <el-menu-item index="/admin/applymanage" v-if="positionpost== 0 || positionpost== 2 ">申请管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="5">
                  <template #title>
                    <el-icon><PieChart /></el-icon>
                    <span>个人中心</span>
                  </template>
                  <el-menu-item index="/admin/selfmanage">个人中心</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="6">
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
                <el-tab-pane label="添加行李信息" name="first">
                  <div class="Goods"  @keyup.enter="keyPressed">
                        <h4>添加行李信息</h4>
                        <el-form :model="LuggageForm" :rules="luggagerules" label-width="100px" status-icon="true">

                            <el-form-item label="订单id" class="login_input_box" prop="orderid">
                                <el-input v-model="LuggageForm.orderid" placeholder="请输入订单id"></el-input>
                            </el-form-item>

                            <el-form-item label="行李状态" class="login_input_box" prop="state">
                                <el-input v-model="LuggageForm.state" placeholder="请输入行李状态"></el-input>
                            </el-form-item>

                            <el-form-item label="行李位置" class="login_input_box" prop="location">
                                <el-input v-model="LuggageForm.location" placeholder="请输入行李位置"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="addLuggage" class="button" type="primary">添加行李信息</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="更新行李信息" name="second">
                  <div class="Goods"  @keyup.enter="keyPressed">
                        <h4>更新行李信息</h4>
                        <el-form :model="LuggageForm" :rules="luggagerules" label-width="100px" status-icon="true">

                            <el-form-item label="行李id" class="login_input_box" prop="luggageid">
                                <el-input v-model="LuggageForm.luggageid" placeholder="请输入行李id"></el-input>
                            </el-form-item>

                            <el-form-item label="行李状态" class="login_input_box" prop="state">
                                <el-input v-model="LuggageForm.state" placeholder="请输入行李状态"></el-input>
                            </el-form-item>

                            <el-form-item label="行李位置" class="login_input_box" prop="location">
                                <el-input v-model="LuggageForm.location" placeholder="请输入行李位置"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="changeLuggage" class="button" type="primary">更新行李信息</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="删除行李信息" name="third">
                  <div class="Goods"  @keyup.enter="keyPressed">
                        <h4>删除行李信息</h4>
                        <el-form :model="LuggageForm" :rules="luggagerules" label-width="100px" status-icon="true">

                            <el-form-item label="行李id" class="login_input_box" prop="luggageid">
                                <el-input v-model="LuggageForm.luggageid" placeholder="请输入行李id"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="deleteLuggage" class="button" type="primary">添加行李信息</el-button>
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
  const position = window.localStorage.getItem("positionpost");
  //import companyChange from '@/components/companyChange.vue';
  //import { useStore } from 'vuex';
  export default{
  //
    data() {

        return {
          positionpost: position,

          LuggageList:[{
                luggageid: "",
                personid: "",
                ticketid: "",
                state: "",
                location: "",
          }],
          
          LuggageForm:{
                orderid: "",
                luggageid: "",
                personid: "",
                ticketid: "",
                state: "",
                location: "",
          },

          luggagerules:{
            orderid:[
              { required: true, message: '订单ID不能为空', trigger: 'blur' },
            ],

            luggageid:[
              { required: true, message: '行李ID不能为空', trigger: 'blur' },
            ],

            state:[
              { required: true, message: '行李状态不能为空', trigger: 'blur' },
            ],

            location: [
              { required: true, message: '行李位置不能为空', trigger: 'blur' },
            ]
          }
        }
    },
    methods:{
      returnHome(){
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                            method: "post" /* 指明请求方式，可以是 get 或 post */,
                            url: "/staff/logout" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                            data: qs.stringify({
                            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                                token:admintoken,
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
        addLuggage(){
          if(!this.LuggageForm.orderid || !this.LuggageForm.state || !this.LuggageForm.location)
          {
              ElMessage({
                        type: 'error',
                        message: "请完成输入",
                        duration: 2000,
                    })
          }
          else
          {
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/addluggage" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            orderid: this.LuggageForm.orderid,
                            state: this.LuggageForm.state,
                            location: this.LuggageForm.location,
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
        },

        changeLuggage(){
            if(!(!this.LuggageForm.luggageid || !this.LuggageForm.state || !this.LuggageForm.state))
            {
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/updateluggage" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            luggageid: this.LuggageForm.luggageid,
                            state: this.LuggageForm.state,
                            location: this.LuggageForm.location,
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
        },

        deleteLuggage(){
            if(this.LuggageForm.luggageid)
            {
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/removeluggage" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            luggageid: this.LuggageForm.luggageid,
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