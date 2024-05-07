(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{UQSp:function(t,e,n){"use strict";e.a={name:"VueRemarkRoot",render(t){return t("div",null,this.$slots.default)}}},"z/vG":function(t,e,n){"use strict";n.r(e);var i=n("KHd+"),o=n("UQSp"),r=n("oCYn");function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}r.a.config.optionMergeStrategies;var a={VueRemarkRoot:o.a},l=function(t){var e=t.options.components=t.options.components||{},n=t.options.computed=t.options.computed||{};Object.keys(a).forEach((function(t){"object"===s(a[t])&&"function"==typeof a[t].render||"function"==typeof a[t]&&"function"==typeof a[t].options.render?e[t]=a[t]:n[t]=function(){return a[t]}}))},v=r.a.config.optionMergeStrategies,_="__vueRemarkFrontMatter",p={excerpt:null,title:"Уровни тестирования",category:"manual",description:"Уровни тестирования",tags:["Уровни тестирования"],icon:"fas fa-bug",image:"null",date:"2022-05-15T00:00:00.000Z",keywords:"qa, Уровни тестирования",order:11,links:[{items:[{title:"1. Тестирование, Quality control, Quality assurance",link:"/testirovanie-quality-control-quality-assurance/"},{title:"2. Понятие качества, международные стандарты качества",link:"/ponyatie-kachestva-mezhdunarodnye-standarty-kachestva/"},{title:"3. Жизненный цикл дефекта",link:"/zhiznennyj-czikl-defekta/"},{title:"4. Жизненный цикл разработки ПО, SDLC (Software Development LifeCycle)",link:"/zhiznennyj-czikl-razrabotki-po-sdlc-software-development-life-cycle/"},{title:"5. Модели разработки ПО",link:"/modeli-razrabotki-po/"},{title:"6. Методологии разработки ПО (Scrum, Kanban, RUP, DSDM, MSF, XP)",link:"/metodologii-razrabotki-po-scrum-kanban-rup-dsdm-msf-xp"},{title:"7. Жизненный цикл тестирования приложений, STLC (Software Testing LifeCycle)",link:"/zhiznennyj-czikl-testirovaniya-prilozhenij-stlc-software-testing-life-cycle/"},{title:"8. Принципы тестирования, Agile принципы тестирования",link:"/princzipy-testirovaniya-agile-princzipy-testirovaniya/"},{title:"9. Практики и подходы тестирования",link:"/praktiki-i-podhody-testirovaniya/"},{title:"10. Виды тестирования",link:"/vidy-testirovaniya/"},{title:"11. Уровни тестирования",link:"/urovni-testirovaniya/"},{title:"12. Техники тест-дизайна",link:"/tehniki-test-dizajna/"},{title:"13. Тестовая документация",link:"/testovaya-dokumentacziya/"}]}]};var g=function(t){t.options[_]&&(t.options[_]=p),r.a.util.defineReactive(t.options,_,p),t.options.computed=v.computed({$frontmatter:function(){return t.options[_]}},t.options.computed)},c=Object(i.a)({},(function(){var t=this,e=t._self._c;return e("VueRemarkRoot",[e("h2",{attrs:{id:"пирамида-тестирования-test-pyramid"}},[e("a",{attrs:{href:"#%D0%BF%D0%B8%D1%80%D0%B0%D0%BC%D0%B8%D0%B4%D0%B0-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-test-pyramid","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Пирамида тестирования (Test Pyramid)")]),e("p",[t._v("«Пирамида тестов» - метафора, которая означает группировку динамических тестов программного обеспечения по разным уровням. Она также дает представление, какое количество тестов должно быть в каждой из этих групп. Основной принцип разделения уровней - тест должен быть на том же уровне, что и тестируемый объект. В тесте более высокого уровня вы не тестируете всю условную логику и пограничные случаи, которые уже покрыты тестами более низкого уровня.")]),e("p",[e("img",{attrs:{src:"https://lh6.googleusercontent.com/yDN1s-lXbEFI5tsd429c2fT5DkHxfDNFpTotktfGZe2tdXVAdo218WSOksJIhBx5VDJffYvMOcadII_r7ln-kvX4iKFuuQ75io5IEimepSLJq_qkkZ_JH5x5UfdSXdF2PqbBPqpV"}})]),e("h2",{attrs:{id:"уровни-тестированияtesting-levels"}},[e("a",{attrs:{href:"#%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B8-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8Ftesting-levels","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Уровни тестирования(Testing Levels)")]),e("ul",[e("li",[t._v("Unit/component/program/module testing - тестируется минимально-атомарный модуль программы, чаще всего это одна функция или метод. Таких тестов должно быть больше всего;")]),e("li",[t._v("Integration testing - несколько модулей программы тестируются вместе;")]),e("li",[t._v("System testing - вся программа тестируется полностью;")]),e("li",[t._v("Acceptance testing - программа принимается заказчиком на соответствие заявленным требованиям либо тестировщики проходят end-to-end сценарии с точки зрения пользователя;")])]),e("h3",{attrs:{id:"модульноеюниткомпонентное-тестирование-moduleunitcomponent-testing"}},[e("a",{attrs:{href:"#%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%D1%8E%D0%BD%D0%B8%D1%82%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BD%D0%BE%D0%B5-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-moduleunitcomponent-testing","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Модульное/юнит/компонентное тестирование (Module/Unit/Component testing)")]),e("p",[t._v("С этими терминами часто происходит путаница. Если ссылаться на глоссарий ISTQB, то все они - синонимы:")]),e("ul",[e("li",[e("em",[e("strong",[t._v("Модуль, юнит (module, unit): См. компонент.")])])]),e("li",[e("em",[e("strong",[t._v("Модульное, юнит тестирование (module testing, unit testing): См. компонентное тестирование.")])])]),e("li",[e("em",[e("strong",[t._v("Компонент (component): Наименьший элемент программного обеспечения, который может быть протестирован отдельно.")])])]),e("li",[e("em",[e("strong",[t._v("Компонентное тестирование (component testing): Тестирование отдельных компонентов программного обеспечения (IEEE 610).")])])])]),e("p",[t._v("Тем не менее, некоторые источники описывают ситуацию несколько иначе и я решил выписать другую точку зрения.")]),e("p",[e("strong",[t._v("Модульное тестирование (оно же юнит-тестирование)")]),t._v(" используется для тестирования какого-либо одного логически выделенного и изолированного элемента системы (отдельные методы класса или простая функция, subprograms, subroutines, классы или процедуры) в коде. Очевидно, что это тестирование методом белого ящика и чаще всего оно проводится самими разработчиками. Целью тестирования модуля является не демонстрация правильного функционирования модуля, а демонстрация наличия ошибки в модуле, а также в определении степени готовности системы к переходу на следующий уровень разработки и тестирования. На уровне модульного тестирования проще всего обнаружить дефекты, связанные с алгоритмическими ошибками и ошибками кодирования алгоритмов, типа работы с условиями и счетчиками циклов, а также с использованием локальных переменных и ресурсов. Ошибки, связанные с неверной трактовкой данных, некорректной реализацией интерфейсов, совместимостью, производительностью и т.п. обычно пропускаются на уровне модульного тестирования и выявляются на более поздних стадиях тестирования. Изоляция тестируемого блока достигается с помощью заглушек (stubs), манекенов (dummies) и макетов (mockups).")]),e("p",[e("strong",[t._v("Компонентное тестирование")]),t._v(" - тип тестирования ПО, при котором тестирование выполняется для каждого отдельного компонента отдельно, без интеграции с другими компонентами. Его также называют модульным тестированием (Module testing), если рассматривать его с точки зрения архитектуры. Как правило, любое программное обеспечение в целом состоит из нескольких компонентов. Тестирование на уровне компонентов (Component Level testing) имеет дело с тестированием этих компонентов индивидуально. Это один из самых частых типов тестирования черного ящика, который проводится командой QA. Для каждого из этих компонентов будет определен сценарий тестирования, который затем будет приведен к Test case высокого уровня -> детальным Test case низкого уровня с предварительными условиями.")]),e("p",[t._v("Исходя из глубины уровней тестирования, компонентное тестирование можно классифицировать как:")]),e("ul",[e("li",[t._v("Тестирование компонентов в малом (CTIS - Component testing In Small): тестирование компонентов может проводиться с или без изоляции остальных компонентов в тестируемом программном обеспечении или приложении. Если это выполняется с изоляцией другого компонента, то это называется CTIS;")]),e("li",[t._v("Тестирование компонентов в целом (CTIL - Component testing In Large) - тестирование компонентов, выполненное без изоляции других компонентов в тестируемом программном обеспечении или приложении;")])]),e("table",[e("thead",[e("tr",[e("th",[e("strong",[t._v("Module/Unit testing")])]),e("th",[e("strong",[t._v("Component testing")])])])]),e("tbody",[e("tr",[e("td",[t._v("Тестирование отдельных классов, функций для демонстрации того, что программа выполняется согласно спецификации")]),e("td",[t._v("Тестирование каждого объекта или частей программного обеспечения отдельно с или без изоляции других объектов")])]),e("tr",[e("td",[t._v("Проверка в(на) соответствии с design documents")]),e("td",[t._v("Проверка в(на) соответствии с test requirements, use case")])]),e("tr",[e("td",[t._v("Пишутся и выполняются разработчиками")]),e("td",[t._v("Тестировщиками")])]),e("tr",[e("td",[t._v("Выполняется первым")]),e("td",[t._v("Выполняется после Unit")])])])]),e("p",[t._v("Другой источник:")]),e("p",[t._v("По-существу эти уровни тестирования представляют одно и тоже, разница лишь в том, что в компонентном тестировании в качестве параметров функций используют реальные объекты и драйверы, а в модульном/unit тестировании - конкретные значения.")]),e("p",[t._v("*В контексте юнит-тестирования еще можно встретить понятие "),e("a",{attrs:{href:"https://ro-che.info/articles/2017-12-04-golden-tests",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("golden testing")]),t._v(". Оно означает те же юнит тесты, но с ожидаемыми результатами хранящимися в отдельном файле. Таким образом после прогона выходные значения тестов сравниваются с golden (эталонным) файлом.")]),e("p",[t._v("*Иногда юнит-тесты называют одинокими (solitary) в случае тотального применения имитаций и заглушек или общительными (sociable) в случае реальных коммуникаций с другими участниками.")]),e("p",[t._v("*Правило трех А(AAA) (arrange, act, assert) или триада «дано, когда, тогда» - хорошая мнемоника, чтобы поддерживать хорошую структуру тестов.")]),e("h3",{attrs:{id:"интеграционное-тестирование-integration-testing"}},[e("a",{attrs:{href:"#%D0%B8%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%BE%D0%B5-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-integration-testing","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Интеграционное тестирование (Integration testing)")]),e("p",[e("em",[t._v("Интеграционное тестирование (integration testing): Тестирование, выполняемое для обнаружения дефектов в интерфейсах и во взаимодействии между интегрированными компонентами или системами. См. также тестирование интеграции компонентов, системное интеграционное тестирование. (ISTQB)")])]),e("p",[e("em",[t._v("Системное интеграционное тестирование (system integration testing): Тестирование интеграции систем и пакетов программ, тестирование интерфейсов связи с внешними системами (интернет и т.д.). (ISTQB)")])]),e("p",[e("em",[t._v("Интеграционное тестирование в малом (integration testing in the small): См. тестирование интеграции компонентов. (ISTQB)")])]),e("p",[e("em",[t._v("Интеграционное тестирование в целом (integration testing in the large): См. системное интеграционное тестирование. (ISTQB)")])]),e("p",[e("em",[t._v("Изоляционное тестирование (isolation testing): Тестирование отдельных компонентов в изоляции от окружающих компонентов в окружении компонентов, которые при необходимости эмулируются заглушками и драйверами. (ISTQB)")])]),e("p",[e("em",[t._v("Попарное интеграционное тестирование (pairwise integration testing): Вид интеграционного тестирования, нацеленного на пары компонентов, работающих совместно соответственно графу вызовов. (ISTQB)")])]),e("p",[t._v("Интеграционное тестирование предназначено для проверки насколько хорошо два или более компонента ПО взаимодействуют друг с другом, а также взаимодействия с различными частями системы (операционной системой, оборудованием либо связи между различными системами). С технологической точки зрения интеграционное тестирование является количественным развитием компонентного, поскольку также оперирует интерфейсами модулей и подсистем и требует создания тестового окружения, включая заглушки (Stub) на месте отсутствующих модулей. Основная разница между компонентным и интеграционным тестированием состоит в целях, то есть в типах обнаруживаемых дефектов, которые, в свою очередь, определяют стратегию выбора входных данных и методов анализа. В частности, на уровне интеграционного тестирования часто применяются методы, связанные с покрытием интерфейсов, например, вызовов функций или методов, или анализ использования интерфейсных объектов, таких как глобальные ресурсы, средства коммуникаций, предоставляемых операционной системой.")]),e("p",[e("strong",[t._v("Уровни интеграционного тестирования")]),t._v(":")]),e("ul",[e("li",[e("strong",[t._v("Компонентный интеграционный уровень")]),t._v(" (CIT - "),e("a",{attrs:{href:"https://www.testing.guru/what-is-component-integration-testing/",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("Component Integration testing")]),t._v("): Проверяется взаимодействие между компонентами одной системы после проведения компонентного тестирования. Программные компоненты или модули могут быть определены в разное время совершенно разными группами спецификаций, component integration testing выполняется чтобы убедиться, что даже после различий в разработке модулей интеграция всего работает вместе. В этом случае также важно учесть отрицательные случаи, так как компоненты могут делать предположения относительно данных;")]),e("li",[e("strong",[t._v("Системный интеграционный уровень")]),t._v(" (SIT - "),e("a",{attrs:{href:"https://www.softwaretestinghelp.com/system-integration-testing/",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("System Integration testing")]),t._v("): - это полное тестирование всей системы, состоящей из множества подсистем. Основная цель SIT - обеспечить правильное функционирование всех зависимостей программных модулей и сохранение целостности данных между отдельными модулями всей системы. SUT ("),e("a",{attrs:{href:"https://www.tutorialspoint.com/software_testing_dictionary/system_under_test.htm",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("System Under Test")]),t._v(") может состоять из аппаратного обеспечения, базы данных, программного обеспечения, комбинации аппаратного и программного обеспечения или системы, требующей взаимодействия с человеком (HITL - "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Human-in-the-loop",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("Human in the Loop")]),t._v(" Testing). SIT имеет предварительное условие, при котором несколько базовых интегрированных систем уже прошли системное тестирование. Затем SIT проверяет необходимые взаимодействия между этими системами в целом. Результаты SIT передаются в UAT (пользовательское приемочное тестирование);")])]),e("p",[e("strong",[t._v("Интеграция может быть как программной, так и софт-железо")]),t._v(":")]),e("ul",[e("li",[e("strong",[t._v("HSIT")]),t._v(" - Hardware Software Integration Testing: представляет собой процесс тестирования компонентов компьютерного программного обеспечения (CSC - Computer Software Components) на предмет функциональности высокого уровня в целевой аппаратной среде. Тестирование черного ящика - это основной тип тестирования, используемый на этом уровне тестирования. Целью тестирования интеграции аппаратного / программного обеспечения является проверка поведения разработанного программного обеспечения, интегрированного в аппаратный компонент. Цель тестирования интеграции аппаратного и программного обеспечения на основе требований (Requirement based Hardware-Software Integration Testing) - убедиться, что программное обеспечение на целевом компьютере удовлетворяет высокоуровневым требованиям (high-level requirements);")]),e("li",[e("strong",[t._v("SSIT")]),t._v(" - Software Software Integration Testing: это Computer Software Component Testing, работающего в среде целевого компьютера при моделировании всей системы (других CSC), и на функциональности высокого уровня. Оно фокусируется на поведении CSC в смоделированной среде хоста / цели. Для проверки интеграции программного обеспечения используются разные подходы;")])]),e("p",[e("strong",[t._v("Подходы к интеграционному тестированию")]),t._v(":")]),e("ul",[e("li",[e("strong",[t._v("Подход Большого взрыва (Big Bang Approach)")]),t._v(": "),e("em",[t._v("“Вид подхода к интеграционному тестированию, при котором элементы программного или аппаратного обеспечения, или и то и другое, собираются в компонент или в целую систему сразу, а не по этапам.” ( IEEE 610)")]),t._v(". Все или практически все разработанные модули собираются вместе в виде законченной системы или ее основной части, и затем проводится интеграционное тестирование. Такой подход очень хорош для сохранения времени. Однако если Test case и их результаты записаны неверно, то сам процесс интеграции сильно осложнится, что станет преградой для команды тестирования при достижении основной цели интеграционного тестирования;")]),e("li",[e("strong",[t._v("Инкрементальный подход (Incremental Approach)")]),t._v(": при таком подходе тестирование выполняется путем объединения двух или более логически связанных модулей. Затем другие связанные модули поэтапно добавляются и тестируются для правильного функционирования. Процесс продолжается до тех пор, пока все модули не будут соединены и успешно протестированы. Осуществляется разными методами:"),e("ul",[e("li",[e("strong",[t._v("Нисходящий подход (Top-Down Approach)")]),t._v(": Вначале тестируются все высокоуровневые модули, и постепенно один за другим добавляются низкоуровневые. Все модули более низкого уровня симулируются заглушками с аналогичной функциональностью, затем по мере готовности они заменяются реальными активными компонентами. Преимущества: Локализация неисправностей проще. Возможность получить ранний прототип. Основные недостатки дизайна могут быть найдены и исправлены в первую очередь. Недостатки: Нужно много заглушек. Модули на более низком уровне тестируются недостаточно;")]),e("li",[e("strong",[t._v("Восходящий подход (Bottom-Up Approach)")]),t._v(": В восходящей стратегии каждый модуль на более низких уровнях последовательно тестируется с более высокоуровневыми модулями, пока не будут протестированы все модули. Требуется помощь драйверов для тестирования. Данный подход считается полезным, если все или практически все модули, разрабатываемого уровня, готовы. Также данный подход помогает определить по результатам тестирования уровень готовности приложения. Пример низкоуровневого модуля - модуль, который заведует хранением токенов авторизации. Высокоуровневый - модуль авторизации, в состав которого помимо прочего входит модуль токенов. Преимущества: Локализация ошибок проще. Не тратится время на ожидание разработки всех модулей, в отличие от подхода Большого взрыва. Недостатки: Критические модули (на верхнем уровне архитектуры ПО), которые контролируют поток приложения, тестируются последними и могут быть подвержены дефектам. Ранний прототип невозможен;")]),e("li",[e("a",{attrs:{href:"https://www.ques10.com/p/38806/describe-bi-directionalsandwitch-integration-testi/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e("strong",[t._v("Гибридный/сэндвич-подход")])]),e("strong",[t._v("(Sandwich/Hybrid/Bi-Directional Approach)")]),t._v(": Представляет собой комбинацию восходящего и нисходящего подходов. Здесь целью является средний слой, в то время как драйверы заменяют верхний слой, а заглушки нижний пока компоненты этих слоев не будут разработаны;")])])])]),e("p",[e("strong",[t._v("Критерии начала и окончания Integration Testing")]),t._v(":")]),e("p",[t._v("Обычно при выполнении интеграционного тестирования используется стратегия "),e("a",{attrs:{href:"https://vijaybn.wordpress.com/2012/09/06/etvx-entry-task-validation-exit/",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("ETVX")]),t._v(" (Entry Criteria, Task, Validation, Exit Criteria).")]),e("ul",[e("li",[t._v("Критерии начала:"),e("ul",[e("li",[t._v("завершено модульное тестирование;")])])]),e("li",[t._v("На входе:"),e("ul",[e("li",[t._v("Software Requirements Data;")]),e("li",[t._v("Software Design Document;")]),e("li",[t._v("Software Verification Plan;")]),e("li",[t._v("Software Integration Documents;")])])]),e("li",[t._v("Действия:"),e("ul",[e("li",[t._v("На основе требований высокого и низкого уровня (High and Low-level requirements) создайте test cases and procedures;")]),e("li",[t._v("Комбинируйте сборки низкоуровневых модулей, которые реализуют общую функциональность;")]),e("li",[t._v("Разработайте тестовую обвязку (test harness);")]),e("li",[t._v("Протестируйте сборку;")]),e("li",[t._v("После прохождения теста сборка объединяется с другими сборками и тестируется до тех пор, пока система не будет интегрирована как единое целое;")]),e("li",[t._v("Повторите все тесты на целевой processor-based platform и получите результаты;")])])]),e("li",[t._v("Критерии выхода:"),e("ul",[e("li",[t._v("Успешное завершение интеграции Программного модуля на целевое Hardware;")]),e("li",[t._v("Правильная работа программного обеспечения в соответствии с указанными требованиями;")])])]),e("li",[t._v("На выходе:"),e("ul",[e("li",[t._v("Integration test reports;")]),e("li",[t._v("SVCP - Software Test Cases and Procedures;")])])])]),e("p",[e("a",{attrs:{href:"https://www.softwaretestinghelp.com/what-is-test-harness/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e("em",[t._v("Test Harness")])]),e("em",[t._v("- (тестовая обвязка): Тестовое окружение, включающее в себя заглушки и драйверы, необходимые для проведения теста. (ISTQB)")])]),e("p",[e("a",{attrs:{href:"https://www.geeksforgeeks.org/difference-between-stubs-and-drivers/",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("Test Driver и Test Stub")]),t._v(" являются искусственными заменами компонентов программы на время тестов по аналогии с моками в тестировании API. Тестовый драйвер - то, что вызывает тестируемый компонент. Тестовая заглушка - то, что возвращает тестируемому компоненту фиктивный ответ. Т.е. заглушки и драйверы не реализуют всю логику программного модуля, а только моделируют обмен данными с тестируемым модулем.")]),e("p",[e("a",{attrs:{href:"https://www.softwaretestinghelp.com/what-is-interface-testing/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e("strong",[t._v("Тестирование интерфейса")])]),t._v(" - это тип интеграционного теста, который проверяет, правильно ли установлена ​​связь между двумя различными программными системами или их частями (модулями). Соединение, которое объединяет два компонента, называется интерфейсом. Этот интерфейс в компьютерном мире может быть чем угодно, как API, так и веб-сервисами и т. д. Тестирование интерфейса включает в себя тестирование двух основных сегментов:")]),e("ul",[e("li",[t._v("Интерфейс веб-сервера и сервера приложений")]),e("li",[t._v("Интерфейс сервера приложений и базы данных")])]),e("p",[e("strong",[t._v("Тестирование потоков (Thread testing)")]),t._v(" - это вид тестирования программного обеспечения, который проверяет основные функциональные возможности конкретной задачи (потока). Обычно проводится на ранней стадии фазы интеграционного тестирования. Тестирование на основе потоков является одной из дополнительных стратегий, принятых в ходе System Integration Testing. Поэтому его, вероятно, следует более правильно назвать «тестом взаимодействия потоков» (thread interaction test).")]),e("p",[t._v("Thread Testing подразделяется на две категории:")]),e("ul",[e("li",[t._v("Однопоточное тестирование (Single thread testing) включает одну транзакцию приложения за раз;")]),e("li",[t._v("Многопоточное тестирование (Multi-thread testing) включает одновременно несколько активных транзакций;")])]),e("p",[t._v("Как проводить Thread Testing:")]),e("ul",[e("li",[t._v("Тестирование на основе потоков является обобщенной формой тестирования на основе сеансов (session-based testing), в котором сеансы являются формой потока, но поток не обязательно является сеансом;")]),e("li",[t._v("Для тестирования потока, поток или программа (небольшая функциональность) интегрируются и тестируются постепенно как подсистема, а затем выполняются для всей системы;")]),e("li",[t._v("На самом низком уровне оно предоставляет интеграторам лучшее представление о том, что тестировать;")]),e("li",[t._v("Вместо непосредственного тестирования программных компонентов требуется, чтобы интеграторы сосредоточились на тестировании логических путей выполнения в контексте всей системы;")])]),e("p",[t._v("Советы:")]),e("ul",[e("li",[t._v("Протестируйте свою многопоточную программу, многократно выполняя ее с другим набором запущенных приложений;")]),e("li",[t._v("Протестируйте свою многопоточную программу, активировав одновременно несколько экземпляров программы;")]),e("li",[t._v("Выполняйте многопоточную программу на разных моделях оборудования с различными уровнями нагрузки и рабочими нагрузками;")]),e("li",[t._v("Инспекция кода;")]),e("li",[t._v("Собирайте только ошибки и сбои, которые произошли в потоках, отличных от основного;")])]),e("h3",{attrs:{id:"системное-тестирование-system-testing"}},[e("a",{attrs:{href:"#%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%BD%D0%BE%D0%B5-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-system-testing","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Системное тестирование (System Testing)")]),e("p",[t._v("Системное тестирование означает тестирование всей системы в целом, оно выполняется после интеграционного тестирования, чтобы проверить, работает ли вся система целиком должным образом. В основном это тестирование типа «черный ящик», которое оценивает работу системы с точки зрения пользователя с помощью документа спецификации и оно не требует каких-либо внутренних знаний о системе, таких как дизайн или структура кода.")]),e("p",[e("strong",[t._v("Основное внимание уделяется следующему")]),t._v(":")]),e("ul",[e("li",[t._v("Внешние интерфейсы;")]),e("li",[t._v("Многопрограммность и сложный функционал;")]),e("li",[t._v("Безопасность;")]),e("li",[t._v("Восстановление;")]),e("li",[t._v("Производительность;")]),e("li",[t._v("Гладкое (smooth) взаимодействие оператора и пользователя с системой;")]),e("li",[t._v("Возможность установки;")]),e("li",[t._v("Документация;")]),e("li",[t._v("Удобство использование;")]),e("li",[t._v("Нагрузка / стресс;")])]),e("p",[e("strong",[t._v("Зачем нужно системное тестирование")]),t._v("?")]),e("ul",[e("li",[t._v("Очень важно завершить полный цикл тестирования, и ST - это этап, на котором это делается;")]),e("li",[t._v("ST выполняется в среде, аналогичной production environment, и, следовательно, заинтересованные стороны могут получить хорошее представление о реакции пользователя;")]),e("li",[t._v("Это помогает свести к минимуму устранение неполадок после развертывания и количество обращений в службу поддержки;")]),e("li",[t._v("На этом этапе STLC тестируются архитектура приложения и бизнес-требования. Это тестирование очень важно, и оно играет важную роль в предоставлении клиенту качественного продукта;")])]),e("p",[e("strong",[t._v("Критерии начала системного тестирования")]),t._v(":")]),e("ul",[e("li",[t._v("Система должна соответствовать критериям окончания интеграционного тестирования, то есть все test cases должны быть выполнены, и не должно быть открытых критических ошибок или ошибок с приоритетом P1, P2;")]),e("li",[t._v("System Test Plan должен быть одобрен и подписан;")]),e("li",[t._v("Test cases/scenarios/scripts должны быть готовы к выполнению;")]),e("li",[t._v("Все нефункциональные требования должны быть доступны, и для них должны быть созданы test cases;")]),e("li",[t._v("Среда тестирования должна быть готова;")])]),e("p",[e("strong",[t._v("Критерии окончания системного тестирования")]),t._v(":")]),e("ul",[e("li",[t._v("Все test cases должны быть выполнены;")]),e("li",[t._v("В открытом состоянии не должно быть критических, приоритетных или связанных с безопасностью ошибок;")]),e("li",[t._v("Если какие-либо ошибки со средним или низким приоритетом находятся в открытом состоянии, они должны быть исправлены с согласия клиента;")]),e("li",[t._v("Отчет о выходе (Exit Report) должен быть отправлен;")])]),e("p",[e("strong",[t._v("Чем отличается системное тестирование от сквозного")]),t._v(" (E2E - end-to-end testing)?")]),e("p",[t._v("Сквозное тестирование - это методология тестирования программного обеспечения для тестирования flow приложения от начала до конца. Целью сквозного тестирования является моделирование реального пользовательского сценария и проверка тестируемой системы и ее компонентов на предмет интеграции и целостности данных.")]),e("p",[t._v("Системное тестирование - этап предпоследний этап STLC и уровень тестирования, а E2E - подход к тестам. Обычно сквозные тесты выполняют после системного тестирования и перед приемочным, а также после внесения изменений (smoke и regression). E2E выполняется от начала до конца в реальных сценариях, таких как взаимодействие приложения с оборудованием, сетью, базой данных и другими приложениями. Основная причина проведения этого тестирования - определение различных зависимостей приложения, а также обеспечение передачи точной информации между различными компонентами системы.")]),e("h3",{attrs:{id:"приемочное-тестирование-at---acceptance-testing"}},[e("a",{attrs:{href:"#%D0%BF%D1%80%D0%B8%D0%B5%D0%BC%D0%BE%D1%87%D0%BD%D0%BE%D0%B5-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-at---acceptance-testing","aria-hidden":"true"}},[e("span",{staticClass:"icon icon-link"})]),t._v("Приемочное тестирование (AT - Acceptance testing)")]),e("p",[e("em",[t._v("Приемочное тестирование (acceptance testing): Формальное тестирование по отношению к потребностям, требованиям и бизнес процессам пользователя, проводимое с целью определения соответствия системы критериям приемки и дать возможность пользователям, заказчикам или иным авторизированым лицам определить, принимать систему или нет. (IEEE 610)")])]),e("p",[e("em",[t._v("Эксплуатационное приемочное тестирование (operational acceptance testing): Эксплуатационное тестирование в фазе приемочного тестирования, обычно выполняемое пользователем и/или сотрудниками с администраторским доступом, в рабочей среде (возможно, стимулированной), фокусируясь на функциональных аспектах. Например, восстанавливаемость, поведение ресурсов, устанавливаемость и техническое соответствие. (ISTQB)")])]),e("p",[t._v("После того, как процесс тестирования системы завершен командой тестирования, весь продукт передается клиенту и/или нескольким его пользователям для проверки приемлемости (acceptability). Е2Е бизнес-потоки проверяются аналогично в сценариях в реальном времени. Подобная производственной среда будет тестовой средой для приемочного тестирования (Staging, Pre-Prod, Fail-Over, UAT environment). Это метод тестирования черного ящика, при котором проверяется только функциональность, чтобы убедиться, что продукт соответствует указанным критериям приемки.")]),e("p",[e("strong",[t._v("Виды приемочного тестирования")]),t._v(":")]),e("ul",[e("li",[e("strong",[t._v("Пользовательское")]),t._v(" приемочное тестирование (UAT - User Acceptance Testing, validation, end-user testing) выполняется пользователем или клиентом чтобы определить, может ли ПО быть принято (accepted) или нет и проверить ПО на соответствие бизнес-требованиям. Могут существовать такие бизнес-требования и процессы, которые известны только конечным пользователям, и они либо пропускаются, либо неправильно интерпретируются, поэтому приемочное тестирование выполняется конечными пользователями, знакомыми с бизнес-требованиями;")]),e("li",[e("strong",[t._v("Бизнес -")]),t._v(" приемочное тестирование (BAT - Business Acceptance Testing) необходимо для оценки того, соответствует ли Продукт бизнес-целям и задачам. BAT в основном фокусируется на бизнес-преимуществах (финансах), которые являются довольно сложными из-за меняющихся рыночных условий / прогрессирующих технологий, так что текущая реализация может претерпеть изменения, которые приведут к дополнительным затратам. Даже Продукт, отвечающий техническим требованиям, может не пройти BAT по этим причинам;")]),e("li",[e("strong",[t._v("Контрактное")]),t._v(" приемочное тестирование (CAT - Contract Acceptance Testing) - это контракт, который определяет, что после того, как Продукт будет запущен в течение заранее определенного периода, должен быть проведен приемочный тест, и он должен пройти все приемочные тест-кейсы. Подписанный здесь контракт называется Соглашением об уровне обслуживания (SLA), которое включает условия, по которым платеж будет производиться только в том случае, если услуги Продукта соответствуют всем требованиям, что означает, что контракт выполнен. Иногда этот контракт может заключаться до того, как Продукт будет запущен. В любом случае, контракт должен быть четко определен с точки зрения периода тестирования, областей тестирования, условий по проблемам, возникающим на более поздних этапах, платежей и т. д.;")]),e("li",[e("strong",[t._v("Правовое")]),t._v(" приемочное тестирование (RAT - Regulations/Compliance Acceptance Testing) необходимо для оценки того, нарушает ли Продукт правила и нормы, установленные правительством страны, в которой он выпускается. Это может быть непреднамеренным, но отрицательно скажется на бизнесе. Обычно разрабатываемый Продукт / приложение, предназначенный для выпуска во всем мире, должен пройти RAT, поскольку в разных странах / регионах действуют разные правила и положения, определенные его руководящими органами. Если какие-либо правила и нормы нарушаются для какой-либо страны, то этой стране или конкретному региону в этой стране не будет разрешено использовать Продукт и это будет считаться отказом (Failure). Вендоры Продукта несут прямую ответственность, если Продукт будет выпущен даже при наличии нарушения;")]),e("li",[e("strong",[t._v("Эксплуатационное")]),t._v(" приемочное тестирование ("),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Operational_acceptance_testing",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("OAT - Operational Acceptance testing")]),t._v(") - это тип тестирования программного обеспечения, который оценивает эксплуатационную готовность программного приложения до его выпуска в производство. Целью эксплуатационного тестирования является обеспечение бесперебойной работы системы в ее стандартной эксплуатационной среде (SOE - standard operating environment). В основном это тестирование восстановления, совместимости, ремонтопригодности, доступности технической поддержки, надежности, восстановления после сбоя, локализации и т. д (recovery, compatibility, maintainability, technical support availability, reliability, fail-over, localization);")]),e("li",[e("strong",[t._v("Альфа-тестирование")]),t._v(" ("),e("a",{attrs:{href:"https://www.softwaretestinghelp.com/alpha-testing/",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("Alpha Testing")]),t._v(") проводят для оценки продукта в среде разработки / тестирования специализированной командой тестировщиков, обычно называемой альфа-тестерами. Здесь отзывы и предложения тестировщиков помогают улучшить использование Продукта, а также исправить определенные ошибки;")]),e("li",[e("strong",[t._v("Бета-тестирование, полевые испытания")]),t._v(" ("),e("a",{attrs:{href:"https://www.softwaretestinghelp.com/beta-testing/",target:"_blank",rel:"nofollow noopener noreferrer"}},[t._v("Beta Testing")]),t._v(", Field Testing) проводят для оценки Продукта, предоставляя его реальным конечным пользователям, обычно называемым бета-тестерами / бета-пользователями, в их среде. Собирается постоянная обратная связь от пользователей, и проблемы устраняются. Кроме того, это помогает в улучшении Продукта, чтобы обеспечить удобство работы пользователей. Тестирование происходит неконтролируемым образом, что означает, что у пользователя нет ограничений на использование Продукта;")])]),e("p",[e("strong",[t._v("Уровни Тестирования")]),t._v("\n1. Модульное тестирование (Unit Testing)\nКомпонентное (модульное) тестирование проверяет функциональность и ищет дефекты в частях приложения, которые доступны и могут быть протестированы по-отдельности (модули программ, объекты, классы, функции и т.д.).")]),e("ol",{attrs:{start:"2"}},[e("li",[e("p",[t._v("Интеграционное тестирование (Integration Testing)\nПроверяется взаимодействие между компонентами системы после проведения компонентного тестирования.")])]),e("li",[e("p",[t._v("Системное тестирование (System Testing)\nОсновной задачей системного тестирования является проверка как функциональных, так и не функциональных требований в системе в целом. При этом выявляются дефекты, такие как неверное использование ресурсов системы, непредусмотренные комбинации данных пользовательского уровня, несовместимость с окружением, непредусмотренные сценарии использования, отсутствующая или неверная функциональность, неудобство использования и т.д.")])]),e("li",[e("p",[t._v("Операционное тестирование (Release Testing).\nДаже если система удовлетворяет всем требованиям, важно убедиться в том, что она удовлетворяет нуждам пользователя и выполняет свою роль в среде своей эксплуатации, как это было определено в бизнес моделе системы. Следует учесть, что и бизнес модель может содержать ошибки. Поэтому так важно провести операционное тестирование как финальный шаг валидации. Кроме этого, тестирование в среде эксплуатации позволяет выявить и нефункциональные проблемы, такие как: конфликт с другими системами, смежными в области бизнеса или в программных и электронных окружениях; недостаточная производительность системы в среде эксплуатации и др. Очевидно, что нахождение подобных вещей на стадии внедрения — критичная и дорогостоящая проблема. Поэтому так важно проведение не только верификации, но и валидации, с самых ранних этапов разработки ПО.")])]),e("li",[e("p",[t._v("Приемочное тестирование (Acceptance Testing)\nФормальный процесс тестирования, который проверяет соответствие системы требованиям и проводится с целью:\n• определения удовлетворяет ли система приемочным критериям;\n• вынесения решения заказчиком или другим уполномоченным лицом принимается приложение или нет.")])])])])}),[],!1,null,null,null);"function"==typeof l&&l(c),"function"==typeof g&&g(c);e.default=c.exports}}]);