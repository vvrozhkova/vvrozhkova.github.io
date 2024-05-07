(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{UQSp:function(t,n,i){"use strict";n.a={name:"VueRemarkRoot",render(t){return t("div",null,this.$slots.default)}}},"eL+Y":function(t,n,i){"use strict";i.r(n);var o=i("KHd+"),e=i("UQSp"),a=i("oCYn");function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}a.a.config.optionMergeStrategies;var s={VueRemarkRoot:e.a},c=function(t){var n=t.options.components=t.options.components||{},i=t.options.computed=t.options.computed||{};Object.keys(s).forEach((function(t){"object"===r(s[t])&&"function"==typeof s[t].render||"function"==typeof s[t]&&"function"==typeof s[t].options.render?n[t]=s[t]:i[t]=function(){return s[t]}}))},u=a.a.config.optionMergeStrategies,p="__vueRemarkFrontMatter",l={excerpt:null,title:"Изоляция компонентов",category:"mobile",description:"Изоляция компонентов",tags:["qa"],icon:"fas fa-code",image:"null",date:"2022-08-28T00:00:00.000Z",keywords:"qa, компоненты",order:1,links:[{title:"",items:[{title:"Алгоритмы (курс Яндекс)",link:"/algoritmy-kurs-yandeks/"}]}]};var f=function(t){t.options[p]&&(t.options[p]=l),a.a.util.defineReactive(t.options,p,l),t.options.computed=u.computed({$frontmatter:function(){return t.options[p]}},t.options.computed)},d=Object(o.a)({},(function(){var t=this,n=t._self._c;return n("VueRemarkRoot",[n("p",[t._v("При выполнении теста с полным флоу можно встретить несколько проблем:")]),n("ul",[n("li",[t._v("в интернет-магазине иногда нужно будет совершить оплату, чтобы закончить тест")]),n("li",[t._v("задействовать реальную сервисную службу (чтобы собрать заказ)")]),n("li",[t._v("зарезервировать ресурсы")]),n("li",[t._v("долгая обратная связь тк нужно выполнить весь набор действий")])]),n("p",[t._v("Решением этих проблем может стать идея тестирования приложения по частям.")]),n("h2",{attrs:{id:"модульныеunit-тесты"}},[n("a",{attrs:{href:"#%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5unit-%D1%82%D0%B5%D1%81%D1%82%D1%8B","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Модульные(unit) тесты")]),n("ul",[n("li",[t._v("Как правило тесты на функции или методы классов.")]),n("li",[t._v("Для этих тестов не нужна сборка приложения.")]),n("li",[t._v("Высокая скорость исполнения.")])]),n("p",[t._v("Среди unit тестов выделяют:")]),n("ul",[n("li",[t._v("Sociable - тесты, которые используют реальные модули приложения; ")]),n("li",[t._v("Solitary - тесты, которые используют подставные объекты или тестовые дублеры.")])]),n("h3",{attrs:{id:"тестовые-дублеры"}},[n("a",{attrs:{href:"#%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D0%B5-%D0%B4%D1%83%D0%B1%D0%BB%D0%B5%D1%80%D1%8B","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Тестовые дублеры")]),n("h4",{attrs:{id:"dummy"}},[n("a",{attrs:{href:"#dummy","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Dummy")]),n("p",[t._v("Когда требуется передать в функцию объект, который в дальнейшем в тесте не будет использоваться. \nВ этом случае передается, например, пустая строка или пустой объект.")]),n("h4",{attrs:{id:"fake"}},[n("a",{attrs:{href:"#fake","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Fake")]),n("p",[t._v("Может иметь реальную реализацию, но не может использоваться в продакшене.\nНапример, использование In Memory DataBase вместо ORM(Object-Relational Mapping), которую скорее всего не получится использовать в продакшене.")]),n("h4",{attrs:{id:"stub"}},[n("a",{attrs:{href:"#stub","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Stub")]),n("p",[t._v("Всегда возвращает статичный ответ по заданному запросу.\nЕсли нужно протестировать взаимодействие с внешним API, которое может быть недоступно, то его можно заменить stub'ом.")]),n("h4",{attrs:{id:"spy"}},[n("a",{attrs:{href:"#spy","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Spy")]),n("p",[t._v('Похоже на stub, но еще может следить за вашим приложением.\nНапример, вы тестируете функцию в результате, которой происходит отправка письма пользователю, но в тестах не нужно рассылать настоящие письма, поэтому в функцию можно встроить "шпиона", который будет следить был ли вызвов отправки письма пользователю или нет, но при этом сам он отправлять письмо не будет. Такие тесты больше на поведение, чем на состояние.')]),n("h4",{attrs:{id:"mock"}},[n("a",{attrs:{href:"#mock","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Mock")]),n("p",[t._v("Включает преимущества всех предыдущих дублеров. Это заранее запрограммированный объект который может принимать на вход различные значения и иметь некоторые ожидания. В зависимости от этих ожиданий, он возвращает ответ.")])])}),[],!1,null,null,null);"function"==typeof c&&c(d),"function"==typeof f&&f(d);n.default=d.exports}}]);