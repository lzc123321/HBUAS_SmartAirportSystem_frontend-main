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
                { name: "航班管理", index: 2 },
                { name: "机票管理", index: 3 },
                { name: "个人中心", index: 4 },
            ],
        }
    },

    methods: {
        changePage(item) {
            if (item.index == 1) {
                router.push('/company');
            }

            if (item.index == 2) {
                router.push('/company/check');
            }

            if (item.index == 3) {
                router.push('/company');
            }

            if (item.index == 4) {
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
    height: 50px;
    font-size: 17px;
    line-height: 41px;
}
</style>