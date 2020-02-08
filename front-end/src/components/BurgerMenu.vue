<template>
  <div class="burger" @click="isActive">
    <a href="#" class="menu-btn">
      <span></span>
    </a>
  </div>
</template>

<script>
export default {
  name: "BurgerMenu",
  props: {
    method: {
      type: Function,
      required: true
    }
  },
  methods: {
    isActive() {
      this.method();
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-btn {
  display: block;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
}
.menu-btn span,
.menu-btn span::before,
.menu-btn span::after {
  position: absolute;
  top: 50%;
  margin-top: -1px;
  left: 50%;
  margin-left: -10px;
  width: 20px;
  height: 2px;
  background-color: #222;
}
.menu-btn span::before,
.menu-btn span::after {
  content: "";
}
.menu-btn span::before {
  transform: translateY(-5px);
}
.menu-btn span::after {
  transform: translateY(5px);
}
</style>
