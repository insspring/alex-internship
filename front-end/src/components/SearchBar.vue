<template>
    <div class="searchBar">
        <div class="search">
            <label>
                <input class="searchInput" v-model="searchText" v-on:keyup="showSuggest" v-on:focus="nowSearch = true" v-on:focusout="nowSearch = false">
            </label>
            <img src="../assets/search-icon.svg" alt="search" class="searchIcon">
        </div>
        <div class="searchSuggestions" v-if="nowSearch">
            <div class="searchResult" v-for="suggest in suggested.slice(0, 10)" :key="suggest.id">
                {{ suggest.title || suggest.name || suggest.hashtags}}
            </div>
            <div class="result">
                <p class="resultText">
                    {{ $t('showing') }} {{ suggested.slice(0, 10).length }} {{ $t('outOf') }} {{ suggested.length }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "SearchBar",
        created() {

        },
        computed: {
            suggested() {
                return this.$store.getters.SUGGEST_RESULT;
            }
        },
        data() {
            return {
                searchText: "",
                nowSearch: false,
                count: 0
            }
        },
        methods: {
            showSuggest() {
                if (this.searchText) {
                    let results = [];
                    axios.get(`/users?name_like=${this.searchText}`).then(result => {
                        results = result.data;
                        axios.get(`/books?title_like=${this.searchText}`).then(result => {
                            for (let i = 0; i < result.data.length; i++) {
                                results.push(result.data[i]);
                            }
                            axios.get(`/books?hashtags_like&q=${this.searchText}`).then(result => {
                                for (let i = 0; i < result.data.length; i++) {
                                    results.push(result.data[i]);
                                }
                                this.$store.commit("SET_SUGGEST_RESULT", results);
                            });
                        });
                    });
                } else {
                    this.$store.commit("SET_SUGGEST_RESULT", "");
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../scss/_variables.scss";

    .searchBar {
        display: flex;
        flex-direction: column;
    }

    .search {
        align-items: center;
        background-color: #fff;
        border-radius: 0.5rem;
        display: flex;
        padding: 0.3rem 0.6rem;
    }

    .searchInput {
        border: none;
        outline: none;
        padding: 0.3rem 0.6rem;
        transition: 0.5s width;
        width: 5rem;

        &:focus {
            width: 15rem;
        }
    }

    .searchIcon {
        width: 2rem;
    }

    .searchResult {
        background-color: #fff;
        display: flex;
        align-items: center;
        height: 3rem;

        &:hover {
            background-color: $c-aliceBlue;
        }
    }

    .result {
        justify-content: center;
        align-items: center;
        align-content: center;
        background-color: $c-aliceBlue;
        height: auto;
    }

    .resultText {
        padding: 1rem;
        margin: 0;
    }
</style>