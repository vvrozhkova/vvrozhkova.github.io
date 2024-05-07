(window.webpackJsonp=window.webpackJsonp||[]).push([[105],{D2Mw:function(t,e,o){"use strict";o.r(e);var i=o("KHd+"),n=o("UQSp"),r=o("oCYn");function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}r.a.config.optionMergeStrategies;var a={VueRemarkRoot:n.a},l=function(t){var e=t.options.components=t.options.components||{},o=t.options.computed=t.options.computed||{};Object.keys(a).forEach((function(t){"object"===s(a[t])&&"function"==typeof a[t].render||"function"==typeof a[t]&&"function"==typeof a[t].options.render?e[t]=a[t]:o[t]=function(){return a[t]}}))},p=r.a.config.optionMergeStrategies,c="__vueRemarkFrontMatter",u={excerpt:null,title:"Тестовый оракул",category:"manual",description:"Тестовый оракул",tags:["Тестовая документация"],icon:"fas fa-bug",image:"null",date:"2022-05-13T00:00:00.000Z",keywords:"qa, Тестовая документация",order:29,links:[{items:[{title:"13. Тестовая документация",link:"/testovaya-dokumentacziya/"},{title:"Тестовая политика и стратегия",link:"/testovaya-politika-i-strategiya/"},{title:"Международные стандарты тестовой документации",link:"/mezhdunarodnye-standarty-testovoj-dokumentaczii/"},{title:"Master Test Plan и тестовые планы для каждого уровня",link:"/master-test-plan-i-testovye-plany-dlya-kazhdogo-urovnya/"},{title:"Понятие Test Case и Test Suite",link:"/ponyatie-test-case-i-test-suite/"},{title:"Понятие Test Basis, Test Condition и Test Procedure",link:"/ponyatie-test-basis-test-condition-i-test-procedure/"},{title:"Check-list, как представитель Experience-Based",link:"/check-list-kak-predstavitel-experience-based/"},{title:"Bug Report",link:"/bug-report/"},{title:"Summary Report",link:"/summary-report/"},{title:"Requirements Tracebility Matrix",link:"/requirements-tracebility-matrix/"},{title:"Test Data Tables",link:"/test-data-tables/"},{title:"Test Scenario",link:"/test-scenario/"},{title:"External Test Reports",link:"/external-test-reports/"},{title:"Критерии приемки",link:"/kriterii-priemki/"},{title:"Метрики тестирования",link:"/metriki-testirovaniya/"},{title:"Требования",link:"/trebovaniya/"},{title:"Тестовый оракул",link:"/testovyj-orakul/"}]}]};var d=function(t){t.options[c]&&(t.options[c]=u),r.a.util.defineReactive(t.options,c,u),t.options.computed=p.computed({$frontmatter:function(){return t.options[c]}},t.options.computed)},f=Object(i.a)({},(function(){var t=this,e=t._self._c;return e("VueRemarkRoot",[e("h2",{attrs:{id:"тестовый-оракул-test-oracle"}},[e("a",{attrs:{href:"#%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D1%8B%D0%B9-%D0%BE%D1%80%D0%B0%D0%BA%D1%83%D0%BB-test-oracle","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Тестовый оракул (Test oracle)")]),e("p",[e("em",[t._v("Тестовый предсказатель (test oracle): Источник, при помощи которого можно определить ожидаемые результаты для сравнения с реальными результатами, выдаваемыми тестируемой системой. В роли тестового предсказателя могут выступать уже имеющаяся система (для эталонного тестирования), руководство пользователя, профессиональные знания специалиста, однако им не может быть программный код. (ISTQB)")])]),e("p",[e("strong",[t._v("Тестовый оракул")]),t._v(" - это механизм для определения того, прошел ли тест или нет. Использование оракулов включает сравнение (для заданных входных данных тестового примера) выходных данных тестируемой системы с выходными данными, которые, по определению оракула, должен иметь продукт. Термин «тестовый оракул» впервые был введен в статье Уильяма Э. Хаудена. Дополнительная работа над различными видами оракулов была исследована Элейн Вейкер.")]),e("p",[e("strong",[t._v("Категории тестовых оракулов")]),t._v(":")]),e("p",[t._v("Определенные ("),e("strong",[t._v("Specified")]),t._v("): Эти оракулы обычно связаны с формализованными подходами к моделированию программного обеспечения и построению программного кода. Они связаны с formal specification, model-based design, который может использоваться для создания тестовых оракулов, state transition specification, для которой могут быть получены оракулы, чтобы помочь model-based testing and protocol conformance testing, and design by contract, для которого эквивалентный тестовый оракул является утверждением (assertion). Указанные тестовые оракулы имеют ряд проблем. Формальная спецификация основана на абстракции, которая, в свою очередь, может иметь элемент неточности, поскольку все модели не могут зафиксировать все поведение;")]),e("p",[t._v("Полученные ("),e("strong",[t._v("Derived")]),t._v("): полученный тестовый оракул различает правильное и неправильное поведение, используя информацию, полученную из артефактов системы. Они могут включать в себя документацию, результаты выполнения системы и характеристики версий тестируемой системы. Regression test suites (or reports) являются примером производного тестового оракула - они построены на предположении, что результат из предыдущей версии системы может быть использован в качестве помощника (оракула) для будущей версии системы. Ранее измеренные характеристики производительности могут быть использованы в качестве оракула для будущих версий системы, например, чтобы задать вопрос о наблюдаемом потенциальном ухудшении производительности. Текстовая документация из предыдущих версий системы может использоваться в качестве основы для определения ожиданий в будущих версиях системы. Псевдо-оракул попадает в категорию полученных тестовых оракулов. Псевдо-оракул, по определению Вейукера, представляет собой отдельно написанную программу, которая может принимать те же входные данные, что и тестируемая программа или система, так что их выходные данные могут быть сопоставлены, чтобы понять, может ли быть проблема для исследования. Частичный оракул - это гибрид указанного тестового оракула и производного тестового оракула. Он определяет важные (но не полные) свойства тестируемой системы. Например, при метаморфическом тестировании (Metamorphic testing) такие свойства, называемые метаморфическими отношениями, используются при нескольких запусках системы.")]),e("p",[t._v("Примеры:")]),e("ul",[e("li",[t._v("формальная спецификация, используемая в качестве входных данных для model-based design and model-based testing;")]),e("li",[t._v("документация, которая не является полной спецификацией продукта, такая как руководство по использованию или установке, или запись характеристик производительности или минимальных требований;")]),e("li",[t._v("оракул согласованности, сравнивающий результаты выполнения одного теста с другим на предмет сходства;")]),e("li",[t._v("псевдо-оракул: вторая программа, которая использует другой алгоритм для вычисления того же математического выражения, что и тестируемый продукт;")]),e("li",[t._v("Specified+derived: во время поиска Google у нас нет полного оракула, чтобы проверить правильность количества возвращенных результатов. Мы можем определить метаморфическое отношение так, что последующий суженный поиск будет давать меньше результатов.")])]),e("p",[t._v("Неявные ("),e("strong",[t._v("Implicit")]),t._v("): Неявный тестовый оракул полагается на подразумеваемую информацию и предположения. Например, может быть какой-то подразумеваемый вывод из сбоя программы, то есть нежелательное поведение - оракул, чтобы определить, что может быть проблема. Существует несколько способов поиска и тестирования нежелательного поведения, независимо от того, называют ли это отрицательным тестированием, где есть специализированные подмножества, такие как фаззинг. У неявных тестовых оракулов есть ограничения, поскольку они полагаются на подразумеваемые выводы и предположения. Например, сбой программы или процесса может не быть приоритетной проблемой, если система является отказоустойчивой и поэтому работает в форме самовосстановления / самоуправления. Неявные тестовые оракулы могут быть подвержены ложным срабатываниям из-за зависимостей от среды;")]),e("p",[t._v("Человек ("),e("strong",[t._v("Human")]),t._v("): Если предыдущие категории оракулов не могут быть использованы, то потребуется участие человека. Это можно рассматривать как количественный и качественный подходы. Количественный подход направлен на поиск нужного количества информации, которую нужно собрать о тестируемой системе (например, результатов тестирования), чтобы заинтересованная сторона могла сделать решения о соответствии или выпуске программного обеспечения. Качественный подход направлен на определение репрезентативности и пригодности входных данных тестирования и контекста выходных данных тестируемой системы. Примером может служить использование реалистичных и репрезентативных данных испытаний и понимание результатов (если они реалистичны). При этом можно руководствоваться эвристическими подходами, такими как интуиция, эмпирические правила, вспомогательные контрольные списки и опыт, чтобы помочь адаптировать конкретную комбинацию, выбранную для тестируемой программы / системы.")]),e("p",[t._v("Примеры:")]),e("ul",[e("li",[t._v("Качественный: эвристический оракул предоставляет репрезентативные или приблизительные результаты по классу тестовых входных данных;")]),e("li",[t._v("Количественный: статистический оракул использует вероятностные характеристики, например, с анализом изображений, где определен диапазон достоверности и неопределенности для того, чтобы тестовый оракул решил о совпадении.")])]),e("p",[t._v("Источники:")]),e("ul",[e("li",[e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Test_oracle",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("Test oracle")])])]),e("p",[t._v("Доп. материал:")]),e("ul",[e("li",[e("a",{attrs:{href:"https://telegra.ph/Orakuly-v-testirovanii-10-17",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("Оракулы в тестировании")])]),e("li",[e("a",{attrs:{href:"https://www.developsense.com/blog/2015/09/oracles-from-the-inside-out/",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("Oracles from the inside out")])])])])}),[],!1,null,null,null);"function"==typeof l&&l(f),"function"==typeof d&&d(f);e.default=f.exports},UQSp:function(t,e,o){"use strict";e.a={name:"VueRemarkRoot",render(t){return t("div",null,this.$slots.default)}}}}]);