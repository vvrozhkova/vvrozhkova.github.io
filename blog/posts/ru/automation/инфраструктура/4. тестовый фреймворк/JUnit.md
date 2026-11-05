---
title: JUnit 5
category: automation
description: JUnit 5
tags: ["Автоматизация тестирования"]
icon: "fas fa-robot"
image: "null"
date: 2022-06-18
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
                { title: "Система сборки. Ant, Maven, Gradle", link: "/sistema-sborki-ant-maven-gradle/" },
                { title: "JUnit 5", link: "/j-unit-5/" },
          ]
        }
      ]
---

Можно определять тестовые методы без модификатора.

```java
@Test
void someTest(){
    assertTrue(true);
}
```

## Build tool support

```groovy
test {
    useJUnitPlatform {
        includeTags 'fast', 'smoke'
        excludeTags 'slow', 'ci'

        include 'org/foo/**'
        exclude 'org/boo/**'
    }
}
```

https://www.youtube.com/watch?v=RAOAcq97KZM

https://www.youtube.com/watch?v=w1ey2zjf3-s

https://www.youtube.com/watch?v=DAszLeWMsqU

https://www.youtube.com/watch?v=751gMXH-lEE

https://www.youtube.com/watch?v=r-8EGXMFJaw

https://www.youtube.com/watch?v=ZIkIUCyJBGU

https://www.youtube.com/watch?v=3pOjh6O7-cg

https://www.youtube.com/watch?v=W1INR0I3FCo&list=PLnh8EajVFTl5AqvBosxUefReW4nC35P0x