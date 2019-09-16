<template>
    <g-link itemprop="headline" :to="article.path" class="article-title__link">
        {{article.title}}
    </g-link>
</template>

<script>
    export default {
        name: "ArticleTitle",
        props: [
            "article"
        ]
    }
</script>