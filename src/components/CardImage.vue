<template>
  <div class="card-image">
    <g-image :src="article.image" class="card-image__img" :alt="article.title"></g-image>
  </div>
</template>

<script>
export default {
  name: "CardImage",
  props: ["article"]
};
</script>

<style scoped>
.card-image {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 2vw 1vw 0vw 1vw;
}

.card-image__img {
  max-width: 100%;
}
</style>