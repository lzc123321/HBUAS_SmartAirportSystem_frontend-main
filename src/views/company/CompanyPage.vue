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
            <div class="company">
              <h1 v-if="time == 1">Good Morning, 早上好！</h1>
              <h1 v-else-if="time == 2">Good Afternoon, 中午好！</h1>
              <h1 v-else>Good Evening, 下午好！</h1>
            </div>
          </el-main>
        </el-container>  
      </el-container>
    </div>
  </template>

<script>
//import companyChange from '@/components/companyChange.vue';
//import { useStore } from 'vuex';
import qs from 'qs';
export default{
  //
    data() {
        var ret = 1;
        var today = new Date();
        var nowHour = today.getHours();
        if (nowHour >= 0 && nowHour < 12) {
            ret = 1;
        } else if (nowHour == 12) {
            ret = 2;
        } else {
            ret = 3;
        }

        return {
            time: ret,
        }
    },

    methods:{
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


.company {
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