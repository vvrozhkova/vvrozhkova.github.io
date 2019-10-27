<template>
  <div class="add-new-comment">
    <form id="comment-form" @submit="formSubmit" method="POST">
      <div class="form-group">
        <label for="commentAuthorName">Имя</label>
        <input
          v-model="name"
          :disabled="disabled"
          type="text"
          class="form-control"
          placeholder="Ваше имя" required
        />
      </div>
      <div class="form-group">
        <label for="commentText">Комментарий</label>
        <textarea :disabled="disabled" v-model="message" class="form-control" rows="3" required></textarea>
      </div>
      <div
        class="alert" v-if="output != ''"
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
  props: ["pageSlug", "reply"],
  data() {
    return {
      name: "",
      message: "",
      slug: this.pageSlug.replaceAll("/", ""),
      post: this.pageSlug,
      replies: this.reply,
      output: "",
      errored: false,
      successed: false,
      loading: false,
      disabled: false
    };
  },
  methods: {
    formSubmit: function(e) {
      const qs = require("querystring");

      e.preventDefault();
      let currentObj = this;
      currentObj.loading = true;
      currentObj.disabled = true;

      const params = {
        "options[slug]": this.slug,
        "fields[name]": this.name,
        "fields[message]": this.message,
        "fields[post]": this.post,
        "fields[replies]": this.replies
      };

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      this.axios
        .post(
          "https://nams.glitch.me/v3/entry/github/vvrozhkova/testautomation.space/master/comments",
          qs.stringify(params),
          config
        )
        .then(function(response) {
          currentObj.output = "Ваш комментарий успешно отправлен! Он отобразится после того как будет проверен модератором сайта.";
          currentObj.errored = false;
          currentObj.successed = true;
          currentObj.name="";
          currentObj.message="";
        })
        .catch(function(error) {
          currentObj.output = "Упс... Что-то пошло не так :(";
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
  display: block;
}
</style>
