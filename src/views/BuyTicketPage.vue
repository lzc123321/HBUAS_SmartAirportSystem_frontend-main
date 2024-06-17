<template>
    <div>FlightID = {{ goId }}</div>
    <div v-if="backId != null">backFlightId = {{ backId }}</div>
</template>

<script>

export default ({
    data() {

        return {
            goId: this.$route.query.goId,
            backId: this.$route.query.backId,
        }
    }
})
</script>