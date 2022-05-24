---
title: Как установить OpenJDK на Mac OS
category: automation
description: Чтобы писать автотесты на языке Java потребуется установить пакет Oracle JDK или Open JDK. В этой статье мы расскажем в чем между ними различия, что лучше устанавливать, а также пройдемся по шагам для установки и настройке рабочей среды.
tags: ["java", "setup", "macos"]
icon: "fas fa-robot"
image: "null"
date: 2020-04-26
keywords: "java, setup, macos"
links: [
        {
          items: [
           { title: "Как установить OpenJDK на Mac OS", link: "/kak-ustanovit-open-jdk-na-mac-os/" },
           { title: "Как создать новый Gradle проект", link: "/kak-sozdat-novyj-gradle-proekt/" },
          ]
        }
      ]
---


## Скачиваем JDK 

Чтобы скачать пакет Open JDK нужно:

1. Зайти на сайт [jdk.java.net](https://jdk.java.net/)
2. Перейти по ссылке с нужной версией Java, последняя стабильная версия Java находится в пункте Ready for use
3. В разделе Build выбираем ссылку на архив с пакетом. Для Mac OS - это macOS / x64	tar.gz (sha256)

## Извлекаем архив

1. Переходим в папку в которую будем производить установку и создаем в ней папку для хранения jdk[^Here is the footnote]

```bash{outputLines: 2}
cd /Library/Java/JavaVirtualMachines/
```

2. Копируем в созданую папку скаченный архив

```bash{outputLines: 2}
user@TestAutomation.Space:/usr$ sudo mv ~/Downloads/openjdk-..._bin.tar.gz /Library/Java/JavaVirtualMachines/
[sudo] пароль для user: 
```

3. И распаковываем tar-архив

```bash{outputLines: 2}
sudo tar zxvf /usr/java/openjdk-..._bin.tar.gz
[sudo] пароль для user: 
```

## Настраиваем переменные окружения PATH и JAVA_HOME

1. Открыть на редактирование файл `.profile`

```bash
nano ~/.profile
```

2. В конец добавляем строчки

```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk.../Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
```

3. Нажимаем `Ctrl+X` и соглашаемся с сохранением изменений, нажав на `Y`
4. Выполняем команду для инициализации изменени и проверяем что переменная среды выводится верно

```bash
source ~/.profile
echo $JAVA_HOME
echo $PATH
```

4. Теперь нужно перезапустить консоль и проверить версию Java

```bash
java -version
```