---
title: Как установить Gradle на Mac OS
category: automation
description: Устанавливаем Gradle локально на ПК с MacOS
tags: ["gradle", "setup", "macos"]
icon: "fas fa-robot"
image: "null"
date: 2020-05-02
keywords: "gradle, setup, macos"
links: [
        {
          items: [
           { title: "Как установить OpenJDK на Mac OS", link: "/kak-ustanovit-open-jdk-na-mac-os/" },
          ]
        }
      ]
---

## Скачиваем бинарный дистрибутив

Необходимо перейти на url: [gradle.org/releases/](https://gradle.org/releases/) и скачивать дистрибутив для последней версии Gradle.

## Извлекаем архив

```bash
cd /Library/
mkdir /Gradle/
unzip gradle-6.3-bin.zip
```

## Настраиваем переменные окружения

1. Открыть на редактирование файл `.profile`

```bash
nano ~/.profile
```

2. В конец добавляем строчки

```bash
export GRADLE_HOME=/Library/Gradle/gradle-6.3
export PATH=$PATH:$GRADLE_HOME/bin
```

3. Нажимаем `Ctrl+X` и соглашаемся с сохранением изменений, нажав на `Y`
4. Выполняем команду для инициализации изменений и проверяем что переменная среды выводится верно

```bash
source ~/.profile
echo $JAVA_HOME
echo $PATH
```

4. Теперь нужно перезапустить консоль и проверить версию Java

```bash
java -version
```
