<template>
  <div class="shadow__sidebar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ShadowScreen"
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
  opacity: 0.7;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
</style>
