<template>
  <div class="shadow__sidebar">
    <div class="sidebar"></div>
  </div>
</template>

<script>
export default {
  name: "SidebarMenu"
};
</script>

<style scoped>
/*.shadow__sidebar {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 101;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}*/

.sidebar {
  position: fixed;
  top: 0;
  right: -100%;
  width: 280px;
  height: 100%;
  z-index: 102;
  background-color: #6d3d32;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
</style>
