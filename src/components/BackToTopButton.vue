<template>
  <a id="button">
    <i class="fas fa-chevron-up"></i>
  </a>
</template>

<script>
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;

export default {
  mounted() {
    var btn = $("#button");
      $(window).scroll(function() {
        console.log($(window).scrollTop());
        if ($(window).scrollTop() > 100) {
          btn.addClass("show");
        } else {
          btn.removeClass("show");
        }
      });

      btn.on("click", function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "300");
      });
    }
};
</script>

<style scoped>
#button {
  display: inline-block;
  background-color: #0052cc;
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
/* #button::after {
  content: "\f077";
  font-family: FontAwesome;
  font-weight: normal;
  font-style: normal;
  font-size: 2em;
  line-height: 50px;
  color: #fff;
} */
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