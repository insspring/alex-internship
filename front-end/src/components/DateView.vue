<template>
  <div class="dateView">
    {{
      day ? "0" + (new Date(date).getDay() + 1) : new Date(date).getDay() + 1
    }}.{{
      month
        ? "0" + (new Date(date).getMonth() + 1)
        : new Date(date).getMonth() + 1
    }}.{{ new Date(date).getFullYear() }}
    {{ $t("in") }}
    {{
      hours
        ? "0" + (new Date(date).getHours() + 1)
        : new Date(date).getHours() + 1
    }}.{{
      minutes
        ? "0" + (new Date(date).getMinutes() + 1)
        : new Date(date).getMinutes() + 1
    }}
  </div>
</template>

<script>
export default {
  name: "DateView",
  props: {
    date: {
      type: Number,
      required: true
    }
  },
  computed: {
    day() {
      return new Date(this.date).getDay() + 1 < 10;
    },
    month() {
      return new Date(this.date).getMonth() + 1 < 10;
    },
    hours() {
      return new Date(this.date).getHours() + 1 < 10;
    },
    minutes() {
      return new Date(this.date).getMinutes() + 1 < 10;
    }
  }
};
</script>

<style scoped></style>
