<template>
  <div class="card-image">
    <g-image :src="article.image" class="card-image__img" :alt="article.title"></g-image>
  </div>
</template>

<script>
export default {
  name: "CardImage",
  props: ["article"],
  computed: {
    headerStyle: function() {
      if (this.article.color != "") {
        return (
          "background: radial-gradient(90% 50%,rgba(81, 78, 100, 0.1)," +
          this.article.color +
          ") no-repeat center;"
        );
      } else {
        return "background: radial-gradient(ellipse closest-side,rgba(81, 78, 100, 0.5),#252f6f) no-repeat center;";
      }
    }
  }
};
</script>

<style scoped>
.card-image {
  /* width: 100%; */
  /* height: 100%; */
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 2vw 1vw 0vw 1vw;
}

.card-image__img {
  max-width: 100%;
}
</style>