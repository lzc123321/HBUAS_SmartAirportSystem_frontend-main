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
                <el-tab-pane label="列出商户" name="first">
                    <el-table :data="MechantList" stripe style="width: 100%">
                            <el-table-column prop="merchantid" label="商户ID" width="120" />
                            <el-table-column prop="shopname" label="商店名称" width="120"/>
                            <el-table-column prop="email" label="联系方式" width="120"/>
                            <el-table-column fixed="right" label="Opeations" width="120">
                                <template #default="scope">
                                    <el-button link type="primary" style="margin-left: 16px" size="small" @click="openDiager(scope.row)">列出商户商品</el-button>
                                </template>
                        </el-table-column>
                    </el-table>
                    <div class="button">
                        <el-button @click="checkMerchant" class="submit_btn" type="primary">列出商户</el-button>
                    </div>
                    <el-drawer
                        v-model="drawer"
                        title="商户商品"
                        :direction="direction"
                    >
                        <el-table :data="goodsList" stripe style="width: 100%">
                            <el-table-column prop="merchantid" label="商户ID" width="120" />
                            <el-table-column prop="commodityid" label="商品ID" width="120"/>
                            <el-table-column prop="name" label="商品名称" width="120"/>
                            <el-table-column prop="counts" label="商品库存" width="120"/>
                            <el-table-column prop="price" label="商品价格" width="120"/>
                            <el-table-column fixed="right" label="Opeations" width="120">
                                <template #default="scope">
                                    <el-button link type="primary" style="margin-left: 16px" size="small" @click="openGoodsDiager(scope.row)">购买商户商品</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-drawer
                            v-model="drawer1"
                            title="添加商品订单"
                            :direction="direction"
                        >
                            <el-form :model="goodsForm" :rules="goodsrules" label-width="100px" status-icon="true">

                                <el-form-item label="数量" class="login_input_box" prop="counts">
                                    <el-input v-model="goodsForm.counts" placeholder="请输入购买数量"></el-input>
                                </el-form-item>

                                <el-form-item label="登机口" class="login_input_box" prop="departuregate">
                                    <el-input v-model="goodsForm.departuregate" placeholder="请输入登机口"></el-input>
                                </el-form-item>

                                <el-form-item label="航站楼" class="login_input_box" prop="terminal">
                                    <el-input v-model="goodsForm.terminal" placeholder="请输入航站楼"></el-input>
                                </el-form-item>

                                <el-form-item label="抵达时间" class="login_input_box" prop="arrivetime">
                                    <el-date-picker v-model="goodsForm.arrivetime" value-format="YYYY-MM-DD HH:mm" type="datetime" placeholder="预定抵达时间"/>
                                </el-form-item>

                                <div class="button">
                                    <el-button @click="addPurchase" class="button" type="primary">添加商品订单</el-button>
                                </div>
                            </el-form>  
                        </el-drawer>
                    </el-drawer>                         
                </el-tab-pane>
                <el-tab-pane label="查看已有订单" name="fifth">
                    <el-table :data="orderList" stripe style="width: 100%">
                        <el-table-column prop="shopname" label="商店名称" width="120"/>
                        <el-table-column prop="commodityname" label="商品名称" width="120" />
                        <el-table-column prop="counts" label="商品数量" width="120"/>
                        <el-table-column prop="departuregate" label="登机口" width="120"/>
                        <el-table-column prop="terminal" label="航站楼" width="120"/>
                        <el-table-column prop="arrivetime" label="预定到达时间" width="120"/>
                        <el-table-column prop="price" label="订单价格" width="120"/>
                        <el-table-column prop="merchantemail" label="商户联系方式" width="120"/>
                        <el-table-column fixed="right" label="Opeations" width="120">
                                <template #default="scope">
                                    <el-button link type="primary" style="margin-left: 16px" size="small" @click="deletePurchase(scope.row)">退订订单</el-button>
                                </template>
                            </el-table-column>
                    </el-table>
                    <div class="button">
                        <el-button @click="checkGoodsOrder" class="submit_btn" type="primary">查询已有订单</el-button>
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
  import { ref } from 'vue';
  const direction = ref("btt");
  export default{
  //
    data() {
        return {
            drawer: false,
            drawer1: false,
            drawer2: false,
            direction: direction,
            MechantList:[{
                merchantid: "",
                realname: "",
                password: "",
                salt: "",
                shopname: "",
                idnumber: "",
                merchantemail: "",
            }],

            goodsList:[{
                commodityid: "",
                merchantid: "",
                name: "",
                count: "",
                price: ""
            }],

            orderList:[{
                orderid: "",
                commodityid: "",
                counts: "",
                terminal: "",
                departuregate: "",
                arrivetime: ""
            }],

            goodsForm:{
                orderid: "",
                commodityid: "",
                merchantid: "",
                name: "",
                count: "",
                price: "",
                counts: "",
                terminal: "",
                departuregate: "",
                arrivetime: ""
            },

            goodsrules:{
                commodityid:[
                    { required: true, message: '商品ID不能为空', trigger: 'blur' },
                ],

                counts:[
                    { required: true, message: '商品数量不能为空', trigger: 'blur' },
                ],

                arrivetime:[
                    { required: true, message: '预定到达时间不能为空', trigger: 'blur' },
                ],

                terminal:[
                    { required: true, message: '航站楼不能为空', trigger: 'blur' },
                ],

                departuregate:[
                    { required: true, message: '登机口不能为空', trigger: 'blur' },
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
        openDiager(row){
            if(!row.merchantid)
            {
                ElMessage({
                        type: 'error',
                        message: "商户信息不存在",
                        duration: 2000,
                    });
            }
            else
            {
                this.drawer = true;
                this.checkMerchantCommodity(row);
            }

        },

        checkMerchant(){
            const touristtoken = window.localStorage.getItem("touristtoken");
            this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/listmerchant" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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
                        this.MechantList = res.data.message;
                    }
                });
        },

        checkMerchantCommodity(row){
            if(!row.merchantid)
            {
                ElMessage({
                        type: 'error',
                        message: "商户信息不存在",
                        duration: 2000,
                    });
            }
            else
            {
                const touristtoken = window.localStorage.getItem("touristtoken");
                this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/tourist/listcommodity" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:touristtoken,
                            merchantid: row.merchantid,
                        }),
                    })
                    .then((res) => {
                        /* res 是 response 的缩写 */
                        console.log(res.data);
                        if(!res.data.success){
                            this.$message.error(res.data.message);
                        }
                        else{
                            this.goodsList = res.data.message;
                        }
                    });
            }
        },

        openGoodsDiager(row){
            if(!row.commodityid)
            {
                ElMessage({
                        type: 'error',
                        message: "商品信息不存在",
                        duration: 2000,
                    });
            }
            else
            {
                this.drawer1 = true;
                window.localStorage.setItem("commodityid", row.commodityid);
            }
        },

        addPurchase(){
                if(!(!this.goodsForm.counts || !this.goodsForm.departuregate || !this.goodsForm.terminal))
                {
                    const touristtoken = window.localStorage.getItem("touristtoken");
                    const commodityid = window.localStorage.getItem("commodityid")
                    this.$http({
                            method: "post" /* 指明请求方式，可以是 get 或 post */,
                            url: "/tourist/purchasecommodity" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                            data: qs.stringify({
                            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                                token:touristtoken,
                                commodityid: commodityid,
                                counts: this.goodsForm.counts,
                                departuregate: this.goodsForm.departuregate,
                                terminal: this.goodsForm.terminal,
                                arrivetime: this.goodsForm.arrivetime
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
                    });
                }
        },

        deletePurchase(row){
            if(!row.orderid)
            {
                ElMessage({
                        type: 'error',
                        message: "订单ID不能为空",
                        duration: 2000,
                    });
            }
            else
            {
                const touristtoken = window.localStorage.getItem("touristtoken");
                this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/tourist/returncommodity" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:touristtoken,
                            orderid: row.orderid,
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

        checkGoodsOrder(){
            const touristtoken = window.localStorage.getItem("touristtoken");
            this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/listcommodityorder" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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


.merchant {
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