<template>
    <g-link :to="article.category.path" class="article-category__link" itemprop="articleSection">
        <strong>
            [ {{article.category.title.toUpperCase()}} ]
        </strong>
        <time itemprop="datePublished" :datetime="article.date" class="text-muted">{{new Date(article.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric"
            })}}
        </time>
    </g-link>

</template>

<script>
    export default {
        name: "ArticleCategory",
        props: [
            "article"
        ]
    }
</script>

<style scoped>

    .article-category__link {
        color: #0052cc;
        font-size: inherit;
    }

    time {
        font-weight: lighter;
    }

</style>