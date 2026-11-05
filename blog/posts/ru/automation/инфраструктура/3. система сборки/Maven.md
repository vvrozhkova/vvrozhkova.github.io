---
title: Maven
category: automation
description: Maven
tags: ["Автоматизация тестирования"]
icon: "fas fa-robot"
image: "null"
date: 2022-06-16
keywords: "qa, Автоматизация тестирования"
links: [
        {
          items: [
                { title: "Курс по автоматизации тестирования Java", link: "/kurs-po-avtomatizaczii-testirovaniya-java/" },
                { title: "Система сборки. Ant, Maven, Gradle", link: "/sistema-sborki-ant-maven-gradle/" },
                { title: "Gradle", link: "/gradle/" },
                { title: "Maven", link: "/maven/" },
          ]
        }
      ]
---

Все pom.xml переопределяют super pom который идет в поставке maven
Это позвояет писать компактный xml.
Pom.xml содержит
- описание проекта(название, версия, ссылки на исходные коды, CI, лицензия, разработчики и т.п.)
- список зависимостей
- список плагинов и их конфигурации описывает то что нужно сделать
- профили - возможность выполнять некоторые действия при определенных обстоятельствах

## Название проекта и параметры

```xml
<properties>
    <jetty.port>9990</jetty.port>
    <jetty.version>9.1.9.v20131115</jetty.version>

    <compiler.version>1.7</compiler.version>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>

<group.id>ru.yandex.qatools.allure</group.id>
<artifactId>allure-core</artifactId>
<version>1.4.4-SNAPSHOT</version>

<packaging>pom</packaging>

<name>Allure Core</name>
```

## Список модулей

```xml
<modules>
    <module>allure-model</module>
    <module>allure-commons</module>
    <module>allure-java-annotations</module>
</modules>
```

## Информация о проекте

```xml
<issueManagement>
    <system>GitHub Issues</system>
    <url>https://github.com/allure-framework/allure-core/issues</url>
</issueManagement>
<ciManagement>
    <system>TeamCity</system>
    <url>https://teamcity.qatools.ru</url>
</ciManagement>
<developers>
    <developer>
        <id>eroshenkoam</id>
        <name>Artem Eroshenko</name>
        <email>eroshenko@yandex-team.ru</email>
        <organization>Yandex</organization>
    </developer>
</developers>
```

## Описание сборки проекта (плагины)

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.0</version>
    <configuration>
        <source>${compiler.version}</source>
        <target>${compiler.version}</target>
    </configuration>
</plugin>
```

## Зависимости

```xml
<dependency>
    <groupId>ru.yandex.qatools.allure</groupId>
    <artifactId>allure-model</artifactId>
    <version>${project.version}</version>
</dependency>
<dependency>
    <groupId>ru.yandex.qatools.allure</groupId>
    <artifactId>allure-commons</artifactId>
    <version>${project.version}</version>
</dependency>
```

## Именование директорий

src/ - все исходные коды  
src/main - всё, что касается продукта  
src/test - всё, что касается тестов

src/main/java - Java-код продукта  
src/main/resources - ресурсы продукта  
src/main/webapp - файлы веб-приложений продукта (стили, Javascript и т.п.)

src/test/java - Java-код тестов  
src/test/resources - ресурсы тестов  
src/test/webapp - файлы веб-приложений тестов

## Жизненные циклы

Clean - очищает проект перед сборкой  
Default - собирает проект  
Site - создает сайт проекта со ссылками на зависимости, CI, тикетную систему и т.п.

## Сборка проекта. Команда mvn.

```
$ mvn clean test
```

Validate - проверить правильность проекта  
Compile - скомпилировать исходники  
Test - скомпилировать и выполнить тесты  
Package - упаковать скомпилированный код и исходники в jar, war архив  
Verify - проверить, что код правильно упакован  
Install - установить пакеты в локальный репозиторий  
Deploy - выгрузить пакеты в удаленный репозиторий  

### Управление зависимостями

Нужно добавить блок, описывающий зависимость, в секцию `<dependencies>` и `<dependencyManagement>`

Блок зависимости включает: 
- groupId - идентификатор который описывает группу проектов одного разработчика
- artifactId - уникальное название проекта
- version - номер версии
- scope - на какой стадии сборки используется данная зависисмость
    Scope может быть: 
    - compile - зависимость нужна на этапе компиляции
    - test - зависимость не нужна чтобы собрать продукт, но нужна чтобы выполнить тесты
    - runtime - зависимость не нужна для сборки и тестирования продукта, но нужна при его запуске
    - provided - зависимость нужна для запуска, но при этом она поставляется кем то еще
    - system - тоже самое что provided, но с указанием пути; мы можем указать, где на файловой системе лежит данная библиотека

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.7.7</version>
    <scope>runtime</scope>
</dependency>
```

## Версии пакетов. Релизы и снепшоты

Снепшот - промежуточная версия пакета, используемая в разработке: 1.0-SNAPSHOT(снимок текущей версии), чтобы делиться с другими разработчиками. Может быть бесконечно много снепшотов с одной и той же версией

Релиз - стабильная версия пакета, предназначенная для использования другими проектами: 1.0. Релиз всегда один.

Порядок версий: 1.0-SNAPSHOT, 1.0, 1.1-SNAPSHOT, 1.1, 1.2-SNAPSHOT и т.д.
Сначала мы делаем снепшоты, потом делаем релиз и т.д.

## Конфликт зависимостей. Дерево зависимостей

Бывает такая ситуация, когда в проекте используется зависимость, в которой есть зависимость, которая также есть в нашем проекте. И одна зависимость будет перекрывать другую.

```
pom.xml
├── Log4j-1.2.13
├── commons-logging-1.1
    ├── Log4j-1.2.12
    ├── Servlet-2.3
```

Для разрешения конфликтов зависимостей нужно построить дерево зависимостей.
Для построения дерева зависимостей используется команда:

```
$ mvn dependency:tree
```

## Исключение зависимостей

Для решения конфликта зависимостей иногда нужно исключить какую то зависимость. Для этого используется exclusions:

```xml
<dependency>
    <groupId>ru.yandex.qatools.allure</groupId>
    <artifactId>allure-report-builder</artifactId>
    <version>2.0</version>
    <exclusions>
        <exclusion>
            <groupId>ru.yandex.qatools.allure</groupId>
            <artifactId>allure-model</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

### Необязательные зависимости

Такая зависимость не будет скачиваться в проектах, зависящих от данного
Для того, чтобы пометить необязательную зависимость используется секция optional:

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.11</version>
    <scope>test</scope>
    <optional>true</optional>
</dependency>
```

## Плагины. Настройка билда

Изменение процесса билда - это изменение настроек отдельных плагинов в секции build/plugins.

### Maven Compiler Plugin

Компилирует java код продукта и его тестов. 
Основная настройка - версия компилятора.

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <source>${compiler.version}</source>
        <target>${compiler.version}</target>
    </configuration>
</plugin>
```

### Maven Source Plugin

Упаковывает исходные коды проекта чтобы поделиться с другими участниками разработки.

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-source-plugin</artifactId>
    <version>2.2.1</version>
    <executions>
        <execution>
            <goals>
                <goal>jar</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

### Maven Dependency Plugin

Разрешение зависимостей, построение дерева зависимостей;
Копирование, распаковка и другие операции с зависимостями;

### Maven Jar Plugin 

Упаковывает файлы в jar-архив;
Можно сделать испольняемый jar файл и указать класс, который будет запускаться при запуске jar файла.

### Maven Assembly Plugin

Сборка дистрибутивов продукта (например, zip-архив c jar, bash скриптами и README)
Например, вы хотите собрать свой продукт, а потом взять еще какие то файлы и все это вместе упаковать в архив. 
И этот плагин требует создание специального файла Assembly.xml в котором будет описываться что он собственно должен делать.

### Maven Release Plugin

Автоматизирует вырсионирование, выкладку релизов.

Добавляются цели release:prepare и release:perform. Они увеличивают номер версии в pom.xml и отправляет в систему контроля версий.

Настройка:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-release-plugin</artifactId>
    <configuration>
        <autoVersionSubmodules>true</autoVersionSubmodules>
    </configuration>
</plugin>
```

### Maven Surefire Plugin 

Выполнение тестов Junit или TestNG

### Maven Site Plugin

Первоначальное назначение - сгенерировать сайт поекта
Основное применение - генерация отчетов

Настройка:

```xml
<reporting>
    <excludeDefaults>true</excludeDefaults>
    <plugins>
        <plugin>
            <groupId>ru.yandex.qatools.allure</groupId>
            <artifactId>allure-maven-plugin</artifactId>
            <version>${allure.version}</version>
        </plugin>
    </plugins>
</reporting>
```

## Служебные файлы и каталоги

Папка ~/.m2 - локальный репозиторий артефактов.  
Файлы ~/.m2/settings.xml и /etc/maven/settings/xml, ~/.mavemrc и /etc/mavenrc - конфигурация Maven, можно менять поведение Maven по умолчанию

## Профили. Settings.xml

Профиль - способ изменить настройки билда, не изменяя pom.xml. Мы можем определить как будет собираться проект при определнных условиях например если выставлена какая то переменная, включить дополнительный тесты и т.п..

Профиль хранится в pom.xml или в settings.xml(могут указываться пароли так как он не распространяется вместе с продуктом) в секции profiles

Использование профиля:

```
$ mvn clean test -P myProfile
```

```xml
<profiles>
    <profile>
        <id>integration-tests</id>
        <activation>
            <activateByDefault>true</activateByDefault>
        </activation>
        <modules>
            <module>allure-e2e</module>
        </modules>
    </profile>
</profiles>
```

## Центральные репозитории артефактов

Удаленный сервер, все разработчики на который могут отправлять свои разработки, а другие могут их забирать.
Основным таким сервером является: Maven Central Repository (http://maven.org)

В папке репозитория хранится: сами пакеты, которые приходят от разработчиков, их контрольная сумма, некоторая служебная информация в xml и цифровые подписи.

- maven-metadata.xml(служебная информация)
- jar, javadoc.jar, source.jar, jar.asc (пакеты)
- jar.md5, javadoc.jar.md5, source.jar.md5, jar.asc.md5 (контрольная сумма)
- jar.sha1, javadoc.jar.sha1, source.jar.sha1, jar.asc.sha1 (цифровые подписи)

Существует несколько специализироованных веб-приложений, которые выполняют функцию центральных репозиториев: Sonatype Nexus и Artifactory.

## Локальный репозиторий артефактов 

Папка на файловой системе, которая скачивает все зависимости и файлы с центрального репозитория и кеширует у себя и это позвояет ускорять выполнение билдов.

В папке репозитоория хранятся: файлы pom.xml для каждого проекта, jar файлы, файлы с документацией и исходниками и их контрольные суммы.
- pom
- jar
- javadoc.jar
- source.jar
- pom.sha1, jar.sha1, javadoc.jar.sha1, source.jar.sha1

## Архетипы

Возможность создавать шаблоны проектов. Такой возмодности не было в Ant.
Архетип - готовый шаблон.

Создание проекта по шаблону выполняется командой:

```
$ mvn archetype:generate
```

## TODO

https://www.youtube.com/watch?v=R422m8VTevA