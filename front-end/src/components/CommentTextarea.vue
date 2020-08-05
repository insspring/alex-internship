<template>
  <textarea class="commentTextarea" :value="value" @input="resize" />
</template>

<script>
export default {
  name: "CommentTextarea",
  mounted() {
    this.$nextTick(() => {
      this.$el.setAttribute("style", `height: ${this.$el.scrollHeight}px`);
    });
  },
  props: {
    value: {
      type: String,
      required: true
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
@import "../scss/variables";

.commentTextarea {
  background-color: $c-alabaster;
  border: none;
  border-bottom: 1px solid $c-danube;
  outline: none;
  resize: none;
  width: 100%;
}
</style>
