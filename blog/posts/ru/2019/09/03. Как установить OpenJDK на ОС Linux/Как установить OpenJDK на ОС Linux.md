---
title: Как установить OpenJDK на ОС Linux
id: 3
category: ui
description: Чтобы писать автотесты на языке Java потребуется установить пакет Oracle JDK или Open JDK. В этой статье мы расскажем в чем между ними различия, что лучше устанавливать, а также пройдемся по шагам для установки и настройке рабочей среды.
image: ./cover.png
tags: ["java", "setup", "ui"]
date: 2019-09-07
color: '#AC5323'
keywords: "a, b, c"
---

import SimpleTerminal from "~/components/post_items/SimpleTerminal.vue";
import ExtendedTerminal from "~/components/post_items/ExtendedTerminal.vue";
import Footnote from "~/components/post_items/Footnote.vue";

## Скачиваем JDK 

Чтобы скачать пакет Open JDK нужно:

* Зайти на сайт [jdk.java.net](https://jdk.java.net/)
* Перейти по ссылке с нужной версией Java, последняя стабильная версия Java находится в пункте Ready for use
* В разделе Build выбираем ссылку на архив с пакетом. Для Linux  - это Linux / x64	tar.gz (sha256)

## Извлекаем архив

* Переходим в папку в которую будем производить установку и создаем в ней папку для хранения jdk<footnote num="1" message="message"/>

<simple-terminal title="bash">

```bash
user@user-TestAutomation.Space:~$ cd /usr/
user@user-TestAutomation.Space:/usr$ sudo mkdir /java/
[sudo] пароль для user: 
user@user-TestAutomation.Space:/usr$ 
```
</simple-terminal>

* Копируем в созданую папку скаченный архив

<simple-terminal title="bash">

```bash
user@user-TestAutomation.Space:/usr$ sudo mv /home/user/Downloads/openjdk-..._bin.tar.gz /usr/java/
[sudo] пароль для user: 
user@user-TestAutomation.Space:/usr$ 
```
</simple-terminal>

* И распаковываем tar-архив

<simple-terminal title="bash">

```bash
user@user-TestAutomation.Space:/usr$ sudo tar zxvf /usr/java/openjdk-..._bin.tar.gz
[sudo] пароль для user: 
user@user-TestAutomation.Space:/usr$ 
```
</simple-terminal>

 ## Настраиваем переменные окружения PATH и JAVA_HOME

1. Открыть на редактирование файл `.bashrc`

    <simple-terminal title="bash">

    ```bash
    nano /home/user/.bashrc
    ```
    </simple-terminal>

2. В конец добавляем строчки

    <simple-terminal title="bash">

    ```bash
    export JAVA_HOME=/usr/java/jdk
    export PATH=$JAVA_HOME/bin:$PATH
    ```
    </simple-terminal>
    
3. Нажимаем `Ctrl+X` и соглашаемся с сохранением изменений, нажав на `Y`
4. Теперь нужно перезапустить консоль и проверить версию Java