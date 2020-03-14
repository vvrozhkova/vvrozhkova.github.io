<template>
  <Section>
    <h1>
      <b>Выберите тематику</b>
    </h1>
    <p>которая вас интересует</p>
    <Tag v-for="tag in $static.tags.edges" :key="tag.node.id" :tag="tag.node" />
  </Section>
</template>

<script>
import Section from "@/components/Section.vue";
import Tag from "@/components/Tag.vue";

export default {
  components: {
    Section,
    Tag
  }
};
</script>

<style scoped>
@media screen and (min-width: 850px) {
  h1 {
    font-size: 3em;
  }
  p {
    font-size: 1.5em;
  }
}
</style>

<static-query>
query {
  tags: allRelatedTag {
    edges {
      node {
        id
        title
        icon
        path
      }
    }
  }
}
</static-query>