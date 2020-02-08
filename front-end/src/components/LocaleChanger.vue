<template>
  <div class="locale-changer">
      <label>
          <select v-model="$i18n.locale">
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

<style scoped></style>
