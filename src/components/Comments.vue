<template>
  <div class="comments">
    <hr />
    <h2>Комментарии</h2>
    <AddCommentForm class="active"/>
    <div id="commentsToDisplay">
      <comment
        class="parent-comment"
        v-for="edge in getNavItems('')"
        :key="edge.node.id"
        :comment="edge.node"
        :comments="comments"
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
  props: ["comments"],
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