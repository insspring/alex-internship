<template>
  <div id="app">
    <div id="nav">
      <HeaderLayout></HeaderLayout>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderLayout from "./components/HeaderLayout";
export default {
  components: { HeaderLayout }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}
</style>
