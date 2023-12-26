<template >
    <div class="footer">
        <hr />
        <VP :size="'S'" :body="'Footer @2023 Pugaguga production'" class="p"></VP>

    </div>
</template>
<script setup lang="js">
import VP from '../../components/VP.vue'
</script >
<style lang="scss">
.footer {
    margin-top: 50px;
    align-self: bottom;
    display: grid;
    gap: 10px;
    align-items: center;

    hr {
        width: 80%;
        height: 1px;
        border: none;
        background-color: #406dcf50;
    }

    p {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
    }
}
</style>