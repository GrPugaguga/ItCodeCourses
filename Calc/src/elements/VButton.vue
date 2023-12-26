<template>
    <button :class=typeOfBtn>{{ body }}</button>
</template>

<script lang="ts">
export default {
    props: ['body', 'typeOfBtn']
}


</script>

<style lang="scss">
button {
    font-family: arial, sans-serif;
    padding: 7px 14px;
    margin: 0px;
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    cursor: pointer;
    border-radius: 4px;
    background: #b0bce45b;
    color: rgb(0, 0, 0);
    border: none;
    transition: all 0.2s;


}

.number {
    background: #b0bce45b;
}

.number:hover {
    background: #b0bce48c;
}

.action {
    background: #8b94b37a;
}

.action:hover {
    background: #8b94b39d;
}

.equals {
    background: #8a54ffb9;
}

.equals:hover {
    background: #8a54ffce;
    grid-area: e
}
</style>