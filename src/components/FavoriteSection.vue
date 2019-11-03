<template>
    <div class="favorite-section">
        <Section title="Избранное" titleAlign="right">
            <div class="mini-card-grid">
                <ArticleMiniCard :article="post.node" :key="post.node.id" v-for="post in posts" :color="post.node.color"/>
            </div>
        </Section>
    </div>

</template>

<script>
    import Section from "~/components/Section.vue";
    import ArticleMiniCard from "~/components/ArticleMiniCard.vue";

    export default {
        name: "FavoriteSection",
        props: [
            'posts'
        ],
        components: {
            Section,
            ArticleMiniCard
        }
    }
</script>

<style scoped>

    .favorite-section {
        position: relative;
        background-color: #dadada;
        color: #252151;
    }

    .mini-card-grid {
        padding: 3vw;
        display: flex;
        -webkit-overflow-scrolling: touch;
        overflow: scroll;
    }
</style>