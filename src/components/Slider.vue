<template>
    <div class="slider">
        <b-carousel :interval="0" @sliding-end="onSlideEnd" @sliding-start="onSlideStart" controls id="carousel-1"
                    indicators v-model="slide">
            <b-carousel-slide :key="item.node.id" v-for="(item, index) in items">
                <SliderItem :index="index+1" :slide="item.node"/>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
    import SliderItem from "~/components/SliderItem.vue";

    export default {
        name: "Slider",
        components: {
            SliderItem
        },
        props: [
            'items'
        ],
        data() {
            return {
                slide: 0,
                sliding: null
            }
        },
        methods: {
            onSlideStart(slide) {
                this.sliding = true
            },
            onSlideEnd(slide) {
                this.sliding = false
            }
        }
    }
</script>

<style>

    .slider {
        padding: 2em 1em;
    }

    .carousel-caption {
        position: relative;
        left: 0;
        text-align: inherit;
    }

    .carousel-control-next, .carousel-control-prev {
        height: 4vw;
        width: 4vw;
        border: 2px solid #fff;
        top: auto;
        z-index: 10;
        padding: 0.5em;
    }

    .carousel-control-next:hover, .carousel-control-prev:hover {
        border: 2px solid #0052cc;
    }

    .carousel-control-next:hover .carousel-control-next-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%230052cc' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3e%3c/svg%3e");
    }

    .carousel-control-prev:hover .carousel-control-prev-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%230052cc' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3e%3c/svg%3e");
    }


    .carousel-control-next {
        left: 4vw;
    }

    .carousel {
        height: 35vw;
    }

    .carousel-indicators {
        margin-bottom: 0;
        /*bottom: 0;*/
        /*position: absolute;*/
    }

    .carousel-indicators li {
        border-bottom: none;
    }
</style>