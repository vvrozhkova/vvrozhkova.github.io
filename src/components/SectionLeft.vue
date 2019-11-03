<template>
  <Section class="container-fluid" :title="title" titleAlign="left">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-10">
        <div class="row">
          <div class="col-4">
            <ArticleCard cardAlign="vertical" v-if="posts[0] != null" :article="posts[0].node" />
          </div>
          <div class="col-8">
            <div class="col">
              <ArticleCard cardAlign="horizontal" v-if="posts[1] != null" :article="posts[1].node" />
            </div>
            <div class="w-100"></div>
            <div class="col">
              <ArticleCard cardAlign="horizontal" v-if="posts[2] != null" :article="posts[2].node" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>

<script>
import Section from "~/components/Section.vue";
import ArticleCard from "~/components/ArticleCard.vue";

export default {
  name: "SectionLeft",
  props: ["posts", "title"],
  components: {
    Section,
    ArticleCard
  }
};
</script>

<style scoped>
.col-4,
.col-8 {
  padding: 0;
  margin: 0;
}
</style>