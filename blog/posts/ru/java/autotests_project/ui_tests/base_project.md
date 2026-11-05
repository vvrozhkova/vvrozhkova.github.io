---
title: Создаем основу проекта
category: java
description: Создаем основу проекта
tags: ["java", "autotests", "автотесты", "план проекта"]
icon: "fas fa-code"
image: "null"
date: 2024-03-29
keywords: "java, автотесты"
order: 01
links: [
        {
          items: [
           { title: "План содания проекта для UI автотестов", link: "/plan-sodaniya-proekta-dlya-ui-avtotestov/" },
           { title: "Создаем основу проекта", link: "/sozdaem-osnovu-proekta/" },
          ]
        }
      ]
---

- Какие тесты нужно автоматизировать в первую очередь?
Берем тесты, которые чаще всего проверяются, чаще всего стреляют и которые больше всего затратны с точки зрения ручного тестирования.

- эффективность автоматизации
https://www.youtube.com/watch?v=GpvY3NF9mRc

Gradle

1 создаем градл проект через идею.
2 редактируем файл build.gradle 

После создания проекта дефолтный скрипт выглядит так:

```groovy
plugins {
    id 'java' //плагин для сблорки java приложения
}

// группа и версия проекта
group 'io.vvrozhkova'
version '1.0-SNAPSHOT'


//репозиторий для скачивания зависимостей
repositories {
    mavenCentral()
}


//список зависимостей
dependencies {
    testImplementation 'org.junit.jupiter:junit-jupiter-api:5.8.1'
    testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.8.1'
}


//настройка запуска тестов через JUnit
test {
    useJUnitPlatform()
}
```


