(window.webpackJsonp=window.webpackJsonp||[]).push([[125],{"3cBK":function(t,e,n){"use strict";n.r(e);var i=n("KHd+"),o=n("UQSp"),r=n("oCYn");function D(t){return(D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}r.a.config.optionMergeStrategies;var a={VueRemarkRoot:o.a},s=function(t){var e=t.options.components=t.options.components||{},n=t.options.computed=t.options.computed||{};Object.keys(a).forEach((function(t){"object"===D(a[t])&&"function"==typeof a[t].render||"function"==typeof a[t]&&"function"==typeof a[t].options.render?e[t]=a[t]:n[t]=function(){return a[t]}}))},l=r.a.config.optionMergeStrategies,c="__vueRemarkFrontMatter",B={excerpt:null,title:"Микросервисная архитектура",category:"testops",description:"Микросервисная архитектура",tags:["Автоматизация тестирования","микросервисы"],icon:"fas fa-robot",image:"null",date:"2022-07-27T00:00:00.000Z",keywords:"qa, микросервисная архитектура",order:1,links:[{items:[{title:"Микросервисная архитектура",link:"//mikroservisnaya-arhitektura//"},{title:"Docker",link:"/docker/"},{title:"Kubernetes",link:"/kubernetes/"},{title:"Linux",link:"/linux/"},{title:"Общие вопросы TestOps",link:"/obshhie-voprosy-test-ops/"}]}]};var p=function(t){t.options[c]&&(t.options[c]=B),r.a.util.defineReactive(t.options,c,B),t.options.computed=l.computed({$frontmatter:function(){return t.options[c]}},t.options.computed)},u=Object(i.a)({},(function(){var t=this,e=t._self._c;return e("VueRemarkRoot",[e("h2",{attrs:{id:"микросервисная-архитектура"}},[e("a",{attrs:{href:"#%D0%BC%D0%B8%D0%BA%D1%80%D0%BE%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D0%B0%D1%8F-%D0%B0%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Микросервисная архитектура")]),e("h3",{attrs:{id:"особенности"}},[e("a",{attrs:{href:"#%D0%BE%D1%81%D0%BE%D0%B1%D0%B5%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D0%B8","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Особенности")]),e("ul",[e("li",[e("p",[t._v("дает простоту и независисмость деплоймента;\nМы можем деплоить каждый микросервис отдельно.\nНапример, если есть изменения в микросервисе А, то мы деплоим только его и нам не нужно передеплаивать UI или другие микросервисы;")])]),e("li",[e("p",[t._v("каждый микросервис имеет одну свою собственную, как правило простую функцию;\nи как правило, поддерживается одной командой, иногда даже из 1-2 человек;")])]),e("li",[e("p",[t._v("отсутсвие иерархической структуры;\nмикросервис может комуницировать с БД или с другим микросервисом, нет какой то четкой структуры.")])]),e("li",[e("p",[t._v("микросервисы взаимодействуют друг с другом напрямую;")])])]),e("h3",{attrs:{id:"преимущества"}},[e("a",{attrs:{href:"#%D0%BF%D1%80%D0%B5%D0%B8%D0%BC%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B0","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Преимущества")]),e("ul",[e("li",[e("p",[t._v("микросервисы взаимодействуют по очень легковесным сетевым протоколам, как правило это REST;")])]),e("li",[e("p",[t._v("мы можем в пределах одного приложения использовать какие угодно технологии и языки программирования;\nнапример, один микросервис на java, а другой на nodejs и это отлично работает;")])]),e("li",[e("p",[t._v("простота масштабирования микросервисной архитектуры;")])])]),e("h3",{attrs:{id:"проблемы-для-автоматизации-тестирования"}},[e("a",{attrs:{href:"#%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D1%8B-%D0%B4%D0%BB%D1%8F-%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Проблемы для автоматизации тестирования")]),e("ul",[e("li",[e("p",[t._v("каждый микросервис имеет собственную ценность для заказчика \nесли монолитное приложение мы тестируем и используем все целиком, то в тут каждый микросервис имеет свою ценность;\nи не обязательно его использовать с тем UI клиентом, который был написан изначально, клиент может захотеть использовать другой клиент, мобильный клиент или переписать UI;\nнам важно, чтобы микросервис сам по себе выполнял те функции, которые на него возложены;")])]),e("li",[e("p",[t._v("проблема мертвого кода\nкогда есть микросервисы и один микросервис мы больше не используем, его заменили на другой микросервис\nпри этом если automation framework остается монолитным то возникает проблема что есть автотесты которые существую но при этом они уже не нужны.")])]),e("li",[e("p",[t._v("нужно также тестировать взаимодействие между микросервисами")])])]),e("h3",{attrs:{id:"архитектура-для-автотестирования"}},[e("a",{attrs:{href:"#%D0%B0%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D0%B4%D0%BB%D1%8F-%D0%B0%D0%B2%D1%82%D0%BE%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Архитектура для автотестирования")]),e("ul",[e("li",[t._v("тесты на java")]),e("li",[t._v("конфигурация spring")]),e("li",[t._v("билд через Maven")]),e("li",[t._v("BDD - Cucumber")]),e("li",[t._v("взаимодействие с UI - Selenium(Selenide)")]),e("li",[t._v("взаимодействие с BackEnd - RestAssured")]),e("li",[t._v("хранилице тестов - Google Cloud Platform")]),e("li",[t._v("управление контейнерами - Kubernetes")]),e("li",[t._v("для запуска тестов - Selenoid")]),e("li",[t._v("для отчетности - Report Portal, Allure")])]),e("p",[e("strong",[t._v("Unit тесты")]),t._v(" пишутся разработчиками.")]),e("p",[e("strong",[t._v("Integrartion тестирование")]),t._v(" - разбито  на 2 слоя: слой клиента, который работает как аналог UI, отправляет запросы и принимает ответы\nи уровень тестов, где происходят проверки.")]),e("p",[e("strong",[t._v("UI тестирование")]),t._v(" - имеет 3 слоя: уровень страниц (pages), уровень шагов (steps), уровень тестов (tests)")]),e("p",[t._v("Далее UI тесты подключаются к Selenoid - это браузеры, которые запускаются в докер контейнерах и оркестрируются Kubernetes' ом.\nЧтобы включить ui тесты в pipeline. ")]),e("p",[t._v("UI тесты и BackEnd тесты не взаимодействуют между собой, поэтому чтобы создать тестовые данные, например пользователя который будет логиниться в приложение, это нужно будет делать через UI, что не совсем удобно.")]),e("p",[t._v("Для решения этой проблемы мы подключаем клиентскую часть Backend тестов через dependency в Мавен проект UI тестов, для того чтобы создать тестовые данные или ускорить работу UI тестов(например для быстрого логина в приложение).")]),e("p",[t._v("Для проверки взаимодействия микросервисов, мы подключаем клиентскую часть backEnd тестов для микросервиса 1 к клиентской часть backend тестов микросервиса 2 и проверяем.")]),e("p",[t._v("Для предоставления результатов используется Allure репорт, он используется для внутренних нужд.")]),e("p",[t._v("Для кастомера используется Report Pirtal, где отображаются результаты со всех уровенй тестирования.")]),e("h4",{attrs:{id:"selenoid"}},[e("a",{attrs:{href:"#selenoid","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Selenoid")]),e("ul",[e("li",[e("p",[t._v("доступен сразу из коробки")])]),e("li",[e("p",[t._v("есть 2 решения:")]),e("ol",[e("li",[t._v("деплоится на виртуальную машину")]),e("li",[t._v("деплоится в kubernetes кластер\nесли есть cloud платформа то можно бытсро с помощью seleonoid поднять браузер в cloud'е")])])]),e("li",[e("p",[t._v("браузеры стартуют очень быстро (~30сек)")])]),e("li",[e("p",[t._v("надежность\nбраузеры сами закрываются ничего не зависает")])]),e("li",[e("p",[t._v("запись видео")])])]),e("h2",{attrs:{id:"docker"}},[e("a",{attrs:{href:"#docker","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Docker")]),e("p",[t._v("Docker container - экземпляр Docker Image который содержит три атрибута:")]),e("ul",[e("li",[t._v("docker image")]),e("li",[t._v("среда запуска")]),e("li",[t._v("стандартный набор инструкций")])]),e("h3",{attrs:{id:"преимущества-1"}},[e("a",{attrs:{href:"#%D0%BF%D1%80%D0%B5%D0%B8%D0%BC%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B0-1","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Преимущества")]),e("ul",[e("li",[t._v("приложения портируемые и стандартно упакованные\nзапустить можно везде где есть docker engine")]),e("li",[t._v("деплоймент простой и повторяемый ")]),e("li",[t._v("поддержка микросервисной архитектуры\nкаждый микросервис запакован, изолирован и запускается отдельно")])]),e("h3",{attrs:{id:"tools-for-containers-orchestration"}},[e("a",{attrs:{href:"#tools-for-containers-orchestration","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Tools for containers orchestration")]),e("ul",[e("li",[t._v("kubernetes - самый распространненый инструмент")]),e("li",[t._v("docker swarm - нативный tool")]),e("li",[t._v("rancher")]),e("li",[t._v("mesos")])]),e("h4",{attrs:{id:"источник-информации"}},[e("a",{attrs:{href:"#%D0%B8%D1%81%D1%82%D0%BE%D1%87%D0%BD%D0%B8%D0%BA-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D0%B8","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Источник информации:")]),e("ol",[e("li",[t._v("❗"),e("a",{attrs:{href:"https://www.youtube.com/watch?v=0QVlMsObhuQ",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("Automation testing solution for micro service architecture")])])])])}),[],!1,null,null,null);"function"==typeof s&&s(u),"function"==typeof p&&p(u);e.default=u.exports},UQSp:function(t,e,n){"use strict";e.a={name:"VueRemarkRoot",render(t){return t("div",null,this.$slots.default)}}}}]);