<template>
  <div class="shadow__sidebar" @click="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ShadowScreen",
  props: {
    method: {
      type: Function
    }
  },
  methods: {
    isActive() {
      this.method();
    }
  }
};
</script>

<style scoped>
.shadow__sidebar {
  position: fixed;
  width: 100%;
  height: 100%;
  display: grid;
  left: 0;
  top: 0;
  z-index: 101;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
