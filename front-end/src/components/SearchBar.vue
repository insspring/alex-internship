<template>
  <div class="searchBar" id="search">
    <div class="search">
      <label>
        <input
          class="searchInput"
          :class="{ nowSearch: nowSearch }"
          v-model="searchText"
          v-on:keyup="showSuggest"
        />
      </label>
      <img src="../assets/search-icon.svg" alt="search" class="searchIcon" />
    </div>
    <div
      class="searchSuggestions"
      v-show="nowSearch"
      @click="nowSearch = false"
    >
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
import _ from "lodash";

export default {
  name: "SearchBar",
  created() {
    window.addEventListener("click", this.search);
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
    };
  },
  methods: {
    showSuggest: _.debounce(function() {
      this.suggest();
    }, 500),
    suggest() {
      this.$store.commit("SET_SUGGEST_RESULT", []);

      if (this.searchText) {
        axios.get(`/users?name_like=${this.searchText}`).then(result => {
          this.$store.commit(
            "SET_SUGGEST_RESULT",
            this.suggested.concat(result.data)
          );
        });

        axios.get(`/books?title_like=${this.searchText}`).then(result => {
          this.$store.commit(
            "SET_SUGGEST_RESULT",
            this.suggested.concat(result.data)
          );
        });
        axios.get(`/books?hashtags_like=${this.searchText}`).then(result => {
          this.$store.commit(
            "SET_SUGGEST_RESULT",
            this.suggested.concat(result.data)
          );
        });
      }
    },
    search(e) {
      if (document.getElementById("search").contains(e.target)) {
        this.nowSearch = true;
      } else {
        this.nowSearch = false;
      }
    },
    openPage(id, suggest) {
      if (suggest.name) {
        this.$router.push("/user/id" + id);
      } else if (suggest.title) {
        this.$router.push("/book/" + id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_breakpoints.scss";

.searchBar {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.search {
  align-items: center;
  background-color: #fff;
  border: 1px solid $c-lightgray;
  border-radius: 0.2rem;
  box-sizing: border-box;
  display: flex;
  padding: 0.3rem 0.6rem;

  @media only screen and (max-width: $screen-mobile-max) {
    height: 2rem;
    padding: 0 0.3rem;
  }
}

.searchInput {
  border: none;
  box-sizing: border-box;
  outline: none;
  padding: 0.3rem 0.6rem;
  transition: 0.5s width;
  width: 5rem;

  @media only screen and (max-width: $screen-mobile-max) {
    width: 4rem;
  }
}

.nowSearch {
  width: 15rem;

  @media only screen and (max-width: $screen-mobile-max) {
    width: 10rem;
  }
}

.searchIcon {
  width: 2rem;
}

.searchSuggestions {
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 3.7rem;
  width: 18.2rem;

  @media only screen and (max-width: $screen-mobile-max) {
    top: 2.4rem;
    width: 12.6rem;
  }
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
