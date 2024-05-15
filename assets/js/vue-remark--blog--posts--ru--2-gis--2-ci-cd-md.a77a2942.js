(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{Ty2e:function(t,n,i){"use strict";i.r(n);var o=i("KHd+"),e=i("UQSp"),s=i("oCYn");function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}s.a.config.optionMergeStrategies;var D={VueRemarkRoot:e.a},a=function(t){var n=t.options.components=t.options.components||{},i=t.options.computed=t.options.computed||{};Object.keys(D).forEach((function(t){"object"===r(D[t])&&"function"==typeof D[t].render||"function"==typeof D[t]&&"function"==typeof D[t].options.render?n[t]=D[t]:i[t]=function(){return D[t]}}))},u=s.a.config.optionMergeStrategies,c="__vueRemarkFrontMatter",l={excerpt:null,title:"CI/CD",category:"testops",description:"CI/CD",tags:["Автоматизация тестирования","CI","CD"],icon:"fas fa-robot",image:"null",date:"2022-07-27T00:00:00.000Z",keywords:"qa, CI/CD",order:2,links:[{items:[{title:"Микросервисная архитектура",link:"/mikroservisnaya-arhitektura/"},{title:"CI/CD",link:"//mikroservisnaya-arhitektura//"},{title:"Docker",link:"/docker/"},{title:"Kubernetes",link:"/kubernetes/"},{title:"Linux",link:"/linux/"},{title:"Общие вопросы TestOps",link:"/obshhie-voprosy-test-ops/"}]}]};var p=function(t){t.options[c]&&(t.options[c]=l),s.a.util.defineReactive(t.options,c,l),t.options.computed=u.computed({$frontmatter:function(){return t.options[c]}},t.options.computed)},v=Object(o.a)({},(function(){var t=this,n=t._self._c;return n("VueRemarkRoot",[n("p",[n("strong",[t._v("CI/CD (Continuous Integration, Continuous Delivery — непрерывная интеграция и доставка)")]),t._v(" — это технология автоматизации тестирования и доставки новых модулей разрабатываемого проекта заинтересованным сторонам (разработчикам, аналитикам, инженерам качества, конечным пользователям и др.).")]),n("h2",{attrs:{id:"принципы-cicd"}},[n("a",{attrs:{href:"#%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF%D1%8B-cicd","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Принципы CI/CD")]),n("p",[t._v("Концепция непрерывной интеграции и развертывания относится к agile-методологиям разработки программного обеспечения. Ее основная цель — уделение достаточного внимания бизнес-требованиям, безопасности и качеству кода конечного продукта. В рамках подхода решаются следующие задачи:")]),n("ul",[n("li",[t._v("автоматизация последовательной сборки, упаковки и тестирования программных продуктов;")]),n("li",[t._v("автоматизация развертывания приложения в различных окружениях;")]),n("li",[t._v("минимизация ошибок и уязвимостей программного продукта.")])]),n("p",[t._v("Разработка по методике CI/CD соответствует таким основным принципам:")]),n("ul",[n("li",[n("strong",[t._v("Распределение ответственности.")]),t._v(" Задачи и этапы разработки разделяются между членами команды или ее подгруппами (при работе над большим проектом). Рабочий процесс организуется с учетом бизнес-логистики, внедрения сквозных функций, проведения тестов, безопасности хранения данных и т.д.")]),n("li",[n("strong",[t._v("Сокращение рисков.")]),t._v(" Каждый разработчик или подгруппа разработчиков должны стремиться минимизировать уязвимости и ошибки на всех этапах разработки. Для этого постоянно контролируется бизнес-логистика, проводится пользовательское тестирование продукта, оптимизируется хранение, обработка данных и т.д.")]),n("li",[n("strong",[t._v("Оптимизация обратной связи.")]),t._v(" Успех проекта зависит от того, как работают друг с другом разработчики, клиенты и пользователи. Это влияет на скорость внесения в приложение корректировок и обновлений. Если сборку и тестирование можно автоматизировать, то во многих других операциях требуется участие человека. Чтобы взаимодействие происходило конструктивнее, уменьшается количество посредников между заказчиком, исполнителями и пользователями.\nСоздание рабочей среды. Для удобства совместной работы у разработчиков должно быть общее рабочее пространство. Помимо основной ветки процесса в нем должна быть побочная – в ней удобнее проводить тестирование, вносить корректировки, отслеживать отказоустойчивость и т.д.")])]),n("p",[t._v("СI/CD представляет собой современную аналогию конвейерного производства. Их объединяют четкое распределение труда, непрерывный, потоковый характер рабочего процесса, параллельное выполнение сразу нескольких задач (например, кодинга и тестирования). Сегодня эта концепция является доминирующей в DevOps.")]),n("h2",{attrs:{id:"этапы-cicd"}},[n("a",{attrs:{href:"#%D1%8D%D1%82%D0%B0%D0%BF%D1%8B-cicd","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Этапы CI/CD")]),n("p",[n("strong",[t._v("Написание кода.")]),t._v(" Каждый разработчик создает код отведенного ему модуля и тестирует его в ручном режиме. Затем разработанный и проверенный программный блок интегрируется в основной ветке с текущей версией продукта. Как только все модули будут опубликованы в главной ветке, команда переходит к следующему этапу.")]),n("p",[n("strong",[t._v("Сборка.")]),t._v(" Заранее подобранная система контроля версий запускает автоматизированную сборку и тестирование всего продукта. Триггеры могут быть настроены автоматически или вручную. Автоматическая сборка выполняется с помощью Jenkins или другого сервера непрерывной интеграции.")]),n("p",[n("strong",[t._v("Ручное тестирование.")]),t._v(" Как только CI-сервер закончит автоматизированную сборку продукта, он передается тестировщикам на проверку. Они используют различные методики тестирования для выявления и устранения ошибок и уязвимостей программы.")]),n("p",[n("strong",[t._v("Релиз.")]),t._v(" После исправления ошибок вычищенный и отлаженный код переходит на этап релиза для клиентов. Его проверяет заказчик, возможно, с привлечением своих специалистов или ограниченной группы пользователей. По результатам проверки код отправляется на доработку или согласуется.")]),n("p",[n("strong",[t._v("Развертывание.")]),t._v(" Текущая версия программы размещается на продакшн-серверах разработчика. Заказчик может работать с программой, исследовать ее функции, искать уязвимости.")]),n("p",[n("strong",[t._v("Поддержка и отслеживание.")]),t._v(" После развертывания приложение становится доступным конечным пользователям. Параллельно этому разработчики выполняют его поддержку и одновременно мониторят реакцию пользователей, анализируют их опыт взаимодействия с программой.")]),n("p",[n("strong",[t._v("Планирование.")]),t._v(" На основании данных, полученных при изучении пользовательского опыта, разработчик подготавливает план доработок, включающий новые функции, исправление ошибок и т.д. После этого он вносит все корректировки в продукт — и цикл разработки начинается снова.")]),n("p",[t._v("Таким образом, рабочий процесс по методологии CI/CD включает как последовательные, так и параллельные этапы. Именно для распараллеливания в рабочем пространстве создается побочная ветка — в ней проще вести работу, не вмешиваясь в основной код до тех пор, пока программируемый модуль не будет готов к интеграции. Условно рабочий процесс по методологии CI/CD можно представить в виде следующей схемы:")]),n("h2",{attrs:{id:"общий-принцип-cicd-разработки"}},[n("a",{attrs:{href:"#%D0%BE%D0%B1%D1%89%D0%B8%D0%B9-%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF-cicd-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Общий принцип CI/CD-разработки")]),n("h3",{attrs:{id:"преимущества-cicd"}},[n("a",{attrs:{href:"#%D0%BF%D1%80%D0%B5%D0%B8%D0%BC%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B0-cicd","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Преимущества CI/CD")]),n("p",[n("strong",[t._v("Сокращение сроков разработки.")]),t._v(" Методология уменьшает время доработок до нескольких дней, в сложных проектах — недель. Это позволяет разработчикам быстрее тестировать и опробовать нововведения, а затем внедрять их в продукт раньше конкурентов.\nОтбор перспективных вариантов. Быстрое тестирование и большое количество итераций позволяют разработчику вовремя отсеивать бесперспективные варианты кода на начальных этапах. Это также способствует экономичному расходованию времени и ресурсов без их распыления на тупиковые направления.")]),n("p",[n("strong",[t._v("Качество тестирования.")]),t._v(" Сочетание ручной и автоматизированной проверки позволяет выявлять ошибки на ранних этапах разработки. Это снижает вероятность их накопления на этапе релиза, что еще больше сокращает время работы над проектом.")]),n("h2",{attrs:{id:"недостатки-cicd"}},[n("a",{attrs:{href:"#%D0%BD%D0%B5%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%B8-cicd","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Недостатки CI/CD")]),n("p",[n("strong",[t._v("Высокие требования к опыту.")]),t._v(" Рабочий процесс в любой компании можно перевести на методологию CI/CD. Однако это требует от разработчиков как знания самой концепции на практическом уровне, так и умения быстро реорганизовать процессы в самой организации. Иными словами, CI/CD имеет достаточно большой порог вхождения в сравнении со многими традиционными методологиями.")]),n("p",[n("strong",[t._v("Сложность постоянного взаимодействия.")]),t._v(" Непрерывная интеграция и доставка программного продукта требуют от разработчиков высокой скоординированности действий. На практике это означает, что должно быть отдельное лицо, которое занимается организацией рабочего процесса и налаживанием взаимодействия между членами команды.")]),n("h2",{attrs:{id:"инструменты-для-cicd"}},[n("a",{attrs:{href:"#%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-cicd","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Инструменты для CI/CD")]),n("p",[t._v("Так как непрерывная интеграция и развертывание подразумевает автоматизацию многих процессов в ходе разработки, для этого созданы различные программные инструменты и сервисы:")]),n("p",[n("strong",[t._v("GitLab.")]),t._v(" Эта платформа позволяет управлять хранилищами проекта, документировать результаты тестирования и доработок, анализировать и дополнять функциональность проекта, выявлять и устранять ошибки.")]),n("p",[n("strong",[t._v("Docker.")]),t._v(" СD-система, позволяющая контейнеризировать проект, то есть упаковать его со всем окружением и зависимостями.")]),n("p",[n("strong",[t._v("Travis-CI.")]),t._v(" Сервер, который можно подключать к виртуальным репозиториям GitHub с минимальными настройками. Благодаря использованию облачных технологий его не нужно отдельно устанавливать.")]),n("p",[n("strong",[t._v("Jenkins.")]),t._v(" Один из самый популярных DevOps-инструментов, совместимый со всевозможными плагинами для адаптации под различные проекты и задачи.")]),n("p",[n("strong",[t._v("PHP Censor.")]),t._v(" CI-сервер, автоматизирующий сборку PHP-проектов. Может работать с репозиториями GitLab, Mercurial и другими, с библиотеками для тестирования Atoum, PHP Spec, Behat.")]),n("p",[t._v("Возможность оперативно вносить изменения, постоянно тестировать и дорабатывать продукт, взаимодействовать не только друг с другом, но и с клиентом — вот что делает концепцию CI/CD популярной среди разработчиков. Сегодня ее понимание и практическое освоение являются важной рекомендацией при разработке как крупных, так и небольших проектов.")]),n("div",{staticClass:"youtube-embed"},[n("div",{staticStyle:{width:"100%",margin:"0 auto"}},[n("div",{staticStyle:{position:"relative","padding-bottom":"56.25%","padding-top":"25px",height:"0"}},[n("iframe",{staticStyle:{position:"absolute",top:"0",left:"0",width:"100%",height:"100%"},attrs:{src:"https://www.youtube-nocookie.com/embed/7S1ndRRht6M",allow:"autoplay; encrypted-media",allowfullscreen:""}})])])]),n("h2",{attrs:{id:"вопросы"}},[n("a",{attrs:{href:"#%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D1%8B","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Вопросы")]),n("h3",{attrs:{id:"какие-стадии-должны-быть-в-любом-пайплайне"}},[n("a",{attrs:{href:"#%D0%BA%D0%B0%D0%BA%D0%B8%D0%B5-%D1%81%D1%82%D0%B0%D0%B4%D0%B8%D0%B8-%D0%B4%D0%BE%D0%BB%D0%B6%D0%BD%D1%8B-%D0%B1%D1%8B%D1%82%D1%8C-%D0%B2-%D0%BB%D1%8E%D0%B1%D0%BE%D0%BC-%D0%BF%D0%B0%D0%B9%D0%BF%D0%BB%D0%B0%D0%B9%D0%BD%D0%B5","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Какие стадии должны быть в любом пайплайне?")]),n("ul",[n("li",[t._v("build")]),n("li",[t._v("test - unit, integration tests")]),n("li",[t._v("lint - metrics chacks: coverage, code analysis")]),n("li",[t._v("deploy")]),n("li",[t._v("system tests: api tests, ui tests")])]),n("h3",{attrs:{id:"что-такое-continuous-integration-и-continuous-deployment-в-чем-разница-между-continuous-deployment-и-continuous-delivery"}},[n("a",{attrs:{href:"#%D1%87%D1%82%D0%BE-%D1%82%D0%B0%D0%BA%D0%BE%D0%B5-continuous-integration-%D0%B8-continuous-deployment-%D0%B2-%D1%87%D0%B5%D0%BC-%D1%80%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D0%B0-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-continuous-deployment-%D0%B8-continuous-delivery","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Что такое Continuous Integration и Continuous Deployment? В чем разница между Continuous Deployment и Continuous Delivery?")]),n("p",[t._v("Continuous Integration (CI) - непрерывная интеграция, это практика разработки программного обеспечения, при которой члены команды часто интегрируют свою работу. Интеграция это слияние новой версии кода со стабильной и проверка, что при этом ничего не сломалось. ")]),n("p",[t._v("Разница между Continuous Delivery и Continuous Deployment очень маленькая. Представим два пайплайна для одного и того же приложения. В каждом есть шаги:")]),n("p",[t._v("Source Control - внесение изменений в систему контроля версий ПО\nBuild - сборка приложения и прогон unit тестов\nStaging - деплой на тестовое окружение, прогон интеграционных, нагрузочных и других тестов\nProduction - деплой на окружение с пользователями\nКаждый пайплайн запускается автоматически по триггеру из системы контроля версий. В случае Continuous Deployment каждый следующий шаг, будет выполнен автоматически если предыдущий был успешный, включая деплой на Production.")]),n("p",[t._v("Если же у вас Continuous Delivery, то шаги будут выполняться автоматически только в безопасной среде, а перед деплоем на Production пайплайн остановится и будет ждать ручного подтверждения. Механизм, как это будет реализовано может быть разным. От самого простого, когда ответственный человек должен зайти в пайплайн и нажать кнопку Next, до интерактивного бота с кнопками в корпоративном мессенджере.")]),n("p",[t._v("Зачем нужен ручной апрув перед деплоем на Production, ведь это тормозит пайплайн т.е. доставку фич и исправлений багов? Вопрос резонный, но ответ такой же. Не все проекты одинаковые, есть такие в которых решение о деплое на Production должно быть принято человеком ответственно и осознанно. Когда бизнес сложный, с большим количеством факторов и нельзя переложить выбор “деплоить или нет” на пару алгоритмических критериев, тогда и применяется Continuous Delivery, а не Continuous Deployment.")]),n("ol",{attrs:{start:"52"}},[n("li",[t._v("Опишите основные этапы CI/CD.\nмомент, когда триггерится сборка, например, когда разработчик сделал коммит в свою ветку, запускается процесс, который выполняется специально написанными скриптами и утилитами. Этот процесс состоит из нескольких обязательных шагов. Простой пример для PR:")])]),n("p",[t._v("При открытии каждого Pull Request, Git-сервер отправляет уведомление CI-серверу;\nCI-сервер клонирует репозиторий, проверяет исходную ветку (например bugfix/wrong-sorting), и сливает код с кодом master-ветке;\nТогда запускается билд-скрипт (сценарий сборки). Например ./gradlew build;\nЕсли эта команда возвращает код ответа “0”, то билд успешно выполнен. (Другой ответ означает ошибку);\nCI-сервер направляет уведомление об успешном билде на Git-сервере;\nЕсли билд был успешен, то Pull Request разрешается слить с существующим кодом. (Если не успешен, то, соответственно, не разрешается).\nОшибка в любом из шагов приводит к полному падению всей сборки. Ну и, само собой разумеется, шаги расположены в таком порядке, чтобы сужать воронку потенциальных проблем. Если Quality Gate предыдущего этапа не пройдет, то на проверку следующего уже можно не тратить ресурсы.")]),n("p",[t._v("Пример Quality Gates, которые встроены в pipeline отсюда:")]),n("p",[t._v("Сборка сервиса:\nПроверка наличия конфигурации корректного формата;\nПроверка стандартов оформления кода;\nПроверка на необходимое покрытие Unit-тестами;\nГенерации и публикации контрактов (контроль обратной совместимости).\nЗапуск Beta-тестов;\nОбязательный code-review;\nСканирование на уязвимости.\nПример сферического пайплайна в вакууме отсюда:")]),n("p",[t._v("Code scanning: код проверяется на соответствие общему гайдлайну (linters), уязвимости (code security) и качество (code quality);\nUnit tests;\nBuild: этап для сборки artifacts/packages/images и т.д. Здесь уже можно задуматься о том, каким будет стратегия версионирования всего приложения. Во времена контейнеризации, в первую очередь интересуют образы для контейнеров и способы их версионирования;\nScan package: пакет/образ собрали. Теперь нужно просканировать его на уязвимости. Современные registry уже содержат инструментарий для этого;\nDeploy: стадия для развертывания приложения в различных окружениях;\nIntegration testing: приложение задеплоили. Оно где-то живет в отдельном контуре. Наступает этап интеграционного тестирования. Тестирование может быть как ручным, так и автоматизированным;\nPerformance testing (load/stress testing): данный вид тестирования имеет смысл проводить на stage/pre-production окружениях. С тем условием, что ресурсные мощности на нем такие же, как в production;\nCode Review / Approved: одним из важнейших этапов являются Merge Request. Именно в них могут производиться отдельные действия в pipeline перед слиянием, а также назначаться группы лиц, требующих одобрения перед слиянием.")]),n("ol",{attrs:{start:"53"}},[n("li",[n("p",[t._v("Опишите пример процесса CI (и/или CD), который начинается с момента, когда разработчик запушил изменения/PR в Git?")])]),n("li",[n("p",[t._v("Расскажите о разновидностях тестов, которые мы можем использовать в CI пайплайне.")])]),n("li",[n("p",[t._v("Какие инструменты CI вы использовали? Есть ли опыт работы с Jenkinsfile?")])]),n("li",[n("p",[t._v("Какие виды тестов вы знаете и зачем они нужны?")])]),n("li",[n("p",[t._v("Как автоматическое тестирование интегрируется в CI?")])]),n("li",[n("p",[t._v("Как настроить Job или Pipeline на знакомом вам CI-инструменте?")])]),n("li",[n("p",[t._v("Какие инструменты для генерации репорта после выполнения автоматических тестов вы знаете?")])]),n("li",[n("p",[t._v("Какую информацию должен содержать отчет о выполнении автоматических тестов?")])])])])}),[],!1,null,null,null);"function"==typeof a&&a(v),"function"==typeof p&&p(v);n.default=v.exports},UQSp:function(t,n,i){"use strict";n.a={name:"VueRemarkRoot",render(t){return t("div",null,this.$slots.default)}}}}]);