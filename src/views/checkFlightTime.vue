<template>
    <el-container>
        <el-header>
            <div class="headerContainer">
                <img src="@/assets/logo.png" class="logo" />
                <pageChange class="pageChange"></pageChange>
            </div>
        </el-header>
        <el-main>
            <div class="search_box">
                <h1 class="search_title">查询今日航班信息</h1>

                <div class="button">
                    <el-button @click="search_btn" class="search_btn" type="primary">查询</el-button>
                </div>
            </div>

            <div v-if="showFlight">
                    <el-tabs v-model="activeName" type="border-card" class="tabs">
                        <el-tab-pane name="go" label="选择机票" class="tab_label">
                                <div v-for="flight in FlightList" :key="flight.flightid" class="ticket">
                                    <div class="itemBox">
                                        <div class="subItemBox">
                                            <p class="flightName">{{ flight.flightname }}</p>
                                            <p class="companyname">{{ flight.companyname }}</p>
                                        </div>

                                        <div class="subItemBox2">
                                            <div class="sub_subItemBox">
                                                <p class="departureTime">{{ flight.departuretime }}</p>
                                                <p class="departureLocation">{{ flight.takeofflocation }}</p>
                                            </div>

                                            <div class="sub_subItemBox">
                                                <img src="@/assets/flights.png"
                                                    style="height: 25px; width: 25px; margin: 20px;" />
                                            </div>

                                            <div class="sub_subItemBox">
                                                <p class="landingTime">{{ flight.landingtime }}</p>
                                                <p class="landingLocation">{{ flight.landinglocation }}</p>
                                            </div>
                                        </div>

                                        <div class="subItemBox3">
                                            <p class="status">{{ flight.status }}</p>
                                        </div>
                                    </div>
                                </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
        </el-main>
    </el-container>
</template>

<script>
import pageChange from '@/components/pageChange.vue';
import { provinceAndCityData} from 'element-china-area-data';

export default {
    components: {
        pageChange,
    },

    data() {
        return {
            FlightFrom:{
                takeofflocation: "",
                landingLocation: "",
                date: "",
            },
            activeName: 'go',
            disabled: true,
            plane: require('../assets/plane.png'),
            options: provinceAndCityData,
            selectedOptions: ['11', '110101'],
            selectedOptions2: ['11', '110101'],
            dateValue1: new Date(),
            dateValue2: [new Date(), new Date()],
            radio: 1,
            adult: 1,
            child: 0,
            infant: 0,
            hasGoFlight: false,
            hasBackFlight: false,
            showFlight: false,
            FlightList: [],
        }
    },

    methods: {

        search_btn() {
            this.$http({
                method: "post" /* 指明请求方式，可以是 get 或 post */,
                url: "/passby/listschedule" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
            })
            .then((res) => {
                /* res 是 response 的缩写 */
                console.log(res.data);
                if(!res.data.success){
                    this.$message.error(res.data.message);
                }
                else{
                    this.$message.success("success");
                    this.showFlight = true;
                    this.FlightList = res.data.message;
                }
            });
        },
    },

}
</script>

<style>
.search_title {
    text-align: center;
    font-weight: 700;
    font-size: 25px;
    margin-bottom: 25px;
}

.location_container {
    position: relative;
    border: 1px solid rgba(218, 218, 218, 0.615);
    border-radius: 15px;
    margin: auto;
    width: 98%;
}


.location {
    position: relative;
    margin: auto;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

}

.dest {
    margin: 20px;
}

.radio {
    margin-top: 20px;
    margin-left: 50px;
}

.date {
    margin: 20px;
}

.passanger {
    margin: 20px;
}

.button {
    margin-top: 35px;
    justify-content: center;
    align-items: center;
}

.search_btn {
    width: 20%;
}

.search_box {
    margin: auto;
    width: 80%;
    margin-top: 50px;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 5px 1px 10px 3px rgb(186, 186, 186);
    background-color: rgb(243, 245, 255);
}

.tabs {
    border-radius: 20px;
    width: 88%;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 20px;
}

.el-tabs__header {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
}

.ticket {
    border: 1px solid lightgrey;
    border-radius: 10px;
    margin: 10px;
}

.companyName {
    font-size: 15px;
}

.flightName {
    font-size: 13px;
    color: rgb(0, 81, 255);
}

.departureTime {
    font-size: 30px;
    margin: 10px;
}

.landingTime {
    font-size: 30px;
    margin: 10px;
}

.departureLocation {
    font-size: 14px;
}

.landingLocation {
    font-size: 14px;
}

.totalTime {
    font-size: 15px;
    margin: auto;
    width: 100px;
}

.price {
    font-size: 25px;
    margin: auto;
    color: rgb(255, 149, 20);
}

.itemBox {
    display: flex;
    width: 100%;
    margin: auto;
    padding: 15px;
}

.subItemBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-left: 0px;
    margin-top: auto;
    margin-bottom: auto;
    width: 200px;
}

.subItemBox2 {
    display: flex;
    margin: auto;
}

.subItemBox3 {
    display: flex;
    margin: auto;
}

.sub_subItemBox {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.confirm_btn {
    margin: auto;
    margin-right: 30px;
}

.priceBox {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>