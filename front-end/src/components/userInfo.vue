<template>
  <div class="userInfo">
    <img src="../assets/user-image.jpg" alt="user-image" class="userImage" />
    <h2>
      {{ this.$store.getters.USER_NAME }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  props: {
    name
  },
  data: function() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.userInfo {
  box-shadow: 0 0 1rem #000;
  border-radius: 1rem;
  padding: 1rem;
}

.userImage {
  border-radius: 50%;
  width: 5rem;
}
</style>
