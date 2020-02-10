<template>
  <div class="sidebar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "RightSidebarMenu"
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
.sidebar {
  position: fixed;
  top: 0;
  right: -100%;
  width: 280px;
  height: 100%;
  z-index: 102;
  -webkit-transition: all 1.3s ease;
  transition: all 1.3s ease;
}
</style>
