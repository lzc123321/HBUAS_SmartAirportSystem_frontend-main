<template>
    <el-container>
        <el-header>
            <div class="headerContainer">
                <img src="@/assets/logo.png" class="logo" />
                <pageChange class="pageChange"></pageChange>
            </div>
        </el-header>
        <el-main>
            <div class="image">
                <el-carousel trigger="click" type="card">
                    <el-carousel-item v-for="item in urls" :key="item">
                        <img style="object-fit: scale-down;width: 100%;height: 100%;" :src="item.url" alt="" />
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="greeting">
                <h1 v-if="time == 1">Good Morning, 早上好！</h1>
                <h1 v-else-if="time == 2">Good Afternoon, 中午好！</h1>
                <h1 v-else>Good Evening, 下午好！</h1>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import pageChange from '@/components/pageChange.vue';

export default {
    components: {
        pageChange
    },
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
            urls: [
                { url: require("@/assets/plane1.jpg") },
                { url: require("@/assets/plane2.jpg") },
                { url: require("@/assets/plane3.jpg") },
                { url: require("@/assets/plane4.jpg") },
            ]
        }
    },

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

.image {
    margin: 10px;
    padding: 10px;
    position: relative;
    top: 10px;
}

.greeting {
    margin-top: 300px;
    padding: 10px;
    position: relative;
    top: 200px;
}

.headerContainer {
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


</style>