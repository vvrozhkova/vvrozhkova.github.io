<template>
    <div class="search col-xl-3">
        <search-focus @keyup="focusSearch"></search-focus>
        <div class="search__box">
            <i class="search__icon fas fa-search"></i>
            <input @blur="blur"
                   @focus="searchResultsVisible = true"
                   @input="softReset"
                   @keydown.down.prevent="highlightNext"
                   @keydown.up.prevent="highlightPrev"
                   @keyup="performSearch"
                   @keyup.enter="gotoLink"
                   @keyup.esc="searchResultsVisible = false"
                   class="search__input neon_blue"
                   placeholder="Search (Press  &quot;/&quot; to focus)"
                   ref="search" type="text" v-model="query">
            <div @click="reset" class="search__close-icon" v-if="query.length > 0 && searchResultsVisible">&times;</div>
        </div>

        <transition name="fade">
            <div class="search-results" ref="results" v-if="query.length > 0 && searchResultsVisible">
                <g-link :key="index" :to="post.item.path" @click="reset"
                        class="search-result__link" v-for="(post, index) in results">
                    <div :class="{ 'search-highlighted' : index === highlightedIndex }" class="search-result">
                        <span class="search-result__title">
                            {{post.item.title}}
                        </span><br>
                        <span class="search-result__description">
                            {{ post.item.description }}
                        </span>
                    </div>
                </g-link>
                <div class="search-result__null" v-if="results.length === 0">
                    <p class="my-0">No results for '<strong>{{ query }}</strong>'</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import axios from 'axios'
    import SearchFocus from './SearchFocus'

    export default {
        components: {
            SearchFocus,
        },
        created() {
            axios('/search.json').then(response => {
                this.posts = response.data
            }).catch(error => {
                console.log(error);
            })
        },
        data() {
            return {
                query: '',
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
                    keys: ['title', 'content', 'description']
                }
            }
        },
        methods: {
            blur() {
                this.query = '';
                this.searchResultsVisible = false
            },
            reset() {
                this.query = '';
                this.highlightedIndex = 0
            },
            softReset() {
                this.highlightedIndex = 0;
                this.searchResultsVisible = true
            },
            performSearch() {
                this.$search(this.query, this.posts, this.options).then(results => {
                    this.results = results
                })
            },
            highlightPrev() {
                if (this.highlightedIndex > 0) {
                    this.highlightedIndex = this.highlightedIndex - 1;
                    this.scrollIntoView()
                }
            },
            highlightNext() {
                if (this.highlightedIndex < this.results.length - 1) {
                    this.highlightedIndex = this.highlightedIndex + 1;
                    this.scrollIntoView()
                }
            },
            scrollIntoView() {
                this.$refs.results.children[this.highlightedIndex].scrollIntoView({block: 'nearest'})
            },
            gotoLink() {
                if (this.results[this.highlightedIndex]) {
                    window.location = this.results[this.highlightedIndex].item.path
                }
            },
            focusSearch(e) {
                if (e.key === '/') {
                    this.$refs.search.focus()
                }
            },

        }
    }
</script>

<style scoped>
    .search__box {
        width: 100%;
        position: relative;
        border-bottom: 2px solid lightgrey;
        height: 2em;
        margin-top: 1em;
    }

    .search__box:focus-within {
        border-bottom: 2px solid rgb(83, 161, 224);
        transition: border 0.56s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .search__icon {
        position: absolute;
        font-size: 1.3rem;
    }

    .search__close-icon {
        position: absolute;
        font-size: 1.5rem;
        right: 0;
        cursor: pointer;
    }

    .search__input {
        top: -2.2em;
        position: absolute;
        left: 1em;
        width: 85%;
        border: none;
        outline: none;
        height: 2em;
        margin: 2em 1em;
        color: lightgray;
    }

    .search-results {
        top: 2.5em;
        max-height: 20em;
        overflow: scroll;
        border-radius: 0.5em;
        position: absolute;
        width: 85%;
        background-color: #fff;
        border: 0 solid #e2e8f0;
        z-index: 1500000;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .6);
    }

    .search-result {
        border-bottom: 1px solid grey;
        padding: 0.5em;
    }

    .search-result__null {
        padding: 0.5em;
    }

    .search-result__link, .search-results {
        color: black;
        text-decoration: none;
    }

    .search-result__title {
        font-weight: bold;
        font-size: 1.2rem;
        color: #3f51b5;
    }

    .search-result__description {
        font-weight: 300;
        font-family: "Roboto", sans-serif;
        font-size: 0.8vw;
        line-height: 0.8vw;
    }

    .search-highlighted, .search-result__link:hover .search-result {
        background-color: #b2b9e1;
    }

    fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>