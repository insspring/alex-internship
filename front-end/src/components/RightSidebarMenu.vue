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
.sidebar {
  justify-self: end;
  width: 100px;
  height: 100%;
  z-index: 102;
  background-color: #dcdd12;
}
</style>
