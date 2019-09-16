<template>
    <section class="section">
        <div :class="[titleAlign === 'right' ? 'section__title_right' : 'section__title_left']" class="section__title">
            {{title.toUpperCase()}}
        </div>
        <slot/>
    </section>
</template>

<script>
    export default {
        name: "Section",
        props: [
            'title',
            'titleAlign'
        ],
    }
</script>

<style scoped>

    section {
        position: relative;
        padding-top: 10vw;
        padding-right: 2vw;
        padding-left: 2vw;
    }

    .section__title {
        font-family: 'Oswald', sans-serif;
        font-size: 7vw;
        font-weight: bold;
        position: absolute;
        top: 0;
    }

    .section__title_right {
        right: 2vw;
    }

    .section__title_left {
        left: 2vw;
    }

</style>