<template>
  <Section>
    <h1>
      <b>Выберите тематику</b>
    </h1>
    <p>которая вас интересует</p>
    <Tag :title="'java'" />
    <Tag :title="'ui'" />
    <Tag :title="'setup'" />
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
h1 {
  font-size: 3vw;
}
p {
  font-size: 1vw;
}
</style>