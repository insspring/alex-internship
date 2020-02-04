<template>
  <div class="home">
    <HeaderLayout></HeaderLayout>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import HeaderLayout from "../components/HeaderLayout";

export default {
  name: "home",
  components: {
    HeaderLayout,
    HelloWorld
  }
};
</script>
