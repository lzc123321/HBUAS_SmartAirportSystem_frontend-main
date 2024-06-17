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
                <el-tab-pane label="购票服务" name="first">
                    <div class="Ticket"  @keyup.enter="keyPressed">
                        <h4>查询航班信息</h4>
                        <el-form :model="Flightform" label-width="70px">

                            <el-form-item label="起飞地点" class="login_input_box" prop="takeofflocation">
                                <el-cascader placeholder="起飞地" size="large" :options="options" v-model="selectedOptions"
                                    @change="handleChange">
                                </el-cascader>
                            </el-form-item>

                            <el-form-item label="降落地点" class="login_input_box" prop="landinglocation">
                                <el-cascader placeholder="目的地" size="large" :options="options" v-model="selectedOptions2"
                                    @change="handleChange2">
                                </el-cascader>
                            </el-form-item>

                            <el-form-item label="起飞日期" class="login_input_box" prop="date">
                                <el-date-picker v-model="Flightform.date" value-format="YYYY-MM-DD" type="date" placeholder="Pick a day" :size="size"/>
                            </el-form-item>

                            <div class="button">
                                <el-button @click="touristCheckFlight" class="submit_btn" type="primary">查询航班信息</el-button>
                            </div>
                        </el-form>
                    </div>
                    <el-table :data="FlightList" stripe style="width: 100%">
                        <el-table-column prop="flightid" label="航班ID" width="120" />
                        <el-table-column prop="name" label="航班名称" width="120" />
                        <el-table-column prop="companyid" label="公司ID" width="120"/>
                        <el-table-column prop="takeofflocation" label="起飞位置" width="120"/>
                        <el-table-column prop="departuretime" label="起飞时间" width="120"/>
                        <el-table-column prop="landinglocation" label="降落位置" width="120"/>
                        <el-table-column prop="landingtime" label="降落时间" width="120"/>
                        <el-table-column prop="departuregate" label="登机口" width="120"/>
                        <el-table-column prop="terminal" label="航站楼" width="120"/>
                        <el-table-column fixed="right" label="Opeations" width="120">
                            <template #default="scope">
                                <el-button link type="primary" size="small" @click="openFlightDrawer(scope.row)">查看航班机票</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-drawer
                        v-model="drawer"
                        title="航班机票"
                        :direction="direction"
                        size="50%"
                    >
                        <el-table :data="TicketList" stripe style="width: 100%">
                            <el-table-column prop="flightid" label="航班ID" width="120" />
                            <el-table-column prop="ticketid" label="机票ID" width="120" />
                            <el-table-column prop="price" label="机票价格" width="120"/>
                            <el-table-column prop="tickettype" label="机票类型" width="120"/>
                            <el-table-column prop="amount" label="机票数量" width="120"/>
                            <el-table-column fixed="right" label="Opeations" width="120">
                                <template #default="scope">
                                    <el-button link type="primary" size="small" @click="openTicketDrawer(scope.row)">购买航班机票</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-drawer
                        v-model="drawer2"
                        title="实名信息"
                        :direction="direction"
                        size="50%"
                        >
                            <el-table :data="InformationList" stripe style="width: 100%">
                                <el-table-column prop="personid" label="实名信息ID" width="120" />
                                <el-table-column prop="touristid" label="旅客ID" width="120"/>
                                <el-table-column prop="realname" label="真实姓名" width="120"/>
                                <el-table-column prop="idnumber" label="身份证号" width="300"/>
                                <el-table-column prop="email" label="联系方式" width="200"/>
                                <el-table-column fixed="right" label="Opeations" width="120">
                                    <template #default="scope">
                                        <el-button link type="primary" size="small" @click="buyTicket(scope.row)">购票</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-drawer>
                        
                    </el-drawer>
                </el-tab-pane>
                <el-tab-pane label="已购机票" name="fourth">
                    <el-table :data="RecordList" stripe style="width: fit-content">
                        <el-table-column prop="orderid" label="订单ID" width="120" />
                        <el-table-column prop="flightname" label=" 航班名称" width="120" />
                        <el-table-column prop="companyname" label="公司名称" width="120"/>
                        <el-table-column prop="takeofflocation" label="起飞位置" width="120"/>
                        <el-table-column prop="departuretime" label="起飞时间" width="120"/>
                        <el-table-column prop="landinglocation" label="降落位置" width="120"/>
                        <el-table-column prop="landingtime" label="降落时间" width="120"/>
                        <el-table-column prop="departuregate" label="登机口" width="120"/>
                        <el-table-column prop="realname" label="真实姓名" width="120"/>
                        <el-table-column prop="seatinfo" label="座位信息" width="120"/>
                        <el-table-column prop="tickettype" label="机票类型" width="120"/>
                        <el-table-column fixed="right" label="Opeations" width="120">
                            <template #default="scope">
                                <el-button link type="primary" style="margin-left: 16px" size="small" @click="touristCancelTicket(scope.row)">退票</el-button>
                                <el-button link type="primary" style="margin-left: 16px" size="small" @click="openLuggageDraer(scope.row)">查看行李信息</el-button>
                                <el-button link type="primary" style="margin-left: 16px" size="small" @click="openSeatDraer(scope.row)">选择座位信息</el-button>
                            </template>
                        </el-table-column>    
                    </el-table> 
                    <div class="button">
                        <el-button @click="touristCheckTicket" class="submit_btn" type="primary">列出已购机票</el-button>
                    </div>
                    
                    <el-drawer
                        v-model="drawer"
                        title="行李信息"
                        :direction="direction"
                    >
                        <el-table :data="LuggageList" style="width: 100%">
                            <el-table-column prop="state" label="行李状态" width="120" />
                            <el-table-column prop="location" label="行李位置" width="120" />
                        </el-table>
                    </el-drawer>
                    <el-drawer
                        v-model="drawer3"
                        title="座位信息"
                        :direction="direction"
                    >
                        <el-table :data="SeatList" style="width: 100%" :row-class-name="tableRowClassName">
                            <el-table-column prop="seatid" label="座位ID" width="120" />
                            <el-table-column fixed="right" label="Opeations" width="120">
                            <template #default="scope">
                                <el-button link type="primary" style="margin-left: 16px" size="small" @click="touristChooseSeat(scope.row)">选择座位信息</el-button>
                            </template>
                        </el-table-column>  
                        </el-table>
                    </el-drawer>
                </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>  
      </el-container>
    </div>
  </template>
  
  <script>
  import { provinceAndCityData } from 'element-china-area-data';
  import { codeToText } from 'element-china-area-data';
  import { ElMessage } from 'element-plus';
  import qs from 'qs';
  import { ref } from 'vue'
  var from = "";
  var dest = "";
  const direction = ref('btt');
  export default{
  //
    data() {
        return {
            options: provinceAndCityData,
            selectedOptions: ['11', '110101'],
            selectedOptions2: ['11', '110101'],
            drawer: false,
            direction: direction,
            drawer2: false,
            drawer3: false,

            FlightList:[
            {
                FlightId: "",
                Name: "",
                CompantyId: "",
                takeofflocation: "",
                departuretime: "",
                landinglocation: "",
                landingtime: "",
                departuregate: "",
                terminal: "",
            }],

            Flightform:{
                FlightId: "",
                Name: "",
                CompantyId: "",
                takeofflocation: "",
                departuretime: "",
                landinglocation: "",
                landingtime: "",
                departuregate: "",
                terminal: "",
                date:"",
            },

            TicketList:[{
                TicketId : "",
                FlightId : "",
                Type  : "",
                Price : "",
                Amount : "",
            }],

            TicketFrom:{
                TicketId : "",
                FlightId : "",
                Type  : "",
                Price : "",
                Amount : "",
                personid: "",
            },

            RecordList:[{
                orderid: "",
                companyname: "",
                flightname: "",
                takeofflocation: "",
                landinglocation: "",
                departuretime: "",
                landingtime: "",
                departuregate: "",
                terminal: "",
                realname: "",
                seatinfo: "",
                tickettype: "",
            }],

            RecordForm:{
                orderid: "",
                companyname: "",
                flightname: "",
                takeofflocation: "",
                landinglocation: "",
                departuretime: "",
                landingtime: "",
                departuregate: "",
                terminal: "",
                realname: "",
                seatinfo: "",
                tickettype: "",
            },

            SeatList:[{
                seatid: "",
                occupied: "",
                //0:未被占用,1:被占用,2:自己的
            }
        ],

            SeatForm:{
                orderid: "",
                seatid: "",
                occupied: "",
                //0:未被占用,1:被占用,2:自己的
            },

            LuggageList:[{
                luggageid: "",
                personid: "",
                ticketid: "",
                state: "",
                location: "",
            }],

            InformationList:[{
                TIID:"",
                TouristId: "",
                RealName: "",
                IDNumber: "",
                Email: "",
            }]

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
        touristCheckFlight(){
            const touristtoken = window.localStorage.getItem("touristtoken");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/tourist/searchflight" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                data: qs.stringify({
                /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                    token:touristtoken,
                    takeofflocation: this.Flightform.takeofflocation,
                    landinglocation: this.Flightform.landinglocation,
                    date: this.Flightform.date,
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

        openFlightDrawer(row){
            if(!row.flightid)
            {
                ElMessage({
                    type: 'error',
                    message: "航班信息为空",
                    duration: 2000,
                })
            }
            else
            {
                this.drawer = true;
                this.touristCheckFlightTicket_test(row);  
            }
            
        },
        
        openTicketDrawer(row){
            if(!row.ticketid)
            {
                ElMessage({
                    type: 'error',
                    message: "机票信息为空",
                    duration: 2000,
                })
            }
            else
            {
                this.drawer2 = true;
                window.localStorage.setItem("ticketid", row.ticketid);
                this.checkSelfInformation();  
            }
            
        },

        openSeatDraer(row){
            if(!row.orderid)
            {
                ElMessage({
                    type: 'error',
                    message: "机票信息为空",
                    duration: 2000,
                })
            }
            else
            {
                this.drawer3 = true;
                this.touristCheckSeat(row);
            }
        },

        buyTicket(row){
            if(!row.personid)
            {
                ElMessage({
                    type: 'error',
                    message: "机票信息为空",
                    duration: 2000,
                })
            }
            else
            {
                const touristtoken = window.localStorage.getItem("touristtoken");
                const ticketid = window.localStorage.getItem("ticketid");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/purchaseflight" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                    data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                        token:touristtoken,
                        ticketid: ticketid,
                        personidlist: row.personid,
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



        touristCheckFlightTicket_test(row){
            const touristtoken = window.localStorage.getItem("touristtoken");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/listticket" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                    data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                        token:touristtoken,
                        flightid: row.flightid
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

        openLuggageDraer(row){
            if(!row.orderid)
            {
                ElMessage({
                    type: 'error',
                    message: "机票信息为空",
                    duration: 2000,
                })
            }
            else
            {
                this.drawer = true;
                this.touristCheckLuggage(row);
            }
        }, 

        touristCheckTicket(){
            const touristtoken = window.localStorage.getItem("touristtoken");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/tourist/listpurchase" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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
                    this.RecordList = res.data.message;
                }
            }); 
        },

        touristCancelTicket(row){
            if(!row.orderid)
            {
                ElMessage({
                        type: 'error',
                        message: "订单ID不能为空",
                        duration: 2000,
                    })
            }
            else
            {
                const touristtoken = window.localStorage.getItem("touristtoken");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/returnpurchase" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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

        touristCheckSeat(row){
                const touristtoken = window.localStorage.getItem("touristtoken");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/listseat" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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
                        this.$message.success("绿色为座位空闲，米色为自己已买的座位");
                        window.localStorage.setItem("orderid", row.orderid);
                        this.SeatList = res.data.message;
                    }
                }); 
        },

        tableRowClassName({row}) {
            if(row.occupied == "0")
            {
                
                return "warning-row";
            }
            else if(row.occupied == "1")
            {
                return "";
            }
            else
            {
                return "success-row";
            }
        },

        touristChooseSeat(row){
            if(!row.seatid)
            {
                ElMessage({
                        type: 'error',
                        message: "座位ID不能为空",
                        duration: 2000,
                    })
            }
            else
            {
                const touristtoken = window.localStorage.getItem("touristtoken");
                const orderid = window.localStorage.getItem("orderid");
                this.$http({
                    method: "post" /* 指明请求方式，可以是 get 或 post */,
                    url: "/tourist/selectseat" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
                    data: qs.stringify({
                    /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
                        token:touristtoken,
                        orderid: orderid,
                        seatid: row.seatid,
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

        touristCheckLuggage(row){
            const touristtoken = window.localStorage.getItem("touristtoken");
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/tourist/checkluggage" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
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
                    this.LuggageList = res.data.message;
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

  .card{
    top: 200px;
    margin: auto;
    margin-top: 50px;
    margin-left: 200px;
    height: 100%;
    width: 70%;
    border-color: black;
}

.el-table .warning-row {
  background-color: aquamarine;
}
.el-table .success-row {
  background-color: bisque;
}
  </style>