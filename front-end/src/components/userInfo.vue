<template>
  <div class="userInfo">
    <img :src="userImage" alt="user-image'" class="userImage" />
    <h2>
      {{ this.$store.getters.USER_NAME }}
    </h2>
    <p>
      {{ this.$store.getters.USER_EMAIL }}
    </p>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  props: {
    name
  },
  data: function() {
    return {
      userImage: this.$store.getters.USER_DEFAULT_IMAGE,
    };
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
