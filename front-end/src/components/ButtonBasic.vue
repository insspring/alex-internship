<template>
  <button class="button" @click="isActive(methodArguments[0])">
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
    },
    nameAuth: {
      type: String
    }
  },
  methods: {
    isActive: function (name) {
          this.method();
          this.nameAuth = name
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
