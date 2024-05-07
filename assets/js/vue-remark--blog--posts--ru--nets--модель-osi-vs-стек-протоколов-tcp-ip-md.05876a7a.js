(window.webpackJsonp=window.webpackJsonp||[]).push([[124],{LiQG:function(n,t,o){"use strict";o.r(t);var i=o("KHd+"),e=o("UQSp"),r=o("oCYn");function s(n){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}r.a.config.optionMergeStrategies;var a={VueRemarkRoot:e.a},p=function(n){var t=n.options.components=n.options.components||{},o=n.options.computed=n.options.computed||{};Object.keys(a).forEach((function(n){"object"===s(a[n])&&"function"==typeof a[n].render||"function"==typeof a[n]&&"function"==typeof a[n].options.render?t[n]=a[n]:o[n]=function(){return a[n]}}))},c=r.a.config.optionMergeStrategies,v="__vueRemarkFrontMatter",u={excerpt:null,title:"Модель OSI vs стек протоколов TCP/IP",category:"nets",description:"Модель OSI vs стек протоколов TCP/IP",tags:["qa"],icon:"fas fa-bug",image:"null",date:"2022-06-24T00:00:00.000Z",keywords:"qa",order:1,links:[{items:[{title:"Теория тестирования",link:"/category/manual/"},{title:"Как создать новый Gradle проект",link:"/kak-sozdat-novyj-gradle-proekt/"}]}]};var l=function(n){n.options[v]&&(n.options[v]=u),r.a.util.defineReactive(n.options,v,u),n.options.computed=c.computed({$frontmatter:function(){return n.options[v]}},n.options.computed)},f=Object(i.a)({},(function(){var n=this,t=n._self._c;return t("VueRemarkRoot",[t("h2",{attrs:{id:"модель-osi"}},[t("a",{attrs:{href:"#%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D1%8C-osi","aria-hidden":"true"}},[t("span",{staticClass:"icon icon-link"})]),n._v("Модель OSI")]),t("p",[n._v("Модель OSI - это описание уровней и какие протоколы используются на этих уровнях.")]),t("h3",{attrs:{id:"уровни"}},[t("a",{attrs:{href:"#%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D0%B8","aria-hidden":"true"}},[t("span",{staticClass:"icon icon-link"})]),n._v("Уровни")]),t("ul",[t("li",[n._v("Прикладной: HTTP, FTP, POP3")]),t("li",[n._v("Представления: JPG, ASCII")]),t("li",[n._v("Сеансовый: RPC, PAP")]),t("li",[n._v("Транспортный: TCP, UDP")]),t("li",[n._v("Сетевой: IP(IPv4, IPv6)")]),t("li",[n._v("Канальный: Ethernet, 802.22")]),t("li",[n._v("Физический: радиоканал или витая пара")])]),t("h3",{attrs:{id:"разница-между-tcp-и-udp"}},[t("a",{attrs:{href:"#%D1%80%D0%B0%D0%B7%D0%BD%D0%B8%D1%86%D0%B0-%D0%BC%D0%B5%D0%B6%D0%B4%D1%83-tcp-%D0%B8-udp","aria-hidden":"true"}},[t("span",{staticClass:"icon icon-link"})]),n._v("Разница между TCP и UDP")]),t("p",[t("strong",[n._v("UDP")]),n._v(" - транспортный протокол без подтверждения доставки;"),t("br"),n._v("\nТак как нам не всегда нужно подтверждение доставки и не важна точность данных, например, разговор по скайпу, прослушивание музыки.")]),t("p",[t("strong",[n._v("TCP")]),n._v(" - транспортный протокол с подтверждением доставки;"),t("br"),n._v("\nНапример, открытие страницы в интернет -  если что то не дойдет, то поедет верстка, отправка письма - если что то потеряется, то будет потерян смысл пиисьма, отправка файла и т.д.")]),t("p",[n._v("Если смотреть на процесс открытия web-страницы в интернете то это будет выглядеть так:  ")]),t("p",[n._v("если смотреть с "),t("strong",[n._v("физического уровня")]),n._v(", то  мы подключены к интернету по витой паре или радиоканалу(wi-fi);")]),t("p",[n._v("если с "),t("strong",[n._v("канального уровня")]),n._v(", то у wi-fi есть стандарт 802.11g 802.11ab мы подкючаемся по нему;")]),t("p",[n._v("с точки зрения "),t("strong",[n._v("сетевого уровня")]),n._v(", у нас ip адресация - откуда и куда нужно отправить информацию;")]),t("p",[n._v("с точки зрения "),t("strong",[n._v("транспортного уровня")]),n._v(", http работает по TCP, проверка целостности данных;")]),t("p",[t("strong",[n._v("сеансовый уровень")]),n._v(" не используется;")]),t("p",[n._v("с точки зрения "),t("strong",[n._v("представления")]),n._v(" мы отправили наш запрос в виде текста (ASCII - текст);")]),t("p",[n._v("с точки зрения "),t("strong",[n._v("прикладного уровня")]),n._v(", мы используем HTTP;")]),t("h2",{attrs:{id:"модель-tcpip"}},[t("a",{attrs:{href:"#%D0%BC%D0%BE%D0%B4%D0%B5%D0%BB%D1%8C-tcpip","aria-hidden":"true"}},[t("span",{staticClass:"icon icon-link"})]),n._v("Модель TCP/IP")]),t("p",[n._v("TCP/IP - название стека протоколов")]),t("ul",[t("li",[n._v("Прикладной: HTTP, FTP, POP3")]),t("li",[n._v("Транспортный: TCP, UDP")]),t("li",[n._v("Сетевой: IP(IPv4, IPv6)")]),t("li",[n._v("Сетевого доступа: Ethernet, 802.22 + радиоканал или витая пара")])]),t("p",[n._v("Чек-лист API тестов\nКорректность структуры данных\nPOST запросы\nЗаполнены все поля валидными данными\nЗаполнены только обязательные поля\nЗаполнены не все обязательные поля\nНе заполнено ни одно поле\nВалидация данных в полях (корректные и некорректные данные)\nПустой JSON\nДата создания объекта\nGET запросы\nПустой список (если возможно)\nЗаполненный список\nПагинация в списке (limit, offset)\nПолучение списка с ограничением на количество записей\nПолучение списка начиная с указанного номера\nВ случае передачи параметров с некорректным значением возвращается 400 с описанием ошибки в теле ответа\nПри отрицательном offset список пользователей возвращается начиная с первой позиции\nПри несуществующем offset возвращается пустой список пользователей\nСортировка списка\nЗапрос данных по валидному ID, проверка возвращения корректных данных\nЗапрос данных по несуществующему ID, но в валидном формате\nЗапрос данных по невалидному ID\nPUT запросы\nОбновление с корректными данными\nОбновление по несуществующему ID\nОбновление по невалидному ID\nВалидация полей (корректные и некорректные данные)\nЧастичное обновление (в JSON присутствуют не все поля)\nDELETE запросы\nУдаление существующего объекта\nУдаление уже удаленного объекта\nУдаление по несуществующему ID\nУдаление по невалидному ID\nУдаление и повторное добавление такой же сущности (если есть уникальные поля)\nПроверка статусов ответов\nПроверка всех возможных ошибок\nОстальные специфичные проверки в случае сложной логики")])])}),[],!1,null,null,null);"function"==typeof p&&p(f),"function"==typeof l&&l(f);t.default=f.exports},UQSp:function(n,t,o){"use strict";t.a={name:"VueRemarkRoot",render(n){return n("div",null,this.$slots.default)}}}}]);