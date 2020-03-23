<template>
  <div class="userPreview">
    <img v-if="userImage" :src="userImage" class="userImage" alt="user-image" />
    <img
            v-else
            src="../assets/default-user-image.png"
            alt="user-image"
            class="userImage"
    />
    <p class="userName">{{ userName }}</p>
  </div>
</template>

<script>
import { getUser } from "../helpers/api";

export default {
  name: "UserPreview",
  created() {
    getUser(this.id).then(result => (this.currentUser = result.data));
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentUser: {}
    };
  },
  computed: {
    userName() {
      return this.currentUser.name;
    },
    userImage() {
      return this.currentUser.image;
    }
  }
};
</script>

<style lang="scss" scoped>
.userPreview {
  box-sizing: border-box;
  display: flex;
  margin: 0 1rem;
  padding: 1rem 0;
}
.userImage {
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
}
</style>
