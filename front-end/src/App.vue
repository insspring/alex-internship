<template>
  <div id="app">
    <div id="nav">
      <HeaderLayout class="authFlow"></HeaderLayout>
    </div>
  </div>
</template>

<script>
import HeaderLayout from "@/components/HeaderLayout";
export default {
  components: {
    HeaderLayout
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
