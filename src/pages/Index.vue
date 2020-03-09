<template>
  <Layout>
    <tags-section />
    <last-posts-section />
  </Layout>
</template>

<script>
import TagsSection from "@/components/home/TagsSection.vue";
import LastPostsSection from "@/components/home/LastPostsSection.vue";

export default {
  components: {
    TagsSection,
    LastPostsSection
  }
};
</script>