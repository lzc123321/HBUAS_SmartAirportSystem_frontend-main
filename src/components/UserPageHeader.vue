<template>
    <div class="box">
        <a class="items" v-for="(item, index) in list1" :key="index" onmouseover="this.style.color = 'blue'"
            onmouseout="this.style.color = 'black'" @click="changePage(item)">
            {{ item.name }}
        </a>
    </div>
</template>


<script>
import router from '@/routes/router';

export default {
    data() {
        return {
            list1: [
                { name: "首页", index: 1 },
                { name: "已购机票", index: 2 },
                { name: "行李信息", index: 3 },
                { name: "停车订单" , index: 4},
                { name: "个人中心", index: 5},
            ],
        }
    },

    methods: {
        changePage(item) {
            if (item.index == 1) {
                router.push('/user');
            }

            if (item.index == 2) {
                router.push('/flight');
            }

            if (item.index == 3) {
                router.push('/login');
            }

            if (item.index == 5) {
                router.push('/user');
            }
        }
    }

}


</script>


<style>
.items {
    display: inline-block;
    height: 41px;
    text-decoration: none;
    color: #4c4c4c;
    padding: 0 20px;
}

.box {
    height: 45px;
    font-size: 17px;
    line-height: 41px;
}
</style>