<template>
  <button
          class="button"
          @click="isActive">
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
    },
  },
  methods: {
    isActive() {
      this.method(...this.methodArguments);
    },
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
