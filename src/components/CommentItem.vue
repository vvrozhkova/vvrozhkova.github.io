<template>
  <div class="comment">
    <strong>
      <div class="comment-name">
        {{comment.name}}
        <small class="text-muted comment-date">
          -
          {{new Date(comment.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric"
          })}}
        </small>
      </div>
    </strong>
    <div class="comment-message" v-html="comment.content"></div>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <span class="openLink" v-on:click="openReplyForm" :comment-id="comment.id"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
  methods: {
    openReplyForm: function(event) {
      var id = event.target.getAttribute("comment-id");

      var replyForms = document.getElementsByClassName("add-new-comment");
      for (var i = 0; i < replyForms.length; i++) {
        // console.log(replyForms[i].getAttribute("id"));
        if (replyForms[i].getAttribute("id") == "reply-" + id) {
          replyForms[i].classList.toggle("active");
        } else {
          replyForms[i].classList.remove("active");
        }
      }

      var openLinks = document.getElementsByClassName("openLink");
      for (var i = 0; i < openLinks.length; i++) {
        // console.log(openLinks[i].getAttribute("comment-id"));
        if (openLinks[i].getAttribute("comment-id") == id) {
          openLinks[i].classList.toggle("active");
        } else {
          openLinks[i].classList.remove("active");
        }
      }

      var openForm = document.querySelector(".add-new-comment.active");
      if (openForm == null) {
        replyForms[0].classList.add("active");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.comment {
  border: 1px solid #cfcfcf;
  margin-bottom: 1vw;
  padding: 0.8vw;
  color: #fff;

  .comment-name::first-letter {
    text-transform: uppercase;
  }

  .openLink {
    color: #000;
    float: right;
    cursor: pointer;
    &:before {
      content: "Ответить";
    }
  }

  .openLink.active:before {
    content: "Закрыть";
  }
}
</style>
