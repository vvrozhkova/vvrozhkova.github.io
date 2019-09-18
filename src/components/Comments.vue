<template>
  <div class="comments">
    <hr />
    <h2>Комментарии</h2>
    <AddCommentForm class="active" :pageSlug="pageSlug"/>
    <div id="commentsToDisplay">
      <comment
        class="parent-comment"
        v-for="edge in getNavItems('')"
        :key="edge.node.id"
        :comment="edge.node"
        :comments="comments"
        :pageSlug="pageSlug"
      />
    </div>
  </div>
</template>


<script>
import AddCommentForm from "~/components/AddCommentForm.vue";
import Comment from "~/components/Comment.vue";

export default {
  components: {
    AddCommentForm,
    Comment
  },
  props: ["comments", "pageSlug"],
  name: "Comments",
  methods: {
    getNavItems(parentId) {
      return this.comments.filter(edge => {
        // console.log(parentId);
        return edge.node.replies === parentId;
      });
    }
  }
};
</script>

<style>
/* .comments {
        width: 50%;
        margin: 0 auto;
        color: black;
    } */

.comment-child {
  margin-left: 60px;
}

#commentsToDisplay {
  margin-top: 2vw;
}
</style>