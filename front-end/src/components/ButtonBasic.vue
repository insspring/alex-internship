<template>
  <button class="button" @click="method()">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonBasic",
  props: {
    method: {
      type: Function,
    },
    methodArguments: {
      type: Array
    },
    text: {
      type: String
    }
  },
  methods: {
    activePopup () {

    }
  }
};
</script>

<style scoped>
.button {
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  margin: 1rem;
  padding: 0.5rem 1rem;
}
</style>
