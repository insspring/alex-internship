<template>
  <div class="uploadInput">
    <input type="file" id="user_image" class="inputFile" />
    <label for="user_image">{{ $t("chooseFile") }} </label>
  </div>
</template>

<script>
export default {
  name: "UploadInput"
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.inputFile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputFile + label {
  font-size: 1.25em;
  font-weight: 700;
  display: inline-block;
}

.inputFile:focus + label,
.inputFile + label:hover {
  color: #000;
}

.inputFile + label {
  cursor: pointer;
}
</style>
