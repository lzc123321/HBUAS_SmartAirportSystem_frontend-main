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
                  <el-menu-item index="/admin/applymanage" v-if="positionpost== 0 || positionpost==2 ">申请管理</el-menu-item>
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
                <el-tab-pane label="添加报修申请" name="first" >
                    <div class="goods"  @keyup.enter="keyPressed">
                            <h4>添加报修申请</h4>
                            <el-form :model="recordForm" label-width="100px" status-icon="true">

                                <el-form-item label="设备名称" class="login_input_box" prop="devicename">
                                    <el-input v-model="recordForm.devicename" placeholder="请输入设备名称"></el-input>
                                </el-form-item>

                                <el-form-item label="设备信息" class="login_input_box" prop="deviceinfo">
                                    <el-input v-model="recordForm.deviceinfo" placeholder="请输入设备信息"></el-input>
                                </el-form-item>

                                <el-form-item label="设备位置" class="login_input_box" prop="location">
                                    <el-input v-model="recordForm.location" placeholder="请输入设备位置"></el-input>
                                </el-form-item>

                                <div class="button">
                                    <el-button @click="addRecord" class="button" type="primary">添加报修申请</el-button>
                                </div>
                            </el-form>
                        </div>
                </el-tab-pane>
                <el-tab-pane label="查看报修申请" name="second">
                    <el-table :data="recordList" stripe style="width: 100%">
                            <el-table-column prop="recordid" label="报修申请ID" width="120" />
                            <el-table-column prop="devicename" label="设备名称" width="120"/>
                            <el-table-column prop="deviceinfo" label="设备情况" width="120"/> 
                            <el-table-column prop="location" label="设备位置" width="120"/>
                            <el-table-column prop="approved" label="处理意见" width="120">
                                <template v-slot:default="scope">
                                    <!-- 判断 approved 的值 -->
                                    <span v-if="scope.approved == 0">同意</span>
                                    <!-- 其他内容保持不变 -->
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="Opeations" width="120">
                                <template #default="scope">
                                    <el-button link type="primary" style="margin-left: 16px" size="small" @click="openRecordDiager(scope.row)" v-if="positionpost== 0">审核报修申请</el-button>
                                    <el-button link type="primary" style="margin-left: 16px" size="small" @click="deleteRecord(scope.row)">删除报修申请</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                    <div class="button">
                        <el-button @click="checkRecord" class="button" type="primary">查看报修请求</el-button>
                    </div>
                    <el-drawer
                        v-model="drawer"
                        title="审核报修申请"
                        :direction="direction"
                        >
                        <el-form :model="recordForm" label-width="100px" status-icon="true">
                            <el-form-item label="审核意见" class="login_input_box" prop="deviceinfo">
                                <el-select v-model="recordForm.approved" class="m-2" placeholder="Select">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
                                </el-select>
                            </el-form-item>
                            <div class="button">
                                <el-button @click="solveRecord" class="button" type="primary">审核报修申请</el-button>
                            </div>
                        </el-form>
                    </el-drawer>    
                </el-tab-pane>
                <!-- <el-tab-pane label="查看入驻申请" name="fourth">
                    <el-table :data="requestList" stripe style="width: 100%">
                            <el-table-column prop="requestid" label="入驻申请ID" width="120" />
                            <el-table-column prop="realname" label="商户真实姓名" width="120"/>
                            <el-table-column prop="idnumber" label="商户身份证号" width="120"/>
                            <el-table-column prop="shopname" label="商店名称" width="120"/>
                            <el-table-column prop="email" label="商户邮箱" width="120"/>
                            <el-table-column fixed="right" label="Opeations" width="120">
                                <template #default="scope">
                                    <el-button link type="primary" style="margin-left: 16px" size="small" @click="openRequestDiager(scope.row)" v-if="positionpost== 0">审核入驻申请</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                    <div class="button">
                        <el-button @click="checkRequest" class="button" type="primary">查看入驻请求</el-button>
                    </div>
                    <el-drawer
                        v-model="drawer2"
                        title="审核入驻申请"
                        :direction="direction"
                        >
                        <el-form :model="requestForm" label-width="100px" status-icon="true">

                            <el-form-item label="审核意见" class="login_input_box" prop="deviceinfo">
                                <el-select v-model="requestForm.approved" class="m-2" placeholder="Select">
                                    <el-option v-for="item in newoptions" :key="item.value" :label="item.label" :value="item.value"/>
                                </el-select>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="solveRequest" class="button" type="primary">审核入驻申请</el-button>
                            </div>
                        </el-form>
                    </el-drawer>  
                </el-tab-pane> -->
                <el-tab-pane label="查看财务报表" name="seventh">
                    <el-row>
                        <el-col :span="6">
                            <el-statistic title="机票售卖总收入" :value="this.ticket" />
                        </el-col>
                        <!-- <el-col :span="6">
                            <el-statistic title="商品售卖总收入" :value="this.commodity" />
                        </el-col>
                        <el-col :span="6">
                            <el-statistic title="停车订单总收入" :value="this.parking" />
                        </el-col> -->
                        <div class="button">
                                <el-button @click="checkMoney" class="button" type="primary">查看财务报表</el-button>
                            </div>
                    </el-row>
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
  const position = window.localStorage.getItem("positionpost");
  //import companyChange from '@/components/companyChange.vue';
  //import { useStore } from 'vuex';
  export default{
  //
    data() {
    
        return {
            ticket: '',
            parking: '',
            commodity: '',
            direction: direction,
            drawer: false,
            drawer2: false,
            positionpost: position,

            options:[
                {
                    value: 0,
                    label:  "ACCESS",
                },
                {
                    value: 1,
                    label: "DENY",
                },
                {
                    value: 2,
                    label: "UNSOLVED",
                },
            ],

            newoptions:[
                {
                    value: 1,
                    label:  "ACCESS",
                },
                {
                    value: 0,
                    label: "DENY",
                },
            ],

            recordList:[{
                recordid: "",
                location: "",
                devicename: "",
                deviceinfo: "",
                devicepicture: "",
                approved: "",
            }],
            recordForm:{
                recordid: "",
                location: "",
                devicename: "",
                deviceinfo: "",
                devicepicture: "",
            },

            requestList:[{
                requestid:"",
                realname: "",
                idnumber: "",
                shopname: "",
                email: "",
                passwords: "",
            }],

            requestForm:{
                requestid: "",
                approved: "",
            },

        }
    },
    methods:{
        checkMoney(){
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                            method: "post" /* 指明请求方式，可以是 get 或 post */,
                            url: "/staff/reportforms" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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
                                this.ticket = res.data.ticket;
                                this.commodity = res.data.commodity;
                                this.parking = res.data.parking;
                            }
                        });
        },
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
        openRecordDiager(row){
            if(!row.recordid)
            {
                ElMessage({
                        type: 'error',
                        message: "报修申请信息不存在",
                        duration: 2000,
                    })
            }
            else
            {
                this.drawer = true;
                window.localStorage.setItem("recordid", row.recordid);
            }
        },

        openRequestDiager(row){
            if(!row.requestid)
            {
                ElMessage({
                        type: 'error',
                        message: "入驻申请信息不存在",
                        duration: 2000,
                    })
            }
            else
            {
                this.drawer2 = true;
                window.localStorage.setItem("requestid", row.requestid);
            }
        },

        checkRecord(){
                const admintoken = window.localStorage.getItem("admintoken");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/staff/listrepairrecord" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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
                        this.recordList = res.data.message;
                    }
                });
        },
            

        checkRequest(){
            const admintoken = window.localStorage.getItem("admintoken");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/staff/listmerchantrequest" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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
                    // this.requestList = res.data.message;
                    for(let i=0;i<res.data.message.length;i++){

                        if(res.data.message[i].approved == 0){
                            res.data.message[i].approved = "ACCESS";
                        }
                    }
                    this.requestList = res.data.message;
                }
            });
        },
            

        solveRecord(){
                    const admintoken = window.localStorage.getItem("admintoken");
                    const recordid = window.localStorage.getItem("recordid");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/examinerepairrecord" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            recordid: recordid,
                            approved: this.recordForm.approved,
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
            
        },

        solveRequest(){
                    const admintoken = window.localStorage.getItem("admintoken");
                    const requestid = window.localStorage.getItem("requestid")
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/examinemerchantrequest" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            requestid: requestid,
                            approved: this.requestForm.approved,
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
            },

        deleteRecord(row){
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/removerepairrecord" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            recordid: row.recordid,
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
            
        },

        addRecord(){
            if(!(!this.recordForm.deviceinfo || !this.recordForm.devicename || !this.recordForm.location))
            {
                    const admintoken = window.localStorage.getItem("admintoken");
                    this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/staff/addrepairrecord" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:admintoken,
                            devicename: this.recordForm.devicename,
                            deviceinfo: this.recordForm.deviceinfo,
                            location: this.recordForm.location,
                            devicepicture: "",
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

  .el-col {
  text-align: center;
}
  </style>