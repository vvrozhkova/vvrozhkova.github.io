
<template>
  <footer class="text-center">
    © Виктория Рожкова, 2020
    <br />Коммерческое использование материалов сайта TestAutomation.Space запрещено. В
    остальных случаях обязательно наличие индексируемой ссылки со словом "Источник" на сайт или на страницу,
    содержащую этот материал.
  </footer>
</template>

<style lang="scss">
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