(window.webpackJsonp=window.webpackJsonp||[]).push([[130],{UQSp:function(t,n,s){"use strict";n.a={name:"VueRemarkRoot",render(t){return t("div",null,this.$slots.default)}}},X25g:function(t,n,s){"use strict";s.r(n);var a=s("KHd+"),e=s("UQSp"),i=s("oCYn");function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}i.a.config.optionMergeStrategies;var l={VueRemarkRoot:e.a},r=function(t){var n=t.options.components=t.options.components||{},s=t.options.computed=t.options.computed||{};Object.keys(l).forEach((function(t){"object"===o(l[t])&&"function"==typeof l[t].render||"function"==typeof l[t]&&"function"==typeof l[t].options.render?n[t]=l[t]:s[t]=function(){return l[t]}}))},v=i.a.config.optionMergeStrategies,_="__vueRemarkFrontMatter",c={excerpt:null,title:"CREATE, DROP, DELETE, UPDATE, INSERT, ALTER",category:"testops",description:"CREATE, DROP, DELETE, UPDATE, INSERT, ALTER",tags:["qa"],icon:"fas fa-bug",image:"null",date:"2022-07-07T00:00:00.000Z",keywords:"qa",order:1,links:[{items:[{title:"CREATE, DROP, DELETE, UPDATE, INSERT, ALTER",link:"/create-drop-delete-update-insert-alter"}]}]};var p=function(t){t.options[_]&&(t.options[_]=c),i.a.util.defineReactive(t.options,_,c),t.options.computed=v.computed({$frontmatter:function(){return t.options[_]}},t.options.computed)},u=Object(a.a)({},(function(){var t=this,n=t._self._c;return n("VueRemarkRoot",[n("h2",{attrs:{id:"состав-таблицы"}},[n("a",{attrs:{href:"#%D1%81%D0%BE%D1%81%D1%82%D0%B0%D0%B2-%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Состав таблицы")]),n("ol",[n("li",[t._v("Дать таблице имя, пусть она будет называться book, вот некоторые правила для выбора имен таблиц:")])]),n("ul",[n("li",[t._v("может включать английские буквы, цифры и знак подчеркивания, должно начинаться с буквы;")]),n("li",[t._v("имя должно быть уникальным в пределах базы данных.")])]),n("p",[t._v("Также рекомендуется:")]),n("ul",[n("li",[t._v("чтобы имя было существительным в единственном числе;")]),n("li",[t._v("имя должно быть понятным и соответствовать тому объекту, который оно описывает;")]),n("li",[t._v("имя должно быть как можно короче, максимум до 10 символов.")])]),n("ol",{attrs:{start:"2"}},[n("li",[t._v("Определить структуру таблицы, из каких атрибутов(столбцов, полей) она будет состоять.")])]),n("p",[t._v("Правила по выбору имени поля информационного объекта:")]),n("ul",[n("li",[t._v("может включать английские буквы, цифры и знак подчеркивания, должно начинаться с буквы;")]),n("li",[t._v("имя поля должно быть уникальным в пределах таблицы.")])]),n("p",[t._v("Рекомендации по выбору имени поля информационного объекта:")]),n("ul",[n("li",[t._v("имя должно быть понятным и соответствовать тем данным, которые хранятся в поле;")]),n("li",[t._v("имя может состоять из нескольких слов, тогда слова разделяются подчеркиванием, после подчеркивания слово пишется с маленькой буквы.")])]),n("ol",{attrs:{start:"3"}},[n("li",[t._v("Включить ключевое поле id, которое является ОБЯЗАТЕЛЬНЫМ ЭЛЕМЕНТОМ каждой реляционной таблицы. Ключевое поле является уникальным для каждой записи, однозначно определяет запись и в дальнейшем будет использоваться для связей с другими таблицами.")])]),n("p",[t._v("Рекомендации по именованию  ключевых полей:")]),n("ul",[n("li",[t._v("имя должно состоять  из двух частей: начинаться с названия таблицы, которой поле принадлежит, затем через подчеркивание необходимо указать id.")])]),n("h2",{attrs:{id:"основные-типы-данных-sql"}},[n("a",{attrs:{href:"#%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5-%D1%82%D0%B8%D0%BF%D1%8B-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-sql","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Основные типы данных SQL")]),n("ul",[n("li",[n("p",[t._v("INT, INTEGER"),n("br"),n("em",[t._v("Описание:")]),t._v(" Целое число, могут принимать значения от -2 147 483 648 до 2 147 483 647  \t\n"),n("em",[t._v("Пример:")]),t._v(" -567 1205")])]),n("li",[n("p",[t._v("DECIMAL, NUMERIC"),n("br"),n("em",[t._v("Описание:")]),t._v(" Вещественное число, в скобках указывается максимальная длина числа (включает символы слева и справа от десятичной запятой) и количество знаков после запятой.\nМожно использовать оба этих типа, они эквивалентны, принимают значения в диапазоне -10^38+1 до 10^38-1.\nDECIMAL(4,1) NUMERIC(6,3)"),n("br"),n("em",[t._v("Пример:")]),t._v(" 34.6 -3.294")])]),n("li",[n("p",[t._v("DATE"),n("br"),n("em",[t._v("Описание:")]),t._v(" Дата в формате ГГГГ-ММ-ДД \n26 июля 2020 года\n3 января 2021 года"),n("br"),n("em",[t._v("Пример:")]),t._v(" 2020-07-26 2021-01-03")])]),n("li",[n("p",[t._v("VARCHAR"),n("br"),n("em",[t._v("Описание:")]),t._v(" Строка длиной не более 255 символов, в скобках указывается максимальная длина строки, которая может храниться в поле VARCHAR(10)(рассматриваются однобайтовые кодировки, для которых число в скобках соответствует максимальному количеству символов в строке)"),n("br"),n("em",[t._v("Пример:")]),t._v(" пример описание")])])]),n("p",[t._v("Рекомендации по выбору типов данных для полей таблицы.")]),n("ul",[n("li",[t._v("Выбирайте минимальный тип данных исходя из максимального значения поля. Например, если максимальный текст, который может быть записан в поле, имеет длину 25 символов, значит нужно использовать тип VARCHAR(25).")]),n("li",[t._v("Для описания ключевого поля используйте описание INT PRIMARY KEY AUTO_INCREMENT. Это значит, что в поле будут заноситься различные целые числа, при этом они будут автоматически генерироваться (каждая следующая строка будет иметь значение ключа на 1 больше предыдущего).")])]),n("h2",{attrs:{id:"создание-таблицы"}},[n("a",{attrs:{href:"#%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Создание таблицы")]),n("p",[t._v("Для создания таблицы используется SQL-запрос. ")]),n("div",{staticClass:"gridsome-highlight",attrs:{"data-language":"sql"}},[n("pre",{staticClass:"language-sql"},[n("code",{staticClass:"language-sql"},[n("span",{staticClass:"token keyword"},[t._v("CREATE")]),t._v(" "),n("span",{staticClass:"token keyword"},[t._v("TABLE")]),t._v(" genre"),n("span",{staticClass:"token punctuation"},[t._v("(")]),t._v("\n    genre_id "),n("span",{staticClass:"token keyword"},[t._v("INT")]),t._v(" "),n("span",{staticClass:"token keyword"},[t._v("PRIMARY")]),t._v(" "),n("span",{staticClass:"token keyword"},[t._v("KEY")]),t._v(" "),n("span",{staticClass:"token keyword"},[t._v("AUTO_INCREMENT")]),n("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" \n    name_genre "),n("span",{staticClass:"token keyword"},[t._v("VARCHAR")]),n("span",{staticClass:"token punctuation"},[t._v("(")]),n("span",{staticClass:"token number"},[t._v("30")]),n("span",{staticClass:"token punctuation"},[t._v(")")]),t._v("\n"),n("span",{staticClass:"token punctuation"},[t._v(")")]),n("span",{staticClass:"token punctuation"},[t._v(";")])])])]),n("p",[t._v("Рекомендации по записи SQL запроса")]),n("ul",[n("li",[t._v("Ключевые слова: SQL не является регистрозависимым языком (CREATE и create - одно и тоже ключевое слово). ")]),n("li",[t._v("Ключевые слова SQL и типы данных рекомендуется  записывать прописными (большими) буквами.")]),n("li",[t._v("Имена таблиц и полей - строчными (маленькими) буквами.\nSQL-запрос можно писать на нескольких строках.")]),n("li",[t._v("В конце SQL-запроса ставится точка с запятой (хотя если Вы пишете один запрос, это необязательно).")])]),n("h2",{attrs:{id:"вставка-записи-в-таблицу"}},[n("a",{attrs:{href:"#%D0%B2%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B8-%D0%B2-%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%83","aria-hidden":"true"}},[n("span",{staticClass:"icon icon-link"})]),t._v("Вставка записи в таблицу")]),n("p",[t._v("В таблицу, состоящую из двух столбцов добавим новую строку, при этом в поле1 заносится значение1,  в поле2 - значение2.")]),n("div",{staticClass:"gridsome-highlight",attrs:{"data-language":"sql"}},[n("pre",{staticClass:"language-sql"},[n("code",{staticClass:"language-sql"},[n("span",{staticClass:"token keyword"},[t._v("INSERT")]),t._v(" "),n("span",{staticClass:"token keyword"},[t._v("INTO")]),t._v(" таблица"),n("span",{staticClass:"token punctuation"},[t._v("(")]),t._v("поле"),n("span",{staticClass:"token number"},[t._v("1")]),n("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" поле"),n("span",{staticClass:"token number"},[t._v("2")]),n("span",{staticClass:"token punctuation"},[t._v(")")]),t._v(" \n"),n("span",{staticClass:"token keyword"},[t._v("VALUES")]),t._v(" "),n("span",{staticClass:"token punctuation"},[t._v("(")]),t._v("значение"),n("span",{staticClass:"token number"},[t._v("1")]),n("span",{staticClass:"token punctuation"},[t._v(",")]),t._v(" значение"),n("span",{staticClass:"token number"},[t._v("2")]),n("span",{staticClass:"token punctuation"},[t._v(")")]),n("span",{staticClass:"token punctuation"},[t._v(";")])])])]),n("p",[t._v("При составлении списка полей и списка значений необходимо учитывать следующее:")]),n("ul",[n("li",[t._v("количество полей и количество значений в списках должны совпадать;")]),n("li",[t._v("должно существовать прямое соответствие между позицией одного и того же элемента в обоих списках, поэтому первый элемент списка значений должен относиться к первому столбцу в списке столбцов, второй – ко второму столбцу и т.д.;")]),n("li",[t._v("типы данных элементов в списке значений должны быть совместимы с типами данных соответствующих столбцов таблицы ( целое число можно занести в поле типа DECIMAL, обратная операция - недопустима);")]),n("li",[t._v("новые значения нельзя добавлять в поля, описанные как PRIMARY KEY AUTO_INCREMENT;")]),n("li",[t._v("рекомендуется заполнять все поля записи, если же поле пропущено, значение этого поля зависит от установленных по умолчанию значений, если значения не установлены - на данной платформе вставляется пустое значение (NULL).")])])])}),[],!1,null,null,null);"function"==typeof r&&r(u),"function"==typeof p&&p(u);n.default=u.exports}}]);