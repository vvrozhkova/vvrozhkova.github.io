<template>
  <a id="button" v-on:click="animate" v-scroll="handleScroll">
    <i class="fas fa-chevron-up"></i>
  </a>
</template>

<script>
export default {
  directives: {
    scroll: {
      inserted: function(el, binding) {
        let fun = function(evt) {
          if (document.getElementById("button") == null) {
            window.removeEventListener("scroll", fun);
          } else {
            binding.value(evt, el);
          }
        };
        window.addEventListener("scroll", fun);
      }
    }
  },
  methods: {
    handleScroll: function(evt, el) {
      if (window.scrollY > 100) {
        el.classList.add("show");
      } else {
        el.classList.remove("show");
      }
    },
    animate: function(event) {
      var scrollStep = -window.scrollY / (300 / 15),
        scrollInterval = setInterval(function() {
          if (window.scrollY != 0) {
            window.scrollBy(0, scrollStep);
          } else clearInterval(scrollInterval);
        }, 15);
    }
  }
};
</script>

<style lang="scss" scoped>
#button {
  display: inline-block;
  background-color: var(--primary-color);
  width: 50px;
  height: 50px;
  text-align: center;
  border-radius: 4px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  transition: background-color 0.3s, opacity 0.5s, visibility 0.5s;
  opacity: 0;
  visibility: hidden;
  z-index: 1000;
  font-size: 2rem;
}
#button:hover {
  cursor: pointer;
  background-color: #333;
}
#button:active {
  background-color: #555;
}
#button.show {
  opacity: 1;
  visibility: visible;
}
</style>