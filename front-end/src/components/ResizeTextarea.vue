<template>
  <textarea class="resizeTextarea" :value="value" @input="resize" />
</template>

<script>
export default {
  name: "ResizeTextarea",
  mounted() {
    this.$nextTick(() => {
      this.$el.setAttribute("style", `height: ${this.$el.scrollHeight}px`);
    });
  },
  props: {
    value: {
      type: String,
      required: true,
      default: ""
    }
  },
  methods: {
    resize(event) {
      this.$emit("input", event.target.value);
      this.mixin_autoResize_resize(event);
    },
    mixin_autoResize_resize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  }
};
</script>

<style lang="scss" scoped>
.resizeTextarea {
  border: none;
  resize: none;
}
</style>
