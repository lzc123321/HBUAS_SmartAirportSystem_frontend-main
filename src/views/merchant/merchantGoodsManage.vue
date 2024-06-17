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
                <el-tab-pane label="查看商品信息" name="first">
                    <el-table :data="goodsList" stripe style="width: 100%">
                        <el-table-column prop="commodityid" label="商品ID" width="120" />
                        <el-table-column prop="name" label="商品名称" width="120" />
                        <el-table-column prop="price" label="价格" width="120"/>
                        <el-table-column prop="counts" label="库存数量" width="120"/>
                        <el-table-column fixed="right" label="Opeations" width="120">
                            <template #default="scope">
                                <el-button link type="primary" style="margin-left: 16px" size="small" @click="openGoodsDiager(scope.row)">修改商品信息</el-button>
                                <el-button link type="primary" style="margin-left: 16px" size="small" @click="deleteGoods(scope.row)">删除商品信息</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="button">
                        <el-button @click="checkGoods" class="submit_btn" type="primary">查询商户商品</el-button>
                    </div>

                    <el-drawer
                        v-model="drawer"
                        title="修改商品信息"
                        :direction="direction"
                    >
                        <el-form :model="goodsForm" :rules="goodsrules" label-width="100px" status-icon="true">

                            <el-form-item label="商品名称" class="login_input_box" prop="name">
                                <el-input v-model="goodsForm.name" placeholder="请输入商品名称"></el-input>
                            </el-form-item>

                            <el-form-item label="库存数量" class="login_input_box" prop="count">
                                <el-input v-model="goodsForm.count" placeholder="请输入库存数量"></el-input>
                            </el-form-item>

                            <el-form-item label="价格" class="login_input_box" prop="price">
                                <el-input v-model="goodsForm.price" placeholder="请输入商品价格"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="changeGoods" class="button" type="primary">修改商品信息</el-button>
                            </div>
                        </el-form>
                    </el-drawer>
                </el-tab-pane>
                <el-tab-pane label="添加商品信息" name="second">
                    <div class="Goods"  @keyup.enter="keyPressed">
                        <h4>添加商品信息</h4>
                        <el-form :model="goodsForm" :rules="goodsrules" label-width="100px" status-icon="true">

                            <el-form-item label="商品名称" class="login_input_box" prop="name">
                                <el-input v-model="goodsForm.name" placeholder="请输入商品名称"></el-input>
                            </el-form-item>

                            <el-form-item label="库存数量" class="login_input_box" prop="count">
                                <el-input v-model="goodsForm.count" placeholder="请输入库存数量"></el-input>
                            </el-form-item>

                            <el-form-item label="价格" class="login_input_box" prop="price">
                                <el-input v-model="goodsForm.price" placeholder="请输入商品价格"></el-input>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="addGoods" class="button" type="primary">添加商品信息</el-button>
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
  import { ref } from 'vue';
  const direction = ref("btt");
  export default{
  //
    data() {
  
        return {
            direction: direction,
            drawer: false,
            goodsList:[{
                commodityid: "",
                merchantid: "",
                name: "",
                counts: "",
                price: ""
            }],

            goodsForm:{
                commodityid: "",
                merchantid: "",
                name: "",
                count: "",
                price: ""
            },

            goodsrules:{
                commodityid:[
                    { required: true, message: '商品ID不能为空', trigger: 'blur' },
                ],

                name:[
                    { required: true, message: '商品名称不能为空', trigger: 'blur' },
                ],

                count:[
                    { required: true, message: '商品库存数量不能为空', trigger: 'blur' },
                ],

                price:[
                    { required: true, message: '商品价格不能为空', trigger: 'blur' },
                ],
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
        checkGoods(){
            const merchanttoken = window.localStorage.getItem("merchanttoken");
            this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/merchant/listcommodity" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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
                        this.goodsList = res.data.message;
                    }
                });
        },

        openGoodsDiager(row){
            if(!row.commodityid)
            {
                ElMessage({
                        type: 'error',
                        message: "商品信息不存在",
                        duration: 2000,
                    })
            }
            else
            {
                this.drawer = true;
                window.localStorage.setItem("commodityid", row.commodityid);
            }
        },

        addGoods(){
                if(!(!this.goodsForm.name || !this.goodsForm.count || !this.goodsForm.price))
                {
                    const merchanttoken = window.localStorage.getItem("merchanttoken");
                    this.$http({
                            method: "post" /* 指明请求方式，可以是 get 或 post */,
                            url: "/merchant/addcommodity" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                            data: qs.stringify({
                            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                                token:merchanttoken,
                                name: this.goodsForm.name,
                                counts: this.goodsForm.count,
                                price: this.goodsForm.price
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
        },
        
        changeGoods(){
                if(!(!this.goodsForm.name || !this.goodsForm.count || !this.goodsForm.price))
                {
                    const merchanttoken = window.localStorage.getItem("merchanttoken");
                    const commodityid = window.localStorage.getItem("commodityid")
                    this.$http({
                            method: "post" /* 指明请求方式，可以是 get 或 post */,
                            url: "/merchant/updatecommodity" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                            data: qs.stringify({
                            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                                token:merchanttoken,
                                commodityid: commodityid,
                                name: this.goodsForm.name,
                                counts: this.goodsForm.count,
                                price: this.goodsForm.price
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
        },

        deleteGoods(row){
                const merchanttoken = window.localStorage.getItem("merchanttoken");
                this.$http({
                        method: "post" /* 指明请求方式，可以是 get 或 post */,
                        url: "/merchant/removecommodity" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                        data: qs.stringify({
                        /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                            token:merchanttoken,
                            commodityid: row.commodityid,
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
  
  
 .Goods{
    position: relative;
    top: 0px;
    margin-left: 100px;
    width: 100%;
    height: 100%;
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