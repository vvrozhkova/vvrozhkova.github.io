<template>
  <div>
    <CommentItem :comment="comment" />
    <AddCommentForm
      class="replyForm"
      :id="'reply-'+comment.id"
      :pageSlug="pageSlug"
    />
    <div class="children">
      <comment
        class="comment-child"
        v-for="reply in getNavItems(comment.id)"
        :key="reply.node.id"
        :comment="reply.node"
        :comments="comments"
        :pageSlug="pageSlug"
      />
    </div>
  </div>
</template>

<script>
import CommentItem from "~/components/CommentItem.vue";
import AddCommentForm from "~/components/AddCommentForm.vue";
import Comment from "~/components/Comment.vue";

export default {
  components: {
    Comment,
    CommentItem,
    AddCommentForm
  },
  props: ["comment", "comments", "pageSlug"],
  name: "Comment",
  methods: {
    getNavItems(parentId) {
      return this.comments.filter(edge => {
        // console.log("parentId: "+parentId);
        // console.log("edge.replies: "+edge.node.replies);
        return edge.node.replies === parentId;
      });
    }
  }
};
</script>

<style lang="scss" >
.comment-child .comment {
  margin-left: 60px;
  background: #dee3e6;
  border-radius: 10px 0px 10px 10px;
}

.parent-comment > .comment:first-child {
  border-radius: 0px 10px 10px 10px;
}
</style>

