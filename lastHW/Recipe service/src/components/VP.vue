<template >
    <p :class="size"> {{ body, props }}</p>
</template>
<script lang="ts">
export default {
    props: ['body', 'size', 'props']
}
</script>
<style lang="scss" scoped>
p {
    font-weight: 500;
    margin: 0;
}

.S {
    font-size: 14px;
    line-height: 24px;

}

.M {
    font-size: 18px;
    line-height: 29px;

}

.L {
    font-size: 22px;
    line-height: 34px;

}
</style>