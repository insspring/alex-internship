<template>
  <div class="bookPreview">
    <img :src="src" class="bookImage" />
    <div class="aboutBook">
      <h2>
        {{ title }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrewievBook",
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.bookImage {
  width: 10rem;
}
</style>
