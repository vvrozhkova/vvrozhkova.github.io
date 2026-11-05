---
title: Java. Современная Java (Java 8+)
category: java
description: Лямбда-выражения, Stream API (фильтрация, маппинг, редьюсинг), Optional.
tags: ["core", "java"]
icon: "fas fa-code"
image: "null"
date: 2026-10-12
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

Java 8 (вышла в 2014 году) стала революционным обновлением. Она добавила функциональный стиль программирования, который делает код короче, читаемее и выразительнее. Давай разберём три главные фичы.

## 1. Лямбда-выражения

**Лямбда-выражение** — это короткая анонимная функция, которую можно передать как параметр или сохранить в переменную.

**Аналогия**
Представь, что у тебя есть функция «приготовить кофе». Раньше ты бы создала целый класс CoffeeMaker с методом makeCoffee(). С лямбдами ты можешь написать просто: (вода, кофе) → кофе + вода.

### Синтаксис

```java
// Полный синтаксис
(параметры) -> { тело; return результат; }

// Короткий синтаксис (если одна строка)
(параметры) -> выражение

// Если один параметр — скобки можно опустить
параметр -> выражение
```

### Примеры

```java
// Без лямбд (старый стиль)
Runnable task = new Runnable() {
    @Override
    public void run() {
        System.out.println("Выполняю задачу");
    }
};

// С лямбдой (новый стиль)
Runnable task = () -> System.out.println("Выполняю задачу");

// Компаратор для сортировки
// Без лямбд:
Comparator<String> oldComparator = new Comparator<String>() {
    @Override
    public int compare(String s1, String s2) {
        return s1.length() - s2.length();
    }
};

// С лямбдой:
Comparator<String> newComparator = (s1, s2) -> s1.length() - s2.length();

// Или ещё короче — через method reference:
Comparator<String> shortestComparator = Comparator.comparingInt(String::length);
```

### Функциональные интерфейсы

Лямбда может быть присвоена только **функциональному интерфейсу** — интерфейсу с ровно одним абстрактным методом.

Java предоставляет готовые функциональные интерфейсы в пакете `java.util.function`:

|Интерфейс|Метод|Описание|Пример|
|-|-|-|-|
|`Predicate<T>`|`boolean test(T t)`|Проверяет условие|`x -> x > 5`|
|`Function<T, R>`|`R apply(T t)`|Преобразует T в R|`s -> s.length()`|
|`Consumer<T>`|`void accept(T t)`|Потребляет T, ничего не возвращает|`s -> System.out.println(s)`|
|`Supplier<T>`|`T get()`|Поставляет T|`() -> new ArrayList<>()`|
|`BiFunction<T, U, R>`|`R apply(T t, U u)`|Преобразует два аргумента в R|`(a, b) -> a + b`|

```java
// Predicate — проверка
Predicate<Integer> isEven = n -> n % 2 == 0;
System.out.println(isEven.test(4)); // true

// Function — преобразование
Function<String, Integer> lengthFunction = s -> s.length();
System.out.println(lengthFunction.apply("Привет")); // 6

// Consumer — действие
Consumer<String> printer = s -> System.out.println("Сообщение: " + s);
printer.accept("Тест"); // "Сообщение: Тест"

// Supplier — создание
Supplier<List<String>> listSupplier = () -> new ArrayList<>();
List<String> list = listSupplier.get();
```

### Ссылки на методы (Method References)

Если лямбда просто вызывает существующий метод, можно использовать более короткую запись:

```java
// Лямбда
Function<String, Integer> lambda = s -> Integer.parseInt(s);

// Method reference (ссылка на метод)
Function<String, Integer> methodRef = Integer::parseInt;

// Другие примеры:
Consumer<String> printer = System.out::println;
Supplier<String> supplier = String::new;
BiFunction<String, String, String> concat = String::concat;
```

### Типы ссылок на методы:

|Тип|Синтаксис|Пример|
|-|-|-|
|Статический метод|`Class::staticMethod`|`Integer::parseInt`|
|Метод экземпляра|`instance::instanceMethod`|`System.out::println`|
|Метод экземпляра любого объекта|`Class::instanceMethod`|`String::length`|
|Конструктор|`Class::new`|`ArrayList::new`|

## 2. Stream API

**Stream API** — это способ обработки коллекций в функциональном стиле. Поток (Stream) представляет собой последовательность элементов, над которой можно выполнять цепочку операций.

**Аналогия**

Представь конвейер на заводе:

1. Источник — сырьё (коллекция)
2. Промежуточные операции — фильтрация, сортировка, преобразование (ленивые, не выполняются сразу)
3. Терминальная операция — финальный результат (список, сумма, печать)

### Создание Stream

```java
List<String> list = List.of("Вика", "Аня", "Маша");

// Из коллекции
Stream<String> stream1 = list.stream();

// Параллельный поток (для многопоточной обработки)
Stream<String> parallelStream = list.parallelStream();

// Из массива
Stream<String> stream2 = Arrays.stream(new String[]{"a", "b", "c"});

// Из значений
Stream<String> stream3 = Stream.of("x", "y", "z");

// Бесконечный поток
Stream<Integer> infinite = Stream.iterate(0, n -> n + 1);

// Диапазон
IntStream range = IntStream.range(1, 10); // 1..9
IntStream rangeClosed = IntStream.rangeClosed(1, 10); // 1..10
```

### Основные операции

#### Промежуточные операции (возвращают Stream, ленивые)

```java
List<String> names = List.of("Вика", "Аня", "Маша", "Александр", "Антон");

// filter — фильтрация по условию
Stream<String> filtered = names.stream()
    .filter(name -> name.startsWith("А")); // только имена на "А"

// map — преобразование каждого элемента
Stream<Integer> lengths = names.stream()
    .map(String::length); // длина каждого имени

// flatMap — преобразование + уплощение (для вложенных коллекций)
List<List<String>> nested = List.of(
    List.of("a", "b"),
    List.of("c", "d")
);
Stream<String> flat = nested.stream()
    .flatMap(List::stream); // ["a", "b", "c", "d"]

// distinct — убрать дубликаты
Stream<String> unique = Stream.of("a", "b", "a", "c")
    .distinct(); // ["a", "b", "c"]

// sorted — сортировка
Stream<String> sorted = names.stream()
    .sorted(); // по алфавиту

Stream<String> sortedByLength = names.stream()
    .sorted(Comparator.comparingInt(String::length)); // по длине

// limit — взять первые N элементов
Stream<String> firstTwo = names.stream()
    .limit(2); // ["Вика", "Аня"]

// skip — пропустить первые N элементов
Stream<String> skipFirst = names.stream()
    .skip(2); // ["Маша", "Александр", "Антон"]

// peek — выполнить действие для каждого элемента (для отладки)
Stream<String> withPeek = names.stream()
    .peek(name -> System.out.println("Обрабатываю: " + name))
    .filter(name -> name.length() > 3);
```

#### Терминальные операции (возвращают результат, запускают вычисления)

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);

// forEach — выполнить действие для каждого элемента
numbers.stream().forEach(System.out::println);

// collect — собрать в коллекцию
List<String> list = names.stream()
    .filter(name -> name.length() > 3)
    .collect(Collectors.toList());

Set<String> set = names.stream()
    .collect(Collectors.toSet());

Map<String, Integer> map = names.stream()
    .collect(Collectors.toMap(
        name -> name,           // ключ
        String::length          // значение
    ));

// reduce — свёртка (агрегация)
Optional<Integer> sum = numbers.stream()
    .reduce((a, b) -> a + b); // Optional[15]

int sum2 = numbers.stream()
    .reduce(0, Integer::sum); // 15 (с начальным значением)

// count — количество элементов
long count = names.stream()
    .filter(name -> name.startsWith("А"))
    .count(); // 3

// min, max — минимум/максимум
Optional<String> shortest = names.stream()
    .min(Comparator.comparingInt(String::length));

Optional<String> longest = names.stream()
    .max(Comparator.comparingInt(String::length));

// anyMatch, allMatch, noneMatch — проверки
boolean hasLong = names.stream()
    .anyMatch(name -> name.length() > 5); // true

boolean allStartWithA = names.stream()
    .allMatch(name -> name.startsWith("А")); // false

boolean noEmpty = names.stream()
    .noneMatch(String::isEmpty); // true

// findFirst, findAny — найти элемент
Optional<String> first = names.stream()
    .filter(name -> name.startsWith("М"))
    .findFirst(); // Optional["Маша"]

Optional<String> any = names.parallelStream()
    .filter(name -> name.startsWith("А"))
    .findAny(); // может вернуть любой подходящий
```

### Коллекторы (Collectors)

`Collectors` — утилитарный класс с готовыми коллекторами для collect():

```java
// Группировка
Map<Integer, List<String>> byLength = names.stream()
    .collect(Collectors.groupingBy(String::length));
// {4=[Вика, Аня], 5=[Маша], 9=[Александр], 5=[Антон]}

// Разделение на группы по условию
Map<Boolean, List<String>> partitioned = names.stream()
    .collect(Collectors.partitioningBy(name -> name.length() > 4));
// {false=[Вика, Аня, Маша], true=[Александр, Антон]}

// Joining — объединение в строку
String joined = names.stream()
    .collect(Collectors.joining(", ")); // "Вика, Аня, Маша, ..."

String joinedWithPrefix = names.stream()
    .collect(Collectors.joining(", ", "[", "]")); // "[Вика, Аня, ...]"

// Статистика
IntSummaryStatistics stats = numbers.stream()
    .collect(Collectors.summarizingInt(Integer::intValue));
System.out.println(stats.getCount());   // 5
System.out.println(stats.getSum());     // 15
System.out.println(stats.getMin());     // 1
System.out.println(stats.getMax());     // 5
System.out.println(stats.getAverage()); // 3.0

// Сумма, среднее
int sum = numbers.stream()
    .collect(Collectors.summingInt(Integer::intValue));

double avg = numbers.stream()
    .collect(Collectors.averagingInt(Integer::intValue));
```

### Практические примеры

#### Пример 1: Фильтрация и преобразование

```java
List<Person> people = List.of(
    new Person("Вика", 25, 100000),
    new Person("Аня", 22, 80000),
    new Person("Маша", 30, 120000),
    new Person("Борис", 28, 90000)
);

// Найти имена людей старше 25 лет с зарплатой > 85000
List<String> names = people.stream()
    .filter(p -> p.getAge() > 25)
    .filter(p -> p.getSalary() > 85000)
    .map(Person::getName)
    .collect(Collectors.toList());

System.out.println(names); // ["Маша", "Борис"]
```

#### Пример 2: Группировка и агрегация

```java
// Сгруппировать людей по возрасту и посчитать среднюю зарплату
Map<Integer, Double> avgSalaryByAge = people.stream()
    .collect(Collectors.groupingBy(
        Person::getAge,
        Collectors.averagingDouble(Person::getSalary)
    ));

System.out.println(avgSalaryByAge);
// {25=100000.0, 22=80000.0, 30=120000.0, 28=90000.0}
```

#### Пример 3: Цепочка преобразований

```java
// Найти сумму зарплат людей, чьи имена начинаются на гласную
double totalSalary = people.stream()
    .filter(p -> "AEIOUАЕИОУ".indexOf(p.getName().charAt(0)) != -1)
    .mapToDouble(Person::getSalary)
    .sum();

System.out.println(totalSalary); // 200000.0 (Аня + Борис)
```

#### Пример 4: FlatMap для вложенных структур

```java
List<Department> departments = List.of(
    new Department("IT", List.of(new Person("Вика", 25), new Person("Аня", 22))),
    new Department("HR", List.of(new Person("Маша", 30)))
);

// Получить всех людей из всех отделов
List<Person> allPeople = departments.stream()
    .flatMap(dept -> dept.getEmployees().stream())
    .collect(Collectors.toList());

System.out.println(allPeople); // [Вика, Аня, Маша]
```

### Параллельные потоки

Для больших коллекций можно использовать параллельную обработку:

```java
// Последовательный поток
long count1 = numbers.stream()
    .filter(n -> n % 2 == 0)
    .count();

// Параллельный поток (использует несколько ядер CPU)
long count2 = numbers.parallelStream()
    .filter(n -> n % 2 == 0)
    .count();

// Или преобразовать существующий поток
long count3 = numbers.stream()
    .parallel()
    .filter(n -> n % 2 == 0)
    .count();
```

> ⚠️ Важно: параллельные потоки не всегда быстрее! Они эффективны для:
> - Больших коллекций (> 10000 элементов)
> - Дорогостоящих операций
> - Независимых вычислений (без общего состояния)

## 3. Optional

**Optional** — это контейнер для значения, которое может отсутствовать. Альтернатива null, которая помогает избежать NullPointerException.

**Аналогия**

Представь коробку. Она может быть:

- Полной — внутри есть значение
- Пустой — внутри ничего нет

Optional — это такая «умная коробка», которая заставляет тебя проверить, есть ли внутри что-то, прежде чем использовать.

### Создание Optional

```java
// Пустой Optional
Optional<String> empty = Optional.empty();

// Optional с значением (не может быть null!)
Optional<String> opt = Optional.of("Привет");

// Optional с возможным null
Optional<String> nullable = Optional.ofNullable(null); // пустой
Optional<String> notNull = Optional.ofNullable("Привет"); // с значением
```

### Основные методы

```java
Optional<String> opt = Optional.of("Вика");

// Проверка наличия значения
boolean isPresent = opt.isPresent(); // true
boolean isEmpty = opt.isEmpty();     // false (Java 11+)

// Получение значения
String value = opt.get(); // "Вика" (но опасно, если пустой!)

// С значением по умолчанию
String name = Optional.ofNullable(getName())
    .orElse("Безымянный"); // если null, вернёт "Безымянный"

String name2 = Optional.ofNullable(getName())
    .orElseGet(() -> generateName()); // ленивая версия

// Бросить исключение, если пусто
String name3 = Optional.ofNullable(getName())
    .orElseThrow(() -> new IllegalArgumentException("Имя не найдено"));

// Преобразование значения
Optional<Integer> length = opt.map(String::length); // Optional[4]

// Фильтрация
Optional<String> filtered = opt.filter(name -> name.length() > 3); // Optional["Вика"]
Optional<String> filtered2 = opt.filter(name -> name.startsWith("А")); // Optional.empty

// Если значение есть — выполнить действие
opt.ifPresent(name -> System.out.println("Привет, " + name));

// Если значение есть — одно действие, иначе — другое
String result = opt
    .map(name -> "Привет, " + name)
    .orElse("Привет, незнакомец");
```

### Практические примеры

#### Пример 1: Безопасная работа с null

```java
// Без Optional (старый стиль)
public String getCity(Person person) {
    if (person != null) {
        Address address = person.getAddress();
        if (address != null) {
            return address.getCity();
        }
    }
    return "Неизвестно";
}

// С Optional (новый стиль)
public String getCity(Optional<Person> person) {
    return person
        .map(Person::getAddress)
        .map(Address::getCity)
        .orElse("Неизвестно");
}
```

#### Пример 2: Цепочка преобразований

```java
public Optional<String> getUpperCaseEmail(User user) {
    return Optional.ofNullable(user)
        .map(User::getEmail)
        .filter(email -> email.contains("@"))
        .map(String::toUpperCase);
}

// Использование
Optional<User> user = findUserById(123);
String email = getUpperCaseEmail(user.orElse(null))
    .orElse("email не найден");
```

#### Пример 3: Возврат Optional из метода

```java
public Optional<Person> findByName(String name) {
    return people.stream()
        .filter(p -> p.getName().equals(name))
        .findFirst();
}

// Использование
Optional<Person> person = findByName("Вика");
person.ifPresent(p -> System.out.println("Нашли: " + p.getAge()));

// Или
Person person2 = findByName("Аня")
    .orElseThrow(() -> new NotFoundException("Аня не найдена"));
```

### Когда использовать Optional

**✅ Используй:**

- Как возвращаемый тип метода, который может не найти результат
- Для полей класса, которые могут быть null
- В цепочках преобразований

**❌ Не используй:**

- Для полей, которые точно не null
- В параметрах методов (лучше перегрузка)
- В коллекциях (`List<Optional<T>>` — плохая идея)
- Для примитивов (используй OptionalInt, OptionalLong, OptionalDouble)

## 4. Практические примеры: всё вместе

### Пример 1: Анализ данных

```java
public class DataAnalyzer {
    public static void main(String[] args) {
        List<Order> orders = List.of(
            new Order(1, "Вика", 1000.0, "COMPLETED"),
            new Order(2, "Аня", 500.0, "PENDING"),
            new Order(3, "Маша", 1500.0, "COMPLETED"),
            new Order(4, "Борис", 750.0, "CANCELLED"),
            new Order(5, "Вика", 2000.0, "COMPLETED")
        );

        // 1. Найти общую сумму завершённых заказов
        double totalCompleted = orders.stream()
            .filter(o -> "COMPLETED".equals(o.getStatus()))
            .mapToDouble(Order::getAmount)
            .sum();

        System.out.println("Сумма завершённых: " + totalCompleted); // 4500.0

        // 2. Найти клиентов с общей суммой заказов > 2000
        Map<String, Double> clientTotals = orders.stream()
            .filter(o -> "COMPLETED".equals(o.getStatus()))
            .collect(Collectors.groupingBy(
                Order::getClient,
                Collectors.summingDouble(Order::getAmount)
            ));

        List<String> vipClients = clientTotals.entrySet().stream()
            .filter(entry -> entry.getValue() > 2000)
            .map(Map.Entry::getKey)
            .collect(Collectors.toList());

        System.out.println("VIP клиенты: " + vipClients); // ["Вика"]

        // 3. Найти самый дорогой заказ каждого клиента
        Map<String, Optional<Order>> maxOrders = orders.stream()
            .filter(o -> "COMPLETED".equals(o.getStatus()))
            .collect(Collectors.groupingBy(
                Order::getClient,
                Collectors.maxBy(Comparator.comparingDouble(Order::getAmount))
            ));

        maxOrders.forEach((client, order) -> 
            order.ifPresent(o -> 
                System.out.println(client + ": " + o.getAmount())
            )
        );
    }
}
```

### Пример 2: Обработка текста

```java
public class TextProcessor {
    public static void main(String[] args) {
        String text = "Java is great. Java is powerful. Python is easy.";

        // Подсчитать частоту слов, отсортировать по убыванию
        Map<String, Long> wordFrequency = Arrays.stream(text.split("[\\s.]+"))
            .map(String::toLowerCase)
            .filter(word -> !word.isEmpty())
            .collect(Collectors.groupingBy(
                word -> word,
                Collectors.counting()
            ));

        // Отсортировать по частоте
        List<Map.Entry<String, Long>> sorted = wordFrequency.entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
            .collect(Collectors.toList());

        sorted.forEach(entry -> 
            System.out.println(entry.getKey() + ": " + entry.getValue())
        );
        // java: 2
        // is: 3
        // great: 1
        // ...
    }
}
```

## 5. 🎯 Мини-задания для практики

1. Фильтрация и преобразование — дан список чисел. Найди все чётные числа, возведи их в квадрат и отсортируй по убыванию.

2. Группировка — дан список строк. Сгруппируй их по первой букве и для каждой группы найди самое длинное слово.

3. Агрегация — дан список объектов Product (name, price, category). Найди:
- Среднюю цену по всем продуктам
- Самый дорогой продукт в каждой категории
- Общую стоимость продуктов в категории "Electronics"

4. Цепочка Optional — напиши метод, который принимает `Optional<User>`, возвращает `Optional<String>` с городом пользователя. Если пользователь, адрес или город отсутствуют — верни пустой Optional.

5. FlatMap — дан список отделов, каждый из которых содержит список сотрудников. Найди всех сотрудников старше 30 лет из всех отделов.

6. Статистика — дан список оценок студентов. Для каждого студента найди среднюю оценку, максимальную и минимальную. Используй Collectors.summarizingDouble().

7. Параллельная обработка — дан большой список чисел (1 миллион). Найди сумму квадратов всех чётных чисел. Сравни время выполнения с последовательным и параллельным потоком.

## 6. 💡 Частые ошибки новичков

|Ошибка|Как правильно|
|-|-|
|Забыть терминальную операцию|Stream ленивый — без `collect()`, `count()` и т.д. ничего не выполнится|
|`opt.get()` без проверки `isPresent()`|Используй `orElse()`, `orElseThrow()` или `ifPresent()`|
|Изменение коллекции внутри `forEach`|Используй `removeIf()` или собирай в новую коллекцию|
|Параллельный поток для маленьких коллекций|Параллелизм эффективен только для больших данных|
|`Optional` как поле класса|Используй только для методов и временных значений|
|Stream используется дважды|`Stream` одноразовый — после терминальной операции он закрыт|
|Путаница `map` и `flatMap`|`map` — один к одному, `flatMap` — один ко многим + уплощение|

## 7. 📝 Что запомнить

1. **Лямбды** — (params) -> expression, заменяют анонимные классы
2. **Функциональные интерфейсы** — Predicate, Function, Consumer, Supplier
3. **Method reference** — Class::method, короче лямбды
4. **Stream API** — цепочка операций над коллекциями
5. **Промежуточные операции** — filter, map, flatMap, sorted, distinct, limit, skip
6. **Терминальные операции** — collect, reduce, count, forEach, min, max, anyMatch
7. **Коллекторы** — groupingBy, partitioningBy, joining, summarizingInt
8. **Optional** — контейнер для возможного null, методы orElse, map, filter, ifPresent
9. **Параллельные потоки** — parallelStream() для больших данных
10. **Stream ленивый** — без терминальной операции ничего не выполнится

## Вопросы на собеседованиях

### 1) Что такое Stream в Java?
Java Stream — относительно новый способ взаимодействия с потоком данных, который в свою очередь позволяет более удобно и компактно обрабатывать большие данные, а также распараллеливать обработку данных между каким-то количеством потоков, что может дать прирост в производительности в использующем функционале.
 
Более глубоко данную тему в двух словах не рассказать, поэтому я оставлю здесь ссылку на статью, которая вам может погрузиться в данную тему.

### 2) Приведите примеры удачного и неудачного использования Optional
Предположим, у нас есть некоторый ряд значений, по которому мы проходимся стримом, и в итоге получаем некоторый Optional как результат:
```java
Optional<String> stringOptional = Stream.of("a", "ab", "abc", "abcd")
   .filter(str -> str.length() >= 3)
   .findAny();
```

Нам, как полагается, нужно достать из этого `Optional` значение.
 
Просто использовать `get()` — плохой способ:

`String result = stringOptional.get();`

Но ведь этот метод должен достать значение из `Optional` и вернуть нам? Это, конечно, так, но если в нём есть значение.
 
Ну а если значения в стриме были другие, и в итоге мы получили пустой `Optional`, при попытке взять значение из него посредством использования метода get() будет выброшено: 

Что не есть хорошо.
 
В таком случае лучше использовать конструкции:
```java
String result = null;
if (stringOptional.isPresent()) {
 stringOptional.get();
}
```
В данном случае мы проверяем, есть ли элемент в Optional. Если нет — результирующая строка имеет свое старое значение.

`String result = stringOptional.orElse("default value");`

В данном случае мы указываем некоторое значение по умолчанию, которое будет заданно результирующей строке в случае пустого `Optional`.

`String result = stringOptional.orElseThrow(() -> new CustomException());`

В данном случае мы сами выбрасываем исключение при пустом `Optional`.

Это бывает удобно в приложении, когда, к примеру, используется метод Spring JPA — `findById()`, который возвращает `Optional` значения. В таком случае данным методом мы пытаемся взять значение, и если его нет — бросаем некоторое **Runtime** исключение, которое обрабатывается на уровне контроллеров с помощью ***ExceptionHandler*** и конвертируется в HTTP ответ со статусом **404 - NOT FOUND**.