<template>
  <div class="progress fixed-top" style="height: 3px;">
    <div
      class="progress-bar"
      id="progress-bar"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (isDisplayed(document.getElementById("progress-bar"))) {
      var winHeight = window.innerHeight,
        docHeight = document.body.clientHeight,
        progressBar = document.getElementById("progress-bar"),
        max,
        value;
      max = docHeight - winHeight;
      value = (winHeight * 100) / docHeight;

      window.addEventListener("scroll", function() {
        var winHeight = window.innerHeight;
        var docHeight = document.body.clientHeight;
        var max = docHeight - winHeight;

        value = (window.scrollY * 100) / max;
        document
          .getElementById("progress-bar")
          .setAttribute("style", "width:" + value + "%");
      });
    }
  }
};

function isDisplayed(element) {
  element.offsetWidth > 0 || element.offsetHeight > 0;
}
</script>

<style scoped>
.progress-bar {
  background-color: #252f6f;
}
</style>