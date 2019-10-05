<template>
    <g-link :to="path" class="read-button__link">
        <div class="read-button__box">
            <span class="read-button__title">ПЕРЕЙТИ К ЧТЕНИЮ</span>
            <i class="fas fa-chevron-right"></i>
        </div>
    </g-link>

</template>

<script>
    export default {
        name: "ReadButton",
        props: [
            'path'
        ]
    }
</script>

<style scoped>

    .read-button__box:hover{
        border: 0.2vw solid #0052cc;
        color: #0052cc;
    }

    .read-button__link {
        text-decoration: none;
    }

    .read-button__box {
        border: 0.2vw solid #fff;
        color: #fff;
        text-align: center;
        font-size: 1.1vw;
        font-family: 'Oswald', sans-serif;
        width: 14vw;
        padding: 0.7vw;
    }

    .fa-chevron-right {
        margin: 0.5vw;
    }

</style>