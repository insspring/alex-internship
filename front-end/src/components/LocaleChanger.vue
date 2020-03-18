<template>
  <div class="locale-changer">
    <label>
      <select v-model="$i18n.locale" class="locale-changer">
        <option
          v-for="(lang, i) in langs"
          :key="`Lang${i}`"
          :value="lang.value"
        >
          {{ lang.text }}</option
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
      langs: [
        { text: "Русский", value: "ru" },
        { text: "English", value: "en" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.locale-changer {
  background-color: #fff;
  color: #000;
  border: none;
  font-size: x-large;
  font-weight: bolder;
  outline: none;
  padding: 0.1rem;
}
</style>
