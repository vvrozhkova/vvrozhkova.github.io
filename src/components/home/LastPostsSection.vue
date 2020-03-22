<template>
  <Section>
    <div class="home-last-articles">
      <g-link
        v-for="article in $static.lastPosts.edges"
        :key="article.node.id"
        :to="article.node.path"
        target="_blank"
      >
        <span class="home-last-article__title">
          {{article.node.title}}
          <span class="home-last-article__title-arrow">&nbsp;→</span>
        </span>
        <span class="home-last-article__tag">
          {{new Date(article.node.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric"
          })}}
        </span>
      </g-link>
    </div>
  </Section>
</template>

<style scoped>
.home-last-articles {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin: 0 -1px;
}

@media screen and (min-width: 850px) {
  a {
    width: 25%;
  }
  .home-last-article__title {
    font-size: 1vw;
    line-height: 1.4em;
    /* line-height: 28px; */
  }
}

@media screen and (max-width: 850px) {
  a {
    width: 50%;
  }
  .home-last-article__title,
  .home-last-article__tag {
    font-size: 3.5vw;
    line-height: 1.4em;
  }
}

a {
  color: hsla(0, 0%, 100%, 0.6);
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background: transparent;
  outline: none;
  border-right: 1px solid hsla(0, 0%, 100%, 0.2);
  min-height: 15vh;
  padding: 16px 24px;
  margin: 0;
}

.home-last-articles a {
  color: #6b70fc;
  text-decoration: none;
}

.home-last-article__title {
  color: #fff;
  font-weight: 400;
  font-style: normal;
}

a.home-last-article,
a.home-last-article:any-link {
  color: hsla(0, 0%, 100%, 0.6);
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background: transparent;
  outline: none;
  border-right: 1px solid hsla(0, 0%, 100%, 0.2);
  min-height: 138px;
  padding: 16px 24px;
  margin: 0;
  width: 25%;
}
</style>


<static-query>
query {
  lastPosts: allPost(sortBy: "date", limit: 4) {
    edges {
      node {
        id
        title
        date
        path
      }
    }
  }
}
</static-query>