<template>
  <div class="add-new-comment">
    <form id="comment-form" @submit="formSubmit" method="POST">
      <!-- <input v-model="redirect" type="hidden" value="vvrozhkova.github.io/" /> -->
      <!-- <input v-model="slug" type="hidden" value="test" /> -->
      <div class="form-group">
        <label for="commentAuthorName">Имя</label>
        <input
          v-model="name"
          :disabled="disabled"
          type="text"
          class="form-control"
          placeholder="Ваше имя"
        />
      </div>
      <div class="form-group">
        <label for="commentText">Комментарий</label>
        <textarea :disabled="disabled" v-model="message" class="form-control" rows="3"></textarea>
      </div>
      <div
        class="alert"
        :class="{'alert-danger': errored, 'alert-success': successed}"
        role="alert"
      >{{output}}</div>
      <button class="btn btn-primary" disabled v-if="loading">Loading...</button>
      <button id="submitBtn" type="submit" v-else class="btn btn-primary">Submit Comment</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["pagePath", "pageSlug"],
  data() {
    return {
      name: "",
      message: "",
      redirect: this.pagePath,
      slug: this.pageSlug,
      output: "",
      errored: false,
      successed: false,
      loading: false,
      disabled: false
    };
  },
  methods: {
    formSubmit: function(e) {
      e.preventDefault();
      let currentObj = this;
      currentObj.loading = true;
      currentObj.disabled = true;
      this.axios
        .post(
          // "https://dev.staticman.net/v2/entry/github/vvrozhkova/testautomation.space/master",
          "https://dev.staticman.net/v3/entry/github/vvrozhkova/testautomation.space/master",
          {
            "options[redirect]": this.redirect,
            "options[slug]": this.slug,
            "fields[name]": this.name,
            "fields[message]": this.message
          }
        )
        .then(function(response) {
          currentObj.output = response.data;
          currentObj.errored = false;
          currentObj.successed = true;
        })
        .catch(function(error) {
          currentObj.output = error;
          currentObj.successed = false;
          currentObj.errored = true;
        })
        .finally(function() {
          currentObj.loading = false;
          currentObj.disabled = false;
        });
    }
  }
};
</script>

<style scoped>
.add-new-comment {
  display: none;
}

.add-new-comment.active {
  display: block !important;
}
</style>