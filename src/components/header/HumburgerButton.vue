<template>
  <div class="humburger-btn">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" v-on:click="openMenu" for="menu__toggle">
      <span></span>
    </label>
  </div>
</template>

<script>
export default {
  methods: {
    openMenu: function(e) {
      var menu_box = document.getElementsByClassName("menu__box")[0];

      menu_box.classList.toggle("active");
      if (menu_box.offsetHeight > 0) {
        document.getElementsByClassName("post-table-content")[0].style = "top: 25vw !important;";
      } else{
        document.getElementsByClassName("post-table-content")[0].style = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .humburger-btn {
    display: none;
  }
}

.menu__btn {
  span::before {
    top: -1.5vw;
  }

  span::after {
    top: 1.5vw;
  }

  span,
  span::before,
  span::after {
    transition-duration: 0.25s;
    content: "";
    display: block;
    position: absolute;
    width: 5vw;
    height: 0.4vw;
    background-color: #fff;
  }
}

#menu__toggle {
  opacity: 0;
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

/* стилизуем кнопку */
.menu__btn {
  display: flex;
  align-items: center;
  width: 5vw;
  height: 5vw;
  cursor: pointer;
  z-index: 1;
}
</style>

