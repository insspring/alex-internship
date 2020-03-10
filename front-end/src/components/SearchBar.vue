<template>
  <div class="searchBar" id="search">
    <div class="search">
      <label>
        <input
          class="searchInput"
          v-model="searchText"
          v-on:keyup="showSuggest"
        />
      </label>
      <img src="../assets/search-icon.svg" alt="search" class="searchIcon" />
      <p>
        {{ nowSearch }}
      </p>
    </div>
    <div class="searchSuggestions" v-if="nowSearch">
      <div
        class="searchResult"
        v-for="suggest in suggested.slice(0, 5)"
        :key="suggest.date || suggest.id"
        v-on:click="openPage(suggest.id, suggest)"
      >
        <img :src="suggest.image || suggest.cover" class="resultImage" />
        <div class="resultInfo">
          <p>
            {{ suggest.name || suggest.title }}
          </p>
          <p>
            {{ suggest.author || "user" }}
          </p>
        </div>
      </div>
      <div class="result">
        <p class="resultText">
          {{ $t("showing") }} {{ suggested.slice(0, 5).length }}
          {{ $t("outOf") }} {{ suggested.length }}
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
    window.addEventListener('click', function(e){
      if (document.getElementById('search').contains(e.target)) {
        this.nowSearch = true;
        alert(this.nowSearch);
      } else {
        this.nowSearch = false;
        alert(this.nowSearch);
      }
    });
  },
  computed: {
    suggested() {
      return this.$store.getters.SUGGEST_RESULT;
    },
    nowSearch() {
      return false;
    }
  },
  data() {
    return {
      searchText: "",

      count: 0
    };
  },
  methods: {
    showSuggest() {
      if (this.searchText) {
        let response = [];
        axios.get(`/users?name_like=${this.searchText}`).then(result => {
          response = result.data;
          axios.get(`/books?title_like=${this.searchText}`).then(result => {
            response = response.concat(result.data);
            axios
              .get(`/books?hashtags_like=${this.searchText}`)
              .then(result => {
                response = response.concat(result.data);
                this.$store.commit("SET_SUGGEST_RESULT", response);
              });
          });
        });
      } else {
        this.$store.commit("SET_SUGGEST_RESULT", "");
      }
    },
    openPage(id, suggest) {
      if (suggest.name) {
        this.$router.push("/user/id" + id);
      } else if (suggest.title) {
        this.$router.push("/book/" + id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../scss/_variables.scss";

  .searchBar {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .search {
    align-items: center;
    background-color: #fff;
    border-radius: 0.5rem;
    box-sizing: border-box;
    display: flex;
    padding: 0.3rem 0.6rem;
  }

  .searchInput {
    border: none;
    box-sizing: border-box;
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

  .searchSuggestions {
    box-sizing: border-box;
    position: absolute;
    top: 3.7rem;
    width: 18.2rem;
  }

  .searchResult {
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 6rem;
    padding: 0.5rem 0;

    &:hover {
      background-color: $c-aliceBlue;
    }
  }

  .resultImage {
    width: 3rem;
  }

  .resultInfo {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
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
