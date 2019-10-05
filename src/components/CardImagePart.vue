<template>
    <div class="card-image-part">
        <ArticleCategory class="card-category" :article="article"/>
        <CardImage :article="article"/>
    </div>
</template>

<script>
    import ArticleCategory from "~/components/ArticleCategory.vue";
    import CardImage from "~/components/CardImage.vue";

    export default {
        name: "CardImagePart",
        components: {
            ArticleCategory,
            CardImage
        },
        props: [
            "article"
        ]
    }
</script>

<style scoped>

    .card-image-part{
        height: 100%;
    }

    .card-category{
        position: absolute;
        z-index: 10;
        left: 0;
    }
</style>