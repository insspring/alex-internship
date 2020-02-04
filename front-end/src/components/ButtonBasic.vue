<template>
  <button class="button" @click="onClick(this.methodArguments)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonBasic",
  props: {
    onClick: {
      method: Function,
      methodArguments: Array,
      text: String
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
