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

## Скачиваем JDK 

Чтобы скачать пакет Open JDK нужно:

* Зайти на сайт [jdk.java.net](https://jdk.java.net/)
* Перейти по ссылке с нужной версией Java, последняя стабильная версия Java находится в пункте Ready for use
* В разделе Build выбираем ссылку на архив с пакетом. Для Linux  - это Linux / x64	tar.gz (sha256)

## Извлекаем архив

* Переходим в папку в которую будем производить установку и создаем в ней папку для хранения jdk

<div id="terminal">
<div class="title right">bash</div>
<div class="window">

```bash
user@user-TestAutomation.Space:~$ cd /usr/
user@user-TestAutomation.Space:/usr$ sudo mkdir /java/
[sudo] пароль для user: 
user@user-TestAutomation.Space:/usr$ 
```
</div>
</div>

* Копируем в созданую папку скаченный архив

<div id="terminal">
<div class="title right">bash</div>
<div class="window">

```bash
user@user-TestAutomation.Space:/usr$ sudo mv /home/user/Downloads/openjdk-..._bin.tar.gz /usr/java/
[sudo] пароль для user: 
user@user-TestAutomation.Space:/usr$ 
```
</div>
</div>

* И распаковываем tar-архив

<div id="terminal">
<div class="title right">bash</div>
<div class="window">

```bash
user@user-TestAutomation.Space:/usr$ sudo tar zxvf /usr/java/openjdk-..._bin.tar.gz
[sudo] пароль для user: 
user@user-TestAutomation.Space:/usr$ 
```
</div>
</div>

 ## Настраиваем переменные окружения PATH и JAVA_HOME

 <ol>
<li>Открыть на редактирование файл <code class="language-text">.bashrc</code>
<div id="terminal">
<div class="title right">bash</div>
<div class="window">

```bash
nano /home/user/.bashrc
```

</div>
</div>
</li>
<li>В конец добавляем строчки
<div id="terminal">
<div class="title right">bash</div>
<div class="window">

```bash
export JAVA_HOME=/usr/java/jdk
export PATH=$JAVA_HOME/bin:$PATH
```

</div>
</div>
</li>

<li>Нажимаем <code class="language-text">Ctrl+X</code> и соглашаемся с сохранением изменений, нажав на <code class="language-text">Y</code></li>
<li>Теперь нужно перезапустить консоль и проверить версию Java</li>
</ol>

