<template>
  <div class="container-fluid">

    <Section class="row" :title="title" titleAlign="right">
        <div class="col-10">
            <div class="row">

                <div class="col-8">
                    <div class="col">
                        <ArticleCard cardAlign="horizontal" :article="posts[2].node"/>
                    </div>
                    <div class="w-100"></div>
                    <div class="col">
                        <ArticleCard cardAlign="horizontal" :article="posts[0].node"/>
                    </div>
                </div>
                <div class="col-4">
                    <ArticleCard cardAlign="vertical" :article="posts[0].node"/>
                </div>
            </div>
        </div>
        <div class="col-2"></div>
    </Section>
  </div>
</template>

<script>
    import Section from "~/components/Section.vue";
    import ArticleCard from "~/components/ArticleCard.vue";

    export default {
        name: "SectionRight",
        props: [
            'posts',
            'title'
        ],
        components: {
            Section,
            ArticleCard
        }
    }
</script>

<style scoped>
    .col-4, .col-8{
        padding: 0;
        margin: 0;
    }
</style>