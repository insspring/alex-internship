<template>
  <div class="stars">
    <div class="rate" v-if="!alreadyRate">
      <a
              class="star"
              :class="{ on: isHover1, off: !isHover1 }"
              title="did not like it"
              href="#"
              @mouseover="mouseOver1"
              @mouseleave="mouseLeave"
              v-on:click="rate(1)"
              id="1"
      ></a>
      <a
              class="star"
              :class="{ on: isHover2, off: !isHover2 }"
              title="it was ok"
              href="#"
              @mouseover="mouseOver2"
              @mouseleave="mouseLeave"
              v-on:click="rate(2)"
              id="2"
      ></a>
      <a
              class="star"
              :class="{ on: isHover3, off: !isHover3 }"
              title="liked it"
              href="#"
              @mouseover="mouseOver3"
              @mouseleave="mouseLeave"
              v-on:click="rate(3)"
              id="3"
      ></a>
      <a
              class="star"
              :class="{ on: isHover4, off: !isHover4 }"
              title="really liked it"
              href="#"
              @mouseover="mouseOver4"
              @mouseleave="mouseLeave"
              v-on:click="rate(4)"
              id="4"
      ></a>
      <a
              class="star"
              :class="{ on: isHover5, off: !isHover5 }"
              title="it was amazing"
              href="#"
              @mouseover="mouseOver5"
              @mouseleave="mouseLeave"
              v-on:click="rate(5)"
              id="5"
      ></a>
    </div>
    <p v-if="alreadyRate">{{ rating }}/5</p>
  </div>
</template>

<script>
  /*import { getbook } from "../helpers/api";*/
  import axios from "axios";

  export default {
    name: "StarRating",
    data() {
      return {
        isHover1: false,
        isHover2: false,
        isHover3: false,
        isHover4: false,
        isHover5: false,
        bookID: this.$route.params.id,
        alreadyRate: false,
      };
    },
    computed: {
      userID() {
        return this.$store.getters.USER_ID;
      },
      book() {
        return this.$store.getters.CURRENT_BOOK;
      },
      rating() {
        return (
                this.book.rating.reduce((a, b) => {
                  return a + b;
                }) / this.book.rating.length
        ).toFixed(2);
      }
    },
    methods: {
      mouseOver1() {
        this.isHover1 = true;
      },
      mouseOver2() {
        this.isHover1 = true;
        this.isHover2 = true;
      },
      mouseOver3() {
        this.isHover1 = true;
        this.isHover2 = true;
        this.isHover3 = true;
      },
      mouseOver4() {
        this.isHover1 = true;
        this.isHover2 = true;
        this.isHover3 = true;
        this.isHover4 = true;
      },
      mouseOver5() {
        this.isHover1 = true;
        this.isHover2 = true;
        this.isHover3 = true;
        this.isHover4 = true;
        this.isHover5 = true;
      },
      mouseLeave() {
        this.isHover1 = false;
        this.isHover2 = false;
        this.isHover3 = false;
        this.isHover4 = false;
        this.isHover5 = false;
      },
      rate(rate) {
        let book = this.book;
        book.rating.push(rate);
        book.whoRate.push(this.userID);
        this.book = book;
        this.$store.commit("SET_CURRENT_BOOK", book);
        axios.put(`/books/${this.bookID}`, book);
        this.alreadyRate = true;
      },
      isAlreadyRate() {
        if (this.book && this.userID) {
          if (this.book.whoRate.some(el => Number(el) === Number(this.userID))) {
            this.alreadyRate = true;
          }
        }
      }
    },
    watch: {
      book() {
        this.isAlreadyRate();
      },
      userID() {
        this.isAlreadyRate();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .stars {
    color: #aaa;
    overflow: hidden;
    width: 75px;
    margin-left: auto;
    margin-right: auto;
    white-space: nowrap;
    display: inline-block;
  }

  .star.on {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAABwElEQVR4Ab2WNbDVQBSGg0uLu+y5wUoqKrxHW0pK3B0q3N11N7hLg9e49A0VLrsXD/lmeK7RnVk95/+/3Mh5z0vafpyRoXSv6FY2spJeONga9YJeKPTHOX+w1Sqksy7wNpeWVYBZF3mbn1WAWRcC/R4M9iugFZ2zIt7mJbXBnOUOtlqe1AZzlu9tPqMEUH2dWG7gciCLGgITi2mmprmgtL2s1V5r5JAzcjzqgTPqfLS/arXcclruOK0eRvv3DYGJkUMuGrR44IUn3jBgwfTCq8M7RgKDuIgOC6ZX0aKDuc6o33kB8YbRwKfij7Va3mUNxRPvxp/5+SH9rJHHWUHxwtNrTgvPjOjgjJxIC8UDLy9uc1pmReJfCYC/0KYrGro0Pi4YTRa1eVRcMJrUYBeodXHBaDL5FycuGE0qqDOqT4qC0Sf5rw3U9IZLn+yiNxRHm+IXy6V6TD8440+syGHNWe08tImg4ZlhbSPx11oF/mF9t5AzYrXAX/GIDaa2VgP+sUatCc9MbdVQPjFyyK3Q4ZGkam36f+Vv4nyX5KJBi0eCz0he88c8vOp3jqtFgxaPeMLzQ3q4oDTTS9nwwKu+2D9N9rM09Bxb/wAAAABJRU5ErkJggg==");
    background-size: 15px;
  }

  .star {
    cursor: pointer;
    background-repeat: no-repeat;
    height: 15px;
    width: 15px;
    float: left;
    font-size: 0 !important;
  }

  .star.off {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAABaUlEQVR4AZ3UtaLUQBgF4MGlxd31JfAH2BfYckvcHSqc6+7ubs31+ipwzgT3BocOm3XfSTY5fzP2xSfCLM/2PtsrnIbXeM05fsRHDqmxGwrK2O0Iy8t+LC87wpzxY844oTuhgsWd9vHFCL5oG2MqjDFlkz7fDhWt59ttYZ6PxTyvuzw3s1iAUlShga3s5gCHMI4vsdjXG+cQB9jNVjSgCqUsYBbc4uNS1kPZL9Z/XCr84Sn+tQX/8lTsp3iIn9Omn41DIj4vN2EyLTz5cpNIzrslqLak1e+WCF1wHH+08A+OW31ZR7T4iLAK9+sw91ti3NZh3LbEfKTDlr+k5xug9PV8gymmJ3axzJW5sX16TDE6Iku/whUYceFrZKzDhKqF+BVaNv58Q8ytjIdGf6mFWmwc8i/hP3lTzYsdV/PkTf7zzxmHtJj3ofiB+1O/f36A4n0tBthtLNde13J2Azq6Rh4TFpHHsCba8wIHb2XVGoaSPQAAAABJRU5ErkJggg==");
    background-size: 15px;
  }

  a {
    color: #00635d;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
</style>
