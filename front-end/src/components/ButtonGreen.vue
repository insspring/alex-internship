<template>
  <button class="button" @click="handleClick">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonGreen",
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
@import "../scss/_variables.scss";
@import "../scss/_breakpoints.scss";

.button {
  background-color: $c-mediumseagreen;
  border: none;
  border-radius: 1rem;
  color: #fff;
  cursor: pointer;
  margin: 1rem;
  outline: none;
  padding: 0.5rem 1rem;

  @media only screen and (max-width: $screen-mobile-max) {
    margin: 0;
  }
}
</style>
