<template>
  <button class="button" @click="handleClick">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonBasic",
  props: {
    method: {
      type: Function,
      required: true
    },
    methodArguments: {
      type: Array,
      default: () => []
    },
    text: {
      type: String
    }
  },
  methods: {
    handleClick() {
      this.method(...this.methodArguments);
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  margin: 1rem;
  outline: none;
  padding: 0.5rem 1rem;
}
</style>
