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
                <!-- <el-sub-menu index="2">
                  <template #title>
                    <el-icon><location /></el-icon>
                    <span>停车位管理</span>
                  </template>
                  <el-menu-item index="/admin/parkingManage">停车位管理</el-menu-item>
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon><document /></el-icon>
                    <span>行李信息管理</span>
                  </template>
                  <el-menu-item index="/admin/luggagemanage">行李管理</el-menu-item>
                </el-sub-menu> -->
                <el-sub-menu index="4">
                  <template #title>
                    <el-icon><Promotion /></el-icon>
                    <span>申请管理</span>
                  </template>
                  <el-menu-item index="/admin/applymanage" v-if="positionpost== 0 || positionpost== 2">申请管理</el-menu-item>
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
                <el-tab-pane label="添加停车位" name="first">
                    <div class="Goods"  @keyup.enter="keyPressed">
                        <h4>添加停车位</h4>
                        <el-form :model="parkingForm" :rules="parkingRules" label-width="100px" status-icon="true">

                            <el-form-item label="停车位位置" class="login_input_box" prop="location">
                                <el-input v-model="parkingForm.location" placeholder="请输入停车位位置"></el-input>
                            </el-form-item>

                            <el-form-item label="停车位价格" class="login_input_box" prop="price">
                                <el-input v-model="parkingForm.price" placeholder="请输入停车位价格"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="addParkingspace" class="button" type="primary">添加停车位信息</el-button>
                            </div>
                        </el-form>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="查看停车位信息" name="second">
                    <el-table :data="parkingList" stripe style="width: 100%">
                            <el-table-column prop="parkingspaceid" label="停车位ID" width="120" />
                            <el-table-column prop="location" label="停车位位置" width="120"/>
                            <el-table-column prop="price" label="停车位价格" width="120"/>
                            <el-table-column fixed="right" label="Opeations" width="120">
                                <template #default="scope">
                                    <el-button link type="primary" style="margin-left: 16px" size="small" @click="openDiager(scope.row)">修改停车位</el-button>
                                    <el-button link type="primary" style="margin-left: 16px" size="small" @click="deleteParkingspace(scope.row)">删除停车位</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                    <div class="button">
                        <el-button @click="checkParkingspace" class="button" type="primary">查看停车位信息</el-button>
                    </div>
                    <el-drawer
                        v-model="drawer"
                        title="修改停车位"
                        :direction="direction"
                        >
                        <el-form :model="parkingForm" :rules="parkingRules" label-width="100px" status-icon="true">

                            <el-form-item label="停车位位置" class="login_input_box" prop="location">
                                <el-input v-model="parkingForm.location" placeholder="请输入停车位位置"></el-input>
                            </el-form-item>

                            <el-form-item label="停车位价格" class="login_input_box" prop="price">
                                <el-input v-model="parkingForm.price" placeholder="请输入停车位价格"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="changeParkingspace" class="button" type="primary">修改停车位信息</el-button>
                            </div>
                        </el-form>
                    </el-drawer>    
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
  import { ref } from 'vue';

  const direction = ref("btt");
  //import companyChange from '@/components/companyChange.vue';
  //import { useStore } from 'vuex';
  const position = window.localStorage.getItem("positionpost");
  export default{
  //
    data() {
        
        
        return {
            drawer: false,
            direction: direction,
            positionpost: position,

            parkingList:[{
                parkingspaceid:"",
                location:"",
                price:"",
            }],

            parkingForm: {
                parkingspaceid: "",
                location: "",
                price: "",
            },

            parkingRules: {
                price: [
                    { required: true, message: "请输入停车位价格", trigger: "blur" }
                ],
                parkingspaceid: [
                    { required: true, message: "请输入停车位id", trigger: "blur" }
                ],
                location: [
                    { required: true, message: "请输入停车位位置", trigger: "blur" }
                ],
            },
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
        openDiager(row){
            if(!row.parkingspaceid)
            {
                ElMessage({
                        type: 'error',
                        message: "停车位信息不存在",
                        duration: 2000,
                    })
            }
            else
            {
                this.drawer = true;
                window.localStorage.setItem("parkingspaceid", row.parkingspaceid);
            }
        },

        checkParkingspace(){
                const admintoken = window.localStorage.getItem("admintoken");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/staff/listparkingspce" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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
                            this.parkingList = res.data.message;
                        }
                    });
        },

        addParkingspace(){
            if(!(!this.parkingForm.location || !this.parkingForm.price))
            {
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/addparkingspce" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            location: this.parkingForm.location,
                            price: this.parkingForm.price,
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

        changeParkingspace(){
            if(!(!this.parkingForm.location || !this.parkingForm.price))
            {
                    const admintoken = window.localStorage.getItem("admintoken");
                    const parkingspaceid = window.localStorage.getItem("parkingspaceid");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/updateparkingspce" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            parkingspaceid: parkingspaceid,
                            location: this.parkingForm.location,
                            price: this.parkingForm.price,
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

        deleteParkingspace(row){
            if(this.parkingForm.parkingspaceid)
            {
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/removeparkingspce" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            parkingspaceid: row.parkingspaceid,
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