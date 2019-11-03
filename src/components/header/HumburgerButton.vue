<template>
  <div class="collapsed-menu-toggler">
    <input id="collapsed-menu-toggler__chckbx" type="checkbox" />
    <label
      class="collapsed-menu-toggler__btn"
      v-on:click="openMenu"
      for="collapsed-menu-toggler__chckbx"
    >
      <span></span>
    </label>
  </div>
</template>

<script>
export default {
  methods: {
    openMenu: function(e) {
      var menu_box = document.getElementsByClassName("collapsed-menu")[0];

      menu_box.classList.toggle("active");
      if (menu_box.offsetHeight > 0) {
        document.getElementsByClassName("post-table-content")[0].style =
          "top: 25vw !important;";
      } else {
        document.getElementsByClassName("post-table-content")[0].style = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .collapsed-menu-toggler {
    display: none;
  }
}

.collapsed-menu-toggler__btn {
  span::before {
    top: -2vw;
  }

  span::after {
    top: 2vw;
  }

  span,
  span::before,
  span::after {
    transition-duration: 0.25s;
    content: "";
    display: block;
    position: absolute;
    width: 7vw;
    height: 0.6vw;
    background-color: #fff;
  }
}

#collapsed-menu-toggler__chckbx {
  opacity: 0;
  height: 0;
  &:checked ~ {
    .menu__btn > span {
      transform: rotate(45deg);
    }

    .menu__btn > span::before {
      top: 0;
      transform: rotate(0);
    }

    .menu__btn > span::after {
      top: 0;
      transform: rotate(90deg);
    }
  }
}

.collapsed-menu-toggler__btn {
  display: flex;
  align-items: center;
  width: 7vw;
  height: 7vw;
  cursor: pointer;
  z-index: 1;
  margin: auto;
}
</style>

