---
title: Как создать новый Gradle проект
category: ui
description: Создаем новый проект для автотестов на языке Java.
tags: ["gradle", "setup", "java"]
emoji: 💻
icon: "null"
image: "null"
date: 2020-05-01
keywords: "gradle, setup, java"
links: [
        {
          title: "смотрите также:",
          items: [
           { title: "Как установить OpenJDK на Mac OS", link: "/kak-ustanovit-open-jdk-na-mac-os/" },
           { title: "Как создать новый Gradle проект", link: "/kak-sozdat-novyj-gradle-proekt/" },
          ]
        }
      ]
---
Для создания нового проекта с модулем Gradle нужно выполнить следущие шаги:

## Создаем новый проект в Idea или открываем уже созданный
- Если вы только что установили Inteliji Idea и у вас ещё нет созданных проектов, то после запуска Idea предложит создать новый проект, поэтому выбираем Create New Project.
![Добавляем новый проект](/images/add_new_project_step1.1.png)

- Если вы находитесь в уже созданном проекте то выбираем в верхнем меню File - New - Module...
![Добавляем новый проект](/images/add_new_project_step1.2.png)

## Выбираем модуль Gradle
Выбираем модуль Gradle, библиотека Java. Нажимаем Next.
![Добавляем новый проект](/images/add_new_project_step2.png)

## Указываем GroupId и ArtifactId
Указываем индетификаторы GroupId и ArtifactId. Нажимаем Finish.
![Добавляем новый проект](/images/add_new_project_step3.png)

Далее в нашем проекте формируются 2 файла: settings.gradle и build.gradle.
В файле build.gradle видим следущее содержание

```groovy
plugins {
    id 'java'
}

group 'ru.qa'
version '1.0-SNAPSHOT'

sourceCompatibility = 1.8

repositories {
    mavenCentral()
}

dependencies {
    testCompile group: 'junit', name: 'junit', version: '4.12'
}
```
## Подключаем библиотеку Selenium

### Переходим в цетральный репозиторий Maven
Перехом по url: [search.maven.org](http://search.maven.org)

### Ищем библиотеку Selenium
Вводим в поисковую строку запрос java-selenium и выбираем библиотеку
![Ищем библиотеку Selenium в репозитории Maven Central](/images/search_maven_central_selenium_lib.png)

### Выбираем последнюю версию библиотеки и копируем строку для подключения для сборщика Gradle

![Копируем строку для подключения Selenium для сборщика Gradle](/images/selenium_gradle_implementation_command.png)

```groovy
dependencies {
    testImplementation group: 'junit', name: 'junit', version: '4.12'
    testImplementation 'org.seleniumhq.selenium:selenium-java:4.0.0-alpha-5'
}
```

## Указываем путь к Chrome Driver и запускаем первый тест

### Скачиваем дитрибутив Chrome Driver

1. Переходим по url [chromedriver.chromium.org/downloads](https://chromedriver.chromium.org/downloads)
2. Выбираем ссылку для дистрибутива последней версии
3. Скачиваем версию для вашей ОС
4. Извлекаем дистрибутив из архива и помещаем его в папку нашего проекта: src/test/resources

### Указываем путь к Chrome Driver и запускаем первый тест

Для проверки на нужо будет создать файл с простым тестом и запустить его.
Создаем src/test/java/FirstTest.java

```java
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.openqa.selenium.support.ui.ExpectedConditions.titleIs;

public class FirstTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @Before
    public void start(){
        System.setProperty("webdriver.chrome.driver","./src/test/resources/chromedriver");
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, 10);
    }

    @Test
    public void myFirstTest(){
        driver.get("http://www.google.com/");
        driver.findElement(By.name("q")).sendKeys("webdriver");
        driver.findElement(By.name("btnK")).click();
        wait.until(titleIs("webdriver - Поиск в Google"));
    }

    @After
    public void stop(){
        driver.quit();
        driver = null;
    }
}
```

