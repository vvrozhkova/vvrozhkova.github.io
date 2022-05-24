
<template>
  <footer class="text-center">
    <div id="counter"></div>
    <div class="copyright">
      © Виктория Рожкова, 2022
      <br />Коммерческое использование материалов сайта TestAutomation.Space запрещено. В
      остальных случаях обязательно наличие индексируемой ссылки со словом "Источник" на сайт или на страницу,
      содержащую этот материал.
    </div>
    <div class="social">
      <i class="far fa-envelope"></i> Почта для связи:
      <br />
      <span class="white">vvrozhkova@gmail.com</span>
      <br />
      <!-- <i class="fab fa-vk"></i> группа:
      <a
        target="_blank"
        href="https://vk.com/testautomation.space_community"
      >https://vk.com/testautomation.space_community</a>
      <br /> -->
      <i class="fab fa-vk"></i>:
      <a
        target="_blank"
        href="https://vk.com/testautomation.space"
      >https://vk.com/testautomation.space</a>
    </div>
  </footer>
</template>
<script>
export default {
  mounted() {
    document.getElementById("counter").innerHTML =
      '<a href="//www.liveinternet.ru/click" ' +
      'target="_blank"><img src="//counter.yadro.ru/hit?t14.1;r' +
      escape(document.referrer) +
      (typeof screen == "undefined"
        ? ""
        : ";s" +
          screen.width +
          "*" +
          screen.height +
          "*" +
          (screen.colorDepth ? screen.colorDepth : screen.pixelDepth)) +
      ";u" +
      escape(document.URL) +
      ";h" +
      escape(document.title.substring(0, 150)) +
      ";" +
      Math.random() +
      '" alt="" title="LiveInternet: показано число просмотров за 24' +
      ' часа, посетителей за 24 часа и за сегодня" ' +
      'border="0" style="width:5vw;"></a>';
  }
};
</script>

<style lang="scss">
#counter, .social, .copyright{
  display: inline-block;
  margin-right: 1em;
  a{
    color: #7a7a8c;
    text-decoration: none;
  }
}

@media screen and (min-width: 850px) {
  footer {
    font-size: 0.75rem;
  }
}

@media screen and (max-width: 850px) {
  footer {
    font-size: 0.5rem;
  }
}

footer {
  background-color: var(--bg);
  border-top: 1px solid var(--border-color);
  margin-top: -1px;
  padding: 20px;
  z-index: 10;
}
</style>