<template>
  <div class="header-search">
    <form class="header-search">
      <label>
        <input
          ref="search"
          type="search"
          title="Search"
          placeholder="Search..."
          class="header-search__input"
          @blur="blur"
          @focus="searchResultsVisible = true"
          @input="softReset"
          @keydown.down.prevent="highlightNext"
          @keydown.up.prevent="highlightPrev"
          @keyup="performSearch"
          @keyup.enter="gotoLink"
          @keyup.esc="searchResultsVisible = false"
          v-model="query"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="search-icon feather feather-search"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </label>
    </form>
    <transition name="fade">
      <div class="search-results" ref="results" v-if="query.length > 0 && searchResultsVisible">
        <g-link
          :key="index"
          :to="post.item.path"
          @click="reset"
          class="search-result__link"
          v-for="(post, index) in results"
        >
          <div
            class="search-result__box"
            :class="{ 'search-highlighted' : index === highlightedIndex }"
          >
            <div class="search-category">{{post.item.category.toUpperCase()}}</div>
            <div class="search-description">
              <span class="search-result__title">
                <b>{{post.item.title}}</b>
              </span>
              <br />
              <span class="search-result__description">{{ post.item.description }}</span>
            </div>
          </div>
        </g-link>
        <div class="search-result__null" v-if="results.length === 0">
          <p class="my-0">
            No results for '
            <strong>{{ query }}</strong>'
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    axios("/search.json")
      .then(response => {
        this.posts = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      query: "",
      results: [],
      posts: [],
      highlightedIndex: 0,
      searchResultsVisible: false,
      options: {
        shouldSort: true,
        includeMatches: true,
        matchAllTokens: true,
        findAllMatches: true,
        threshold: 0.1,
        location: 0,
        distance: 10000,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["title", "content", "category", "description"]
      }
    };
  },
  methods: {
    blur() {
      this.query = "";
      this.searchResultsVisible = false;
    },
    reset() {
      this.query = "";
      this.highlightedIndex = 0;
    },
    softReset() {
      this.highlightedIndex = 0;
      this.searchResultsVisible = true;
    },
    performSearch() {
      this.$search(this.query, this.posts, this.options).then(results => {
        this.results = results;
      });
    },
    highlightPrev() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex = this.highlightedIndex - 1;
        this.scrollIntoView();
      }
    },
    highlightNext() {
      if (this.highlightedIndex < this.results.length - 1) {
        this.highlightedIndex = this.highlightedIndex + 1;
        this.scrollIntoView();
      }
    },
    scrollIntoView() {
      this.$refs.results.children[this.highlightedIndex].scrollIntoView({
        block: "nearest"
      });
    },
    gotoLink() {
      if (this.results[this.highlightedIndex]) {
        window.location = this.results[this.highlightedIndex].item.path;
      }
    },
    focusSearch(e) {
      if (e.key === "/") {
        this.$refs.search.focus();
      }
    }
  }
};
</script>

<style lang="scss">
.header-search {
  position: relative;
  display: block;
  margin-bottom: 0;
  font-size: 0.9rem;
  flex: 1;
  width: 50%;
  float: right;
  label {
    display: flex;
    align-items: center;
  }
  .search-icon {
    margin-left: -1.66rem;
    width: 1rem;
    pointer-events: none;
    opacity: 0.6;
  }
}
.search-results {
  background-color: #ffffff;
  color: black;
  position: absolute;
  top: 50px;
  width: 100%;
  border-radius: 5px;
  padding: 0.5vw;

  div {
    padding: 0.2vw;
  }

  .search-category {
    float: left;
    clear: left;
    min-width: 3vw;
    text-align: center;
  }

  .search-description {
    display: flow-root;
    column-count: 1;
    border-left: 1px solid grey;
  }
}

.search-result__link {
  text-decoration: none;
  color: black;
}

.search-highlighted {
  border: 2px solid var(--primary-color);
  border-radius: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>