<template>
  <div class="bookPreview">
    <img :src="userImage" class="bookImage" />
    <div class="aboutBook">
      <h2>
        {{ title }}
      </h2>
      <p>
        {{ author }}
      </p>
      <p>
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
import { getbook } from "../helpers/api";

export default {
  name: "BookDescription",
  data() {
    return {
      id: this.$router.currentRoute.params["id"],
      title: "",
      author: "",
      description: "",
      userImage: ""
    };
  },
  async created() {
    const response = await getbook(this.id).then(result => result.data);
    this.userImage = response.cover;
    this.title = response.title;
    this.author = response.author;
    this.description = response.description;
  }
};
</script>

<style scoped></style>
