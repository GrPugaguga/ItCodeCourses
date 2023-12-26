<template >
    <button :class="class" @click="onclick()"> {{ body }}</button>
</template>
<script lang="ts">
export default {
    props: ['body', 'class', 'onclick']
}
</script>
<style lang="scss" scoped>
button {
    border-radius: 20px;
    padding: 3px 30px;
    font-size: 18px;
    line-height: 25px;
    font-weight: 600;
    cursor: pointer;
    outline: none;
    margin-left: 10px;
    align-items: center;
    transition: all 0.3s;
}

.grey {
    color: #fff;
    background-color: #6e6e77;
    border: solid 3px #6e6e77;
}

.grey:hover {
    background-color: #595961;
    border: solid 3px #595961;
}

.white {
    border: solid 3px #406ecf;
    background-color: #fff;
    color: #406ecf;
}

.white:hover {
    border: solid 3px #345cb3;
    background-color: #fff;
    color: #345cb3;
}

.blue {
    background-color: #406ecf;
    color: #fff;
    border: solid 3px #406ecf;
}

.blue:hover {
    background-color: #345cb3;
    border: solid 3px #345cb3;
}
</style>