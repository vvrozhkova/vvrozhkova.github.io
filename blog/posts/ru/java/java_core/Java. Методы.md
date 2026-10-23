---
title: Java. Методы
category: java
description: Объявление, вызов, перегрузка методов, передача параметров.
tags: ["core", "java"]
icon: "fas fa-code"
image: "null"
date: 2026-10-11
keywords: "java, core"
links: [
        {
          items: [
           { title: "Java. Подготовка к собеседованию", link: "/java-podgotovka-k-sobesedovaniyu/" },
           { title: "Java. Базовый синтаксис", link: "/java-bazovyj-sintaksis/" },
           { title: "Java. Управляющие конструкции", link: "/java-upravlyayushhie-konstrukczii/" },
           { title: "Java. Массивы и строки", link: "/java-massivy-i-stroki/" },
           { title: "Java. Методы", link: "/java-metody/" },
           { title: "Java. Основы ООП", link: "/java-osnovy-oop/" },
           { title: "Исключения (Exceptions)", link: "/java-isklyucheniya-exceptions/" },
           { title: "Дженерики (Generics)", link: "/java-dzheneriki-generics/" },
           { title: "Java. Коллекции (Collections Framework)", link: "/java-kollekczii-collections-framework/" },
           { title: "Java. Современная Java (Java 8+)", link: "/java-sovremennaya-java-java-8/" },
           { title: "Java. Ввод/Вывод (I/O и NIO)", link: "/java-vvod-vyvod-i-o-i-nio/" },
           { title: "Java. Многопоточность, паттерны проектирования, работа с памятью", link: "/java-mnogopotochnost-patterny-proektirovaniya-rabota-s-pamyatyu/" },
           { title: "Вопросы на собеседованиях", link: "/voprosy-na-sobesedovaniyah/" },
          ]
        }
      ]
---

## 1. Что такое метод и зачем он нужен
**Метод** — это именованный блок кода, который выполняет определённую задачу. Представь метод как рецепт: у него есть название, список ингредиентов (параметры), и в конце он либо выдаёт готовое блюдо (возвращает значение), либо просто делает что-то (например, печатает текст).

Зачем использовать методы:

- Переиспользование — один раз написали, используем много раз
- Читаемость — calculateDiscount(price) понятнее, чем 10 строк математики
- Декомпозиция — большая задача разбивается на маленькие
- Тестируемость — каждый метод можно проверить отдельно

## 2. Объявление метода

### Общий синтаксис

```java
модификаторы тип_возврата имяМетода(параметры) {
    // тело метода
    return значение; // если тип_возврата не void
}
```

Разберём по частям:

|Часть|Что означает|Пример|
|-|-|-|
|Модификаторы|Доступ и поведение|public, private, static|
|Тип возврата|Что метод возвращает|int, String, boolean, void|
|Имя|Название метода (camelCase)|calculateSum, isEven|
|Параметры|Входные данные|int a, int b|
|Тело|Код, который выполняется|{ ... }|

### Примеры разных методов

```java
public class MethodsDemo {
    
    // 1. Метод без параметров, не возвращает ничего
    public static void sayHello() {
        System.out.println("Привет, Вика!");
    }
    
    // 2. Метод с параметрами, возвращает значение
    public static int sum(int a, int b) {
        return a + b;
    }
    
    // 3. Метод с условием, возвращает boolean
    public static boolean isEven(int number) {
        return number % 2 == 0;
    }
    
    // 4. Метод со строковым параметром и возвратом
    public static String greet(String name) {
        return "Привет, " + name + "!";
    }
    
    public static void main(String[] args) {
        sayHello();                          // "Привет, Вика!"
        int result = sum(5, 3);              // result = 8
        System.out.println(isEven(4));       // true
        System.out.println(greet("Аня"));    // "Привет, Аня!"
    }
}
```

### Ключевое слово return

- Если метод возвращает значение (тип не void) — он обязан содержать return
- return немедленно завершает выполнение метода
- После return код в методе не выполняется

```java
public static int absolute(int x) {
    if (x < 0) {
        return -x;  // выходим сразу
    }
    return x;       // сюда попадём, только если x >= 0
}

public static void printAndExit(int x) {
    System.out.println(x);
    return;  // в void-методах return можно использовать для досрочного выхода
    // System.out.println("не выполнится"); // 💥 недостижимый код
}
```

## 3. Модификаторы: public, private, static

### Модификаторы доступа

|Модификатор|Кто может вызвать|
|-|-|
|public|Все из любого места|
|private|Только внутри своего класса|
|(без модификатора)|Только в своём пакете|
|protected|Свой пакет + наследники|

>💡 Для обучения пока используй public static. Позже, когда изучишь ООП, разберёмся с private и нестатическими методами.

### static — что это значит?

- **static метод** принадлежит классу, а не объекту. Можно вызывать без создания объекта: MethodsDemo.sum(1, 2)
- Нестатический метод принадлежит объекту. Нужен экземпляр класса:

```java
MyClass obj = new MyClass();
obj.myMethod();
```

> ⚠️ Правило: из static метода нельзя напрямую обращаться к нестатическим методам и полям.

## 4. Вызов методов

Метод вызывается по имени с указанием аргументов в скобках:

```java
public class Calculator {
    
    public static int add(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        // Вызов с сохранением результата
        int result = add(10, 20);
        System.out.println(result); // 30
        
        // Вызов сразу в выражении
        System.out.println(add(5, 7) * 2); // 24
        
        // Вызов как аргумент другого метода
        System.out.println(add(add(1, 2), add(3, 4))); // 10
    }
}
```

**Методы могут вызывать друг друга**

```java
public static int square(int x) {
    return x * x;
}

public static int sumOfSquares(int a, int b) {
    return square(a) + square(b); // вызываем square внутри
}

public static void main(String[] args) {
    System.out.println(sumOfSquares(3, 4)); // 25 (9 + 16)
}
```

## 5. Перегрузка методов (Overloading)

**Перегрузка** — это возможность объявить несколько методов с одним именем, но разными параметрами. Компилятор сам поймёт, какой метод вызвать, по типу и количеству аргументов.

**Пример**

```java
public class Printer {
    
    public static void print(int value) {
        System.out.println("Число: " + value);
    }
    
    public static void print(String text) {
        System.out.println("Строка: " + text);
    }
    
    public static void print(int a, int b) {
        System.out.println("Два числа: " + a + " и " + b);
    }
    
    public static void print(double value) {
        System.out.println("Дробное: " + value);
    }
    
    public static void main(String[] args) {
        print(42);           // "Число: 42"
        print("Привет");     // "Строка: Привет"
        print(3, 7);         // "Два числа: 3 и 7"
        print(3.14);         // "Дробное: 3.14"
    }
}
```

### Правила перегрузки

**✅ Можно менять:**
- Количество параметров
- Типы параметров
- Порядок типов параметров

**❌ Нельзя менять:**
- Только тип возврата (компилятор не поймёт, какой метод вызвать)
- Только имена параметров

```java
// ❌ ОШИБКА: отличается только возвращаемый тип
public static int getValue() { return 1; }
public static String getValue() { return "one"; } // компилятор не скомпилирует

// ✅ Правильно: разное количество параметров
public static int getValue() { return 1; }
public static String getValue(int x) { return "one"; }
```

### Зачем это нужно?

Вспомни System.out.println() — он перегружен десятки раз! Ты можешь передать int, String, double, boolean, объект — и всё работает.

```java
System.out.println(42);           // int
System.out.println("Привет");     // String
System.out.println(3.14);         // double
System.out.println(true);         // boolean
```

### Автоматическое приведение типов при перегрузке

Если точного совпадения нет, Java попробует привести тип:

```java
public static void test(int x) { System.out.println("int"); }
public static void test(long x) { System.out.println("long"); }
public static void test(double x) { System.out.println("double"); }

test(42);       // "int" — точное совпадение
test(42L);      // "long" — точное совпадение
test(3.14);     // "double" — точное совпадение
test((short)5); // "int" — short расширяется до int
```

## 6. Передача параметров

Это очень важная тема, в которой часто путаются новички. В Java параметры всегда передаются по значению (pass-by-value), но есть нюанс для ссылочных типов.

### Примитивные типы: передаётся копия значения

```java
public static void increment(int x) {
    x = x + 1;
    System.out.println("Внутри метода: " + x); // 6
}

public static void main(String[] args) {
    int a = 5;
    increment(a);
    System.out.println("После вызова: " + a); // 5 — НЕ изменилось!
}
```

**Что произошло:**
1. В main есть переменная a = 5
2. При вызове increment(a) создаётся копия значения 5 и кладётся в параметр x
3. x и a — две разные переменные в разных участках памяти
4. Изменение x внутри метода не влияет на a

### Ссылочные типы: передаётся копия ссылки

А вот тут интересно. Передаётся копия ссылки на объект, а не сам объект.

```java
public static void modifyArray(int[] arr) {
    arr[0] = 999; // меняем содержимое объекта
}

public static void main(String[] args) {
    int[] numbers = {1, 2, 3};
    modifyArray(numbers);
    System.out.println(numbers[0]); // 999 — ИЗМЕНИЛОСЬ!
}
```

**Что произошло:**

1. numbers — это ссылка на массив в памяти
2. При вызове modifyArray(numbers) создаётся копия ссылки (но не массива!)
3. Параметр arr и переменная numbers ссылаются на один и тот же массив
4 Меняя элементы через arr, мы меняем тот же объект

**Но переназначить ссылку нельзя!**

```java
public static void reassign(int[] arr) {
    arr = new int[]{10, 20, 30}; // создаём НОВЫЙ массив
    arr[0] = 999;
}

public static void main(String[] args) {
    int[] numbers = {1, 2, 3};
    reassign(numbers);
    System.out.println(numbers[0]); // 1 — НЕ изменилось!
}
```

**Почему?** Внутри метода arr — это копия ссылки. Когда мы написали arr = new int[]..., мы просто перенаправили копию на новый объект. Исходная numbers продолжает ссылаться на старый массив.

### Сводная таблица

|Тип|Что передаётся|Можно изменить исходное?|
|-|-|-|
|Примитив (int, double и т.д.)|Копия значения|❌ Нет|
|Ссылочный (String, массив, объект)|Копия ссылки|✅ Содержимое — да, саму ссылку — нет|

### Особенность String

Строки — ссылочный тип, но они неизменяемые (immutable). Поэтому изменить их содержимое нельзя:

## 7. Переменное число аргументов (varargs)

Иногда нужно передать неизвестное количество аргументов одного типа. Для этого есть ...:

```java
public static int sumAll(int... numbers) {
    int sum = 0;
    for (int n : numbers) {
        sum += n;
    }
    return sum;
}

public static void main(String[] args) {
    System.out.println(sumAll());              // 0
    System.out.println(sumAll(1));             // 1
    System.out.println(sumAll(1, 2, 3));       // 6
    System.out.println(sumAll(1, 2, 3, 4, 5)); // 15
    
    int[] arr = {10, 20, 30};
    System.out.println(sumAll(arr));           // 60 — можно передать массив
}
```

> ⚠️ Важно: varargs должен быть последним параметром:

```java 
public static void print(String prefix, int... numbers) // ✅
public static void print(int... numbers, String prefix) // ❌ ОШИБКА
```

Внутри метода `numbers` ведёт себя как обычный массив `int[]`.

## 8. Рекурсия

Метод может вызывать **сам себя**. Это называется рекурсия.

### Классический пример — факториал

```java
public static int factorial(int n) {
    if (n <= 1) {
        return 1; // базовый случай (условие выхода)
    }
    return n * factorial(n - 1); // рекурсивный вызов
}

// factorial(5):
// 5 * factorial(4)
// 5 * 4 * factorial(3)
// 5 * 4 * 3 * factorial(2)
// 5 * 4 * 3 * 2 * factorial(1)
// 5 * 4 * 3 * 2 * 1 = 120
```

### Правила рекурсии
1. **Базовый случай** — условие, при котором рекурсия останавливается
2. **Рекурсивный случай** — вызов метода с «более простой» задачей
3. **Обязательно** должен быть путь к базовому случаю, иначе — `StackOverflowError`

```java
// ❌ ОПАСНО: бесконечная рекурсия
public static void bad(int n) {
    bad(n); // никогда не остановится
}
```

## 9. Область видимости переменных (Scope)

Переменные живут только внутри блока, где объявлены:

```java
public static void example() {
    int x = 10; // видна во всём методе
    
    if (x > 5) {
        int y = 20; // видна только внутри if
        System.out.println(x); // ✅ OK
    }
    
    // System.out.println(y); // ❌ ОШИБКА: y не видна здесь
    
    for (int i = 0; i < 3; i++) {
        // i видна только внутри for
    }
    // System.out.println(i); // ❌ ОШИБКА
}
```

> 💡 Правило: переменные живут минимально необходимый срок. Объявляй их как можно ближе к месту использования.

## 10. Практические примеры

### Пример 1: Метод для проверки простого числа

```java
public static boolean isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0) return false;
    
    for (int i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}

public static void main(String[] args) {
    for (int i = 1; i <= 20; i++) {
        if (isPrime(i)) {
            System.out.print(i + " ");
        }
    }
    // 2 3 5 7 11 13 17 19
}
```

### Пример 2: Метод для реверса строки

```java
public static String reverse(String s) {
    StringBuilder sb = new StringBuilder();
    for (int i = s.length() - 1; i >= 0; i--) {
        sb.append(s.charAt(i));
    }
    return sb.toString();
}

public static void main(String[] args) {
    System.out.println(reverse("Привет")); // "тевирП"
}
```

### Пример 3: Поиск в массиве

```java
public static int findIndex(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i; // нашли — возвращаем индекс
        }
    }
    return -1; // не нашли — возвращаем -1
}

public static void main(String[] args) {
    int[] numbers = {10, 20, 30, 40, 50};
    System.out.println(findIndex(numbers, 30)); // 2
    System.out.println(findIndex(numbers, 99)); // -1
}
```

### Пример 4: Рекурсия — числа Фибоначчи

```java
public static int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

public static void main(String[] args) {
    for (int i = 0; i < 10; i++) {
        System.out.print(fibonacci(i) + " ");
    }
    // 0 1 1 2 3 5 8 13 21 34
}
```

## 11. 🎯 Мини-задания для практики

1. **Метод-калькулятор** — напиши 4 метода: `add`, `subtract`, `multiply`, `divide`. Каждый принимает два `double` и возвращает результат. В `divide` обработай деление на ноль.

2. **Перегрузка max** — напиши 3 перегруженных метода max:
для двух `int`
для трёх `int`
для массива `int[]`

3. **Метод-палиндром** — напиши метод `isPalindrome(String)`, который проверяет, читается ли строка одинаково в обоих направлениях (без учёта регистра и пробелов).

4. **Подсчёт символов** — напиши метод countChar(`String text`, `char c`), который считает, сколько раз символ `c` встречается в строке `text`.

5. **Рекурсия:** степень — напиши метод power(`int base`, `int exp`), который вычисляет base в степени exp через рекурсию (без использования `Math.pow`).

6. **Массив и метод** — напиши метод, который принимает массив чисел и возвращает новый массив, содержащий только чётные числа из исходного.

## 📝 Что запомнить

1. Метод = модификаторы + тип возврата + имя + параметры + тело
2. void — метод ничего не возвращает, просто делает что-то
3. return — возвращает значение и завершает метод
4. Перегрузка — одно имя, разные параметры (не тип возврата!)
5. Примитивы передаются по значению — копия, оригинал не меняется
6. Ссылочные типы — передаётся копия ссылки: содержимое менять можно, саму ссылку — нет
7. varargs (int...) — переменное число аргументов, всегда последний параметр
8. Рекурсия — метод вызывает сам себя, обязательно с базовым случаем

## Вопросы на собеседованиях

### 7) Что такое Local Variable?

Еще один из популярных вопросов на собеседовании Java-разработчика. Local variable — это переменная, которая определена внутри метода и существует вплоть до того момента, пока выполняется этот метод. Как только выполнение закончится, локальная переменная перестанет существовать.

Вот программа, которая использует локальную переменную helloMessage в методе main():

```java
public static void main(String[] args) {
   String helloMessage;
   helloMessage = "Hello, World!";
   System.out.println(helloMessage);
}
```

### 8) Что такое Instance Variable?

Instance Variable — переменная, которая определена внутри класса, и она существует вплоть до того момента, пока существует объект.

Пример — класс Bee, в котором есть две переменные nectarCapacity и maxNectarCapacity:

```java
public class Bee {

   /**
    * Current nectar capacity
    */
   private double nectarCapacity;

   /**
    * Maximal nectar that can take bee.
    */
   private double maxNectarCapacity = 20.0;

  ...
}
```

### 9) Что такое модификаторы доступа?

Модификаторы доступа — это инструмент, при помощи которого можно настроить доступ к классам, методам и переменным.

Бывают следующие модификаторы, упорядоченные в порядке повышения доступа:

1. private — используется для методов, полей и конструкторов. Уровень доступа — только класс, внутри которого он объявлен.
2. package-private(default) — может использоваться для классов. Доступ только в конкретном пакете (package), в котором объявлен класс, метод, переменная, конструктор.
3. protected — такой же доступ, как и package-private + для тех классов, которые наследуются от класса с модификатором protected.
4. public — используется и для классов. Полноценный доступ во всем приложении.

### 10) Что такое переопределение (overriding) методов?

Переопределение методов происходит, когда child хочет изменить поведение parent класса. Если нужно, чтоб выполнилось-таки то, что есть в методе parent, можно использовать в child конструкцию вида super.methodName(), что выполнит работу parent метода, а уже потом добавить логику.

Требования, которые нужно соблюдать:

- сигнатура метода должна быть такая же;
- возвращаемое значение должно быть таким же.

### 11) Что такое сигнатура метода?
Сигнатура метода — это набор из названия метода и аргументов, какие принимает метод.

Сигнатура метода является уникальным идентификатором для метода при перегрузке методов.

### 12) Что такое перегрузка методов?

Перегрузка методов — это свойство полиморфизма, в котором при помощи изменения сигнатуры метода можно создать разные методы для одних действий:

- одно и то же имя метода;
- разные аргументы;
- может быть разный возвращаемый тип.

Например, один и тот же add() из ArrayList может быть перегружен следующим образом и будет выполнять добавление разным способом, в зависимости от входящих аргументов:

- `add(Object o)` — просто добавляет объект;
- `add(int index, Object o)` — добавляет объект в определенный индекс;
- `add(Collection<Object> c)` — добавляет список объектов;
- `add(int index, Collection<Object> c)` — добавляет список объектов, начиная с определенного индекса.