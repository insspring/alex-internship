<template>
  <div class="bookPreview">
    <img :src="src" class="bookImage" />
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
export default {
  name: "BookDescription",
  props: {
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped></style>
