---
title: Selenium API
category: automation
description: Selenium API
tags: ["Автоматизация тестирования"]
icon: "fas fa-robot"
image: "null"
date: 2022-06-20
keywords: "qa, Автоматизация тестирования"
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

## Подключение зависимости

```
// https://mvnrepository.com/artifact/org.seleniumhq.selenium/selenium-java
implementation 'org.seleniumhq.selenium:selenium-java:4.2.2'
```

## Загрузка драйвера через WebDriverManager

1. Нужно импортировать библиотеку

```
implementation 'io.github.bonigarcia:webdrivermanager:5.2.0'
```

2. Перед запуском теста вызвать 

- для Chrome

```
WebDriverManager.chromedriver().setup();
```

## Открыть и закрыть браузер

- Chrome
```java
ChromeOptions options = new ChromeOptions();
driver = new ChromeDriver(options);

driver.quit();
```

- Microsoft Edge
```java
EdgeOptions options = new EdgeOptions();
driver = new EdgeDriver(options);

driver.quit();
```

- Firefox
```java
FirefoxOptions options = new FirefoxOptions();
driver = new FirefoxDriver(options);

driver.quit();
```

- Internet Explorer

Рекомендуется использовать 32-bit версию драйвера.

```java
InternetExplorerOptions options = new InternetExplorerOptions();
driver = new InternetExplorerDriver(options);

driver.quit();
```

Microsoft Edge можно использовать в режиме совместимости с IE с помощью драйвера IE.

```java
InternetExplorerOptions options = new InternetExplorerOptions();
options.attachToEdgeChrome();
options.withEdgeExecutablePath("/path/to/edge/browser");
  
driver = new InternetExplorerDriver(options);
  
driver.quit();
```

- Opera

Поскольку драйвер Opera не поддерживает синтаксис w3c, а основан на Chromium, рекомендуется управлять браузером Opera с помощью chromedriver.

```java
ChromeOptions options = new ChromeOptions();
options.setBinary("/path/to/opera/browser");
  
driver = new ChromeDriver(options);
  
driver.quit();
```

- Safari

Чтобы включить автоматизацию в Safari, выполните следующую команду из терминала:

```
safaridriver --enable
```

```java
SafariOptions options = new SafariOptions();
driver = new SafariDriver(options);
  
driver.quit();
```

## Начало работы

### Старт сессии
```java
driver = new ChromeDriver();
```

### Переход на страницу
```java
driver.get("https://google.com");
```

### Получить заголовок страницы
```java
String title = driver.getTitle();
```

### Ожидания 
```java
driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
```

### Поиск элементов 
```java
WebElement searchBox = driver.findElement(By.name("q"));
WebElement searchButton = driver.findElement(By.name("btnK"));
```

### Действия на странице
```java
searchBox.sendKeys("Selenium");
searchButton.click();
```

### Запрос информации об элементе
```java
String value = searchBox.getAttribute("value");
```

## Capabilities

#### browserName
Задает имя браузера который нужно запустить
#### browserVersion
Задает версию браузера. Можно не указывать.
#### pageLoadStrategy
При переходе на новую страницу через URL, по умолчанию Selenium ждет пока страница будет загружена, выполняется проверка через js: `document.readyStatus` должен равняться `complete`. Однако для некоторых случаев, например для одностраничных сайтов, не имеет смысла ждать пока загрузится вся страница, так как элементы подгружаются динамически. В этом случае можно изменить этот параметр.

> при изменении pageLoadStrategy обратите внимание, что стратегия ожидания (implicit/explicit wait) настроена, чтобы компенсировать нестабильность прогонов;

Может иметь одно из 3 значений: normal, eager, none;

|Strategy|Ready State|Note|
|---|---|---|
|normal|complete|Используется по умолчанию; ждет пока все ресурсы страницы будут загружены|
|eager|interactive|Доступ к DOM загрузился, но остальные ресурсы например картинки могут еще подгружаться|
|none| Any| Не делает проверку загрузки ресурсов страницы|

```java
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.setPageLoadStrategy(PageLoadStrategy.NORMAL);
WebDriver driver = new ChromeDriver(chromeOptions);
```

#### platformName
Задает имя операционной системы необходимой для запуска

#### acceptInsecureCerts
Выполняется проверка сертификата безопасности сайта(TLS Certificate);

если выбрано `false` - то при наличии на сайте просроченного или невалидного сертификата будет выбрасываться исключение;  
если выбрано `true` - все сертификаты даже небезопасные будут считаться валидными

После установки опции acceptInsecureCerts будет работать для все сессии.

#### timeouts
Selenium устанавливает определенные интервалы в течение которого пользователь может взаимодействовать с сайтом;

- script timeout  
Таймаут выполнения скриптов в текущем контексте. По умолчанию 30_000
- Page Load Timeout  
Таймаут загрузки страницы. По умолчанию 300_000. При превышении выбрасывает TimeoutException
- Implicit Wait Timeout  
время ожидания загрузки элемента страницы. По умолчанию 0.

#### unhandledPromptBehavior
Задает поведение когда открывается диалоговое окно системы
Может иметь следущие значения:
- dismiss
- accept
- dismiss and notify
- accept and notify
- ignore

По умолчанию dismiss and notify.

#### strictFileInteractability
Эта опция указывает должна ли применяться строгая проверка видимости поля input с атрибутом type="file". Так как строгая проверка по умолчанию отключена, это может влиять на работу метода element.sendKeys при работе со скрытым элементом управления.

#### proxy
Прокси-сервер - это посредник для запросов между клиентом и сервером.
Трафик проходит через прокси-сервер на пути к запрошенному адресу и обратно.

```java
Proxy proxy = new Proxy();
proxy.setHttpProxy("<HOST:PORT>");
ChromeOptions options = new ChromeOptions();
options.setCapability("proxy", proxy);
WebDriver driver = new ChromeDriver(options);
```

### Firefox
 
Можно установить кастомный профиль с нужными настройками

```java
FirefoxProfile profile = new FirefoxProfile();
FirefoxOptions options = new FirefoxOptions();
options.setProfile(profile);
driver = new RemoteWebDriver(options);
```

### Internet Explorer

#### fileUploadDialogTimeout
В некоторых окружениях Internet Explorer может с задержкой открывать окно Загрузка Файла. IEDriver по умолчанию устанавливает timeout ожидания этого окна в 1_000мс, но с помощью опции fileUploadDialogTimeout это время можно увеличить

```java
InternetExplorerOptions options = new InternetExplorerOptions();
options.waitForUploadDialogUpTo(Duration.ofSeconds(2));
WebDriver driver = new RemoteWebDriver(options);
```
#### ensureCleanSession
Если установлено в true - то кеш, история браузера и файлы cookie будут очищены для всех экземпляров Internet Explorer(в том числе запущенных вручную). По умолчанию false. При использовании этой опции при запуске браузера, дайвер будет ждать очистки кеша.

```java
InternetExplorerOptions options = new InternetExplorerOptions();
options.destructivelyEnsureCleanSession();
WebDriver driver = new RemoteWebDriver(options);
```

#### ignoreZoomSetting
Драйвер InternetExplorer ожидает, что уровень масштабирования браузера будет равен 100%, иначе драйвер выдаст исключение. Это поведение по умолчанию можно отключить, установив для ignoreZoomSetting значение true.

```java
InternetExplorerOptions options = new InternetExplorerOptions();
options.ignoreZoomSettings();
WebDriver driver = new RemoteWebDriver(options);
```

#### ignoreProtectedModeSettings
Если Protected Mode не включен и настройки защищенного режима не одинаковы для всех зон, драйвером будет выдано исключение. 

Если установлено значение true, драйвер будет игнорировать эту настройку, но тесты могут работать нестабильно, переставать отвечать или браузеры могут зависать. 

```java
InternetExplorerOptions options = new InternetExplorerOptions();
options.introduceFlakinessByIgnoringSecurityDomains();
WebDriver driver = new RemoteWebDriver(options);
```

#### silent
Если установлено значение true, эта опция игнорирует диагностические выходные данные IEDriverServer.

```java
InternetExplorerOptions options = new InternetExplorerOptions();
options.setCapability("silent", true);
WebDriver driver = new InternetExplorerDriver(options);
```

#### Command-Line Options
Internet Explorer включает несколько параметров командной строки, которые позволяют устранять неполадки и настраивать браузер. 

Ниже описаны несколько поддерживаемых параметров командной строки.
- -private: используется для запуска IE в режиме приватного просмотра. Это работает для IE 8 и более поздних версий. 
- -k : запускает Internet Explorer в режиме киоска. Браузер открывается в развернутом окне, в котором нет адресной строки, кнопок навигации или строки состояния. 
- -extoff : Запускает IE в режиме без дополнений. Этот параметр специально используется для устранения неполадок с надстройками браузера. Работает в IE 7 и более поздних версиях. 

> ForceCreateProcessApi должен быть включен для того, чтобы аргументы командной строки работали.

```java
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.ie.InternetExplorerOptions;

public class ieTest {
    public static void main(String[] args) {
        InternetExplorerOptions options = new InternetExplorerOptions();
        options.useCreateProcessApiToLaunchIe();
        options.addCommandSwitches("-k");
        InternetExplorerDriver driver = new InternetExplorerDriver(options);
        try {
            driver.get("https://google.com/ncr");
            Capabilities caps = driver.getCapabilities();
            System.out.println(caps);
        } finally {
            driver.quit();
        }
    }
}
```

#### forceCreateProcessApi
Принудительно запускает Internet Explorer с помощью API CreateProcess. Значение по умолчанию false. Для IE 8 и более поздних версий этот параметр требует, чтобы для параметра реестра "TabProcGrowth" было установлено значение 0.

```java
import org.openqa.selenium.Capabilities;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.ie.InternetExplorerOptions;

public class ieTest {
    public static void main(String[] args) {
        InternetExplorerOptions options = new InternetExplorerOptions();
        options.useCreateProcessApiToLaunchIe();
        InternetExplorerDriver driver = new InternetExplorerDriver(options);
        try {
            driver.get("https://google.com/ncr");
            Capabilities caps = driver.getCapabilities();
            System.out.println(caps);
        } finally {
            driver.quit();
        }
    }
}
``` 
## Работа с браузером

### Получение заголовка
```java
driver.getTitle();
```

### Получение текущего URL

```java
driver.getCurrentUrl();
```

### Навигация

#### Переход на страницу
```java
//Convenient
driver.get("https://selenium.dev");

//Longer way
driver.navigate().to("https://selenium.dev");
```

#### Возврат назад
```java
driver.navigate().back();
```

#### Переход вперед
```java
driver.navigate().forward();
```

#### Обновить страницу
```java
driver.navigate().refresh();
```

### JavaScript окна
#### Ожидание всплавающего окна браузера
```java
Alert alert = wait.until(ExpectedConditions.alertIsPresent());
```

#### Получить текст из всплывающего окна
```java
String text = alert.getText();
```

#### Нажать OK кнопку
```java
alert.accept();
```

#### Отклонить всплывающее окно
```java
alert.dismiss();
```

#### Ввести текст в всплывающем окне
```java
alert.sendKeys("Selenium");
```

### Работа с Cookie

#### Добавить Cookie
Прежде чем выставлять куки нужно перейти на страницу сайта для которого нужно применить куки. Еслистраница долго грузится можно перейти на какую нибудь легковесную, например, страница с ошибкой 404.

```java
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

public class addCookie {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("http://www.example.com");

            // Adds the cookie into current browser context
            driver.manage().addCookie(new Cookie("key", "value"));
        } finally {
            driver.quit();
        }
    }
}
  
```
#### Проверка что Cookie 
#### Получить имя Cookie

#### Получить все Cookie

#### Удалить Cookie

#### Удалить все Cookie

#### Проверка что Cookie отправляются с одного сайта
Предназначенно для предотвращения подделки межсайтовых запросов (CSRF).

- При установке значения Lax подразумевается, что куки должны отправляться при серфинге по одному сайту или через GET серфинг на ваш сайт с других сайтов. 
- Значение Strict ограничивало cookie запросами, исходящими только от одного сайта.

> Работает только для Chrome(версия 80+) и Firefox(версия 79+) в Selenium 4 и более поздних.

```java
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

public class cookieTest {
  public static void main(String[] args) {
    WebDriver driver = new ChromeDriver();
    try {
      driver.get("http://www.example.com");
      Cookie cookie = new Cookie.Builder("key", "value").sameSite("Strict").build();
      Cookie cookie1 = new Cookie.Builder("key", "value").sameSite("Lax").build();
      driver.manage().addCookie(cookie);
      driver.manage().addCookie(cookie1);
      System.out.println(cookie.getSameSite());
      System.out.println(cookie1.getSameSite());
    } finally {
      driver.quit();
    }
  }
}
```

### Работа с iFrame

Фреймы — это устаревшее средство создания макета сайта из нескольких документов в одном домене. Вы вряд ли будете работать с ними, если вы не работаете с веб-приложением до HTML5. 

Фреймы iframe позволяют вставлять документ из совершенно другого домена и до сих пор широко используются. 

#### Переключение на фрейм через WebElement
```java
WebElement iframe = driver.findElement(By.cssSelector("#modal>iframe"));
//Switch to the frame
driver.switchTo().frame(iframe);
```
#### Переключение на фрейм через имя или id
```java
//Using the ID
driver.switchTo().frame("buttonframe");

//Or using the name instead
driver.switchTo().frame("myframe");
```

#### Переключение на фрейм через index
```java
// Switches to the second frame
driver.switchTo().frame(1);
```

#### Возврат на основную страницу
```java
// Return to the top level
driver.switchTo().defaultContent();
```

### Работа с окнами и вкладками

#### Получить обработчик текущего окна
```java
driver.getWindowHandle();
```

#### Переключиться на новое окно или вкладку
```java
String originalWindow = driver.getWindowHandle();

//Check we don't have other windows open already
assert driver.getWindowHandles().size() == 1;

//Click the link which opens in a new window
driver.findElement(By.linkText("new window")).click();

//Wait for the new window or tab
wait.until(numberOfWindowsToBe(2));

//Loop through until we find a new window handle
for (String windowHandle : driver.getWindowHandles()) {
    if(!originalWindow.contentEquals(windowHandle)) {
        driver.switchTo().window(windowHandle);
        break;
    }
}

//Wait for the new tab to finish loading content
wait.until(titleIs("Selenium documentation"));
```

#### Создать(открыть) новое окно или вкладку и переключиться на нее(Selenium 4)
```java
// Opens a new tab and switches to new tab
driver.switchTo().newWindow(WindowType.TAB);

// Opens a new window and switches to new window
driver.switchTo().newWindow(WindowType.WINDOW);
```

#### Закрыть окно или вкладку
```java
//Close the tab or window
driver.close();

//Switch back to the old tab or window
driver.switchTo().window(originalWindow);
```

#### Закрыть браузер и закончить сессию
```java
driver.quit();
```

#### Управление окном

##### Получить размер окна
Выдает размер в пикселях

```java
//Access each dimension individually
int width = driver.manage().window().getSize().getWidth();
int height = driver.manage().window().getSize().getHeight();

//Or store the dimensions and query them later
Dimension size = driver.manage().window().getSize();
int width1 = size.getWidth();
int height1 = size.getHeight();
```

##### Установить размер окна
```java
driver.manage().window().setSize(new Dimension(1024, 768));
```

##### Получить положение окна
```java
// Access each dimension individually
int x = driver.manage().window().getPosition().getX();
int y = driver.manage().window().getPosition().getY();

// Or store the dimensions and query them later
Point position = driver.manage().window().getPosition();
int x1 = position.getX();
int y1 = position.getY();
```

#### Переместить окно
```java
// Move the window to the top left of the primary monitor
driver.manage().window().setPosition(new Point(0, 0));
```

##### Увеличить окно на максимум
```java
driver.manage().window().maximize();
```

##### Свернуть окно(Selenium 4)
```java
driver.manage().window().minimize();
```

##### Развернуть окно на полный экран
```java
driver.manage().window().fullscreen();
```

##### Сделать скриншот
```java
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.*;
import org.openqa.selenium.*;

public class SeleniumTakeScreenshot {
    public static void main(String args[]) throws IOException {
        WebDriver driver = new ChromeDriver();
        driver.get("http://www.example.com");
        File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
        FileUtils.copyFile(scrFile, new File("./image.png"));
        driver.quit();
    }
}
```

##### Сделать скриншот элемента
```java
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import java.io.File;
import java.io.IOException;

public class SeleniumelementTakeScreenshot {
  public static void main(String args[]) throws IOException {
    WebDriver driver = new ChromeDriver();
    driver.get("https://www.example.com");
    WebElement element = driver.findElement(By.cssSelector("h1"));
    File scrFile = element.getScreenshotAs(OutputType.FILE);
    FileUtils.copyFile(scrFile, new File("./image.png"));
    driver.quit();
  }
}
```

##### Выполнить скрипт
```java
    //Creating the JavascriptExecutor interface object by Type casting
      JavascriptExecutor js = (JavascriptExecutor)driver;
    //Button Element
      WebElement button =driver.findElement(By.name("btnLogin"));
    //Executing JavaScript to click on element
      js.executeScript("arguments[0].click();", button);
    //Get return value from script
      String text = (String) js.executeScript("return arguments[0].innerText", button);
    //Executing JavaScript directly
      js.executeScript("console.log('hello world')");
```

##### Напечатать страницу
> Необходимо чтобы Chromium браузер был в режиме headless
```java
    import org.openqa.selenium.print.PrintOptions;

    driver.get("https://www.selenium.dev");
    printer = (PrintsPage) driver;

    PrintOptions printOptions = new PrintOptions();
    printOptions.setPageRanges("1-2");

    Pdf pdf = printer.print(printOptions);
    String content = pdf.getContent();
```

## Элементы

### Локаторы

#### Относительные локаторы (Selenium 4)

##### Above
```java
By emailLocator = RelativeLocator.with(By.tagName("input")).above(By.id("password"));
```

##### Below
```java
By passwordLocator = RelativeLocator.with(By.tagName("input")).below(By.id("email"));
```

##### Left of
```java
By cancelLocator = RelativeLocator.with(By.tagName("button")).toLeftOf(By.id("submit"));
```

##### Right of
```java
By submitLocator = RelativeLocator.with(By.tagName("button")).toRightOf(By.id("cancel"));
```

##### Near
```java
By emailLocator = RelativeLocator.with(By.tagName("input")).near(By.id("lbl-email"));
```

### Поиск элементов
```java
WebElement vegetable = driver.findElement(By.className("tomatoes"));
```

#### Поиск дочернего элемента 
```java
// не оптимальный способ
WebElement fruits = driver.findElement(By.id("fruits"));
WebElement fruit = fruits.findElement(By.id("tomatoes"));

// так лучше
WebElement fruit = driver.findElement(By.cssSelector("#fruits .tomatoes"));
```

#### Поиск нескольких элементов
```java
List<WebElement> plants = driver.findElements(By.tagName("li"));
```

#### Получить активный элемент
Активный элемент - на котором фокус.
```java
driver.switchTo().activeElement()
```

### Взаимодействие с элеентами

#### Клик - Click
```java
driver.findElement(By.name("button")).click();
```

#### Ввод символов - Send Keys
```java
driver.findElement(By.name("q")).sendKeys("q" + Keys.ENTER);
```

#### Очистить поле - Clear
```java
WebElement searchInput = driver.findElement(By.name("q"));
searchInput.sendKeys("selenium");
// Clears the entered text
searchInput.clear();
```

### Информация об элементе

#### Видимость
```java
boolean isButtonVisible = driver.findElement(By.css("[name='login']")).isDisplayed();
```

#### Доступность
```java
boolean value = driver.findElement(By.name("btnK")).isEnabled();
```

#### Выбран ли
```java
boolean value = driver.findElement(By.cssSelector("input[type='checkbox']:first-of-type")).isSelected();
```

#### Имя тега
```java
String value = driver.findElement(By.cssSelector("h1")).getTagName();
```

#### Размер и положение
```java
Rectangle res =  driver.findElement(By.cssSelector("h1")).getRect();

// Rectangle class provides getX,getY, getWidth, getHeight methods
System.out.println(res.getX());
```

#### Получить CSS свойство
```java
String cssValue = driver.findElement(By.linkText("More information...")).getCssValue("color");
```

#### Получить текст элемента
```java
String text = driver.findElement(By.cssSelector("h1")).getText();
```

### Работа с выпадающим списком

#### Определить элемент выпадающего списка 
```java
import org.openqa.selenium.support.ui.Select;

WebElement selectElement = driver.findElement(By.id("selectElementID"));
Select selectObject = new Select(selectElement);
```

#### Выбрать опцию
- по индексу
```java
// Select an <option> based upon the <select> element's internal index
selectObject.selectByIndex(1);
```

- по значению
```java
// Select an <option> based upon its value attribute
selectObject.selectByValue("value1");
```
  
- по видимому тексту
```java
// Select an <option> based upon its text
selectObject.selectByVisibleText("Bread");
```

#### Получить все выбранные опции
```java
// Return a List<WebElement> of options that have been selected
List<WebElement> allSelectedOptions = selectObject.getAllSelectedOptions();
```
#### Получить первую выбранную опцию
```java

// Return a WebElement referencing the first selection option found by walking down the DOM
WebElement firstSelectedOption = selectObject.getFirstSelectedOption();
```

#### Получить все опции
```java
// Return a List<WebElement> of options that the <select> element contains
List<WebElement> allAvailableOptions = selectObject.getOptions();
```

#### Отменить выбор 
- по индексу
```java
// Deselect an <option> based upon the <select> element's internal index
selectObject.deselectByIndex(1);
```

- по значению
```java
// Deselect an <option> based upon its value attribute
selectObject.deselectByValue("value1");
```

- по видимому тексту
```java
// Deselect an <option> based upon its text
selectObject.deselectByVisibleText("Bread");
```

- отменить все
```java
// Deselect all selected <option> elements
selectObject.deselectAll();
```

#### Поддерживает ли список множественный выбор
```java
Boolean doesThisAllowMultipleSelections = selectObject.isMultiple();
```

## Удаленный браузер

```java
FirefoxOptions firefoxOptions = new FirefoxOptions();
WebDriver driver = new RemoteWebDriver(new URL("http://www.example.com"), firefoxOptions);
driver.get("http://www.google.com");
driver.quit();
```

### Добавление опций
```java
ChromeOptions chromeOptions = new ChromeOptions();
chromeOptions.setCapability("browserVersion", "67");
chromeOptions.setCapability("platformName", "Windows XP");
WebDriver driver = new RemoteWebDriver(new URL("http://www.example.com"), chromeOptions);
driver.get("http://www.google.com");
driver.quit();
```

### Local file detector
Позволяет загружать файл с клиентской машины на удаленную.
Нужно для загрузки файлов на сайт.

```java
driver.setFileDetector(new LocalFileDetector());

driver.get("http://sso.dev.saucelabs.com/test/guinea-file-upload");
WebElement upload = driver.findElement(By.id("myfile"));
upload.sendKeys("/Users/sso/the/local/path/to/darkbulb.jpg");
  
```

### 