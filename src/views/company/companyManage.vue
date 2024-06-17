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
            <el-table :data="FlightList" stripe style="width: fit-content" class="companymanage">
                <el-table-column prop="name" label="航班名称" width="120" />
                <el-table-column prop="companyid" label="公司ID" width="120"/>
                <el-table-column prop="takeofflocation" label="起飞位置" width="120"/>
                <el-table-column prop="departuretime" label="起飞时间" width="200"/>
                <el-table-column prop="landinglocation" label="降落位置" width="120"/>
                <el-table-column prop="landingtime" label="降落时间" width="200"/>
                <el-table-column prop="departuregate" label="登机口" width="120"/>
                <el-table-column prop="terminal" label="航站楼" width="120"/>
                <el-table-column fixed="right" label="Opeations" width="120">
                    <template #default="scope">
                        <el-button link type="primary" style="margin-left: 16px" size="small" @click="openFlightDiager(scope.row)">修改航班信息</el-button>
                        <el-button link type="primary" style="margin-left: 16px" size="small" @click="deleteFlight(scope.row)">删除航班信息</el-button>
                        <el-button link type="primary" style="margin-left: 16px" size="small" @click="openTicketDiager(scope.row)">查看机票信息</el-button>
                        <el-button link type="primary" style="margin-left: 16px" size="small" @click="openTicketDiager_2(scope.row)">添加机票信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="managebutton">
              <el-button @click="getFlightList" class="submit_btn" type="primary">查询航班</el-button>
              <el-button @click="drawer1=true" class="submit_btn" type="primary">添加航班</el-button>
            </div>
            <el-drawer
                v-model="drawer"
                title="修改航班信息"
                :direction="direction"
                >
                <el-form :model="Flightform" label-width="70px">
                    <el-form-item label="航班名称" class="login_input_box" prop="Name">
                    <el-input v-model="Flightform.Name" placeholder="请输入航班名称"></el-input>
                    </el-form-item>

                    <el-form-item label="起飞地点" class="login_input_box" prop="takeofflocation">
                    <!--el-input v-model="Flightform.takeofflocation" placeholder="请输入起飞地点"></el-input-->
                        <el-cascader placeholder="起飞地" size="large" :options="options" v-model="selectedOptions"
                                    @change="handleChange">
                                </el-cascader>
                    </el-form-item>

                    <el-form-item label="降落地点" class="login_input_box" prop="landinglocation">
                    <!--el-input v-model="Flightform.landinglocation" placeholder="请输入降落地点"></el-input-->
                        <el-cascader placeholder="目的地" size="large" :options="options" v-model="selectedOptions2"
                                    @change="handleChange2">
                                </el-cascader>
                    </el-form-item>

                    <el-form-item label="起飞时间" class="login_input_box" prop="departuretime">
                    <el-date-picker v-model="Flightform.departuretime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="Select date and time"
                        :shortcuts="shortcuts" />
                    </el-form-item>

                    <el-form-item label="降落时间" class="login_input_box" prop="landingtime">
                    <el-date-picker v-model="Flightform.landingtime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="Select date and time"
                        :shortcuts="shortcuts" />
                    </el-form-item>

                    <el-form-item label="登机口" class="login_input_box" prop="landingtime">
                    <el-input v-model="Flightform.departuregate" placeholder="请输入登机口"></el-input>
                    </el-form-item>

                    <el-form-item label="航站楼" class="login_input_box" prop="departuretime">
                    <el-input v-model="Flightform.terminal" placeholder="请输入航站楼"></el-input>
                    </el-form-item>

                    <div class="button">
                        <el-button @click="changeFlight" class="submit_btn" type="primary">修改航班信息</el-button>
                    </div>
                </el-form>
            </el-drawer>
            <el-drawer
                v-model="drawer1"
                title="添加航班信息"
                style="height: fit-content;"
                :direction="direction"
                >
                <el-form :model="Flightform" label-width="70px">
                    <el-form-item label="航班名称" class="login_input_box" prop="Name">
                    <el-input v-model="Flightform.Name" placeholder="请输入航班名称"></el-input>
                    </el-form-item>

                    <el-form-item label="起飞地点" class="login_input_box" prop="takeofflocation">
                    <!--el-input v-model="Flightform.takeofflocation" placeholder="请输入起飞地点"></el-input-->
                        <el-cascader placeholder="起飞地" size="large" :options="options" v-model="selectedOptions"
                                    @change="handleChange">
                                </el-cascader>
                    </el-form-item>

                    <el-form-item label="降落地点" class="login_input_box" prop="landinglocation">
                    <!--el-input v-model="Flightform.landinglocation" placeholder="请输入降落地点"></el-input-->
                        <el-cascader placeholder="目的地" size="large" :options="options" v-model="selectedOptions2"
                                    @change="handleChange2">
                                </el-cascader>
                    </el-form-item>

                    <el-form-item label="起飞时间" class="login_input_box" prop="departuretime">
                    <el-date-picker v-model="Flightform.departuretime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="Select date and time"
                        :shortcuts="shortcuts" />
                    </el-form-item>

                    <el-form-item label="降落时间" class="login_input_box" prop="landingtime">
                    <el-date-picker v-model="Flightform.landingtime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="Select date and time"
                        :shortcuts="shortcuts" />
                    </el-form-item>

                    <el-form-item label="登机口" class="login_input_box" prop="landingtime">
                    <el-input v-model="Flightform.departuregate" placeholder="请输入登机口"></el-input>
                    </el-form-item>

                    <el-form-item label="航站楼" class="login_input_box" prop="departuretime">
                    <el-input v-model="Flightform.terminal" placeholder="请输入航站楼"></el-input>
                    </el-form-item>

                    <div class="button">
                        <el-button @click="addFlight" class="submit_btn" type="primary">添加航班信息</el-button>
                    </div>
                </el-form>
            </el-drawer>
            <el-drawer
                v-model="drawer2"
                title="查看机票信息"
                style="height: fit-content;"
                :direction="direction"
                >
                <el-table :data="TicketList" stripe style="width: 100%">
                    <el-table-column prop="tickettype" label="机票类型" width="120" />
                    <el-table-column prop="price" label="机票价格" width="120" />
                    <el-table-column prop="amount" label="机票数量" width="120"/>
                    <el-table-column fixed="right" label="Opeations" width="120">
                        <template #default="scope">
                            <el-button link type="primary" style="margin-left: 16px" size="small" @click="openTicketDiager_3(scope.row)">修改机票信息</el-button>
                            <el-button link type="primary" style="margin-left: 16px" size="small" @click="deleteTicket(scope.row)">删除机票信息</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-drawer
                    v-model="drawer3"
                    title="修改机票信息"
                    :direction="direction"
                    >
                    <el-form :model="Ticketform" label-width="70px">

                        <el-form-item label="机票类型" class="login_input_box" prop="tickettype">
                            <el-input v-model="Ticketform.tickettype" placeholder="请输入机票类型"></el-input>
                        </el-form-item>

                        <el-form-item label="机票价格" class="login_input_box" prop="price">
                            <el-input v-model="Ticketform.price" placeholder="请输入机票价格"></el-input>
                        </el-form-item>

                        <el-form-item label="机票数量" class="login_input_box" prop="amount">
                            <el-input v-model="Ticketform.amount" placeholder="请输入机票数量"></el-input>
                        </el-form-item>

                        <div class="button">
                            <el-button @click="changeTicket" class="submit_btn" type="primary">修改机票信息</el-button>
                        </div>
                    </el-form>
                </el-drawer>    
            </el-drawer>
            <el-drawer
                v-model="drawer4"
                title="添加机票信息"
                :direction="direction"
                >
                <el-form :model="Ticketform" label-width="70px">

                    <el-form-item label="机票类型" class="login_input_box" prop="tickettype">
                        <el-input v-model="Ticketform.tickettype" placeholder="请输入机票类型"></el-input>
                    </el-form-item>

                    <el-form-item label="机票价格" class="login_input_box" prop="price">
                        <el-input v-model="Ticketform.price" placeholder="请输入机票价格"></el-input>
                    </el-form-item>

                    <el-form-item label="机票数量" class="login_input_box" prop="amount">
                        <el-input v-model="Ticketform.amount" placeholder="请输入机票数量"></el-input>
                    </el-form-item>

                    <div class="button">
                        <el-button @click="addTicket" class="submit_btn" type="primary">添加机票信息</el-button>
                    </div>
                </el-form>
            </el-drawer> 
          </el-main>
        </el-container>  
      </el-container>
    </div>
  </template>

<script>
import { provinceAndCityData } from 'element-china-area-data';
import { codeToText } from 'element-china-area-data';
import { ElMessage } from 'element-plus';
import qs from 'qs'
import { ref } from 'vue';
const direction = ref("btt");
var dest = "";
var from = "";
//import companyChange from '@/components/companyChange.vue';
//import { useStore } from 'vuex';
export default{
  //
    data() {
        var validateName = (rule, value, callback) => {
            const regName = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
            if (regName.test(value)) {
                callback();
            }
            callback(new Error('请输入合法航班编号'));
            };
        
        return {
            direction: direction,
            drawer: false,
            drawer1: false,
            drawer2: false,
            drawer3: false,
            drawer4: false,
            selectedOptions: ['11', '110101'],
            selectedOptions2: ['11', '110101'],
            FlightList:[
            {
                flightid: "",
                Name: "",
                CompantyId: "",
                takeofflocation: "",
                departuretime: "",
                landinglocation: "",
                landingtime: "",
                departuregate: "",
                terminal: "",
            }
        ],

        TicketList:[
            {
                ticketid: "",
                tickettype: "",
                price: "",
                amount: "",
            }
        ],
        Ticketform:{
                ticketid: "",
                tickettype: "",
                price: "",
                amount: "",
            }, 

            options: provinceAndCityData,
            Flightform: {
                FlightID: "",
                Name: "",
                CompantyId: "",
                takeofflocation: "",
                departuretime: "",
                landinglocation: "",
                landingtime: "",
                departuregate: "",
                terminal: "",
            },
            rules: {
                Name: [
                { required: true, message: '用户名称不能为空', trigger: 'blur' },
                { validator: validateName, trigger: 'blur' }
                ],
            }


        }
    },

    methods:{
        handleChange(value) {
            console.log(value)
            from = codeToText[this.selectedOptions[0]] ;
            console.log("from=" + from)//打印区域码所对应的属性值即中文地址
            this.Flightform.takeofflocation = from;
        },

        handleChange2() {
            dest = codeToText[this.selectedOptions2[0]];
            console.log("dest=" + dest)//打印区域码所对应的属性值即中文地址
            this.Flightform.landinglocation = dest;
        }, 
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

      getFlightList(){
            const companytoken = window.localStorage.getItem("companytoken");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/company/listflight" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token:companytoken
                }),
            })
            .then((res) => {
                /* res 是 response 的缩写 */
                console.log(res.data);
                if(!res.data.success){
                    this.$message.error(res.data.message);
                }
                else{
                    this.FlightList = res.data.message;
                }
            });
      },

      addFlight(){
        if(!this.Flightform.terminal || !this.Flightform.departuregate|| !this.Flightform.Name)
          {
            if(!this.Flightform.Name)
            {
              ElMessage({
                    type: 'error',
                    message: "航班编号不符合标准！",
                    duration: 2000,
                })
            }
            else{
              ElMessage({
                    type: 'error',
                    message: "登机口或航站楼不能为空！",
                    duration: 2000,
                })
            }
          }
          else
          {
            const companytoken = window.localStorage.getItem("companytoken");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/company/addflight" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                  /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token: companytoken,
                    name: this.Flightform.Name,
                    takeofflocation: this.Flightform.takeofflocation,
                    landinglocation: this.Flightform.landinglocation,
                    departuretime: this.Flightform.departuretime,
                    landingtime: this.Flightform.landingtime,
                    departuregate: this.Flightform.departuregate,
                    terminal: this.Flightform.terminal,
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
                        //添加成功后跳转到about页面
                        setTimeout(() => {this.$router.push("/company")}, 1000);
                    }
                });
            }
      },

      openFlightDiager(row){
        if(!row.flightid)
        {
            ElMessage({
                    type: 'error',
                    message: "航班信息不存在！",
                    duration: 2000,
                })
        }
        else
        {
            this.drawer = true;
            window.localStorage.setItem("flightid", row.flightid)
        }
      },

      changeFlight(){
        if (!this.Flightform.terminal || !this.Flightform.departuregate || !this.Flightform.Name) {
            if (!this.Flightform.Name) {
            ElMessage({
                type: 'error',
                message: "航班编号不符合标准！",
                duration: 2000,
            })
            }
            else {
            ElMessage({
                type: 'error',
                message: "登机口或航站楼不能为空！",
                duration: 2000,
            })
            }
      }
      else {
        const companytoken = window.localStorage.getItem("companytoken");
        const flightid = window.localStorage.getItem("flightid");
        this.$http({
          method: "post" /* 指明请求方式，可以是 get 或 post */,
          url: "/company/updateflight" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          data: qs.stringify({
            /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
            token: companytoken,
            flightid: flightid,
            name: this.Flightform.Name,
            takeofflocation: this.Flightform.takeofflocation,
            landinglocation: this.Flightform.landinglocation,
            departuretime: this.Flightform.departuretime,
            landingtime: this.Flightform.landingtime,
            departuregate: this.Flightform.departuregate,
            terminal: this.Flightform.terminal,
          })
        })
            .then((res) => {
              /* res 是 response 的缩写 */
              console.log(res.data);
              if (!res.data.success) {
                this.$message.error(res.data.message);
              }
              else {
                this.$message.success(res.data.message);
              }
            })
        }
      },

      openTicketDiager(row){
        if(!row.flightid)
        {
            ElMessage({
                    type: 'error',
                    message: "航班信息不存在！",
                    duration: 2000,
                })
        }
        else
        {
            this.drawer2 = true;
            window.localStorage.setItem("flightid", row.flightid);
            this.checkticket();
        }
      },

      checkticket(){
            const companytoken = window.localStorage.getItem("companytoken");
            const flightid = window.localStorage.getItem("flightid");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/company/listticket" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token:companytoken,
                    flightid: flightid,
                }),
            })
            .then((res) => {
                /* res 是 response 的缩写 */
                console.log(res.data);
                if(!res.data.success){
                    this.$message.error(res.data.message);
                }
                else{
                    this.TicketList = res.data.message;
                }
            });
      },

      openTicketDiager_2(row){
        if(!row.flightid)
        {
            ElMessage({
                    type: 'error',
                    message: "航班信息不存在！",
                    duration: 2000,
                })
        }
        else
        {
            this.drawer4 = true;
            window.localStorage.setItem("flightid", row.flightid);
        }
      },

      addTicket(){
        if(!this.Ticketform.tickettype || !this.Ticketform.price || !this.Ticketform.amount)
        {
            if(!this.Ticketform.tickettype)
            {
                ElMessage({
                    type: 'error',
                    message: "请输入机票类型",
                    duration: 2000,
                })
            }
            else if(!this.Ticketform.price)
            {
                ElMessage({
                    type: 'error',
                    message: "请输入机票价格",
                    duration: 2000,
                })
            }
            else
            {
                ElMessage({
                    type: 'error',
                    message: "请输入机票数量",
                    duration: 2000,
                })
            }
        }
        else
        {
            const companytoken = window.localStorage.getItem("companytoken");
            const flightid = window.localStorage.getItem("flightid");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/company/addticket" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                  /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token: companytoken,
                    flightid: flightid,
                    tickettype: this.Ticketform.tickettype,
                    price: this.Ticketform.price,
                    amount:this.Ticketform.amount,
                })
              })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if(!res.data.success){
                        this.$message.error(res.data.message);
                    }
                    else{
                        this.$message.success(res.data.message);
                        //添加成功后跳转到about页面
                    }
                })
        }
      },

      openTicketDiager_3(row){
        if(!row.ticketid)
        {
            ElMessage({
                    type: 'error',
                    message: "机票信息不存在！",
                    duration: 2000,
                })
        }
        else
        {
            this.drawer3 = true;
            window.localStorage.setItem("ticketid", row.ticketid);
        }
      },

      changeTicket(){
        if(!this.Ticketform.tickettype || !this.Ticketform.price || !this.Ticketform.amount)
        {
            if(!this.Ticketform.tickettype)
            {
                ElMessage({
                    type: 'error',
                    message: "请输入机票类型",
                    duration: 2000,
                })
            }
            else if(!this.Ticketform.price)
            {
                ElMessage({
                    type: 'error',
                    message: "请输入机票价格",
                    duration: 2000,
                })
            }
            else
            {
                ElMessage({
                    type: 'error',
                    message: "请输入机票数量",
                    duration: 2000,
                })
            }
        }
        else
        {
            const companytoken = window.localStorage.getItem("companytoken");
            const ticketid = window.localStorage.getItem("ticketid")
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/company/updateticket" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                  /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token: companytoken,
                    ticketid: ticketid,
                    tickettype: this.Ticketform.tickettype,
                    price: this.Ticketform.price,
                    amount:this.Ticketform.amount,
                })
              })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if(!res.data.success){
                        this.$message.error(res.data.message);
                    }
                    else{
                        this.$message.success(res.data.message);
                        //添加成功后跳转到about页面
                    }
                })
        }
      },

      deleteFlight(row){
        if(!row.flightid)
        {
            ElMessage({
                    type: 'error',
                    message: "航班信息不存在",
                    duration: 2000,
                })
        }
        else
        {
            const companytoken = window.localStorage.getItem("companytoken");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/company/removeflight" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                  /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token: companytoken,
                    flightid: row.flightid,
                })
              })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if(!res.data.success){
                        this.$message.error(res.data.message);
                    }
                    else{
                        this.$message.success(res.data.message);
                        //添加成功后跳转到about页面
                        setTimeout(() => {this.$router.push("/company")}, 1000);
                    }
                });
        }
      },

      deleteTicket(row){
        if(!row.ticketid)
        {
            ElMessage({
                    type: 'error',
                    message: "机票信息不存在",
                    duration: 2000,
                })
        }
        else
        {
            const companytoken = window.localStorage.getItem("companytoken");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/company/removeticket" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                  /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token: companytoken,
                    ticketid: row.ticketid,
                })
              })
                .then((res) => {
                    /* res 是 response 的缩写 */
                    console.log(res.data);
                    if(!res.data.success){
                        this.$message.error(res.data.message);
                    }
                    else{
                        this.$message.success(res.data.message);
                        //添加成功后跳转到about页面
                        setTimeout(() => {this.$router.push("/company")}, 1000);
                    }
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


.companymanage {
    margin-left: 220px;
    margin-right: 0px;
    width: 300px;
    position: relative;
    top: 20px;
}

.managebutton{
    width: 40%;
    margin-top: 50px;
    margin-left: 500px;
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
</style>