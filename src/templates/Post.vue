<template>
  <!-- <PostLayout :subtitles="subtitles" :post="$page.post" :links="links"> -->
    <VueRemarkContent class="post mb"></VueRemarkContent>
  <!-- </PostLayout> -->
</template>

<script>
// import PostLayout from "@/layouts/PostLayout.vue";
// import links from '@/data/doc-links.yaml'

export default {
  components: {
    PostLayout
  },
  computed: {
    links() {
      return links
    },
    subtitles() {
      // Remove h1, h4, h5, h6 titles
      let subtitles = this.$page.post.subtitles.filter(function(
        value,
        index,
        arr
      ) {
        return [2, 3].includes(value.depth);
      });
      return subtitles;
    }
  },
  metaInfo() {
    const { title, headings } = this.$page.post;
    return {
      title: title || (headings.length ? headings[0].value : undefined)
    };
  }
};
</script>

<page-query>

  query Post ($path: String!) {
    post: post (path: $path) {
        title
        content
        description
        color
        category{
            id
            title
            path
        }
        date
        imagewords
        path
        image
        headings(depth: h2){
            value
            anchor
        }
        subtitles: headings {
      depth
      value
      anchor
    }
        tags{
            id
            title
            path
        }
    }

    comments: allComment(sortBy: "date", filter:{post:{eq: $path}}){
      edges{
        node{
          id
          name
          path
          post
          replies
          content
          date
        }
      }
    }
  }
    
</page-query>

