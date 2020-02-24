<template>
  <div class="locale-changer">
    <label>
      <select v-model="$i18n.locale" class="locale-changer">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
          {{ lang }}</option
        >
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: "LocaleChanger",
  data: function() {
    return {
      langs: ["ru", "en"]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_mixins.scss";

.locale-changer {
  background-color: $c-mediumseagreen;
  color: #fff;
  border-radius: 1rem;
  outline: none;
  padding: 0.1rem;
  width: 3rem;
}
</style>
