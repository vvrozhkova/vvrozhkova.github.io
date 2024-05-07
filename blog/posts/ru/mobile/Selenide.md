---
title:  Selenide
category: automation
description: Selenide
tags: ["selenium", "selenide"]
icon: "fas fa-robot"
image: "null"
date: 2022-06-19
keywords: "selenium, selenide"
links: [
        {
          items: [
                { title: "Моя подготовка", link: "/moya-podgotovka/" },
                { title: "Курс по автоматизации тестирования Java", link: "/kurs-po-avtomatizaczii-testirovaniya-java/" },
                { title: "Профессионально работаем с IntelliJ IDEA", link: "/professionalno-rabotaem-s-intelli-j-idea/" },
                { title: "Что такое Selenium?", link: "/chto-takoe-selenium/" },
                { title: "Инфраструктура проекта автотестирования", link: "/infrastruktura-proekta-avtotestirovaniya/" },
                { title: "Основы Java", link: "/osnovy-java/" },
          ]
        }
      ]
---

## Настройка таймаута

Выполняется через System.setProperty();

```java
mvn -Dselenide.timeout=8000
```

## Коллекции

$ - возвращает первый элемент
$$ - возвращает список

```java
$$(".error").shouldHave(size(3));
```

```java
$$("#employees tbody tr").shouldHave(
  tests(
    "John Belushi",
    "Bruce Willis",
    "John Malkovich"
  )
);
```

## Коллекции: фильтрации
```java
$$("#employees tbody tr")
  .filter(visible)
  .shouldHave(size(4));
```

## Поиск элементов

```java
$("#loginBtn") = $(By.id("loginBtn"));
$(".active") = $(By.className("active"));
$("[name=username]") = $(By.name("username"));
$x("//div//h1") = $(By.xpath("//div//h1"));
```

### Поиск по атрибутам
```java
$(by("type", "checkbox"));
$(by("readonly", "readonly"));
$(byTitle("Login form"));
$(byValue("Alert button"));
$(by("data-test-id", "alert-button"));

$(byText("Hello"));
$(withText("ello"));
```

## Открываем браузер

```java
open("url");
```

## Ввести значение в поле

```java
$(By.name("user.name")).setValue("john");
```

## Кликнуть мышью один раз

```java
$("#submit").click();
```

## Выполнить проверку по тексту элемента

```java
$(".menu").shouldHave(text("Hello, John!"));
```

## Page Object

```java
public class GooglePage {
  public void search(String queue){
    $(By.name("q"))
        .val(queue)
        .pressEnter();
  }
}

Можно вынести локатор в поле класса:

```java
public class GooglePage {
  private By query = By.name("q");

  public void search(String queue){
    $(query)
        .val(queue)
        .pressEnter();
  }
}
```

```java
@Test{
  var page = new GooglePage();
}
```

Можно вынести в поле весь элемент, но тогда нужно инициализировать класс страницы через специальный Factory метод.

```java
public class GooglePage {
  private SelenideElement query = $(By.name("q"));

  public void search(String queue){
    query
        .val(queue)
        .pressEnter();
  }
}
```

```java
@Test{
  var page = page(GooglePage.class);
}
```

## Аналог Yandex HtmlElements

```java
public class HtmlElementsPage {
  SelenideElement container = $("...");
  SelenideElement username = container.$("...");
  SelenideElement password = container.$("...");

  public void login(String un, String pwd){
    username.val(un);
    password.val(pwd);
  }
}
```
Или другой вариант:

```java
public class HtmlElementsPage {
  @FindBy(id="status")
  StatusBlock status;
}
class StatusBlock extends ElementsContainer {
  @FindBy(className="username")
  SelenideElement username;

  @FindBy(className = "password")
  SelenideElement password;
}
```

## Навигация по DOM'у

```java
$.parent()
$.closest("table")
```

```java
$("table td[data-foo='bar']")
.closest("table")
.find("tr", 4)
.find(byText("text"));
```

## Задать тип браузера для запуска

```java
java -Dselenide.browser=chrome
java -Dselenide.browser=firefox
java -Dselenide.browser=ie
java -Dselenide.browser=cy.test.MyWebDriver
```

Эти параметры удобно использовать когда в gradle.build мы создаем разные tasks или в pom.xml создаем разные profile

```groovy
task chrome(type: Test){
  systemProperties['selenide.browser'] = 'chrome'
}

task firefox(type: Test){
  systemProperties['selenide.browser'] = 'firefox'
}
```

**Jenkins**
Job 1: ./gradlew chrome  
Job 2: ./gradlew firefox

или можно задать браузер прямо в коде

```java
@Before
public void setUp(){
  Configuration.browser = "chrome";
  // or Configuration.browser = "firefox";
  // or Configuration.browser = "cy.MyWebDriver";
}
```

## Задать свой WebDriver (со своими настройками)

- setWebDriver (не рекомендуется)  
При использовании этого способа, нужно самому закрывать драйвер.

```java
@Before
public void setUp(){
  this.browser = new ChromeDriver(........);
  WebDriverRunner.setWebDriver(browser);
}
```

- WebDriverProvider  
Нужно только открыть закрывать и другие действия Selenide делает сам.

```java
@Before
public void setUp(){
  Configuration.browser = MyWDProvider.class.getName();
  open("https://google.com");
}

static class MyWDProvider implements WebDriverProvider{
  @Override
  public WebDriver createDriver(DesiredCapabilities capabilities){
    ChromeOptions options = new ChromeOptions();
    options.setHeadless(true);
    options.setArguments("--proxy-bypass-list=<-loopback>");
    options.merge(desiredCapabilities);
    return new ChromeDriver(options);
  }
}
```

## Два браузера в одном тесте

```java
var b1 = new SelenideDriver();
b1.open("http://some.site.com");
b1.$("#username").val("petja").pressEnter();
b1.$("#name").shouldHave(text("Hello, Petja!"));

var b2 = new SelenideDriver();
b2.open("http://some.site.com/admin");
b2.$(".block[data-username='petja']").click();

b1.$("#name").shouldHave(text("Goodbye, Petja!"));
```

При вызове браузеров можно также передавать разные настройки:

```java
var b1 = new SelenideDriver(
  new SelenideConfig()
  .timeout(6000)
  .browser("chrome")
  .headless(true)
);

var b2 = new SelenideDriver(
  new SelenideConfig()
  .timeout(90_000)
  .browser("firefox")
  .proxyEnabled(true)
);
```

## Прокси

### Загрузка файлов

Есть два варианта: 
- Configuration.fileDownload = HTTPGET;  
Если файл загружается по ссылке. Включен по умолчанию.

```java
@Test 
public void userCanViewTerminalDetailsAsPDF() throws FileNotFoundException { 
  File detailsAsPdf = $("#print-pdf").download(); 
  PDF pdf = new PDF(pdfFile); 
  assertThat(pdf, containsText("PP028004")); 
  assertThat(pdf, containsText("Торговый терминал")); 
  assertThat(pdf, containsTextCaseInsensitive("VeriFone VX 810")); 
} 
```

> Проверить pdf и xls можно с помощью:  
> - github.com/codeborne/pdf-test  
> - github.com/codeborne/xls-test

- Configuration.fileDownload = PROXY;
Когда по клику по элементу начинается загрузка файла.
Selenide запускает свой прокси-сервер и перехватывает запросы/ответы.

Он умеет: 
- Скачивать файлы 
- Подменять заголовки 
- Инжектить JS код на страницу 
- И т.д. и т.п.

По умолчанию он отключен так как если тесты запускаются на машине A а браузер на машине B и с машины B не видна машина A, то могут быть проблемы.

```java
@Before 
public void setUp() { 
  Configuration.proxyEnabled = true; 
  open("https://google.com"); 
}

@Test 
void canAddInterceptorsToProxyServer() { 
  SelenideProxyServer proxy = getSelenideProxy(); 

  proxy.addRequestFilter("proxy-usages.request", (request, 
  contents, messageInfo) -> { 
    String url = messageInfo.getUrl(); 
    log(url + "nn" + contents.getTextContents()); 
    return null; 
    });
}
```

## Параллелизация

Проблемы которые могут возникать:
- Статические переменные 
- Одновременный доступ к данным 
- синхронизация 
- И т.д.

Лучше запускать тесты в N процессов(forks).

### Maven

pom.xml: 

```xml
<plugin> 
  <groupId>org.apache.maven.plugins</groupId> 
  <artifactId>maven-surefire-plugin</artifactId> 
  <configuration> 
    <forkCount>3</forkCount> 
    <reuseForks>true</reuseForks> 
  </configuration> 
</plugin> 
```

### Gradle

```groovy
test {
  maxParallelForks = 5
}
```

## Трюки с JavaScript

### Выбрать дату

```java
void setDateByName(String name, String date) { 
  executeJavaScript(
    String.format("$('[name=\"%s\"]').val('%s')", 
    name, date)); 
} 

@Test { 
  setDateByName("recurrent.startDate", "16.01.2009"); 
}
```

### Выбрать опцию в bootstrap select

```java
void selectBS(WebElement select, String value) { 
  executeJavaScript( 
    "$(arguments[0]).val(arguments[1]).trigger('change')", 
    select, value); 
} 

@Test { 
  selectBS($(By.name("operationCode")), "11100"); 
}
```

### Слайдер

```java
void setMaxYearlyFee(int value) { 
  executeJavaScript( 
    "$('#sld').data('slider').value[0] = arguments[0];" + 
    "$('#sld').triggerHandler('slide');" 
    ); 
} 

@Test { 
  setMaxYearlyFee(100); 
}
```

### Отключить Confirm окно

```java
public static void mockConfirm() { 
  executeJavaScript( 
    "window.confirm = function() {return true;};" 
  ); 
}
```

### Контакты в мобильном 

Эмуляция функции.

```java
private void mockCordovaContactsAPI(String number) { 
  executeJavaScript( 
    "window.plugins = {" + 
    " contactNumberPicker: { " + 
    " pick: function(callback) {" + 
    " callback({" + 
    " phoneNumber:\"" + number + "\"""
    });}}}"); 
} 
    
@Test { 
  mockCordovaContactsAPI("+79110080075"); 
}
```

### Кол-во видимых элементов 

Селениум не умеет искать по jquery локатору.

```java
@Test { 
  $$(".offer:visible").shouldHave(size(3)); 
} 
@Test {
  $$(".offer").filter(visible) .shouldHave(size(3)); 
} // это может быть медленно если на странице много элементов
```

Через JavaScript в разы быстрее:

```java
int sizeOf(String cssSelector) { 
  Number count = executeJavaScript( 
    "return $(arguments[0]).length", cssSelector); 
    return count.intValue(); 
} 
@Test { 
  assertEquals(1, sizeOf(".offer:visible")); 
}
```

### Из списка элементов исключить другой список 

Задача: найти страны из excel и страны на странице и найти те которые есть на странице но нет в excel.

```java
List<String> страныИзЭксельки = ...; 
List<String> страныСоСтраницы = $$(“td:nth-child(3)”) 
  .excludeWith(text(“text”)) 
  .stream() 
  .map(el -> el.getText()) 
  .collect(toList()); // Это м.б. медленно :(
```

```java
List<String> страныИзЭксельки = ...; 
List<String> страныСоСтраницы = executeJavascript( 
  "return Array.from(" + 
  " document.querySelectorAll('td:nth-child(3)')" 
  + ").map(x => x.textContent)"
); // А вот это быстро
```

### fast set value

Проблема: 

1. $.sendKeys() медленный 
2. Иногда $.sendKeys() не работает:  
  a. Элемент невидимый   
  b. Маска на поле  
  c. Какой-нибудь хитрый JS  
  d. Какой-нибудь компонент типа DatePicker 
  
На помощь приходит JavaScript!

Режим “fast set value” - значение не вводится по одному символу, а вставляется сразу через JS.

Для того чтобы включить этот режим нужно:

Установить системную переменную:
```
mvn -Dselenide.fastSetValue=true 
```
или

Вызвать метод:
```java
@Before public void setUp() { 
  Configuration.fastSetValue = true; 
} 
```

В этом случае setValue функция начинает работать через JS.

Такде в любой момент можно выбирать:
- $.setValue(“john”) - быстро 
- $.sendKeys(“john”) - если быстро никак 


## Самопальные команды

### Слайдер 

Имеем функцию для установки значения слайдера:

```java
@Test { 
  setMaxYearlyFee($(“#slider”), 100); 
}

void setMaxYearlyFee(WebElement slider, int value) { 
  executeJavaScript(...); 
} 
```

Но вместо этой записи иногда удобнее иметь такую:
```java
@Test { 
  $(“#slider”).setMaxYearlyFee(100); 
} 
```
А ещё круче вот так: 

```java
@Test {
  $(“#slider”) 
  .setMaxYearlyFee(100) 
  .setMinYearlyFee(15) 
  .selectFee(50) 
} 
```

Так можно в Kotlin и Groovy Но не в Java!

Но можно так: 
```java
@Test { 
  $(“#slider”) 
  .execute(setMaxYearlyFee(100)) 
  .execute(setMinYearlyFee(15)) 
  .execute(selectFee(50)) 
} 

Command<SelenideElement> setMaxYearlyFee(int fee) { 
  return (proxy, locator, args) -> { 
    executeJavaScript(".... " + fee); 
    return proxy; 
  }; 
} 
```

См. https://ru.selenide.org/2019/09/02/selenide-5.3.0/

## Selenide и мобильники
### Selenide для мобильников (Appium) 

Можно без аннотаций: 

```java
@Test public void mobileCalculator() { 
  $(By.name("2")).click(); 
  $(By.name("+")).click(); 
  $(By.name("4")).click(); 
  $(By.name("=")).click(); 
  $(By.className("android.widget.EditText")) 
  .shouldHave(text("6")); 
} 
```
https://github.com/selenide-examples/selenide-appium


### Пэдж обжекты и Appium 

А можно и с аннотациями:

```java
class MobileCalculatorPage { 
  @AndroidFindBy(id = "op_add") 
  @iOSFindBy(id = “op_add”); 
  SelenideElement plus; 
} 
```
https://github.com/selenide/selenide-appium

### Test setup

Стандартного браузера нет поэтому нужно задавать класс своего драйвера.
Используется для открытия приложения метод `open()` без параметра.

```java
public class CalculatorTest {
  @Before
  public void setUp(){
    Configuration.startMaximized = false;
    Configuration.browserSize = null;
    Configuration.browser = MyAndroidDriver.class.getName();
    open();
  }
}
```

#### Android

```java
public class MyAndroidDriver implements WebDriverProvider {
  @Override
  public WebDriver createDriver(DesiredCapabilities caps){
    caps.setCapabilities("version" ,"4.4.2");
    caps.setCapabilities("automationName" ,"Appium");
    caps.setCapabilities("platformName" ,"Android");
    caps.setCapabilities("deviceName" ,"0123456789ABCDEF");
    caps.setCapabilities("appPackage" ,"com.android.calculator2"); // т.к. калькулятор приложение Android по умолчанию, то достаточно указать только package
    caps.setCapabilities("appActivity" ,"com.android.calculator2.Calculator"); // запустится сразу указанное Activity

    return new AndroidDriver(new URL("http://127.0.0.1:4723/wd/hub"), caps); // URL запущенного Appium Server
  }
}
```

#### iOS

```java
public class MyIOSDriver implements WebDriverProvider {
  @Override
  public WebDriver createDriver(DesiredCapabilities caps){
    caps.setCapabilities("platformName" ,"iOS");
    caps.setCapabilities("deviceName" ,"iPhone 11");
    caps.setCapabilities("platformVersion" ,"13.0");
    caps.setCapabilities("app", resourcePath("apks/Wikipedia.app"));
    caps.setCapabilities(MobileCapabilityType.NEW_COMMAND_TIMEOUT, "16");
    caps.setCapabilities("autoAcceptAlerts", true);

    return new IOSDriver("http://127.0.0.1:4723/wd/hub", caps); // URL запущенного Appium Server
  }
}
```

### Универсальный Page Object (для iOS, Android, Web)

```java
class MobileCalculatorPage {
  @FindBy(id="op_add")
  @AndroidFindBy(id="op-add")
  @iOSFindBy(id="operandAdd");
  private SelenideElement plus;
}
```

для инициализации класса для web используется метод page, для mobile метод screen

```java
CalculatorPage calculator = page(CalculatorPage.class);
```

```java
CalculatorPage calculator = screen(CalculatorPage.class);
calculator.number2.click();
calculator.plus.click();
calculator.number4.click();
calculator.equal.click();
calculator.result.shouldHave(text("6"));
```