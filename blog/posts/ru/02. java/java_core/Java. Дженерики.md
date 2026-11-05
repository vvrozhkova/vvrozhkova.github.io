---
title: Java. Дженерики (Generics)
category: java
description: Обобщения, wildcards (? extends, ? super).
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

Дженерики — это одна из самых «элегантных» фич Java. Они позволяют писать код, который работает с разными типами данных, сохраняя при этом строгую типизацию. Без дженериков современные коллекции (List, Map, Set) были бы невозможны. Давай разберёмся подробно.

## 1. Зачем нужны дженерики? Проблема без них

Представь, что ты пишешь «контейнер» для хранения объектов. Без дженериков ты бы использовал Object — базовый тип для всего:

```java
// ❌ БЕЗ дженериков — старый стиль (до Java 5)
public class Box {
    private Object content;

    public void put(Object item) {
        this.content = item;
    }

    public Object get() {
        return content;
    }
}

public class Main {
    public static void main(String[] args) {
        Box box = new Box();
        box.put("Привет");
        
        // Компилируется, но...
        String s = (String) box.get(); // нужно явно приводить типы
        Integer n = (Integer) box.get(); // 💥 ClassCastException в рантайме!
    }
}
```

**Проблемы:**

1. Нет типобезопасности — можно положить что угодно, и компилятор не предупредит
2. Нужны явные приведения — (String), (Integer) — код засоряется
3. Ошибки в рантайме — ClassCastException вылезет только при запуске

**Решение — дженерики**

```java
// ✅ С дженериками — современный стиль
public class Box<T> {  // T — тип-параметр (type parameter)
    private T content;

    public void put(T item) {
        this.content = item;
    }

    public T get() {
        return content;
    }
}

public class Main {
    public static void main(String[] args) {
        Box<String> stringBox = new Box<>();
        stringBox.put("Привет");
        String s = stringBox.get(); // ✅ Никаких приведений!

        // stringBox.put(123); // ❌ ОШИБКА КОМПИЛЯЦИИ! Нельзя положить int в Box<String>

        Box<Integer> intBox = new Box<>();
        intBox.put(42);
        int n = intBox.get(); // ✅ Автоматическая распаковка
    }
}
```

Что изменилось:
- `Box<T>` — класс с параметром типа `T`
- `Box<String>` — конкретный экземпляр, где `T = String`
- Компилятор проверяет типы на этапе компиляции — ошибки не доходят до рантайма
- Не нужны явные приведения

## 2. Обобщённые классы

### Синтаксис

```java
public class ИмяКласса<T1, T2, ...> {
    // T1, T2 — параметры типа
}
```

**Пример: пара из двух значений**

```java
public class Pair<F, S> {  // F — First, S — Second
    private F first;
    private S second;

    public Pair(F first, S second) {
        this.first = first;
        this.second = second;
    }

    public F getFirst() { return first; }
    public S getSecond() { return second; }

    public void setFirst(F first) { this.first = first; }
    public void setSecond(S second) { this.second = second; }
}
```

```java
Pair<String, Integer> nameAndAge = new Pair<>("Вика", 25);
String name = nameAndAge.getFirst();      // "Вика"
Integer age = nameAndAge.getSecond();     // 25

Pair<Double, Boolean> priceAndInStock = new Pair<>(99.99, true);
```

**Пример: обобщённый контейнер с методами**

```java
public class Container<T> {
    private List<T> items = new ArrayList<>();

    public void add(T item) {
        items.add(item);
    }

    public T get(int index) {
        return items.get(index);
    }

    public int size() {
        return items.size();
    }

    public List<T> getAll() {
        return new ArrayList<>(items); // возвращаем копию
    }
}
```

```java
Container<String> names = new Container<>();
names.add("Вика");
names.add("Аня");
String first = names.get(0); // "Вика" — без приведений!
```

## 3. Обобщённые методы

Дженерики можно применять не только к классам, но и к отдельным методам. При этом параметр типа объявляется перед типом возврата.

```java
public class Utils {
    // Обобщённый метод
    public static <T> void printArray(T[] array) {
        for (T item : array) {
            System.out.print(item + " ");
        }
        System.out.println();
    }

    // Метод с несколькими параметрами типа
    public static <K, V> void printPair(K key, V value) {
        System.out.println(key + " = " + value);
    }

    // Метод, возвращающий обобщённый тип
    public static <T> T getFirst(List<T> list) {
        if (list.isEmpty()) {
            throw new NoSuchElementException("Список пуст");
        }
        return list.get(0);
    }
}
```

```java
Integer[] numbers = {1, 2, 3, 4, 5};
String[] words = {"Привет", "мир"};

Utils.printArray(numbers);  // 1 2 3 4 5
Utils.printArray(words);    // Привет мир

Utils.printPair("имя", "Вика");
Utils.printPair(42, true);

String first = Utils.getFirst(List.of("a", "b", "c")); // "a"
```

> 💡 Компилятор сам выводит тип из аргументов. Тебе не нужно писать `Utils.<Integer>printArray(numbers)` — достаточно `Utils.printArray(numbers)`.

### Обобщённые методы в не-обобщённых классах

Это очень полезно для утилитарных методов:

```java
public class ArrayUtils {
    // Один метод работает с любыми массивами
    public static <T> T findMax(T[] array, Comparator<T> comparator) {
        if (array == null || array.length == 0) {
            throw new IllegalArgumentException("Массив пуст");
        }
        T max = array[0];
        for (T item : array) {
            if (comparator.compare(item, max) > 0) {
                max = item;
            }
        }
        return max;
    }
}
```

## 4. Ограничения типов (Bounded Type Parameters)

Иногда нужно сказать: «T может быть любым, НО должен наследоваться от такого-то класса». Для этого используются ограничения.

### Синтаксис

```java
<T extends ClassName>
<T extends InterfaceName>
<T extends Class & Interface1 & Interface2>  // множественные ограничения
```

#### Пример 1: числовые вычисления

```java
public class MathUtils {
    // T должен быть наследником Number (Integer, Double, Float, Long...)
    public static <T extends Number> double sum(List<T> numbers) {
        double total = 0;
        for (T num : numbers) {
            total += num.doubleValue(); // метод из Number
        }
        return total;
    }
}
```

```java
List<Integer> ints = List.of(1, 2, 3, 4, 5);
List<Double> doubles = List.of(1.5, 2.5, 3.5);

System.out.println(MathUtils.sum(ints));    // 15.0
System.out.println(MathUtils.sum(doubles)); // 7.5
// MathUtils.sum(List.of("a", "b")); // ❌ ОШИБКА: String не extends Number
```

#### Пример 2: сравнимые объекты

```java
public class Sorter {
    // T должен реализовывать Comparable<T> — т.е. уметь сравниваться с собой
    public static <T extends Comparable<T>> T findMax(List<T> list) {
        T max = list.get(0);
        for (T item : list) {
            if (item.compareTo(max) > 0) {
                max = item;
            }
        }
        return max;
    }
}
```

```java
System.out.println(Sorter.findMax(List.of(3, 1, 4, 1, 5, 9))); // 9
System.out.println(Sorter.findMax(List.of("banana", "apple", "cherry"))); // "cherry"
```

#### Пример 3: множественные ограничения

```java
// T должен быть наследником Number И реализовывать Comparable
public static <T extends Number & Comparable<T>> T findLargestNumber(List<T> list) {
    // ...
}
```

> ⚠️ Если есть и класс, и интерфейсы — класс идёт первым.

## 5. Wildcards — шаблоны ?

А теперь — самая «запутанная» для новичков тема. Но без паники, разберёмся по шагам.

### Проблема: инвариантность массивов и коллекций

```java
// Массивы в Java ковариантны (это можно, но опасно)
Object[] objects = new String[3]; // ✅ Компилируется
objects[0] = 42; // 💥 ArrayStoreException в рантайме!

// Коллекции — инвариантны
List<Object> objects = new ArrayList<String>(); // ❌ ОШИБКА КОМПИЛЯЦИИ!
```

Почему так? Потому что `List<String>` — НЕ является подтипом `List<Object>`, даже если `String` — подтип `Object`. Это называется инвариантность.

**Но иногда нам нужна гибкость!**

Представь метод, который печатает список:

```java
public static void printList(List<Object> list) {
    for (Object obj : list) {
        System.out.println(obj);
    }
}

printList(List.of("a", "b"));       // ❌ ОШИБКА: List<String> ≠ List<Object>
printList(List.of(1, 2, 3));        // ❌ ОШИБКА
```

Хотелось бы, чтобы метод принимал **любой** список. Для этого и нужны wildcards.

### Неограниченный wildcard: ?

? означает «какой-то тип, мы не знаем какой».

```java
public static void printList(List<?> list) {
    for (Object obj : list) {
        System.out.println(obj);
    }
}

printList(List.of("a", "b"));       // ✅ OK
printList(List.of(1, 2, 3));        // ✅ OK
printList(List.of(new Cat(), new Dog())); // ✅ OK
```

> 💡 Но с List<?> ты можешь только читать элементы (как Object). Добавлять в такой список нельзя — компилятор не знает, какой тип там должен быть.

```java
List<?> list = new ArrayList<String>();
list.add("hello"); // ❌ ОШИБКА КОМПИЛЯЦИИ!
list.add(42);      // ❌ ОШИБКА
list.add(null);    // ✅ null можно всегда
```

### Ограниченные wildcards: ? extends T и ? super T

Вот тут начинается самое интересное.

#### ? extends T — «какой-то тип, который ЯВЛЯЕТСЯ T или наследником T»

```java
public static double sumOfNumbers(List<? extends Number> list) {
    double total = 0;
    for (Number n : list) {
        total += n.doubleValue();
    }
    return total;
}

sumOfNumbers(List.of(1, 2, 3));           // ✅ List<Integer>
sumOfNumbers(List.of(1.5, 2.5));          // ✅ List<Double>
sumOfNumbers(List.of(1L, 2L, 3L));        // ✅ List<Long>
// sumOfNumbers(List.of("a", "b"));       // ❌ String не extends Number
```

**Что можно делать с ? extends T:**

- ✅ Читать элементы как T
- ❌ Добавлять элементы (кроме null) — компилятор не знает точный тип

#### ? super T — «какой-то тип, который ЯВЛЯЕТСЯ T или РОДИТЕЛЕМ T»

```java
public static void addNumbers(List<? super Integer> list) {
    list.add(1);    // ✅ OK — Integer можно положить в List<Integer>, List<Number>, List<Object>
    list.add(42);   // ✅ OK
    // list.add(3.14); // ❌ ОШИБКА: Double не подходит
}

List<Integer> ints = new ArrayList<>();
List<Number> numbers = new ArrayList<>();
List<Object> objects = new ArrayList<>();

addNumbers(ints);     // ✅
addNumbers(numbers);  // ✅
addNumbers(objects);  // ✅
// addNumbers(List.of("a")); // ❌ String не супертип Integer
```

**Что можно делать с ? super T:**

- ❌ Читать элементы — только как Object (компилятор не знает точный тип)
- ✅ Добавлять элементы типа T и его наследников

## 6. Правило PECS (Producer Extends, Consumer Super)

Это главное **мнемоническое правило** для wildcards, придуманноеEffective Java автором Джошуа Блохом.
- PE — Producer Extends: если коллекция производит данные (ты из неё читаешь) — используй ? extends T
- CS — Consumer Super: если коллекция потребляет данные (ты в неё пишешь) — используй ? super T

**Пример: метод copy**

```java
// src — продюсер (читаем из него) → extends
// dest — консьюмер (пишем в него) → super
public static <T> void copy(List<? extends T> src, List<? super T> dest) {
    for (T item : src) {
        dest.add(item);
    }
}
```

```java
List<Integer> source = List.of(1, 2, 3);
List<Number> destination = new ArrayList<>();

copy(source, destination); // ✅ Integer extends Number, Number super Integer
System.out.println(destination); // [1, 2, 3]

// Можно и так:
List<Number> src2 = List.of(1.5, 2.5);
List<Object> dest2 = new ArrayList<>();
copy(src2, dest2); // ✅
```

**Пример: метод addAll**

```java
// В стандартной библиотеке Java:
public boolean addAll(Collection<? extends E> c) {
    // c — продюсер, поэтому extends E
}
```

### Таблица-шпаргалка

|Ситуация|Что использовать|Пример|
|-|-|-|
|Только читаю из коллекции|? extends T|`double sum(List<? extends Number> list)`|
|Только пишу в коллекцию|? super T|`void addInts(List<? super Integer> list)`|
|И читаю, и пишу|Без wildcard, просто T|`void swap(List<T> list, int i, int j)`|

## 7. Ограничения дженериков (важно!)

У дженериков в Java есть несколько ограничений, о которых нужно знать:

### 1. Нельзя использовать примитивные типы

```java
// ❌ ОШИБКА
Box<int> intBox = new Box<>();

// ✅ Используй классы-обёртки
Box<Integer> intBox = new Box<>();
```

### 2. Нельзя создать экземпляр типа T

```java
public class Factory<T> {
    public T create() {
        // return new T(); // ❌ ОШИБКА КОМПИЛЯЦИИ!
        // return new T[10]; // ❌ ОШИБКА
    }
}
```

Обходной путь: передать Supplier или Class:

```java
public class Factory<T> {
    private Supplier<T> supplier;

    public Factory(Supplier<T> supplier) {
        this.supplier = supplier;
    }

    public T create() {
        return supplier.get();
    }
}

Factory<String> factory = new Factory<>(String::new);
String s = factory.create();
```

### 3. Нельзя создать массив параметризованного типа

```java
// ❌
T[] arr = new T[10];
List<String>[] arr = new List<String>[10];

// ✅ Обходной путь
Object[] arr = new Object[10];
// или
List<?>[] arr = new List<?>[10]; // с предупреждением
```

### 4. Нельзя использовать в static-контексте

```java
public class Box<T> {
    // static T value; // ❌ ОШИБКА: static не видит T
    // public static void set(T value) { } // ❌ ОШИБКА
    
    // ✅ Но можно сделать static-метод со своим параметром типа
    public static <E> void print(E item) {
        System.out.println(item);
    }
}
```

### 5. Нельзя instanceof для параметризованных типов

```java
if (obj instanceof List<String>) { } // ❌ ОШИБКА
if (obj instanceof List<?>) { }      // ✅ OK
if (obj instanceof List) { }         // ✅ OK (raw type)
```

#### Почему такие ограничения? Стирание типов (Type Erasure)

Все эти ограничения связаны с тем, как дженерики реализованы в Java. На этапе компиляции информация о типах-параметрах стирается — `List<String>` и `List<Integer>` становятся просто `List`. Это сделано для обратной совместимости со старым кодом.

```java
// В рантайме это одно и то же:
List<String> strings = new ArrayList<>();
List<Integer> ints = new ArrayList<>();

System.out.println(strings.getClass() == ints.getClass()); // true! Оба — ArrayList
```

## 8. Практические примеры

### Пример 1: Обобщённый стек

```java
public class Stack<T> {
    private List<T> elements = new ArrayList<>();

    public void push(T item) {
        elements.add(item);
    }

    public T pop() {
        if (elements.isEmpty()) {
            throw new EmptyStackException();
        }
        return elements.remove(elements.size() - 1);
    }

    public T peek() {
        if (elements.isEmpty()) {
            throw new EmptyStackException();
        }
        return elements.get(elements.size() - 1);
    }

    public boolean isEmpty() {
        return elements.isEmpty();
    }

    public int size() {
        return elements.size();
    }
}
```

```java
Stack<String> stack = new Stack<>();
stack.push("первый");
stack.push("второй");
System.out.println(stack.pop()); // "второй"
System.out.println(stack.pop()); // "первый"
```

### Пример 2: Обобщённый метод с ограничением

```java
public class ComparableUtils {
    // T должен уметь сравниваться с собой
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    public static <T extends Comparable<T>> List<T> sort(List<T> list) {
        List<T> result = new ArrayList<>(list);
        Collections.sort(result);
        return result;
    }
}
```

```java
System.out.println(ComparableUtils.max(10, 20));           // 20
System.out.println(ComparableUtils.max("apple", "banana")); // "banana"
```

### Пример 3: PECS в действии

```java
public class CollectionUtils {
    // Продюсер — читаем, поэтому extends
    public static <T> double sum(Collection<? extends Number> collection) {
        double total = 0;
        for (Number n : collection) {
            total += n.doubleValue();
        }
        return total;
    }

    // Консьюмер — пишем, поэтому super
    public static <T> void addAll(List<? super T> dest, Collection<T> src) {
        for (T item : src) {
            dest.add(item);
        }
    }

    // И читаем, и пишем — просто T
    public static <T> void swap(List<T> list, int i, int j) {
        T temp = list.get(i);
        list.set(i, list.get(j));
        list.set(j, temp);
    }
}
```

## 9. 🎯 Мини-задания для практики
1. **Обобщённый контейнер «Тройка»** — создай класс `Triple<A, B, C>`, который хранит три значения разных типов. Добавь геттеры и метод `toString()`.
2. **Обобщённый метод firstOrNull** — напиши метод, который принимает `List<T>` и возвращает первый элемент или `null`, если список пуст.
3. **Обобщённый метод filter** — напиши метод `<T> List<T> filter(List<T> list, Predicate<T> predicate)`, который возвращает новый список, содержащий только элементы, для которых предикат вернул true.
4. **Сумма с ограничением** — напиши метод, который принимает `Collection<? extends Number>` и возвращает сумму всех элементов в виде `double`.
5. **PECS на практике** — реализуй метод `<T> void merge(List<? super T> dest, List<? extends T> src)`, который добавляет все элементы из `src` в `dest`. Проверь, что он работает с разными типами списков.
6. **Обобщённый кэш** — создай класс `Cache<K, V>` с методами `put(K key, V value)`, `get(K key)` (возвращает V или null), `containsKey(K key)`. Внутри используй `HashMap<K, V>`.
7. **Сортируемая пара** — создай класс `Pair<T extends Comparable<T>>`, который хранит два значения типа `T` в отсортированном порядке (меньшее — `first`).

## 10. 💡 Частые ошибки новичков

|Ошибка|Как правильно|
|-|-|
|`List<Object> list = new ArrayList<String>()`|`List<?> list = new ArrayList<String>() или List<? extends Object>`|
|`box.put(5)` в `Box<Integer>` без обёртки|Используй `Integer.valueOf(5)` или автобоксинг: `box.put(Integer.valueOf(5))`|
|`new T()` или `new T[10]`|Передай `Supplier<T>` или `Class<T>`|
|`if (obj instanceof List<String>)`|Используй `instanceof List<?>`|
|Забыл `extends` в ограничении|Пиши `<T extends Comparable<T>>`, а не `<T implements Comparable<T>>`|
|Путаница `extends` и `super`|Помни PECS: Producer → extends, Consumer → super|
|Использование raw types: `List list = new ArrayList()`|Всегда параметризуй: `List<String> list = new ArrayList<>()`|
|Ожидание, что `List<Integer>` — подтип `List<Number>`|Это не так! Используй `List<? extends Number>`|

### Антипаттерн: raw types

```java
// ❌ ПЛОХО — теряется типобезопасность
List list = new ArrayList();
list.add("hello");
list.add(42);
String s = (String) list.get(1); // 💥 ClassCastException

// ✅ ХОРОШО
List<String> list = new ArrayList<>();
list.add("hello");
// list.add(42); // ❌ ОШИБКА КОМПИЛЯЦИИ
String s = list.get(0); // ✅ Без приведений
```

## 11. 📝 Что запомнить

1. Дженерики — параметры типов для классов и методов. Обеспечивают типобезопасность на этапе компиляции
2. Объявление: `<T>`, `<K, V>`, `<T extends Number>`
3. Обобщённые классы: `class Box<T> { ... }`
4. Обобщённые методы: `<T> void method(T item) { ... }`
5. Ограничения: `<T extends ClassName>` — `T` должен быть наследником
6. Wildcard ? — «какой-то тип, мы не знаем какой»
7. ? extends T — «T или наследник T» — для чтения (Producer)
8. ? super T — «T или родитель T» — для записи (Consumer)
9. PECS: Producer Extends, Consumer Super — главное правило
10. Ограничения дженериков: нельзя примитивы, `new T()`, массивы `T[]`, `static` поля типа `T`
11. Type Erasure: в рантайме информация о типах-параметрах стирается