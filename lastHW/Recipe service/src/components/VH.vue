<template >
    <h1 :class="size"> {{ body }}</h1>
</template>
<script lang="ts">
export default {
    props: ['body', 'size']
}
</script>
<style lang="scss" scoped>
h1 {
    font-weight: 700;
    margin: 0;

}

.S {
    font-size: 22px;
    line-height: 34px;

}

.M {
    font-size: 32px;
    line-height: 38px;

}

.L {
    font-size: 48px;
    line-height: 56px;

}
</style>