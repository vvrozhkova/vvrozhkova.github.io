---
title: Java. Коллекции (Collections Framework)
category: java
description: Интерфейсы List, Set, Map; Понимание, чем ArrayList отличается от LinkedList, HashSet от TreeSet, HashMap от TreeMap. Как они работают "под капотом".
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

Коллекции — это «контейнеры» для хранения групп объектов. Java предоставляет мощную иерархию интерфейсов и реализаций, и понимание, когда что использовать, — ключевой навык разработчика.

## 1. Что такое Collections Framework

**Collections Framework** — это унифицированная архитектура для хранения и манипуляции группами объектов. Она включает:

- **Интерфейсы** — «контракты», описывающие, что коллекция умеет делать (List, Set, Map, Queue)
- **Реализации** — конкретные классы (ArrayList, LinkedList, HashSet, HashMap и т.д.)
- **Алгоритмы** — утилитарные методы для работы с коллекциями (Collections.sort(), Collections.reverse() и т.д.)

### Иерархия коллекций (упрощённо)

```
                    Iterable
                        |
                    Collection
                   /          \
                List          Set          Map (отдельно, не наследник Collection!)
               /    \        /    \
        ArrayList  LinkedList HashSet  TreeSet
```

## 2. Интерфейс List — упорядоченная коллекция

**List** — это упорядоченный список элементов. Элементы хранятся в том порядке, в котором их добавили. Допускаются дубликаты и null.

### Основные методы

```java
List<String> list = new ArrayList<>();

// Добавление
list.add("Вика");              // добавить в конец
list.add(0, "Аня");            // вставить на позицию 0
list.addAll(List.of("Маша", "Катя")); // добавить все из другой коллекции

// Доступ по индексу
String first = list.get(0);    // "Аня"
list.set(1, "Виктория");       // заменить элемент на индексе 1

// Поиск
int index = list.indexOf("Маша"); // 2 (или -1, если нет)
boolean contains = list.contains("Катя"); // true

// Удаление
list.remove("Маша");           // удалить по значению (первое вхождение)
list.remove(0);                // удалить по индексу

// Размер
int size = list.size();        // количество элементов

// Перебор
for (String item : list) {
    System.out.println(item);
}

// Или через Stream API
list.stream().forEach(System.out::println);
```

### Реализации List

|Реализация|Структура данных|Доступ по индексу|Вставка/удаление|Память|Когда использовать|
|-|-|-|-|-|-|
|ArrayList|Динамический массив|✅ Быстро O(1)|❌ Медленно O(n) в середине|Экономная|Чтение > запись|
|LinkedList|Двусвязный список|❌ Медленно O(n)|✅ Быстро O(1) если есть ссылка|Больше (хранит ссылки)|Частые вставки/удаления|
|Vector|Как ArrayList, но синхронизированный|✅ O(1)|❌ O(n)|Экономная|Устарел, не используй|

## 3. ArrayList vs LinkedList — под капотом

### ArrayList — динамический массив

#### Как устроен:

- Внутри — обычный массив `Object[]`
- При создании можно указать начальный размер (по умолчанию 10)
- Когда массив заполняется, создаётся **новый массив размером × 1.5** (или × 2 в старых версиях), и все элементы копируются

```java
// Упрощённо внутри ArrayList:
private Object[] elementData;
private int size;

public boolean add(E e) {
    ensureCapacityInternal(size + 1); // проверяем, хватает ли места
    elementData[size++] = e;
    return true;
}

private void grow(int minCapacity) {
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1); // × 1.5
    elementData = Arrays.copyOf(elementData, newCapacity); // копируем всё!
}
```

#### Плюсы:

- ✅ Быстрый доступ по индексу: get(i) — O(1)
- ✅ Эффективное использование памяти (нет лишних ссылок)
- ✅ Хорошая локальность данных в памяти (кеш-дружелюбно)

#### Минусы:

- ❌ Медленная вставка/удаление в середине: нужно сдвигать все элементы — O(n)
- ❌ Перераспределение массива при росте — дорогая операция

#### Когда использовать:
- В 90% случаев — это твой выбор по умолчанию
- Когда нужно часто читать по индексу
- Когда вставка/удаление происходит в основном в конце

### LinkedList — двусвязный список

#### Как устроен:

Каждый элемент — это **узел (Node)**, который хранит:
- Значение
- Ссылку на предыдущий узел
- Ссылку на следующий узел

```java
// Упрощённо внутри LinkedList:
private static class Node<E> {
    E item;
    Node<E> next;
    Node<E> prev;

    Node(Node<E> prev, E element, Node<E> next) {
        this.prev = prev;
        this.item = element;
        this.next = next;
    }
}

private Node<E> first;
private Node<E> last;
private int size;
```

#### Плюсы:

- ✅ Быстрая вставка/удаление в начале и конце: O(1)
- ✅ Быстрая вставка/удаление в середине, если есть ссылка на узел: O(1)
- ✅ Не нужно перераспределять память

#### Минусы:

- ❌ Медленный доступ по индексу: нужно пройти по списку — O(n)
- ❌ Больше памяти (каждый элемент хранит 2 дополнительные ссылки)
- ❌ Плохая локальность данных (узлы разбросаны по памяти)

#### Когда использовать:

- Когда нужны частые вставки/удаления в начале или конце списка
- Когда реализуешь очереди, стеки, дек
- В остальных случаях — лучше ArrayList

### Сравнение производительности

|Операция|ArrayList|LinkedList|
|-|-|-|
|get(i)|O(1) ✅|O(n) ❌|
|add(element) в конец|O(1) амортизированно|O(1) ✅|
|add(i, element) в начало|O(n) ❌|O(1) ✅|
|add(i, element) в середину|O(n) ❌|O(n) (но быстрее, если есть ссылка)|
|remove(i)|O(n) ❌|O(n) (но быстрее, если есть ссылка)|
|contains(element)|O(n)|O(n)|
|Память|Экономная|Больше на ~30-40%|

> 💡 Правило большого пальца: если сомневаешься — используй ArrayList. LinkedList имеет смысл только в специфических случаях.

## 4. Интерфейс Set — уникальные элементы

Set — это коллекция уникальных элементов. Не допускает дубликатов. Порядок элементов зависит от реализации.

### Основные методы

```java
Set<String> set = new HashSet<>();

// Добавление
set.add("Вика");
set.add("Аня");
set.add("Вика"); // не добавится — уже есть!

// Проверка наличия
boolean contains = set.contains("Вика"); // true

// Удаление
set.remove("Аня");

// Размер
int size = set.size(); // 1

// Перебор
for (String item : set) {
    System.out.println(item);
}
```

### Реализации Set

|Реализация|Структура данных|Порядок|Производительность|Когда использовать|
|-|-|-|-|-|
|HashSet|Хеш-таблица HashMap)|❌ Нет порядка|✅ Быстро O(1)|Уникальность, быстрый поиск|
|LinkedHashSet|Хеш-таблица + связный список|✅ Порядок вставки|✅ Быстро O(1)|Уникальность + сохранение порядка|
|TreeSet|Красно-чёрное дерево|✅ Сортировка|⚠️ Медленнее O(log n)|Уникальность + сортировка|

## 5. HashSet vs TreeSet — под капотом

### HashSet — на основе хеш-таблицы

#### Как устроен:
- Внутри — `HashMap<E, Object>` (где все значения — одна и та же заглушка PRESENT)
- Каждый элемент помещается в «корзину» (bucket) на основе его хеш-кода

```java
// Упрощённо:
public boolean add(E e) {
    return map.put(e, PRESENT) == null; // PRESENT — просто заглушка
}
```

#### Как работает добавление:
1. Вычисляется hashCode() элемента
2. На основе хеш-кода определяется индекс корзины: index = hash % capacity
3. Если корзина пуста — элемент добавляется
4. Если корзина занята (коллизия):
- Проверяется equals() — если элемент уже есть, не добавляется
- Если элемент новый — добавляется в связанный список (или дерево, если коллизий много)

#### Плюсы:
- ✅ Очень быстрое добавление/поиск/удаление: O(1) в среднем
- ✅ Простая реализация

#### Минусы:
- ❌ Нет порядка элементов
- ❌ Зависит от качества hashCode() и equals()

#### Требования к элементам:
- Класс должен переопределять `hashCode()` и `equals()`
- Если `a.equals(b)`, то `a.hashCode()` == `b.hashCode()` — обязательно!

```java
public class Person {
    private String name;
    private int age;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}

Set<Person> people = new HashSet<>();
people.add(new Person("Вика", 25));
people.add(new Person("Вика", 25)); // не добавится — equals вернёт true
```

### TreeSet — на основе красно-чёрного дерева

#### Как устроен:

- Внутри — `TreeMap<E, Object>`(снова заглушка PRESENT)
- Элементы хранятся в отсортированном виде в виде сбалансированного бинарного дерева

```java
// Упрощённо:
public boolean add(E e) {
    return m.put(e, PRESENT) == null;
}
```

#### Как работает добавление:

1. Элемент сравнивается с корнем дерева
2. Если меньше — идёт в левое поддерево, если больше — в правое
3. Повторяется рекурсивно, пока не найдётся место
4. После вставки дерево балансируется (повороты), чтобы высота оставалась O(log n)

#### Плюсы:
- ✅ Элементы всегда отсортированы
- ✅ Быстрый поиск минимума/максимума: O(log n)
- ✅ Можно искать элементы в диапазоне: subSet(), headSet(), tailSet()

#### Минусы:
- ❌ Медленнее, чем HashSet: O(log n) вместо O(1)
- ❌ Требует, чтобы элементы были сравнимы (реализовывали Comparable или был передан Comparator)

#### Требования к элементам:

- Либо класс реализует `Comparable<T>`
- Либо при создании `TreeSet` передан `Comparator`

```java
// Вариант 1: Comparable
public class Person implements Comparable<Person> {
    private String name;
    private int age;

    @Override
    public int compareTo(Person other) {
        return Integer.compare(this.age, other.age); // сортировка по возрасту
    }
}

Set<Person> people = new TreeSet<>();

// Вариант 2: Comparator
Set<Person> people2 = new TreeSet<>(
    Comparator.comparing(Person::getName) // сортировка по имени
);
```

### Сравнение производительности

|Операция|HashSet|TreeSet|
|-|-|-|
|add(element)|O(1) ✅|O(log n)|
|contains(element)|O(1) ✅|O(log n)|
|remove(element)|O(1) ✅|O(log n)|
|Порядок элементов|❌ Нет|✅ Сортировка|
|first(), last()|❌ Нет|✅ O(log n)|
|Диапазоны|❌ Нет|✅ subSet(), headSet(), tailSet()|
|Требования к элементам|hashCode(), equals()|Comparable или Comparator|

>💡 Правило: если не нужен порядок — используй HashSet. Если нужна сортировка — TreeSet.

## 6. Интерфейс Map — пары ключ-значение

**Map** — это коллекция пар «ключ → значение». Ключи уникальны, значения могут повторяться.

### Основные методы

```java
Map<String, Integer> ages = new HashMap<>();

// Добавление
ages.put("Вика", 25);
ages.put("Аня", 22);
ages.put("Вика", 26); // перезапишет старое значение

// Доступ
Integer age = ages.get("Вика"); // 26
Integer missing = ages.get("Борис"); // null (если ключа нет)

// С методами по умолчанию (Java 8+)
Integer ageOrDefault = ages.getOrDefault("Борис", 0); // 0, если ключа нет
ages.putIfAbsent("Катя", 30); // добавит, только если ключа нет

// Проверка
boolean hasKey = ages.containsKey("Вика"); // true
boolean hasValue = ages.containsValue(22); // true

// Удаление
ages.remove("Аня");

// Размер
int size = ages.size(); // 2

// Перебор
// По ключам
for (String key : ages.keySet()) {
    System.out.println(key + " = " + ages.get(key));
}

// По значениям
for (Integer value : ages.values()) {
    System.out.println(value);
}

// По записям (самый эффективный способ)
for (Map.Entry<String, Integer> entry : ages.entrySet()) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}

// Или через forEach (Java 8+)
ages.forEach((key, value) -> System.out.println(key + " = " + value));
```

### Реализации Map

|Реализация|Структура данных|Порядок ключей|Производительность|Когда использовать|
|-|-|-|-|-|
|HashMap|Хеш-таблица|❌ Нет порядка|✅ Быстро O(1)|Основная реализация|
|LinkedHashMap|Хеш-таблица + связный список|✅ Порядок вставки|✅ Быстро O(1)|Сохранение порядка|
|TreeMap|Красно-чёрное дерево|✅ Сортировка ключей|⚠️ Медленнее O(log n)|Сортировка по ключам|
|Hashtable|Хеш-таблица (синхронизированная)|❌ Нет порядка|✅ O(1)|Устарел, не используй|

## 7. HashMap vs TreeMap — под капотом

### HashMap — хеш-таблица

#### Как устроен:

- Массив «корзин» (buckets) — `Node<K, V>[] table`
- Каждая корзина — это связанный список (или дерево при большом количестве коллизий)

```java
// Упрощённо:
static class Node<K, V> {
    final int hash;
    final K key;
    V value;
    Node<K, V> next;
}

transient Node<K, V>[] table;
transient int size;
```

### Как работает put(key, value):

1. Вычисляется хеш ключа: hash = hash(key.hashCode())
2. Определяется индекс корзины: index = hash & (capacity - 1)
3. Если корзина пуста — создаётся новый узел
4. Если корзина занята:
 - Проходится связанный список
 - Если ключ уже есть (equals()) — значение перезаписывается
 - Если ключа нет — узел добавляется в конец списка
5. Если в корзине больше 8 элементов — список превращается в дерево (оптимизация с Java 8)
6. Если размер превышает capacity * loadFactor (по умолчанию 0.75) — ресайз (удвоение capacity)

#### Плюсы:
- ✅ Очень быстрое добавление/поиск/удаление: O(1) в среднем
- ✅ Разрешает null ключ и null значения

#### Минусы:
- ❌ Нет порядка ключей
- ❌ Зависит от качества hashCode() ключей
- ❌ Не синхронизирован (нужна синхронизация для многопоточности)

### Требования к ключам:
- Ключи должны переопределять hashCode() и equals()
- Ключи должны быть неизменяемыми (immutable) — иначе после изменения хеш-код изменится, и ключ «потеряется»

```java
// ✅ Правильно: используем String, Integer — они immutable
Map<String, Integer> map = new HashMap<>();

// ❌ Опасно: StringBuilder — mutable
Map<StringBuilder, Integer> badMap = new HashMap<>();
StringBuilder key = new StringBuilder("key");
badMap.put(key, 1);
key.append("2"); // изменили ключ!
System.out.println(badMap.get(key)); // null — ключ «потерялся»!
```

### TreeMap — красно-чёрное дерево

#### Как устроен:
- Внутри — сбалансированное бинарное дерево поиска (красно-чёрное дерево)
- Каждый узел хранит: ключ, значение, цвет (красный/чёрный), ссылки на потомков

```java
// Упрощённо:
static final class Entry<K, V> {
    K key;
    V value;
    Entry<K, V> left;
    Entry<K, V> right;
    Entry<K, V> parent;
    boolean color = BLACK;
}

private transient Entry<K, V> root;
```

### Как работает put(key, value):

1. Ключ сравнивается с корнем дерева (через compareTo() или Comparator)
2. Если меньше — идёт в левое поддерево, если больше — в правое
3. Повторяется рекурсивно, пока не найдётся место
4. Узел вставляется
5. Дерево **балансируется** (повороты и перекрашивания), чтобы высота оставалась O(log n)

#### Плюсы:

- ✅ Ключи всегда отсортированы
- ✅ Быстрый поиск минимума/максимума: O(log n)
- ✅ Можно искать диапазоны: subMap(), headMap(), tailMap()

#### Минусы:

- ❌ Медленнее, чем HashMap: O(log n) вместо O(1)
- ❌ Требует, чтобы ключи были сравнимы

#### Требования к ключам:
- Либо ключи реализуют `Comparable<K>`
- Либо при создании `TreeMap` передан `Comparator<K>`
- Ключи не могут быть `null` (в отличие от `HashMap`)

```java
// Вариант 1: Comparable
Map<String, Integer> map1 = new TreeMap<>(); // String implements Comparable

// Вариант 2: Comparator
Map<String, Integer> map2 = new TreeMap<>(Comparator.reverseOrder()); // обратный порядок
```

### Сравнение производительности
|Операция|HashMap|TreeMap|
|-|-|-|
|put(key, value)|O(1) ✅|O(log n)|
|get(key)|O(1) ✅|O(log n)|
|remove(key)|O(1) ✅|O(log n)|
|containsKey(key)|O(1) ✅|O(log n)|
|Порядок ключей|❌ Нет|✅ Сортировка|
|firstKey(), lastKey()|❌ Нет|✅ O(log n)|
|Диапазоны|❌ Нет|✅ subMap(), headMap(), tailMap()|
|null ключ|✅ Да|❌ Нет|
|Требования к ключам|hashCode(), equals()|Comparable или Comparator|

>💡 Правило: если не нужен порядок — используй HashMap. Если нужна сортировка по ключам — TreeMap.

## 8. Интерфейс Queue — очередь

**Queue** — коллекция для хранения элементов в порядке FIFO (First In, First Out) — «первым вошёл, первым вышел».

### Основные методы

```java
Queue<String> queue = new LinkedList<>();

// Добавление в конец
queue.offer("первый");
queue.offer("второй");
queue.offer("третий");

// Извлечение из начала
String first = queue.poll(); // "первый" (и удаляет из очереди)
String head = queue.peek();  // "второй" (не удаляет)

// Размер
int size = queue.size(); // 2
```

### Реализации Queue

|Реализация|Описание|Когда использовать|
|-|-|-|
|LinkedList|Двусвязный список|Обычная очередь|
|PriorityQueue|Очередь с приоритетом (на основе кучи)|Когда нужен приоритет|
|ArrayDeque|Двухсторонняя очередь на массиве|Быстрее, чем LinkedList|

### PriorityQueue — очередь с приоритетом

Элементы извлекаются не в порядке добавления, а в порядке приоритета (по умолчанию — натуральный порядок).

```java
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(5);
pq.offer(1);
pq.offer(3);

System.out.println(pq.poll()); // 1 (наименьший)
System.out.println(pq.poll()); // 3
System.out.println(pq.poll()); // 5

// Свой компаратор — обратный порядок
PriorityQueue<Integer> reversePq = new PriorityQueue<>(Comparator.reverseOrder());
reversePq.offer(5);
reversePq.offer(1);
reversePq.offer(3);

System.out.println(reversePq.poll()); // 5 (наибольший)
```

## 9. Утилитарный класс Collections

Класс `Collections` содержит статические методы для работы с коллекциями:

```java
List<Integer> list = new ArrayList<>(List.of(5, 2, 8, 1, 9));

// Сортировка
Collections.sort(list); // [1, 2, 5, 8, 9]
Collections.sort(list, Comparator.reverseOrder()); // [9, 8, 5, 2, 1]

// Перемешивание
Collections.shuffle(list);

// Поиск
int index = Collections.binarySearch(list, 5); // бинарный поиск (список должен быть отсортирован!)

// Минимум/максимум
int min = Collections.min(list);
int max = Collections.max(list);

// Частота
int count = Collections.frequency(list, 5); // сколько раз встречается 5

// Неизменяемые коллекции
List<Integer> immutable = Collections.unmodifiableList(list);
// immutable.add(10); // 💥 UnsupportedOperationException

// Синхронизированные коллекции (для многопоточности)
List<Integer> syncList = Collections.synchronizedList(list);

// Заполнение
Collections.fill(list, 0); // все элементы станут 0

// Копирование
Collections.copy(destList, srcList);

// Замена всех вхождений
Collections.replaceAll(list, 5, 99); // все 5 заменятся на 99
```

## 10. Неизменяемые коллекции (Java 9+)

Современный способ создания неизменяемых коллекций:

```java
// Java 9+
List<String> list = List.of("a", "b", "c");
Set<String> set = Set.of("x", "y", "z");
Map<String, Integer> map = Map.of("one", 1, "two", 2);

// list.add("d"); // 💥 UnsupportedOperationException

// Java 10+ — копии существующих коллекций
List<String> copy = List.copyOf(originalList);
Set<String> copySet = Set.copyOf(originalSet);
Map<String, Integer> copyMap = Map.copyOf(originalMap);
```

## 11. Практические примеры

### Пример 1: Подсчёт частоты слов

```java
public class WordCounter {
    public static void main(String[] args) {
        String text = "Java is great. Java is powerful. Java is fast.";
        
        // Разбиваем на слова
        String[] words = text.toLowerCase().split("[\\s.]+");
        
        // Считаем частоту
        Map<String, Integer> frequency = new HashMap<>();
        for (String word : words) {
            frequency.put(word, frequency.getOrDefault(word, 0) + 1);
        }
        
        // Выводим результат
        frequency.forEach((word, count) -> 
            System.out.println(word + ": " + count)
        );
        
        // Находим самое частое слово
        String mostFrequent = Collections.max(
            frequency.entrySet(),
            Map.Entry.comparingByValue()
        ).getKey();
        
        System.out.println("Самое частое: " + mostFrequent); // "java"
    }
}
```

### Пример 2: Удаление дубликатов с сохранением порядка

```java
public class UniqueList {
    public static <T> List<T> removeDuplicates(List<T> list) {
        Set<T> seen = new LinkedHashSet<>(list); // сохраняет порядок вставки
        return new ArrayList<>(seen);
    }

    public static void main(String[] args) {
        List<String> names = List.of("Вика", "Аня", "Вика", "Маша", "Аня");
        List<String> unique = removeDuplicates(names);
        System.out.println(unique); // [Вика, Аня, Маша]
    }
}
```

### Пример 3: Сортировка объектов по нескольким полям

```java
public class Person implements Comparable<Person> {
    private String name;
    private int age;
    private double salary;

    // конструктор, геттеры...

    @Override
    public int compareTo(Person other) {
        // Сначала по возрасту, потом по зарплате, потом по имени
        int ageCompare = Integer.compare(this.age, other.age);
        if (ageCompare != 0) return ageCompare;
        
        int salaryCompare = Double.compare(this.salary, other.salary);
        if (salaryCompare != 0) return salaryCompare;
        
        return this.name.compareTo(other.name);
    }
}

List<Person> people = List.of(
    new Person("Вика", 25, 100000),
    new Person("Аня", 22, 80000),
    new Person("Маша", 25, 120000)
);

Collections.sort(people);
// Или через Stream API:
people.stream()
    .sorted(Comparator.comparing(Person::getAge)
        .thenComparing(Person::getSalary)
        .thenComparing(Person::getName))
    .forEach(System.out::println);
```

### Пример 4: Группировка элементов

```java
public class Grouping {
    public static void main(String[] args) {
        List<String> words = List.of("apple", "banana", "apricot", "blueberry", "cherry");

        // Группируем по первой букве
        Map<Character, List<String>> grouped = new HashMap<>();
        for (String word : words) {
            char firstLetter = word.charAt(0);
            grouped.computeIfAbsent(firstLetter, k -> new ArrayList<>()).add(word);
        }

        grouped.forEach((letter, list) -> 
            System.out.println(letter + ": " + list)
        );
        // a: [apple, apricot]
        // b: [banana, blueberry]
        // c: [cherry]
    }
}
```

## 12. 🎯 Мини-задания для практики

1. Уникальные числа — дан список чисел. Найди все уникальные числа, которые встречаются ровно один раз. Используй Map для подсчёта частот.
2. Сортировка строк — дан список строк. Отсортируй их по длине (от коротких к длинным), а если длина одинаковая — по алфавиту.
3. Пересечение множеств — даны два `Set<Integer>`. Найди их пересечение (элементы, которые есть в обоих множествах).
4. Инвертирование Map — дан `Map<String, Integer>`. Создай новый `Map<Integer, String>`, где ключи и значения поменялись местами. Учти, что значения могут повторяться.
5. Очередь задач — реализуй систему управления задачами с приоритетами. Задачи имеют название и приоритет (1-10). Используй `PriorityQueue`. Методы: `addTask(String, int)`, `getNextTask()`, `getHighPriorityTasks()`.
6. Кэш LRU — реализуй простой кэш с ограниченным размером, используя LinkedHashMap. При превышении размера удаляй самый старый элемент.
7. Анализ текста — дан текст. Найди:
- Все уникальные слова (используй `Set`)
- Частоту каждого слова (используй `Map`)
- Топ-5 самых частых слов
- Самое длинное слово

## 13. 💡 Частые ошибки новичков

|Ошибка|Как правильно|
|-|-|
|`List<String> list = new ArrayList();` (raw type)|`List<String> list = new ArrayList<>();`|
|Изменение коллекции во время итерации|Используй Iterator.remove() или removeIf()|
|ArrayList для частых вставок в начало|Используй LinkedList или ArrayDeque|
|HashSet без hashCode() и equals()|Всегда переопределяй оба метода|
|TreeSet без Comparable или Comparator|Реализуй Comparable или передай Comparator|
|HashMap с mutable ключами|Используй immutable ключи (String, Integer)|
|`Collections.sort(list)` для LinkedList|Используй `list.sort(comparator)`|
|Забыл про null в коллекциях|Проверяй на null или используй Optional|
|`list.remove(5)` — удаление по индексу, а не по значению|Для удаления по значению: `list.remove(Integer.valueOf(5))`|

### Антипаттерн: изменение коллекции во время итерации

```java
// ❌ ПЛОХО — ConcurrentModificationException
List<String> list = new ArrayList<>(List.of("a", "b", "c"));
for (String s : list) {
    if (s.equals("b")) {
        list.remove(s); // 💥 ОШИБКА!
    }
}

// ✅ ХОРОШО — через Iterator
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    String s = it.next();
    if (s.equals("b")) {
        it.remove(); // ✅ OK
    }
}

// ✅ ЕЩЁ ЛУЧШЕ — через removeIf (Java 8+)
list.removeIf(s -> s.equals("b"));
```

## 14. 📝 Что запомнить

1. List — упорядоченный список, допускает дубликаты
- ArrayList — динамический массив, быстрый доступ O(1)
- LinkedList — двусвязный список, быстрая вставка/удаление O(1)
2. Set — уникальные элементы
- HashSet — хеш-таблица, быстро O(1), нет порядка
- LinkedHashSet — хеш-таблица + список, сохраняет порядок вставки
- TreeSet — дерево, сортировка, медленнее O(log n)
3. Map — пары ключ-значение
- HashMap — хеш-таблица, быстро O(1), нет порядка
- LinkedHashMap — сохраняет порядок вставки
- TreeMap — дерево, сортировка по ключам, медленнее O(log n)
4. Queue — очередь FIFO
- PriorityQueue — очередь с приоритетом
5. PECS для коллекций: Producer Extends, Consumer Super
6. Требования к элементам:
- HashSet/HashMap: hashCode() + equals()
- TreeSet/TreeMap: Comparable или Comparator
7. Неизменяемые коллекции: List.of(), Set.of(), Map.of() (Java 9+)
8. Правило большого пальца: если сомневаешься — используй ArrayList и HashMap

## Вопросы на собеседованиях

### 1) Почему доступ по элементу в массиве происходит за O(1)?

Это вопрос буквально с последнего собеседования. Как я узнал позже, это вопрос задается для того, чтобы увидеть, как человек мыслит. Ясно, что практического смысла в этих знаниях немного: хватает только лишь знания этого факта.

Для начала нужно уточнить, что O(1) — это обозначение временной сложности алгоритма, когда операция проходит за константное время. То есть это обозначение самого быстрого выполнения.

Чтобы ответить на этот вопрос, нужно понять, что мы знаем о массивах?

Чтоб создать массив int, мы должны написать следующее:

`int[] intArray = new int[100];`

Из этой записи можно сделать несколько выводов:
При создании массива известен его тип.Если известен тип, то понятно, какого размера будет каждая ячейка массива.
Известно, какого размера будет массив.
Из этого следует: чтобы понять, в какую ячейку записать, нужно просто вычислить, в какую область памяти записать.

Для машины это проще простого. У машины есть начало выделенной памяти, количество элементов и размер одной ячейки.

Из этого понятно, что место для записи будет равно начальному месту массива + размер ячейки, умноженный на ее размер.
А как получается О(1) в доступе к объектам в ArrayList?
Это вопрос сразу же идет за предыдущим. Ведь правда, когда мы работаем с массивом и там примитивы, то нам известно заранее, какой размер этого типа, при его создании.

А что делать, если есть такая схема, как на картинке:
Топ-50 Java Core вопросов и ответов на собеседовании. Часть 1 - 8и мы хотим создать коллекцию с элементами, у которых тип A, и добавить разные реализации — B, C, D:

```java
List<A> list = new ArrayList();
list.add(new B());
list.add(new C());
list.add(new D());
list.add(new B());
```

Как в этой ситуации понять, какой будет размер у каждой ячейки, ведь каждый объект будет разным и может иметь разные дополнительные поля (или быть полностью различными). Что делать?

Здесь вопрос ставится так, чтобы запутать и сбить с толку.

Мы же знаем, что на самом деле в коллекции хранятся не объекты, а лишь ссылки на эти объекты. А у всех ссылок размер один и тот же, и он известен. Поэтому здесь работает подсчет места так же, как и в предыдущем вопросе.

### 2) Что имеется в виду под Collections в Java?

Collection — это фреймворк, который создан для сохранения и манипуляции объектами.

Используется для выполнения следующих операций:
- поиск;
- сортировка;
- манипуляция;
- добавление;
- удаление.

Все классы и интерфейсы для Collection фреймворка находятся в java.util пакете.

### 3) Какие классы и интерфейсы доступны в Collection фреймворке?

Интерфейсы:

- Collection;
- List;
- Set;
- Map;
- Sorted Set;
- Sorted Map;
- Queue.

Классы:

- Lists:
    a. ArrayList;
    b. LinkedList;
    c. Vector(deprecated).
- Sets:
    a. HashSet;
    b. LinkedHashSet;
    c. TreeSet.
- Maps:
    a. HashMap
    b. TreeMap
    c. HashTable (deprecated)
    d. LinkedHashMap
- Queue
    a. Priority Queue.

### 4) Что подразумевается под sorted и ordered в коллекциях?

#### Ordered (упорядочивание):

Это означает, что элементы, которые хранятся в коллекции, основаны на значениях, добавленных в коллекцию. 

Таким образом, мы можем перебирать значения из коллекции в определенном порядке. Другими словами это значит, что у элементов коллекции есть свой специфический порядок, согласно которому они расположены.

Для лучшего понимания, коллекция, которая не упорядочена (ordered), хранит элементы в произвольном порядке. Например, Set.

#### Sorted (отсортированный):

Это значит, что группа элементов отсортирована в коллекции на основе данных элемента коллекции. То есть не только коллекция упорядочена (ordered), но еще и порядок элементов зависит от их значений. Этот порядок может меняться, если отсортировать по другому значению элемента.

### 5) Какие есть коллекции с List интерфейсом? Как происходит работа с List?

Значения элементов в лист базируются на их индексе — они упорядочены по индексу. Повторения элементов разрешены (то есть можно добавить один и тот же объект в коллекцию несколько раз, и это будет нормально).

#### ArrayList:

Самая распространенная коллекция. По сути, это массив с динамически расширяемым размером. Работа по управлению размером массива лежит на коллекции.

Для нас важно понять, что в большинстве случаев это то, что нам нужно использовать. 

Особенности:
- быстрый перебор и быстрый поиск по индексу;
- коллекция упорядочена по индексу, но не сортирована;
- реализует RandomAccess интерфейс;
- медленное добавление в середину списка.

Пример:

```java
public class A {

   public static void main(String[] args) {
       ArrayList names = new ArrayList<>();
       names.add("John");
       names.add("John");
       names.add("Roman");
       names.add("Ivan");
   }

}
```
```
>> output
[John, John, Roman, Ivan]
```

В выводе видно, что это повторяемые элементы. Они выведены в порядке, в котором их записали.

#### Linked List:
Это коллекция, в которой каждый элемент имеет ссылку на предыдущий и следующий элементы. По этим ссылкам можно переходить от одного элемента к другому.

При добавлении элемента просто меняются ссылки на предыдущий и следующий элементы:
![](https://cdn.javarush.com/images/article/1bb1695e-b343-451c-81d1-383ab9c6d203/256.webp)

- элементы связаны друг с другом, то есть реализован двусвязный список;
- общая скорость работы заметно ниже, чем в ArrayList;
- отличный выбор для большого количества вставок и удалений в середину массива;
- реализует интерфейсы списков Queue и Deque, поэтому и имеет их методы для работы.

Пример:
```java
LinkedList<String> linkedList = new LinkedList<>();
linkedList.add("One");
linkedList.add("Two");
linkedList.add("Three");
```

### 6) Расскажите о коллекции Map и ее реализациях?

Map — это коллекция ключ-значение (key-value). Есть уникальный ключ и значение, которое соответствует этому значению. Используется equals() и hashcode() методы для определения уникальности ключа.

#### HashMap:
- не отсортирован и не упорядочен;
- используют если не важны порядок и сортировка;
- поддерживает null ключ.

Пример:

```java
public class CollectionExample {

   public static void main(String[] args) {
       HashMap positions = new HashMap<>();
       positions.put("junior", "Ivan");
       positions.put("middle", "Roman");
       positions.put("senior", "Vasily");
       positions.put("team lead", "Anton");
       positions.put("arthitect", "Andrew");
       positions.put("senior", "John");
       System.out.println(positions);
   }
}

// вывод в консоль
// {junior=Ivan, middle=Roman, senior=John, team lead=Anton, arthitect=Andrew}
```

Ключи всегда уникальны, поэтому записан только один senior.

#### LinkedHashMap:

- поддерживает порядок вставки;
- медленнее, чем HashMap;
- ожидается, что итерация быстрее, чем в HashMap.

Пример:

```java
public class CollectionExample {

   public static void main(String[] args) {
       LinkedHashMap<String, String> positions = new LinkedHashMap<>();
       positions.put("junior", "Ivan");
       positions.put("middle", "Roman");
       positions.put("senior", "Vasily");
       positions.put("team lead", "Anton");
       positions.put("arthitect", "Andrew");
       positions.put("senior", "John");
       System.out.println(positions);
   }
}

// вывод в консоль
// {junior=Ivan, middle=Roman, senior=John, team lead=Anton, arthitect=Andrew}
```

#### TreeMap:

Реализация мапы, которая сохраняет записи отсортированными в соответствии с естественным порядком их ключей или, что еще лучше, с использованием компаратора, если он предоставляется в конструкторе при создании мапы.

Пример:

1. Без компаратора

```java
public class CollectionExample {

   public static void main(String[] args) {
       TreeMap<Integer, String> positions = new TreeMap<>();
       positions.put(1, "Ivan");
       positions.put(3, "Roman");
       positions.put(2, "Vasily");
       positions.put(10, "Anton");
       positions.put(7, "Andrew");
       positions.put(1, "John");
       System.out.println(positions);
   }
}

// вывод в консоль
// {1=John, 2=Vasily, 3=Roman, 7=Andrew, 10=Anton}
```

2. С компаратором

```java
public class CollectionExample {

   public static void main(String[] args) {
       //используем реализацию Strategy Pattern'a и добавим компаратор:
       TreeMap<Integer, String> positions = new TreeMap<>(Comparator.reverseOrder());
       positions.put(1, "Ivan");
       positions.put(3, "Roman");
       positions.put(2, "Vasily");
       positions.put(10, "Anton");
       positions.put(7, "Andrew");
       positions.put(1, "John");
       System.out.println(positions);
   }
}

// вывод в консоль
// {10=Anton, 7=Andrew, 3=Roman, 2=Vasily, 1=John}
```

Видим, что стандартно реализована сортировка в порядке возрастания, но это можно изменить, добавив компаратор в конструктор.

### 7) Расскажите о коллекции Set и ее реализациях?

Set — это множество уникальных элементов, и это ее главная особенность. То есть Set не допускает повторения одних и тех же элементов. 

*Здесь важно, чтобы у объектов, которые добавляются, был реализован метод `equals`. *

#### HashSet:

- не отсортирован и не упорядочен. Под капотом там HashMap с заглушкой для значения. Посмотрите сами ;)
- использует hashCode для добавления объектов;
- стоит использовать, когда нужно иметь уникальные объекты и их порядок не важен.

Пример:

```java
public class CollectionExample {

   public static void main(String[] args) {
       HashSet<String> positions = new HashSet<>();
       positions.add("junior");
       positions.add("junior");
       positions.add("middle");
       positions.add("senior");
       positions.add("team lead");
       positions.add("architect");
       System.out.println(positions);
   }
}

// вывод в консоль
// [senior, middle, team lead, architect, junior]
```

Здесь видно, что элемент “junior”, который дважды добавлен, присутствует только в единичном экземпляре. И порядок не такой же, как при добавлении.

#### LinkedHashSet:

- упорядоченная версия HashSet;
- поддерживает двусвязный список для всех элементов;
- использовать его, когда требуется упорядоченность при итерации.

Пример:

```java
public class CollectionExample {

   public static void main(String[] args) {
       LinkedHashSet<String> positions = new LinkedHashSet<>();
       positions.add("junior");
       positions.add("junior");
       positions.add("middle");
       positions.add("senior");
       positions.add("team lead");
       positions.add("architect");
       System.out.println(positions);
   }
}

// вывод в консоль
// [senior, middle, team lead, architect, junior]
```

#### TreeSet:

- одна из двух сортированных коллекций;
- использует структуру красно-черного дерева и гарантирует, что элементы будут в возрастающем порядке;
- под капотом это TreeMap с заглушкой на значениях. А элементами TreeSet являются ключи к TreeMap (также посмотрите ;)).

Пример:

```java
public class CollectionExample {

   public static void main(String[] args) {
       TreeSet<String> positions = new TreeSet<>();
       positions.add("junior");
       positions.add("junior");
       positions.add("middle");
       positions.add("senior");
       positions.add("team lead");
       positions.add("architect");
       System.out.println(positions);
   }
}

// вывод в консоль
// [architect, junior, middle, senior, team lead]
```

### 8) Расскажите про итераторы и их применение
Коллекции — одна из самых любимых тем на любом собеседовании Java-разработчика, и рассказывая об иерархии коллекций кандидаты часто говорят, что она начинается с интерфейса `Collection`. Но это не так, ведь над этим интерфейсом есть ещё один — `Iterable`.
 
Данный интерфейс представляет метод `iterator()`, который позволяет вызывать объект `Iterator` для текущей коллекции.
 
И что же такое этот объект `Iterator`? 
 
`Iterator` — это объект предоставляющий возможность двигаться по коллекции и перебирать элементы, причем пользователю не нужно знать реализацию конкретной коллекции.  
 
То есть, это некоторый указатель на элементы коллекции, который как бы смотрит на определенное место в ней.
 
У итератора есть такие методы:
- `hasNext()` — возвращает true, если есть элемент, расположенный после указателя (данный метод позволяет узнать, достигнут ли конец коллекции);
- `next()` — возвращает следующий элемент после указателя. Если такового не будет, выбрасывается NoSuchElementException. То есть перед использованием этого метода лучше убедиться в том, что элемент есть — с помощью hasNext();
- `remove()` — удаляет из коллекции последний полученный элемент методом `next()`. Если же `next()` до вызова `remove()` ни разу не вызывали, будет брошено исключение — **IllegalStateException**;
- `forEachRemaining(<Consumer>)` — выполняет переданное действие с каждым элементом коллекции (метод появился с Java 8).

Вот небольшой пример прохода по списку и удаления всех его элементов с помощью рассмотренных методов итератора:
 ```java
List<String> list = new ArrayList<>();
list.add("Hello ");
list.add("World, ");
list.add("It's ");
list.add("Amigo!");
Iterator iterator = list.iterator();

while(iterator.hasNext()) {
   iterator.next();
   iterator.remove();
}
System.out.println(list.size());
```
 В консоли будет выведено:
```
0
```
А это значит, что удаление элементов прошло успешно. Получив итератор, можно было бы воспользоваться методом для вывода всех элементов на экран:

`iterator.forEachRemaining(x -> System.out.print(x));`

Но после этого итератор стал бы непригоден для дальнейшего использования, так как он обошел бы весь список, а методов для обратного перебора у обычного итератора нет.
 
Тут мы плавно подходим к `LinkedList`, а именно — к его методу `listIterator()`, который возвращает модернизированный вид итератора — `ListIterator`.
 
Помимо методов обычного (стандартного) итератора, у этого есть дополнительные:

- `add(<Element>)` — вставляет новый элемент в список;
- `hasPrevious()`— возвращает true, если есть элемент, расположенный перед указателем (есть ли предыдущий элемент);
- `nextIndex()` — возвращает индекс в списке следующего элемента после указателя;
- `previous()` — возвращает предыдущий элемент (до указателя);
- `previousIndex()` — возвращает индекс предыдущего элемента;
- `set(<Element>)` — заменяет последний элемент, возвращенный методами next() или previous().

Как видим, функционал этого итератора гораздо интереснее: он позволяет ходить в обе стороны и развязывает руки в работе с элементами.
 
Также когда говорят об итераторах иногда подразумевают сам паттерн. 

### 9) Какая иерархия коллекций в Java Collection Framework?

Существует две иерархии коллекций в Java.
 
**Первая иерархия** — непосредственно иерархия Collection со следующей структурой:

![](https://cdn.javarush.com/images/article/8cc198bf-1349-45d3-9475-c19ca5d6a622/800.jpeg)

Она в свою очередь делится на следующие подколлекции:
- `Set` — интерфейс, описывающий такую структуру данных как множество, содержащее неупорядоченные уникальные (неповторяющиеся) элементы. У интерфейса есть стандартные реализации — `TreeSet`, `HashSet` и `LinkedHashSet`.
- `List` — интерфейс, описывающий структуру данных, которая хранит упорядоченную последовательность объектов. Экземпляры, которые содержатся в `List`-е, можно вставлять и удалять по их индексу в данной коллекции (аналог массива, но с динамическим изменением размера). У интерфейса есть стандартные реализации — `ArrayList`, `Vector` (считается устаревшей и фактически не используется) и `LinkedList`.
- `Queue` — интерфейс, описывающий структуру данных, хранящую элементы в виде очереди, которая следует правилу FIFO — First In First Out (первым вошел, первым вышел). У интерфейса есть такие стандартные реализации: `LinkedList` (да, он реализует и Queue тоже) и `PriotityQueue`.

**Вторая иерархия коллекций** — `Map`, которая имеет следующую структуру:

![](https://cdn.javarush.com/images/article/7a7daedd-9e51-48ba-8b52-5cc9bb393037/800.jpeg)

В этой коллекции разделений на подколлекции нет (так как сама иерархия `Map` — что-то вроде подколлекции, но лежащая отдельно).
 
Стандартные реализации `Map` — `Hashtable` (считается устаревшей), `LinkedHashMap` и `TreeMap`.
 
Собственно, когда спрашивают о `Collection`, как правило подразумевают обе иерархии.

### 10) Каково внутреннее строение ArrayList?
`ArrayList` — это аналог массива, но со способностью динамически расширяться.
 
Что это значит? 
 
Дело в том, что ArrayList работает на основе обычного массива, а именно он хранит элементы во внутреннем массиве (его размер по умолчанию — 10 ячеек). Когда внутренний массив заполняется, создается новый массив, размер которого определяется по формуле:
 
`<размерТекущегоМассива> * 3 / 2  + 1`

То есть если размер нашего массива 10, размер нового будет: 10 * 3 / 2 + 1 = 16.
 
Далее в него копируются все значения из первого (старого) массива c помощью нативного метода `System.arraycopy()`, и первый массив удаляется.

Собственно, так и реализуется динамическая расширяемость `ArrayList`.
 
Рассмотрим самые используемые методы `ArrayList`:
 
1. `add(<Elelement>)` — добавляет элемент в конец массива (в последнюю пустую ячейку), при этом сперва проверяется, есть ли место в данном массиве. Если его нет, создается новый массив, в который копируются элементы. 
 
Логарифмическая сложность данной операции — O(1).
 
Есть аналогичный метод — `add(<Index>,<Elelement>)`. Он добавляет элемент не в конец списка (массива), а в определенную ячейку с индексом, который пришёл в качестве аргумента. 
 
В таком случае логарифмическая сложность будет отличаться в зависимости от места добавления:
- если это было примерно начало списка, логарифмическая сложность будет близка к O(N), ведь придется все элементы, расположенные справа от нового, двигать на одну ячейку вправо;
- если элемент вставляется в середину — O(N/2) т.к. нам нужно сдвинуть на одну ячейку вправо только половину элементов списка.

То есть логарифмическая сложность данного метода колеблется от O(N) до O(1) в зависимости от места вставки элемента.
 
2. `set(<Index>,<Elelement>)` — записывает элемент в указанную позицию в списке. Если в той позиции уже присутствует элемент, перезаписывает его. 

Логарифмическая сложность данной операции — O(1), ведь там никаких сдвигов нет: только поиск по индексу в массиве, что, как мы помним, имеет сложность O(1), и запись элемента.
 
3. `remove(<index>)` — удаление элемента по его индексу во внутреннем массиве. При удалении элемента, который расположен не в конце списка, необходимо сдвинуть все элементы справа от него на одну ячейку влево, чтобы закрыть образовавшуюся брешь после удаления элемента. 
 
Поэтому логарифмическая сложность будет такой же, как и у `add(<Index>,<Elelement>)`, если элемент был в середине — O(N/2), — ведь нужно половину элементов сдвинуть на один влево. Соответственно, если он был в начале —- O(N). Ну и если в конце — O(1), ведь и двигать ничего не нужно.
 
### 11) Какое внутреннее строение LinkedList?
Если `ArrayList` содержит элементы во внутреннем массиве, то `LinkedList` — в виде двусвязного списка.
 
Это значит, что каждый элемент содержит ссылку на предыдущий элемент (previous) и на следующий (next). 
 
У первого элемента нет ссылки на предыдущий (он ведь первый), при этом он считается главой списка, и в LinkedList есть ссылка непосредственно на него.
 
У последнего элемента, собственно, нет следующего элемента, он является хвостом списка, и поэтому прямая ссылка на него есть в самом LinkedList. Поэтому логарифмическая сложность при доступе к главе или хвосту списка — O(1).

![](https://cdn.javarush.com/images/article/da052cec-21ce-4a02-9ea2-aaa65434bc2f/800.jpeg)

В ArrayList при увеличении списка увеличивался внутренний массив, тут же все происходит проще — при добавлении элемента просто меняются пару ссылок. 
 
Давайте рассмотрим некоторые наиболее используемые методы `LinkedlList`-а:
 
1. `add(<Elelement>)` — происходит добавление в конце списка, т.е. после последнего элемента (5) добавится ссылка на новый элемент как next. Новому элементу добавится ссылка на последний (5) как previous элемент. 
 
Логарифмическая сложность такой операции будет O(1), так как необходима всего лишь ссылка на последний элемент, а как вы помните, на хвост есть прямая ссылка с LinkedList и логарифмическая сложность доступа к нему минимальная.
 
2. `add(<Index>,<Elelement>)` — добавление элемента по индексу. 
 
При добавлении элемента, например, в середину списка, сперва перебираются элементы с головы и хвоста (с обеих сторон), пока не будет найдено нужное место. Если мы хотим вставить элемент между третьим и четвертым (на рисунке выше), то при поиске нужного места ссылка next третьего элемента будет уже указывать на новый. У нового же ссылка previous будет указывать на третий. Соответственно, ссылка четвертого элемента — previous — будет указывать уже на новый элемент, а у нового элемента ссылка next будет указывать на четвертый элемент:

![](https://cdn.javarush.com/images/article/f3439f20-903c-4b40-a329-60742504b3d5/512.jpeg)

Логарифмическая сложность данного метода будет зависеть от индекса, задаваемого новому элементу:
- если он будет близок к голове или хвосту, то будет приближаться к O(1), поскольку перебирать элементы фактически будет не нужно;
- если же близко к середине, то O(N/2) — будет происходить переборка элементов с головы и хвоста одновременно, пока не будет найден нужный элемент.

3. `set(<Index>,<Elelement>)` — записывает элемент в указанную позицию в списке. Логарифмическая сложность данной операции будет колебаться от  O(1) до O(N/2), опять же в зависимости от того, насколько близок элемент к голове, хвосту или середине.
 
4. `remove(<index>)` — удаляет элемент из списка, по сути делая так, чтобы элемент, который находится перед удаляемым (previous), ссылался на элемент, который идёт после удаляемого (next). И наоборот: чтобы элемент, который идет после удаляемого, ссылался на тот, который идёт перед удаляемым:

![](https://cdn.javarush.com/images/article/d2320bd0-75f5-4fdc-8520-064b601634af/512.jpeg)

Получился процесс, обратный добавлению по индексу (`add(<Index>,<Elelement>)`).

### 12) Каково внутреннее строение HashMap?
Пожалуй, один из самых популярных вопросов при собеседовании Java-разработчика.
 
`HashMap` v работает с парами ключ – значение. Как же они хранятся внутри самого HashMapv?
 
Внутри `HashMap` есть массив нод:

`Node<K,V>[] table`

По умолчанию размер массива — 16, и он увеличивается каждый раз в два раза по мере заполнения элементами (при достижении LOAD_FACTOR — определенного процента заполненности, по умолчанию он — 0.75).
 
Каждая из нод хранит в себе хеш ключа, ключ, значение, ссылку на следующий элемент:

![](https://cdn.javarush.com/images/article/9932ab13-5613-41f8-8bc4-e018a9b980f3/512.jpeg)

Собственно, “ссылка на следующий элемент” означает, что мы имеем дело с односвязным списком, где каждый элемент содержит ссылку на следующий.

То есть `HashMap` хранит данные в массиве односвязных списков.
 
Но сразу отмечу: когда одна ячейка массива table имеет ссылку на подобный односвязный список, состоящий из более чем одного элемента, это не есть хорошо. Такое явление называется **коллизия**.
 
Но обо всём по порядку. Давайте разберемся, как происходит сохранение новой пары через метод put.
 
Сперва берется `hachCode()` ключа. Поэтому для корректной работы `hashmap` в качестве ключей нужно брать классы, в которых данный метод переопределен.
 
Далее этот хеш код используется во внутреннем методе — `hash()` — для определения числа в пределах размера массива `table`.
 
Далее по полученному числу, идёт обращение к конкретной ячейке массива `table`.
 
Тут у нас два случая:

1. Ячейка пустая — в нее сохраняется новое значение `Node`.
2. Ячейка не пустая — сравнивается значение ключей. Если они равны, новое значение `Node` перезаписывает старое, если не равны — идёт обращение к элементу **next** (следующему), идёт сравнение уже с его ключом… И так до тех пор, пока новое значение не перезапишет некоторое старое или не достигнет конца односвязного списка и сохранится там последним элементом.

При поиске элемента по ключу (метод `get(<key>)`), вычисляется `hashCode` ключа, потом его значение в пределах массива с помощью hash(), и по полученному числу находится ячейка массива `table`, в которой уже ведется поиск путем перебора нод и сравнения ключа искомой ноды с ключом текущей.
 
Операции в Map при идеальном раскладе имеют алгоритмическую сложность O(1), ведь идёт обращение к массиву, а как вы помните, независимо от количества элементов операции у массива имеют сложность O(1).
 
Но это в идеальном случае.
 
Когда используемая ячейка массива не пустая (2) и там уже есть некоторые ноды, алгоритмическая сложность превращается в линейную O(N), ведь теперь необходимо перебрать элементы, прежде чем найдется нужное место.
 
Не могу не упомянуть вот что: начиная с Java 8, если у односвязного списка node больше 8 элементов (коллизии), он превращается в двоичное дерево. В таком случае алгоритмическая сложность будет уже не O(N), а O(log(N)) — это уже другое дело, не так ли?

### 13) Чем отличается ArrayList от LinkedList?
Это один из самых популярных вопросов наравне с вопросом о внутреннем устройстве `HashMap`. Ни одно собеседование не обходится без него, и поэтому ответ на него у вас должен “отскакивать от зубов”.
 
Помимо очевидного — разного названия — они отличаются внутренним устройством. Ранее мы разбирали внутренние устройство и `ArrayList`-а и `LinkedList`-а, поэтому вдаваться в детали их реализации я не буду.
 
Лишь напомню, что `ArrayList` реализован на основе внутреннего массива, который по надобности увеличивается по формуле:

`<размерТекущегоМассива> * 3 / 2  + 1`

В то же время `LinkedList` реализован на основе внутреннего двухсвязного списка, то есть, каждый элемент имеет ссылку на предыдущий и следующий, исключая значения, которые являются началом/концом списка.
 
Этот вопрос любят задавать в формате: “Что лучше — `ArrayList` или `LinkedList`?”, надеясь вас подловить. Ведь если вы в качестве ответа укажете на один из них, это будет неправильный ответ.
Вместо этого вам стоит уточнить, о какой конкретной ситуации идет речь — доступ по индексу или вставка в середину списка. В зависимости от ответа вы сможете объяснить свой выбор.
 
Ранее я уже описывал, как работает `ArrayList` и `LinkedList` в той или иной ситуации. Давайте подытожим это, поставив их в один ряд для сравнения:
 
### Добавление элемента (add)
1. Добавление нового элемента без указания индекса как местоположения будет происходить автоматически в конец обоих списков. В LinkedList новый элемент станет новым хвостом (происходит только перезаписывание пары ссылок — алгоритмическая сложность O(1)).

В ArrayList будет добавлен новый элемент в последнюю пустую ячейку массива — O(1).

2. Добавление элемента по индексу как правило подразумевает вставку примерно в середину списка. В `LinkedList` сперва будет вестись поиск нужного места с помощью перебора элементов с “хвоста” и “головы” — O(n/2), а после — вставка значения путем переопределения ссылок элементов, между которыми вставляется новый — O(1). Суммарная алгоритмическая сложность данного действия будет O(n/2).

`ArrayList` в данной ситуации по индексу находит элемент — O(1), и все элементы справа (включая элемент, который уже хранится по данному индексу) двигаются на одну единицу вправо (при этом возможно понадобится создание нового списка и копирование элементов в него) — O(n/2). Суммарная сложность — O(n/2).

3. Добавление элемента в начало списка в `LinkedList` будет ситуация схожая с добавлением в конец: новый элемент станет новой “головой” — O(1), в то же время когда ArrayList-у нужно будет двигать все элементы вправо — O(n).

**Итог:** в `LinkedList` алгоритмическая сложность будет колебаться от O(1) до O(n/2). То есть, чем ближе вставка к концу или началу списка, тем она быстрее. В то же время у `ArrayList` она колеблется от O(1) до O(n): чем вставка ближе к концу списка, тем она быстрее.
 
### Задание элемента (set)
 
Данная операция записывает элемент в указанную позицию в списке, перезаписывая предыдущий, если он есть. 
 
В `LinkedList` эта операция будет схожа с добавлением, т.к. самая большая сложность тут — поиск элемента. Перезапись элемента будет проходить путем перезаписывания пары ссылок, поэтому тут также алгоритмическая сложность будет колебаться от O(1) до O(n/2) в зависимости от удаленности позиции от конца или начала списка.
 
В то время в `ArrayList` для этой операции по индексу будет найдена нужная ячейка, а в нее записан новый элемент. Поиск по индексу, как и данная операция, имеет алгоритмическую сложность O(1). 
 
### Взять элемент по индексу (get)

В `LinkedList` взятие элемента будет происходить по тому же принципу, что и поиск для других операций — в зависимости от удаленности от конца или начала, т.е. от O(1) до O(n/2). 
 
В `ArrayList`, как я и сказал ранее, поиск элемента в массиве по индексу имеет сложность O(1).
 
### Удалить элемент по индексу (remove)
 
Для `LinkedList` тут тоже срабатывает его принцип действия: сперва находится элемент, а потом происходит перезаписывание ссылок — соседи элемента начинают ссылаться друг на друга, теряя ссылки на данный элемент, который впоследствии будет удален сборщиком мусора. То есть, алгоритмическая сложность всё такая же — от O(1) до O(n/2).
 
Для `ArrayList` данная операция больше схожа с операцией добавления нового элемента (add). Сперва находится искомый элемент — O(1), потом он удаляется, и все элементы, которые были справа от него перемещаются на одну единицу влево, чтобы закрыть образовавшуюся брешь. Операция удаления будет иметь ту же алгоритмическую сложность, что и операция добавления — от O(1) до O(n). Чем удаление ближе к концу списка, тем меньшая у него алгоритмическая сложность.
 
Собственно, это были все основные операции.
 
**Напоминаю:** при сравнении этих двух списков вам нужно уточнить, о какой конкретной ситуации идёт речь, и тогда уже и можно однозначно ответить на поставленный вопрос. 

## 14) Чем отличается ArrayList от HashSet?
Если `ArrayList` и `LinkedList` можно было сравнить по операциям — где кто лучше — то с `ArrayList` с `HashSet` сравнить уже не так просто, ведь это совершенно разные коллекции.
 
Можно сравнить одно сладкое блюдо с другим, но с мясным уже получится — больно уж они разные.
 
Тем не менее, я попробую привести их некоторые различия:
- `ArrayList` реализует интерфейс `List`, в то время как `HashSet` реализует интерфейс `Set`;

- В `ArrayList` возможен доступ по индексу элемента: операция get имеет алгоритмическую сложность O(1), а в HashSet необходимый элемент можно получить лишь путём перебора, а это у нас от O(1) до O(n);

- `ArrayList` допускает присутствие дубликатов элементов. В HashSet все элементы уникальны: добавить в HashSet элемент, аналог которого уже присутствует в коллекции, не получится (проверка дубликатов ведется по hashcode, отсюда и название этой коллекции);

- `ArrayList` реализован с помощью внутреннего массива, а HashSet реализован с помощью внутренней HashMap;

- `ArrayList` поддерживает порядок вставки элементов, в то время как HashSet — это неупорядоченное множество и не поддерживает порядок элементов;

- `ArrayList` допускает любое количество пустых значений (null), в HashSet можно вставить лишь одно значение null (как-никак, уникальность элементов).

## 15) Зачем в Java такое разнообразие имплементации динамического массива?

Ну, это скорее философский вопрос. Ну а зачем придумывают такое количество новых разнообразных технологий? Для удобства. Собственно, так же и с большим количеством имплементаций динамического массива. 
 
Ни одну из них нельзя назвать лучшей или идеальной. У каждой есть преимущество в какой-то конкретной ситуации. И наша задача — знать их различия, их сильные/слабые стороны: чтобы суметь в нужной ситуации использовать самую подходящую из них. 

## 16) Зачем в Java такое разнообразие имплементаций key-value storage?
Здесь ситуация такая же, как и с имплементациями динамического массива. Однозначно лучших нет: у каждой есть сильные и слабые стороны. И мы, конечно, должны по максимуму использовать сильные стороны.
 
**Пример:** в пакете concurrent, в котором есть множество многопоточных технологий, имеются свои `Concurrent` коллекции. У той же `ConcurrentHashMap` есть преимущество в безопасности многопоточной работы с данными в сравнении с обычной HashMap, но не в многопоточной среде она проигрывает в скорости работы.
 
Ну а имплементации, которые ни в одной из ситуаций не бывают сильнейшими, постепенно перестают использовать. 
 
**Пример:** `Hashtable`, которая изначально задумывалась как потокобезопасная `HashMap`, но `ConcurrentHashMap` превзошла ее при работе в многопоточной среде, и в итоге о `Hashtable` позабыли и перестали использовать.

## 17) Как отсортировать коллекцию элементов?
Первое, что нужно сказать, — класс элемента коллекции должен имплементировать интерфейс `Comparable` и его метод compareTo. Или же нужен класс, который имплементирует `Comaprator` с его методом `comparator`.
 
Оба способа указывают, каким образом нужно сравнивать объекты данного типа. При сортировке это критически важно, ведь нужно понимать принцип, по которому элементы можно сравнить.
 
В основном используется способ через имплементацию `Comparable`, реализуемый непосредственно в классе, который вы хотите сортировать. 
 
В то же время применение `Comparator`-а более редко. Скажем, вы используете класс с какой-то библиотеки, у которого нет реализации `Comparable`, но вам как-то нужно будет его сортировать. Не имея возможности изменить код данного класса (кроме как расширить его), вы можете написать реализацию `Comparator`-а, в котором укажете, по какому принципу нужно сравнивать объекты данного класса. 
 
И еще один пример. Допустим, вам нужны разные принципы сортировки объектов одного и того же типа, поэтому вы пишете несколько `Comparator`-ов которые используете в разных ситуациях.
 
Как правило, многие классы из коробки уже реализуют интерфейс `Comparable` — тот же `String`. Собственно, при их использовании вам не нужно париться, как их сравнить. Вы просто берете и используете их.
 
**Первый** и самый очевидный способ — использовать коллекцию типа `TreeSet` или `TreeMap`, которые хранят элементы в ужеотсортированном порядке, согласно компаратору класса элементов. Не забывайте, что `TreeMap` сортирует ключи, но не значения. 
 
Если вы используете имплементацию Comparator вместо Comparable, вам нужно будет передать его объект в конструктор коллекции при создании:
 
`TreeSet treeSet = new TreeSet(customComparator);`

А что если у вас коллекция другого типа? Как её отсортировать? 
 
В этом случае подходит **второй** способ утилитного класса Collections — метод sort(). Он статический, поэтому всё, что вам нужно — имя класса и метод, в который передается необходимый список.
 
Например:

`Collections.sort(someList);`

Если вы используете не `Comparable`, а реализацию `Comparator`, его нужно передать вторым параметром:
 
`Collections.sort(someList, customComparator);`

В итоге внутренний порядок элементов переданного списка изменится: он будет отсортирован согласно компаратору элементов.
 
Отмечу, что передаваемый список элементов должен быть мутабельным, т.е. изменяемым, иначе метод не сработает и будет выброшено UnsupportedOperationException.
 
В качестве **третьего** способа можно использовать Stream операцию sort, которая сортирует элементы коллекции, если используется имплементация Comparable:
 
`someList = someList.stream().sorted().collect(Collectors.toList());`

если `Comparator`:

`someList = someList.stream().sorted(customComparator).collect(Collectors.toList());`

 
**Четвертый** способ — ручная реализация сортировки, например, сортировки пузырьком или сортировки слиянием.

## 18) Какая разница между классами java.util.Collection и java.util.Collections?

`Collection` — интерфейс, который является головой в иерархии коллекций. Он представляет классы, позволяющие создавать, содержать и изменять целые группы объектов. Для этого предоставляется множество методов, вроде `add()`, `remove()`, `contains()` и других.
 
Основные интерфейсы класса `Collection`:
- `Set` — интерфейс, описывающий множество, которое содержит неупорядоченные уникальные (неповторяющиеся) элементы.

- `List` — интерфейс, описывающий структуру данных, которая хранит упорядоченную последовательность объектов. Эти объекты получают свой индекс (номер), используя который можно взаимодействовать с ними: брать, удалять, изменять, перезаписывать.

- `Queue` — интерфейс, описывающий структуру данных с хранением элементов в виде очереди, которая следует правилу — FIFO — First In First Out.
 
`Collections` — утилитный класс, предоставляющий множество всевозможных служебных методов.

Например:

- `addAll(Collection<? super T> collection, T…element)` — добавляет в `collection` переданные элементы типа `Т`.

- `сopy(List<? super T> dest, List<? extends T> src)` — копирует все элементы из списка `src` в список в `dest`.

- `emptyList()` — возвращает пустой список.

- `max(Collection<? extends T> collection, Comparator<? super T> comp)` — возвращает максимальный элемент данной коллекции в соответствии с порядком, установленным указанным компаратором.

- `unmodifiableList(List<? extends T> list)` — возвращает неизменяемое представление переданного списка.

И таких разнообразных удобных методов в `Collections` — великое множество.
С полным списком данных методов можно ознакомиться на сайте Oracle.
 
Я не зря сказал, что они удобные. Ведь они все статические. То есть, вам не нужно каждый раз создавать объект данного класса, чтобы вызвать у него необходимый метод.
 
Вам достаточно лишь прописать название класса, вызвать у него нужный метод и передать все требуемые аргументы.
 
Подводя черту, `Collection` — корневой интерфейс структуры коллекций. `Collections` —  вспомогательный класс для более удобной обработки объектов, принадлежащих типу из структуры коллекций.