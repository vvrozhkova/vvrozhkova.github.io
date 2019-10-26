<template>
  <footer class="container-fluid">
    <!-- <div class="container-fluid"> -->
    <div class="row">
      <!-- <div class="social col-3">
      <a href="https://vk.com/testautomation.space">
        <i class="fab fa-vk"></i>
      </a>
      <a href>
        <i class="fab fa-twitter"></i>
      </a>
      <a href>
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href>
        <i class="fab fa-instagram"></i>
      </a>
      <a href>
        <i class="fab fa-telegram-plane"></i>
      </a>
      </div>-->
      <div class="footer-description col-9 text-center">
        © Виктория Рожкова, 2014-2019
        <br />Коммерческое использование материалов сайта TestAutomation.Space запрещено. В
        остальных случаях обязательно наличие индексируемой ссылки со словом "Источник" на сайт или на страницу,
        содержащую этот материал.
      </div>

      <div class="col-3">
        <i class="far fa-envelope"></i> Почта для связи:
        <br />
        <span class="white">vvrozhkova@gmail.com</span>
        <br />
        <i class="fab fa-vk"></i> группа:
        <a
          target="_blank"
          href="https://vk.com/testautomation.space_community"
        >https://vk.com/testautomation.space_community</a>
        <br />
        <i class="fab fa-vk"></i> страница:
        <a
          target="_blank"
          href="https://vk.com/testautomation.space"
        >https://vk.com/testautomation.space</a>
      </div>
    </div>
    <!-- </div> -->
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style scoped>
.fab {
  width: 1.5em;
  /*height: 2em;*/
}

.social a:hover {
  border: 1px solid #0052cc;
}

.social a,
.socialBtn {
  border: 1px solid #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  padding: 3px;
  text-align: center;
  margin-right: 0.5vw;
  display: inline-table;
}

.social {
  margin: 1vw 0vw;
}

footer  {
  position: absolute;
  bottom: 0;
  background-color: #252f6f;
  color: #7a7a8c;
  padding-bottom: 1vw;
  padding-top: 1vw;
  font-size: 0.8vw;
}

.footer-description {
  /* margin: auto; */
  font-size: 1vw;
}
</style>
