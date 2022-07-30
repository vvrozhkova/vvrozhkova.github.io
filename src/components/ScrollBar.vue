<template>
  <div class="progress fixed-top" style="height: 3px;">
    <div
      class="progress-bar"
      id="progress-bar"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      v-scroll="handleScroll"
    ></div>
  </div>
</template>

<script>
export default {
  directives: {
    scroll: {
      inserted: function(el, binding) {
        let f = function(evt) {
          if (el.clientHeight > 0) {
            el.setAttribute("style", binding.value(evt, el));
          } else {
            window.removeEventListener("scroll", f);
          }
        };
        window.addEventListener("scroll", f);
      }
    }
  },
  methods: {
    handleScroll: function(evt, el) {
      var winHeight = window.innerHeight;
      var docHeight = document.body.clientHeight;
      var max = docHeight - winHeight;
      var value = (window.scrollY * 100) / max;
      return "width:" + value + "%";
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-bar {
  background-color: var(--primary-color);
}

.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}

.progress {
  display: -webkit-box;
  display: flex;
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
}
</style>