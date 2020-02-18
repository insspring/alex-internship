<template>
  <div class="userSettings">
    <label>
      <img src="../assets/settings/edit.svg" alt="Edit" class="icon" />
      <router-link :to="'/feed'">Edit profile</router-link>
    </label>
    <label>
      <img src="../assets/settings/logout.svg" alt="Log Out" class="icon" />
      <router-link :to="'/feed'">Log Out</router-link>
    </label>
  </div>
</template>

<script>
export default {
  name: "userSettings"
};
</script>

<style lang="scss" scoped>
.userSettings {
  box-shadow: 0 0 1rem #000;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.icon {
  width: 2rem;
}
</style>
