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
    <ButtonGreen
            :text="$t('editBook')"
            :method="activePopupBooks"
            class="button--green"
    ></ButtonGreen>
    <AddBook v-if="activeBooks"
             :action="$t('editBook')"
             :button="$t('edit')"
             :action-book="$t('editedBook')"></AddBook>
  </div>
</template>

<script>
import { getbook } from "../helpers/api";
import AddBook from "./AddBook";
import ButtonGreen from "./ButtonGreen";

export default {
  name: "BookDescription",
  components: {ButtonGreen, AddBook},
  data() {
    return {
      id: this.$router.currentRoute.params["id"],
      title: "",
      author: "",
      description: "",
      userImage: "",
      activeBooks: false
    };
  },
  async created() {
    const response = await getbook(this.id).then(result => result.data);
    this.userImage = response.cover;
    this.title = response.title;
    this.author = response.author;
    this.description = response.description;
  },
  methods: {
    activePopupBooks() {
      this.activeBooks = true;
    },
  }
};
</script>

<style lang="scss" scoped>
  .bookPreview {
    margin: 3rem;
  }
  .aboutBook {
    font-size: xx-large;
  }
</style>
