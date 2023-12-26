<template >
    <div class="layout">
        <Header></Header>
        <router-view class="info"></router-view>
        <Footer></Footer>
    </div>
</template>
<script setup lang="ts">
import Header from './Header/Header.vue'
import Footer from './Footer/Footer.vue'


</script>
<style lang="scss">
.layout {
    margin: 0;
    height: 100%;
    padding: 0px;
    width: 100vw;
    display: grid;
    grid-template-rows: auto 1fr auto;

    .info {
        margin-left: 10vw;
        width: 80vw;
        margin-right: 10vw;
        height: auto;
    }
}
</style>