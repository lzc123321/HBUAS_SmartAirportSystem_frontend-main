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
                <el-tab-pane label="查看已有订单" name="first">
                    <el-table :data="orderList" stripe style="width: 100%">
                        <el-table-column prop="shopname" label="商店名称" width="120"/>
                        <el-table-column prop="commodityname" label="商品名称" width="120" />
                        <el-table-column prop="counts" label="商品数量" width="120"/>
                        <el-table-column prop="departuregate" label="登机口" width="120"/>
                        <el-table-column prop="terminal" label="航站楼" width="120"/>
                        <el-table-column prop="arrivetime" label="预定到达时间" width="120"/>
                        <el-table-column prop="price" label="订单价格" width="120"/>
                        <el-table-column prop="touristemail" label="用户联系方式" width="120"/>
                    </el-table>
                    <div class="button">
                        <el-button @click="checkOrders" class="submit_btn" type="primary">查询商户订单</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>  
      </el-container>
    </div>
  </template>
  
  <script>
  import qs from 'qs';
  //import companyChange from '@/components/companyChange.vue';
  //import { useStore } from 'vuex';
  export default{
  //
    data() {
  
        return {
            orderList:[{
                orderid: "",
                commodityid: "",
                counts: "",
                terminal: "",
                departuregate: "",
                arrivetime: ""
            }],
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
        checkOrders(){
            const merchanttoken = window.localStorage.getItem("merchanttoken");
            this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/merchant/listcommodityorder" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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
                        this.orderList = res.data.message;
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