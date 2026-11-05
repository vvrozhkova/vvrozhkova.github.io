---
title: Java. Многопоточность, паттерны проектирования, работа с памятью
category: java
description: ...
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

## 1. Многопоточность (Concurrency)

### Зачем нужна многопоточность?

**Поток (Thread)** — это независимая последовательность выполнения команд внутри программы. У каждого потока свой стек вызовов, но все потоки делят одну общую память (heap).

**Аналогия**

Представь кухню ресторана:

- Однопоточность — один повар готовит всё: и суп, и салат, и десерт. По очереди.
- Многопоточность — несколько поваров работают параллельно. Но если они одновременно полезут в один холодильник — будет хаос.

**Когда использовать**

- Долгие операции (загрузка файлов, сетевые запросы)
- Параллельные вычисления (обработка больших данных)
- Отзывчивый UI (чтобы интерфейс не «замерзал»)
- Серверные приложения (каждый клиент — отдельный поток)

### Создание потоков

#### Способ 1: наследование от Thread

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Привет из потока " + getName());
    }
}

// Запуск
MyThread t = new MyThread();
t.start(); // НЕ t.run() — это вызовет метод в текущем потоке!
```

#### Способ 2: реализация Runnable (предпочтительнее)

```java
public class MyTask implements Runnable {
    @Override
    public void run() {
        System.out.println("Привет из потока " + Thread.currentThread().getName());
    }
}

// Запуск
Thread t = new Thread(new MyTask());
t.start();

// Или с лямбдой:
Thread t2 = new Thread(() -> System.out.println("Лямбда-поток"));
t2.start();
```

> 💡 Почему Runnable лучше? В Java нельзя наследоваться от нескольких классов. Если твой класс уже наследует что-то — остаётся только Runnable. Плюс Runnable лучше разделяет задачу и поток.

#### Способ 3: Callable — с возвращаемым значением

```java
Callable<Integer> task = () -> {
    Thread.sleep(1000);
    return 42;
};

FutureTask<Integer> future = new FutureTask<>(task);
new Thread(future).start();

Integer result = future.get(); // блокирующий вызов — ждём результат
System.out.println(result); // 42
```

### Жизненный цикл потока

```
    NEW → RUNNABLE → RUNNING → TERMINATED
                ↑        ↓
                └── BLOCKED / WAITING / TIMED_WAITING
```

|Состояние|Описание|
|-|-|
|NEW|Поток создан, но start() не вызван|
|RUNNABLE|Готов к выполнению, ждёт процессорного времени|
|RUNNING|Выполняется (в Java не различается от RUNNABLE)|
|BLOCKED|Ждёт освобождения монитора (synchronized)|
|WAITING|Ждёт сигнала от другого потока (wait(), join())|
|TIMED_WAITING|Ждёт ограниченное время (sleep(), wait(timeout))|
|TERMINATED|Завершён|


#### Полезные методы
```java
Thread.sleep(1000);          // «уснуть» на 1 секунду
thread.join();               // ждать завершения другого потока
thread.interrupt();          // прервать поток (кооперативно)
Thread.currentThread()       // получить текущий поток
thread.setDaemon(true);      // фоновый поток (завершается с JVM)
thread.setPriority(10);      // приоритет (1-10)
```

### Проблема гонки данных (Race Condition)

Когда несколько потоков обращаются к общим данным одновременно, результат может быть непредсказуемым.

#### Классический пример

```java
public class Counter {
    private int count = 0;

    public void increment() {
        count++; // НЕ атомарная операция!
    }

    public int getCount() {
        return count;
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) counter.increment();
        });
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 10000; i++) counter.increment();
        });

        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println(counter.getCount()); // Ожидается 20000, но будет меньше!
    }
}
```

**Почему так?** Операция count++ состоит из трёх шагов:

1. Прочитать значение
2. Увеличить на 1
3. Записать обратно

Если два потока выполнят шаг 1 одновременно — один инкремент «потеряется».

### Синхронизация

#### synchronized — ключевое слово

```java
public class Counter {
    private int count = 0;

    // Синхронизированный метод — блокирует весь объект
    public synchronized void increment() {
        count++;
    }

    // Синхронизированный блок — блокирует только часть кода
    public void doSomething() {
        // код без синхронизации
        synchronized (this) {
            count++; // критическая секция
        }
        // снова без синхронизации
    }

    // Статический метод — блокирует класс (Class object)
    public static synchronized void staticMethod() {
        // ...
    }
}
```

#### Как работает synchronized?

Каждый объект в Java имеет монитор (внутреннюю блокировку). Когда поток входит в synchronized-блок, он «захватывает» монитор. Другие потоки, пытающиеся войти в блок с тем же монитором, ждут, пока монитор не освободится.

#### volatile — для видимости

```java
public class FlagExample {
    private volatile boolean running = true;

    public void stop() {
        running = false;
    }

    public void run() {
        while (running) {
            // работа
        }
    }
}
```

volatile гарантирует, что значение переменной всегда читается из главной памяти, а не из кеша потока. Но не гарантирует атомарность!

```java
volatile int count = 0;
count++; // всё ещё НЕ атомарно!
```

### Классы из java.util.concurrent

Современный Java предлагает высокоуровневые инструменты для многопоточности.

#### Atomic-классы — атомарные операции

```java
AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();     // атомарно: count + 1, вернуть новое
count.getAndIncrement();     // атомарно: вернуть старое, потом count + 1
count.compareAndSet(5, 10);  // если count == 5, установить 10

AtomicLong, AtomicBoolean, AtomicReference
```

#### ExecutorService — пулы потоков

Создавать потоки вручную — плохо. Используй пулы:

```java
// Фиксированный пул на 4 потока
ExecutorService executor = Executors.newFixedThreadPool(4);

// Отправка задач
executor.submit(() -> System.out.println("Задача 1"));
executor.submit(() -> System.out.println("Задача 2"));

Future<String> future = executor.submit(() -> {
    Thread.sleep(1000);
    return "Результат";
});

String result = future.get(); // ждать результата

// Завершение пула
executor.shutdown(); // не принимать новые задачи, доделать старые
executor.awaitTermination(10, TimeUnit.SECONDS); // ждать завершения
```

**Типы пулов:**

|Метод|Описание|
|-|-|
|newFixedThreadPool(n)|Фиксированное число потоков|
|newCachedThreadPool()|Создаёт потоки по необходимости, переиспользует старые|
|newSingleThreadExecutor()|Один поток, задачи выполняются по очереди|
|newScheduledThreadPool(n)|Для отложенных и периодических задач|

#### CompletableFuture — асинхронное программирование

```java
CompletableFuture.supplyAsync(() -> {
    // долгая операция в отдельном потоке
    return fetchData();
})
.thenApply(data -> transform(data))
.thenAccept(result -> System.out.println(result))
.exceptionally(ex -> {
    System.err.println("Ошибка: " + ex.getMessage());
    return null;
});

// Комбинирование нескольких Future
CompletableFuture<String> future1 = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> future2 = CompletableFuture.supplyAsync(() -> "World");

CompletableFuture<String> combined = future1.thenCombine(future2, (s1, s2) -> s1 + " " + s2);
System.out.println(combined.get()); // "Hello World"
```

**Concurrent-коллекции**

|Коллекция|Назначение|
|-|-|
|ConcurrentHashMap|Потокобезопасная HashMap|
|CopyOnWriteArrayList|Список, безопасный для чтения|
|BlockingQueue|Очередь с блокировкой для producer-consumer|
|ConcurrentLinkedQueue|Неблокирующая очередь|

```java
// Producer-Consumer паттерн
BlockingQueue<String> queue = new LinkedBlockingQueue<>(10);

// Producer
new Thread(() -> {
    for (int i = 0; i < 100; i++) {
        queue.put("Сообщение " + i); // блокируется, если очередь полна
    }
}).start();

// Consumer
new Thread(() -> {
    while (true) {
        String msg = queue.take(); // блокируется, если очередь пуста
        System.out.println("Получено: " + msg);
    }
}).start();
```

### wait(), notify(), notifyAll()

Низкоуровневые методы для взаимодействия потоков (должны вызываться внутри synchronized):

```java
public class SharedResource {
    private boolean isReady = false;

    public synchronized void waitForReady() throws InterruptedException {
        while (!isReady) {
            wait(); // освобождает монитор и ждёт
        }
        System.out.println("Готово!");
    }

    public synchronized void makeReady() {
        isReady = true;
        notifyAll(); // будит все ждущие потоки
    }
}
```

> 💡 Современный подход: вместо wait/notify используй java.util.concurrent примитивы: CountDownLatch, CyclicBarrier, Semaphore, ReentrantLock.

### Deadlock (взаимная блокировка)

Ситуация, когда два потока ждут друг друга бесконечно:

```java
public class DeadlockExample {
    private static final Object lock1 = new Object();
    private static final Object lock2 = new Object();

    public static void main(String[] args) {
        new Thread(() -> {
            synchronized (lock1) {
                Thread.sleep(100);
                synchronized (lock2) {
                    System.out.println("Поток 1");
                }
            }
        }).start();

        new Thread(() -> {
            synchronized (lock2) {
                Thread.sleep(100);
                synchronized (lock1) {
                    System.out.println("Поток 2");
                }
            }
        }).start();
    }
}
// 💀 Программа зависнет навсегда
```

**Как избежать:**

- Захватывать мониторы всегда в одном порядке
- Использовать tryLock() с таймаутом
- Избегать вложенных блокировок

## 2. Работа с памятью в Java

### Структура памяти JVM

Когда запускается Java-программа, JVM выделяет несколько областей памяти:

```
┌─────────────────────────────────┐
│           JVM Memory            │
├─────────────────────────────────┤
│  Heap (Куча)                    │ ← объекты, массивы
│  - Young Generation             │
│    - Eden                       │
│    - Survivor 0, Survivor 1     │
│  - Old Generation               │
├─────────────────────────────────┤
│  Stack (Стек)                   │ ← локальные переменные, вызовы методов
│  - Frame для каждого потока     │
├─────────────────────────────────┤
│  Metaspace                      │ ← метаданные классов (с Java 8)
├─────────────────────────────────┤
│  Code Cache                     │ ← скомпилированный JIT-код
├─────────────────────────────────┤
│  Program Counter, Native Stack  │
└─────────────────────────────────┘
```

#### Heap (Куча)

- Общая для всех потоков
- Здесь живут все объекты и массивы
- Делится на Young и Old поколения
- Управляется Garbage Collector (GC)

#### Stack (Стек)

- Свой у каждого потока
- Хранит локальные переменные и фреймы вызовов методов
- Для примитивов — само значение
- Для ссылок — адрес объекта в Heap
- Автоматически очищается при выходе из метода

Пример: где что хранится

```java
public void example() {
    int x = 10;                    // Stack: x = 10
    String s = "Привет";           // Stack: ссылка, Heap: объект "Привет" (String Pool)
    Person p = new Person("Вика"); // Stack: ссылка, Heap: объект Person
    int[] arr = {1, 2, 3};         // Stack: ссылка, Heap: массив
}
```

### String Pool (пул строк)

Строки-литералы хранятся в специальной области Heap — **String Pool**. Это экономит память.

```java
String s1 = "Привет";           // создаётся в String Pool
String s2 = "Привет";           // та же ссылка из Pool!
String s3 = new String("Привет"); // новый объект в Heap, НЕ в Pool

System.out.println(s1 == s2);   // true (одна ссылка)
System.out.println(s1 == s3);   // false (разные объекты)
System.out.println(s1.equals(s3)); // true (одинаковое содержимое)

// intern() — поместить строку в Pool
String s4 = s3.intern();
System.out.println(s1 == s4);   // true
```

### Garbage Collector (GC)

**GC** — это процесс, который автоматически удаляет объекты, на которые больше нет ссылок.

#### Как GC понимает, что объект «мусор»?

**Алгоритм reachability (достижимости):**
1. Есть GC Roots — объекты, которые точно нужны:
- Локальные переменные в стеке
- Статические поля
- JNI-ссылки
2. GC «обходит» граф объектов от корней
3. Все недостижимые объекты — мусор

#### Поколения (Generations)

```
┌──────────────────────────────────────┐
│              Heap                    │
│  ┌────────────────────────────────┐  │
│  │ Young Generation               │  │
│  │ ┌──────┐ ┌──────┐ ┌──────┐     │  │
│  │ │ Eden │ │ S0   │ │ S1   │     │  │
│  │ └──────┘ └──────┘ └──────┘     │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ Old Generation                 │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

**Как работает:**
1. Новые объекты создаются в Eden
2. Когда Eden заполняется — Minor GC:
- Живые объекты копируются в Survivor (S0 или S1)
- Увеличивается «возраст» объекта
3. Когда объект пережил несколько GC — переносится в Old Generation
4. Когда Old заполняется — Major/Full GC (более дорогая операция)

>💡 Принцип «слабых поколений»: большинство объектов «умирают молодыми». Поэтому Young GC работает часто и быстро.

#### Типы GC (кратко)

|GC|Особенности|
|-|-|
|Serial GC|Однопоточный, для маленьких приложений|
|Parallel GC|Многопоточный, по умолчанию в Java 8|
|CMS|Низкие паузы, но фрагментация (устарел)|
|G1 GC|Сбалансированный, по умолчанию в Java 9+|
|ZGC / Shenandoah|Сверхнизкие паузы (< 10 мс), для больших Heap|

### Утечки памяти в Java

В Java утечка — это когда объект больше не нужен, но на него всё ещё есть ссылка.

#### Частые причины

```java
// 1. Статическая коллекция, которая растёт бесконечно
public class Cache {
    private static final List<Object> cache = new ArrayList<>();
    
    public static void add(Object o) {
        cache.add(o); // никогда не очищается!
    }
}

// 2. Незакрытые ресурсы
InputStream in = new FileInputStream("file.txt");
// забыли вызвать in.close()

// 3. Слушатели/Observer'ы, которые не удаляются
list.addListener(listener);
// забыли removeListener

// 4. ThreadLocal, который не очищается в пуле потоков
ThreadLocal<User> userHolder = new ThreadLocal<>();
// забыли userHolder.remove()

// 5. Ключи в HashMap без hashCode/equals
Map<Person, String> map = new HashMap<>();
// Person не переопределяет hashCode — ключи «теряются»
```

**Как обнаружить?**
- Heap dump + анализ в Eclipse MAT, VisualVM, JProfiler
- Флаги JVM: -XX:+HeapDumpOnOutOfMemoryError
- Мониторинг: Prometheus + Grafana, JMX

### Типы ссылок

```java
// Strong reference (обычная) — объект живёт, пока есть ссылка
Object obj = new Object();

// Soft reference — удаляется при нехватке памяти
SoftReference<Object> soft = new SoftReference<>(new Object());

// Weak reference — удаляется при следующем GC
WeakReference<Object> weak = new WeakReference<>(new Object());

// Phantom reference — для pre-mortem очистки
PhantomReference<Object> phantom = new PhantomReference<>(new Object(), queue);
```

**Практическое применение:**

- WeakHashMap — ключи удаляются, когда на них нет ссылок
- ThreadLocal — использует ThreadLocalMap с WeakReference
- Кеши — SoftReference для «мягкого» кеша

## 3. Паттерны проектирования (Design Patterns)

Паттерны — это типовые решения часто встречающихся проблем. Их описали в книге «Банда четырёх» (GoF) — 23 классических паттерна.

### Порождающие паттерны (Creational)

#### Singleton — одиночка

**Цель:** гарантировать, что у класса есть только один экземпляр.

```java
public class Database {
    // Ленивая инициализация + потокобезопасность
    private static volatile Database instance;

    private Database() {} // приватный конструктор

    public static Database getInstance() {
        if (instance == null) {
            synchronized (Database.class) {
                if (instance == null) {
                    instance = new Database();
                }
            }
        }
        return instance;
    }
}

// Или проще — через enum (рекомендуется Джошуа Блохом)
public enum Database {
    INSTANCE;

    public void query() { /* ... */ }
}

Database.INSTANCE.query();
```

**Когда использовать:** логгер, конфигуратор, подключение к БД, кеш.

#### Factory Method — фабричный метод

**Цель:** делегировать создание объектов подклассам.

```java
public interface Notification {
    void send(String message);
}

public class EmailNotification implements Notification {
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

public class SmsNotification implements Notification {
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

// Фабрика
public class NotificationFactory {
    public static Notification create(String type) {
        return switch (type.toLowerCase()) {
            case "email" -> new EmailNotification();
            case "sms" -> new SmsNotification();
            default -> throw new IllegalArgumentException("Unknown type: " + type);
        };
    }
}

// Использование
Notification notification = NotificationFactory.create("email");
notification.send("Привет, Вика!");
```

#### Builder — строитель

**Цель:** пошаговое создание сложных объектов.

```java
public class Pizza {
    private final String dough;
    private final String sauce;
    private final boolean cheese;
    private final List<String> toppings;

    private Pizza(Builder builder) {
        this.dough = builder.dough;
        this.sauce = builder.sauce;
        this.cheese = builder.cheese;
        this.toppings = List.copyOf(builder.toppings);
    }

    public static class Builder {
        private String dough = "тонкое";
        private String sauce = "томатный";
        private boolean cheese = true;
        private List<String> toppings = new ArrayList<>();

        public Builder dough(String dough) { this.dough = dough; return this; }
        public Builder sauce(String sauce) { this.sauce = sauce; return this; }
        public Builder noCheese() { this.cheese = false; return this; }
        public Builder addTopping(String t) { toppings.add(t); return this; }

        public Pizza build() {
            return new Pizza(this);
        }
    }
}

// Использование
Pizza pizza = new Pizza.Builder()
    .dough("толстое")
    .sauce("сливочный")
    .addTopping("грибы")
    .addTopping("ветчина")
    .build();
```

### Структурные паттерны (Structural)

#### Decorator — декоратор

**Цель:** динамически добавлять поведение объекту.

```java
public interface Coffee {
    double cost();
    String description();
}

public class SimpleCoffee implements Coffee {
    public double cost() { return 100; }
    public String description() { return "Простой кофе"; }
}

// Декоратор
public abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    public CoffeeDecorator(Coffee coffee) { this.coffee = coffee; }
}

public class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) { super(coffee); }
    public double cost() { return coffee.cost() + 30; }
    public String description() { return coffee.description() + " + молоко"; }
}

public class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) { super(coffee); }
    public double cost() { return coffee.cost() + 10; }
    public String description() { return coffee.description() + " + сахар"; }
}

// Использование
Coffee coffee = new SimpleCoffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

System.out.println(coffee.description()); // "Простой кофе + молоко + сахар"
System.out.println(coffee.cost());        // 140
```

> 💡 В Java BufferedReader, BufferedInputStream, BufferedOutputStream — это декораторы.

#### Adapter — адаптер

**Цель:** сделать несовместимые интерфейсы совместимыми.

```java
// Старый интерфейс
interface OldPrinter {
    void printOld(String text);
}

// Новый интерфейс
interface NewPrinter {
    void print(String text);
}

// Адаптер
class PrinterAdapter implements NewPrinter {
    private OldPrinter oldPrinter;

    public PrinterAdapter(OldPrinter oldPrinter) {
        this.oldPrinter = oldPrinter;
    }

    public void print(String text) {
        oldPrinter.printOld(text); // делегируем старому
    }
}

// Использование
OldPrinter old = text -> System.out.println("OLD: " + text);
NewPrinter adapted = new PrinterAdapter(old);
adapted.print("Привет!"); // "OLD: Привет!"
```

#### Facade — фасад

**Цель:** упростить интерфейс сложной системы.

```java
// Сложная система
class CPU { public void freeze() { /* ... */ } public void jump() { /* ... */ } }
class Memory { public void load(long addr, byte[] data) { /* ... */ } }
class HardDrive { public byte[] read(long lba, int size) { return new byte[0]; } }

// Фасад — простой интерфейс
class ComputerFacade {
    private CPU cpu = new CPU();
    private Memory mem = new Memory();
    private HardDrive hd = new HardDrive();

    public void start() {
        cpu.freeze();
        mem.load(0, hd.read(0, 1024));
        cpu.jump();
    }
}

// Использование
new ComputerFacade().start(); // одна строка вместо трёх
```

### Поведенческие паттерны (Behavioral)

#### Strategy — стратегия

**Цель:** определить семейство алгоритмов и сделать их взаимозаменяемыми.

```java
public interface PaymentStrategy {
    void pay(double amount);
}

public class CardPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Оплата картой: " + amount);
    }
}

public class PayPalPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Оплата через PayPal: " + amount);
    }
}

public class CryptoPayment implements PaymentStrategy {
    public void pay(double amount) {
        System.out.println("Оплата криптой: " + amount);
    }
}

// Контекст
public class ShoppingCart {
    private PaymentStrategy payment;

    public void setPayment(PaymentStrategy payment) {
        this.payment = payment;
    }

    public void checkout(double amount) {
        payment.pay(amount);
    }
}

// Использование
ShoppingCart cart = new ShoppingCart();
cart.setPayment(new CardPayment());
cart.checkout(1000);

cart.setPayment(new CryptoPayment());
cart.checkout(1000);
```

#### Observer — наблюдатель

**Цель:** определить зависимость «один ко многим» — при изменении объекта все подписчики уведомляются.

```java
public interface Observer {
    void update(String event);
}

public interface Subject {
    void attach(Observer o);
    void detach(Observer o);
    void notify(String event);
}

public class NewsPublisher implements Subject {
    private List<Observer> subscribers = new ArrayList<>();

    public void attach(Observer o) { subscribers.add(o); }
    public void detach(Observer o) { subscribers.remove(o); }
    public void notify(String event) {
        for (Observer o : subscribers) {
            o.update(event);
        }
    }

    public void publishNews(String news) {
        System.out.println("Опубликовано: " + news);
        notify(news);
    }
}

public class Subscriber implements Observer {
    private String name;
    public Subscriber(String name) { this.name = name; }
    public void update(String event) {
        System.out.println(name + " получил: " + event);
    }
}

// Использование
NewsPublisher publisher = new NewsPublisher();
Subscriber vika = new Subscriber("Вика");
Subscriber anya = new Subscriber("Аня");

publisher.attach(vika);
publisher.attach(anya);

publisher.publishNews("Java 22 вышел!");
// Вика получила: Java 22 вышел!
// Аня получила: Java 22 вышел!
```

> 💡 В Java есть встроенные java.util.Observer и Observable, но они устарели. Лучше использовать свои интерфейсы или реактивные библиотеки (RxJava).

### Какие паттерны знать обязательно для Junior

|Паттерн|Тип|Где встречается в Java|
|-|-|-|
|Singleton|Порождающий|Runtime, Desktop|
|Factory Method|Порождающий|`Calendar.getInstance()`, `NumberFormat.getInstance()`|
|Builder|Порождающий|`StringBuilder`, `Stream.Builder`|
|Decorator|Структурный|`BufferedReader`, `InputStream`|
|Adapter|Структурный|`InputStreamReader`, `OutputStreamWriter`|
|Facade|Структурный|`java.util.logging`, `SLF4J`|
|Strategy|Поведенческий|`Comparator`, `EventHandler`|
|Observer|Поведенческий|`EventListener`, `PropertyChangeListener`|
|Iterator|Поведенческий|`Iterator<T>` во всех коллекциях|
|Template Method|Поведенческий|`HttpServlet.doGet()`, `doPost()`|

## 🎯 Мини-задания для практики

### Многопоточность

1. Счётчик — реализуй потокобезопасный счётчик тремя способами: synchronized, AtomicInteger, ReentrantLock. Запусти 10 потоков, каждый инкрементирует 10000 раз. Сравни результаты.
2. Producer-Consumer — реализуй очередь с ограниченным размером через BlockingQueue. Один поток производит, другой потребляет.
3. Асинхронная загрузка — через CompletableFuture загрузи 5 URL параллельно, собери результаты в один список.
4. Deadlock — напиши пример deadlock'а и исправь его, упорядочив захват мониторов.

### Память

5. Heap dump — запусти программу с -XX:+HeapDumpOnOutOfMemoryError, создай утечку памяти (статический список), получи дамп и проанализируй в VisualVM.
6. String Pool — напиши программу, которая демонстрирует разницу между new String() и литералом. Используй intern().
7. WeakHashMap — реализуй кеш на основе WeakHashMap, проверь, что ключи удаляются при отсутствии сильных ссылок.

### Паттерны

8. Singleton Logger — реализуй логгер-одиночку, который пишет в файл. Проверь из нескольких потоков.
9. Builder для Query — создай Builder для SQL-запроса: `QueryBuilder.select().from().where().orderBy().build()`.
10. Strategy для сортировки — реализуй контекст, который принимает стратегию сортировки (BubbleSort, QuickSort, MergeSort).
11. Decorator для кофе — расширь пример с кофе: добавь декораторы для сиропа, корицы, взбитых сливок.
12. Observer для чата — реализуй чат-комнату: пользователи подписываются на комнату, при новом сообщении все получают уведомление.


## 💡 Частые ошибки

|Тема|Ошибка|Как правильно|
|-|-|-|
|Потоки|thread.run() вместо start()|start() запускает новый поток|
|Потоки|Изменение общих данных без синхронизации|Используй synchronized, Atomic*, concurrent-коллекции|
|Потоки|Executors.newFixedThreadPool() без shutdown()|Всегда закрывай пул|
|Потоки|wait() без цикла while|Используй while (!condition) wait() — защита от spurious wakeup|
|Память|Хранение больших данных в статических полях|Используй кеш с ограниченным размером|
|Память|Незакрытые ресурсы|try-with-resources|
|Память|Строковая конкатенация в цикле|StringBuilder|
|Паттерны|Singleton через публичный конструктор|Приватный конструктор + getInstance() или enum|
|Паттерны|Использование паттерна «на всякий случай»|Применяй только там, где он реально решает проблему|


## 📝 Что запомнить

### Многопоточность

1. Поток — независимая последовательность выполнения
2. Runnable предпочтительнее наследования от Thread
3. Race condition — результат зависит от порядка выполнения потоков
4. synchronized — блокирует монитор объекта
5. volatile — гарантирует видимость, но не атомарность
6. ExecutorService — пулы потоков, не создавай потоки вручную
7. CompletableFuture — современное асинхронное программирование
8. Deadlock — два потока ждут друг друга, избегай вложенных блокировок

### Память
1. Heap — объекты, общая память, управляется GC
2. Stack — локальные переменные, свой для каждого потока
3. String Pool — строки-литералы кешируются
4. GC — удаляет недостижимые объекты, использует поколения
5. Утечки памяти — когда на ненужный объект есть ссылка
6. Типы ссылок — Strong, Soft, Weak, Phantom

### Паттерны
1. Порождающие — Singleton, Factory, Builder
2. Структурные — Decorator, Adapter, Facade
3. Поведенческие — Strategy, Observer, Iterator
4. Не применяй паттерны «на всякий случай» — только там, где они решают реальную проблему
5. Знай, где паттерны уже используются в Java — это поможет их понять

## Вопросы с собеседований

### 1)  Как создать в Java новый тред (поток)?

Так или иначе создание происходит через использование класса Thread. Но здесь могут быть варианты…
Наследуемся от java.lang.Thread
Имплементируем интерфейс java.lang.Runnable, объект которого принимает к себе к конструктор Thread класс
Поговорим о каждом из них.
Наследуемся от Thread класса
Чтобы это заработало, в нашем классе наследуемся от java.lang.Thread. В нем есть метом run(), он как раз нам и нужен. Вся жизнь и логика нового потока будет в этом методе. Это своего рода main метод для нового потока.

После этого останется только создать объект нашего класса и выполнить метод start(), который создаст новый поток и запустит записанную в нем логику. Смотрим:

```java
/**
* Пример того, как создавать треды путем наследования {@link Thread} класса.
*/
class ThreadInheritance extends Thread {

   @Override
   public void run() {
       System.out.println(Thread.currentThread().getName());
   }

   public static void main(String[] args) {
       ThreadInheritance threadInheritance1 = new ThreadInheritance();
       ThreadInheritance threadInheritance2 = new ThreadInheritance();
       ThreadInheritance threadInheritance3 = new ThreadInheritance();
       threadInheritance1.start();
       threadInheritance2.start();
       threadInheritance3.start();
   }
}
```

Вывод в консоль будет такой:

```
Thread-1
Thread-0
Thread-2
```

То есть даже здесь мы видим, что выполняются потоки не по очереди, а как JVM рассудила)
Реализуем интерфейс Runnable
Если вы противник наследований и/или уже наследуете какой-то из других классов, можно воспользоваться интерфейсом java.lang.Runnable. 

Здесь мы в нашем классе реализуем этот интерфейс и имплементируем метод run(), как это было и в том примере. Только нужно будет еще создать объекты Thread. Казалось бы, больше строк и это хуже. Но мы то знаем как пагубно наследование и что его лучше избегать всеми способами ;)

Смотрим:
```java
/**
* Пример того, как создавать треды из интерфейса {@link Runnable}.
* Здесь проще простого - реализуем этот интерфейс и потом передаем в конструктор
* экземпляр реализуемого объекта.
*/
class ThreadInheritance implements Runnable {

   @Override
   public void run() {
       System.out.println(Thread.currentThread().getName());
   }

   public static void main(String[] args) {
       ThreadInheritance runnable1 = new ThreadInheritance();
       ThreadInheritance runnable2 = new ThreadInheritance();
       ThreadInheritance runnable3 = new ThreadInheritance();

       Thread threadRunnable1 = new Thread(runnable1);
       Thread threadRunnable2 = new Thread(runnable2);
       Thread threadRunnable3 = new Thread(runnable3);

       threadRunnable1.start();
       threadRunnable2.start();
       threadRunnable3.start();
   }
}
```
И результат выполнения:
```
Thread-0
Thread-1
Thread-2
```
### 2) Какая разница между процессом и потоком?

![](https://cdn.javarush.com/images/article/c71a3d2c-5d18-42f3-a81d-074375cec3ca/1024.jpeg)

Существуют следующие различия между процессом и потоком:
1. Программа в исполнении называется процессом, тогда как Поток является подмножеством процесса.
2. Процессы независимы, тогда как потоки являются подмножеством процесса.
3. Процессы имеют различное адресное пространство в памяти, в то время как потоки содержат общее адресное пространство.
4. Переключение контекста происходит быстрее между потоками по сравнению с процессами.
5. Межпроцессное взаимодействие медленнее и дороже, чем межпотоковое взаимодействие.
6. Любые изменения в родительском процессе не влияют на дочерний процесс, тогда как изменения в родительском потоке могут влиять на дочерний поток.

### 3) Какие преимущества есть у многопоточности?

1. Многопоточность позволяет приложению / программе всегда реагировать на ввод, даже если она уже выполняется с некоторыми фоновыми задачами;
2. Многопоточность позволяет быстрее выполнять задачи, поскольку потоки выполняются независимо;
3. Многопоточность обеспечивает лучшее использование кэш-памяти, поскольку потоки разделяют общие ресурсы памяти;
4.Многопоточность уменьшает количество требуемого сервера, поскольку один сервер может одновременно выполнять несколько потоков.

### 4) Каковы состояния в жизненном цикле потока?

![](https://cdn.javarush.com/images/article/4c72b03a-d3fa-40a3-b24f-75bcaa9df383/800.jpeg)

1. **New:** В этом состоянии объект класса Thread создается с использованием оператора new, но поток не существует. Поток не запускается, пока мы не вызовем метод start().
2. **Runnable:** В этом состоянии поток готов к запуску после вызова метода start(). Однако он еще не выбран планировщиком потока.
3. **Running:** В этом состоянии планировщик потока выбирает поток из состояния готовности, и тот работает.
4. **Waiting/Blocked:** в этом состоянии поток не работает, но все еще жив или ожидает завершения другого потока.
5. **Dead/Terminated:** при выходе из метода run() поток находится в завершенном или мертвом состоянии.


### 5) Можно ли запустить тред дважды?

Нет, мы не можем перезапустить поток, так как после запуска и выполнения потока он переходит в состояние Dead. 

Поэтому, если мы попытаемся запустить поток дважды, он выдаст исключение runtimeException "java.lang.IllegalThreadStateException". 

Смотрим:
```java
class DoubleStartThreadExample extends Thread {

   /**
    * Имитируем работу треда
    */
   public void run() {
	// что-то происходит. Для нас не существенно на этом этапе
   }

   /**
    * Запускаем тред дважды
    */
   public static void main(String[] args) {
       DoubleStartThreadExample doubleStartThreadExample = new DoubleStartThreadExample();
       doubleStartThreadExample.start();
       doubleStartThreadExample.start();
   }
}
```

Как только работа дойдет до выполнения второго старта одного и того же треда - тогда и будет исключение. Попробуйте сами ;) лучше один раз увидеть, чем сто раз услышать.

### 6) Что если вызвать напрямую метод run(), не вызывая метод start()?

Да, вызвать метод run() конечно можно, но это никак не создаст новый поток и не выполнит его как отдельный. В этом случае, это простой объект, который вызывает простой метод.

Если мы говорим о методе start(), то там другое дело. Запуская этот метод, runtime запускает новый потом и он уже, в свою очередь, дергает наш метод ;) 

Не верите — вот, попробуйте:

```java
class ThreadCallRunExample extends Thread {

   public void run() {
       for (int i = 0; i < 5; i++) {
           System.out.print(i);
       }
   }

   public static void main(String args[]) {
       ThreadCallRunExample runExample1 = new ThreadCallRunExample();
       ThreadCallRunExample runExample2 = new ThreadCallRunExample();

       // просто будут вызваны в потоке main два метода, один за другим.
       runExample1.run();
       runExample2.run();
   }
}
```
И вывод в консоль будет такой:
```
0123401234
```
Видно, что никакой нити не было создано. Все сработало как обычный класс. Вначале отработал метод первого класса, затем второй.

### 7) Что такое daemon тред?

Daemon thread (далее — демон-тред) — это тред, который выполняет задачи в фоне по отношению к другому потоку. То есть, его работа заключается в том, чтоб выполнять задачи вспомогательные, которые нужно делать только в привязке другому (основному) потоку.

Есть много потоков демонов, работающих автоматически, например Garbage Collector, finalizer и т. д.

#### Почему Java закрывает демон-поток?
Единственная цель потока демона состоит в том, что он предоставляет сервисы потоку пользователя для фоновой задачи поддержки. Поэтому если основной поток завершился, то runtime закрывает автоматически и все его демон-потоки.

#### Методы для работы в Thread классе

Класс java.lang.Thread предоставляет два метода для работы с демоном-потоком:
1. public void setDaemon(boolean status) — указывает, что это будет демон-поток. По умолчанию стоит false, что значит, что будут создаваться не демон-потоки, если не указать это отдельно.
2. public boolean isDaemon() — по сути это геттер для переменной daemon, который мы устанавливаем предыдущим методом.
Пример:

```java
class DaemonThreadExample extends Thread {

   public void run() {
       // Проверяет, демон ли этот поток или нет
       if (Thread.currentThread().isDaemon()) {
           System.out.println("daemon thread");
       } else {
           System.out.println("user thread");
       }
   }

   public static void main(String[] args) {
       DaemonThreadExample thread1 = new DaemonThreadExample();
       DaemonThreadExample thread2 = new DaemonThreadExample();
       DaemonThreadExample thread3 = new DaemonThreadExample();

       // теперь thread1 - поток-демон.
       thread1.setDaemon(true);

       System.out.println("демон?.. " + thread1.isDaemon());
       System.out.println("демон?.. " + thread2.isDaemon());
       System.out.println("демон?.. " + thread3.isDaemon());

       thread1.start();
       thread2.start();
       thread3.start();
   }
}
```

Вывод в консоль:
```
демон?.. true
демон?.. false
демон?.. false
daemon thread
user thread
user thread
```
Из вывода мы видим, что внутри самого потока при помощи статического currentThread() метода можно узнать какой это поток с одной стороны, с другой стороны, если у нас есть ссылка на объект этого потока, мы можем узнать и непосредственно у него. 

Это дает ту необходимую гибкость в настройке.

### 8) Можно ли сделать поток демоном уже после его создания?

Нет. Если вы сделаете это, он выдаст исключение IllegalThreadStateException. 

Следовательно, мы можем создать поток демона только до его запуска.

Пример:
```java
class SetDaemonAfterStartExample extends Thread {

   public void run() {
       System.out.println("Working...");
   }

   public static void main(String[] args) {
       SetDaemonAfterStartExample afterStartExample = new SetDaemonAfterStartExample();
       afterStartExample.start();

       // здесь будет выброшено исключение
       afterStartExample.setDaemon(true);
   }
}
```
Вывод в консоль:
```
Working...
Exception in thread "main" java.lang.IllegalThreadStateException
	at java.lang.Thread.setDaemon(Thread.java:1359)
	at SetDaemonAfterStartExample.main(SetDaemonAfterStartExample.java:14)
```

### 9) Что такое shutdownhook?

Shutdownhook — это поток, который неявно вызывается до завершения работы JVM(виртуальная машина Java). Таким образом, мы можем использовать его для очистки ресурса или сохранения состояния, когда виртуальная машина Java выключается нормально или внезапно. 

Мы можем добавить shutdown hook, используя следующий метод:

Runtime.getRuntime().addShutdownHook(new ShutdownHookThreadExample());

Как показано в примере:
```java
/**
* Программа, которая показывает как запустить shutdown hook тред,
* который выполнится аккурат до окончания работы JVM
*/
class ShutdownHookThreadExample extends Thread {

   public void run() {
       System.out.println("shutdown hook задачу выполнил");
   }

   public static void main(String[] args) {

       Runtime.getRuntime().addShutdownHook(new ShutdownHookThreadExample());

       System.out.println("Теперь программа засыпает, нажмите ctrl+c чтоб завершить ее.");
       try {
           Thread.sleep(60000);
       } catch (InterruptedException e) {
           e.printStackTrace();
       }
   }
}
```
Вывод в консоль:
```
Теперь программа засыпает, нажмите ctrl+c чтоб завершить ее.
shutdown hook задачу выполнил
```

### 10) Что такое синхронизация (synchronization)?

Синхронизация (Synchronization) в Java — это возможность контролировать доступ нескольких потоков к любому общему ресурсу.

Когда несколько потоков пытаются выполнить одну и ту же задачу, существует вероятность ошибочного результата, поэтому для устранения этой проблемы Java использует синхронизацию, благодаря которой будет только один тред сможет работать в один момент.

Синхронизация может быть достигнута тремя способами:

- Синхронизируя метод
- Синхронизируя определенный блок
- Статической синхронизацией

#### Синхронизация метода

Синхронизированный метод используется для блокировки объекта для любого общего ресурса. Когда поток вызывает синхронизированный метод, он автоматически получает блокировку для этого объекта и снимает ее, когда поток завершает свою задачу.

Чтоб заработало, нужно добавить ключевое слово synchronized. 

На примере увидим, как это работает:
```java
/**
* Пример, где мы синхронизируем метод. То есть добавляем ему слово synchronized.
* Есть два писателя, которые хотят использовать один принтер. Они подготовили свои поэмы
* И конечно же не хотят, чтоб их поэмы перемешались, а хотят, чтоб работа была сделана по * * * очереди для каждого из них
*/
class Printer {

   synchronized void print(List<String> wordsToPrint) {
       wordsToPrint.forEach(System.out::print);
       System.out.println();
   }

   public static void main(String args[]) {
       // один объект для двух тредов
       Printer printer  = new Printer();

       // создаем два треда
       Writer1 writer1 = new Writer1(printer);
       Writer2 writer2 = new Writer2(printer);

       // запускаем их
       writer1.start();
       writer2.start();
   }
}

/**
* Писатель номер 1, который пишет свою поэму.
*/
class Writer1 extends Thread {
   Printer printer;

   Writer1(Printer printer) {
       this.printer = printer;
   }

   public void run() {
       List<string> poem = Arrays.asList("Я ", this.getName(), " Пишу", " Письмо");
       printer.print(poem);
   }

}

/**
* Писатель номер 2, который пишет свою поэму.
*/
class Writer2 extends Thread {
   Printer printer;

   Writer2(Printer printer) {
       this.printer = printer;
   }

   public void run() {
       List<String> poem = Arrays.asList("Не Я ", this.getName(), " Не пишу", " Не Письмо");
       printer.print(poem);
   }
}
```
И вывод в консоль:
```
Я Thread-0 Пишу Письмо
Не Я Thread-1 Не пишу Не Письмо
```

#### Блок синхронизации

Синхронизированный блок может быть использован для выполнения синхронизации на любом конкретном ресурсе метода. 

Допустим, что в большом методе(да да, такие писать нельзя, но иногда бывает) нужно синхронизировать только небольшую часть, по каким-то причинам.

Если вы поместите все коды метода в синхронизированный блок, он будет работать так же, как синхронизированный метод. 

Синтаксис выглядит так:

```java
synchronized (“объект для блокировки”) {
   // сам код, который нужно защитить
}
```
Для того, чтоб не повторять пример предыдущий, создадим треды через анонимные классы - то есть сразу реализуя Runnable интерфейс.

```java
/**
* Вот как добавляется блок синхронизации.
* Внутри нужно указать у кого будет взят мьютекс для блокировки.
*/
class Printer {

   void print(List<String> wordsToPrint) {
       synchronized (this) {
           wordsToPrint.forEach(System.out::print);
       }
       System.out.println();
   }

   public static void main(String args[]) {
       // один объект для двух тредов
       Printer printer = new Printer();

       // создаем два треда
       Thread writer1 = new Thread(new Runnable() {
           @Override
           public void run() {
               List<String> poem = Arrays.asList("Я ", "Writer1", " Пишу", " Письмо");
               printer.print(poem);
           }
       });
       Thread writer2 = new Thread(new Runnable() {
           @Override
           public void run() {
               List<String> poem = Arrays.asList("Не Я ", "Writer2", " Не пишу", " Не Письмо");
               printer.print(poem);
           }
       });

       // запускаем их
       writer1.start();
       writer2.start();
   }
}

}
```
и вывод в консоль
```
Я Writer1 Пишу Письмо
Не Я Writer2 Не пишу Не Письмо
```

#### Статическая синхронизация

Если сделать статический метод синхронизированным, то блокировка будет на классе, а не на объекте.

В этом примере мы применяем ключевое слово synchronized к статическому методу для выполнения статической синхронизации:

```java
/**
* Вот как добавляется блок синхронизации.
* Внутри нужно указать у кого будет взят мьютекс для блокировки.
*/
class Printer {

   static synchronized void print(List<String> wordsToPrint) {
       wordsToPrint.forEach(System.out::print);
       System.out.println();
   }

   public static void main(String args[]) {

       // создаем два треда
       Thread writer1 = new Thread(new Runnable() {
           @Override
           public void run() {
               List<String> poem = Arrays.asList("Я ", "Writer1", " Пишу", " Письмо");
               Printer.print(poem);
           }
       });
       Thread writer2 = new Thread(new Runnable() {
           @Override
           public void run() {
               List<String> poem = Arrays.asList("Не Я ", "Writer2", " Не пишу", " Не Письмо");
               Printer.print(poem);
           }
       });

       // запускаем их
       writer1.start();
       writer2.start();
   }
}
```

и вывод в консоль:
```
Не Я Writer2 Не пишу Не Письмо
Я Writer1 Пишу Письмо
```

### 11) Что такое volatile переменная?

Ключевое слово volatile используется в многопоточном программировании для обеспечения безопасности потока, поскольку модификация одной изменяемой переменной видна всем другим потокам, поэтому одна переменная может использоваться одним потоком за раз.

При помощи ключевого слова volatile можно гарантировать, что переменная будет потокобезопасна и будет храниться в общей памяти, и потоки не будут ее брать себе в свой кеш.

Как это выглядит?

`private volatile AtomicInteger count;`

Просто добавляем к переменной volatile.

Но это не говорит о полной потокобезопасности… Ведь операции могут быть не атомарны над переменной. Но можно использовать Atomic классы, которые делают операцию атомарно, то есть за одно выполнение процессором. 

Таких классов много можно найти в пакете java.util.concurrent.atomic. 

### 12) Что такое deadlock

Deadlock в Java является частью многопоточности. Взаимная блокировка может возникнуть в ситуации, когда поток ожидает блокировки объекта, полученной другим потоком, а второй поток ожидает блокировки объекта, полученной первым потоком. 

Таким образом эти два потока ждут друг друга и не будут дальше выполнять свой код.

Рассмотрим Пример, в котором есть класс имплементирующий Runnable. Принимает в конструкторе он два ресурса. Внутри метода run() он по-очереди берет блокировку для них, так вот если создать два объекта этого класса, а ресурсы передать в разном порядке, то легко можно нарваться на блокировку:

```java
class DeadLock {

   public static void main(String[] args) {
       final Integer r1 = 10;
       final Integer r2 = 15;

       DeadlockThread threadR1R2 = new DeadlockThread(r1, r2);
       DeadlockThread threadR2R1 = new DeadlockThread(r2, r1);

       new Thread(threadR1R2).start();
       new Thread(threadR2R1).start();
   }
}

/**
* Класс, который принимает два ресурса.
*/
class DeadlockThread implements Runnable {

   private final Integer r1;
   private final Integer r2;

   public DeadlockThread(Integer r1, Integer r2) {
       this.r1 = r1;
       this.r2 = r2;
   }

   @Override
   public void run() {
       synchronized (r1) {
           System.out.println(Thread.currentThread().getName() + " захватил ресурс: " + r1);

           try {
               Thread.sleep(1000);
           } catch (InterruptedException e) {
               e.printStackTrace();
           }

           synchronized (r2) {
               System.out.println(Thread.currentThread().getName() + " захватил ресурс: " + r2);
           }
       }
   }
}
```


Вывод в консоль:
```
Первый тред захватил первый ресурс
Второй тред захватывает второй ресурс
```

### 13) Как избежать deadlock?

Исходя из того, что мы знаем как дедлок возникает, то можно сделать некоторые выводы…

- Как показано в примере выше, дедлок был из-за того, что была вложенность блокировок. То есть внутри одной блокировки находится еще одна или более. Избежать это можно следующим образом - вместо вложенности нужно добавить новую абстракцию поверх и дать блокировку на более высокий уровень, а вложенные блокировки убрать.
- Чем больше блокировок, тем больше шансов, что будет дедлок. Поэтому каждый раз добавляя блокировку нужно думать, а точно ли она нужна и можно ли избежать добавление новой.
- Использования Thread.join(). Дедлок можно сделать также при ожидании одного треда другим. Чтобы избежать этой проблемы, можно подумать над тем, чтобы выставлять ограниченное время на join() метод.
- Если у нас один поток - дедлока не будет ;)

### 14) Что такое состояние гонки?

Если в реальных гонках выступают машины, то в гонках терминологии многопоточности в гонках выступают треды. 

Но почему? Есть же два треда, которые работают и которые могут иметь доступ к одному и тому же объекту. И они могут попытаться обновить состояние в одно и тоже время. Пока все ясно, да?

Так работа тредов происходит или реально параллельно(если есть больше одного ядра в процессоре) или условно параллельно, когда процессор выделяет по небольшому промежутку времени. 

И управлять этими процессами мы не можем, поэтому мы не можем гарантировать, что когда один тред прочитает данные из объекта, он успеет их изменить ДО того, как это сделает какой-то другой тред.

Такие проблемы бывают, когда проходит такая комбинация “проверь-и-действуй”.

Что это значит? Например у нас есть if выражение, в теле которого изменяется само условие, то есть:

```java
int z = 0;

// проверь
if (z < 5) {
//действуй
   z = z + 5;
}
```

Так вот может быть ситуация, когда два треда одновременно зайдут в этот блок кода в момент, когда z еще равно нулю и в двоем изменят это значение.

И в итоге мы получим не ожидаемое значение 5, а уже 10.

Как это избежать? Нужно поставить блокировку до начала выполнения и после. То есть, чтобы первый тред зашел в блок if, выполнил все действия, изменил z и уже потом дал возможность сделать это следующему треду. 

А вот уже следующий тред не зайдет в блок if, так как z уже будет равно 5:
```java
// получить блокировку для z
if (z < 5) {
   z = z + 5;
}
// выпустить из блокировки z
===================================================
```

### 15) Какие вы знаете шаблоны проектирования? Расскажите о двух шаблонах, которые использовали в работе.

Шаблонов есть огромное множество: начать знакомство с ними можно с этой и этой статьи. Ну а для тех из вас, кто хочет обстоятельно ознакомиться с ними, рекомендую прочитать книгу “Head First. Паттерны проектирования”. С ее помощью вы сможете подробно и в легкой форме изучить самые базовые паттерны проектирования.
 
Говоря о шаблонах проектирования, которые вы можете привести в качестве примеров на собеседовании, на ум приходят:
Builder — часто используемый шаблон, альтернатива классическому созданию объектов;
паттерн Стратегия, который по своей сути представляет полиморфизм. То есть, у нас есть один интерфейс, но поведение программы будет меняться в зависимости от того, какую конкретно реализацию этого интерфейса передали в функционал (сейчас стратегия фактически везде используется в java-приложениях).
Если этого вам мало, обратите внимание на Spring (если вы с ним уже знакомы), ведь он представляет собой целую платформу фреймворков, которые в свою очередь пронизаны паттернами вдоль и поперек.
 
Вот вам пара примеров того, о чем я говорю:

- Factory — в ApplicationContext (ну или в BeanFactory);
- Singleton — все бины по умолчанию синглтоны;
- Proxy — по сути все в спринге так или иначе использует этот паттерн, например, АОП;
- Chain of responsibility — паттерн, по концепции которого работает Spring Security;
- Template — используется в Spring Jdbc.

### 16) Что такое SOLID? Приведите примеры

SOLID — акроним из названий пяти основных принципов дизайна для ООП, придуманных Робертом Мартином.
 
S — Single-responsibility principle — принцип единой ответственности, который гласит, что у класса должна быть только одна цель и единственное назначение. 
 
То есть, не стоит создавать классы, которые делают все. В этом случае можно воспроизвести антипаттерн “Божественный объект”.
 
Если у вас есть объект Cat, в нем должны находиться методы, взаимодействующие только с его внутренней функциональностью, но никак не бизнес-логика, которая не имеет отношения к этому инстансу. Например, какое-нибудь сохранение объектов данного типа куда-либо. 
 
Этот внешний функционал (относительно Cat), нужно выносить в другие классы, какие-нибудь сервисы, задача которых — обеспечить бизнес-логику для объектов данного типа.
 
O — Open-closed principle — принцип открытости/закрытости. Он означает, что программные сущности (классы, интерфейсы) должны быть открыты для расширения, но закрыты для модификации.
 
Например, нам понадобился функционал, схожий с функционалом уже существующего класса Cat, но немного другой. Вместо того, чтобы изменять функционал класса Cat, при этом ломая те места, в которых он уже задействован, мы используем наследование или композицию. Как итог — мы добились своей цели с модифицированным функционалом класса Cat, но при этом мы не изменили его и ничего не сломали.
 
L — Liskov substitution principle — принцип подстановки Барбары Лисков.
 
Принцип гласит, что функция, использующая базовый тип, должна иметь возможность использовать подтипы базового типа, не зная об этом.
 
Например, наш класс Cat должен быть заменяемым любым его наследником, скажем, Lion, без кардинального изменения поведения. Общая логика (поведение) остается такой же, но меняются детали самой реализации того или иного функционала.
 
I — Interface segregation principle — принцип разделения интерфейса. Данный принцип гласит, что лучше иметь множество специализированных (узконаправленных) интерфейсов, чем один универсальный.
 
Например, пользователь реализует некоторый интерфейс, из которого ему нужен лишь он метод, но при этом у данного интерфейса есть еще девять методов, которые никак не относятся к логике нужного метода. В таком случае пользователю нужно будет реализовать десять методов интерфейса, девять из которых лишние для него!
 
Вместо этого лучше сделать десять различных интерфейсов которые можно реализовать при необходимости. Ну или не десять, а несколько, у которых будут методы, тесно связанные единой целью интерфейса. 
 
D — Dependency Inversion Principle — принцип инверсии зависимостей. Принцип говорит о том, что модули верхних уровней не должны зависеть от модулей нижних уровней. 
 
Ещё этот принцип описывают как “абстракция не должна зависеть от деталей, детали должны зависеть от абстракции”. 
 
То есть, мы должны строить нашу логику, ссылаясь на интерфейсы, и уже потом в этот функционал передавать конкретные объекты, классы которых и реализуют необходимый интерфейс.
 
Например, если у нас есть интерфейс Cat и некоторые его реализации, скажем, Lion и HomeCat, мы строим нашу логику взаимодействия именно с типом интерфейса Cat, и уже потом подставляем конкретную реализацию Lion или HomeCat, но никак не наоборот.

### 17) Какие средства для работы с многопоточностью знаете?
Основные/базовые средства для использования многопоточности в Java:
- **Synchronized** — механизм закрытия (блокирования) метода / блока при вхождении в него потока, от других потоков.
- **Volatile** — механизм обеспечения согласованного доступа к переменной разными потокам, то есть с наличием данного модификатора у переменной все операции присвоения и чтения ее должны быть атомарными. Другими словами потоки не будут копировать эту переменную в свою локальную память и изменять ее, а будут изменять ее изначальное значение.

- **Runnable** — интерфейс, реализовав который (в частности его метод run) в некотором классе:

```java
public class CustomRunnable implements Runnable {
   @Override
   public void run() {
       // некоторая логика
   }
}
```
И создав объект этого класса, можно запустить новый поток, задав этот объект в конструктор нового объекта `Thread`, и вызвав у него метод `start()`:

```java
Runnable runnable = new CustomRunnable();
new Thread(runnable).start();
```

Метод `start` запускает реализованный метод `run()` в отдельном потоке.

- `Thread` — класс, наследовав от которого (при этом переопределив метод `run`):

```java
public class CustomThread extends Thread {
   @Override
   public void run() {
       // некоторая логика
   }
}
```

И создав объект данного класса и запустив его с помощью метода `start()`, запустим тем самым новый поток:

`new CustomThread().start();`
- **Concurrency** — пакет с инструментами для работы в многопоточной среде.

Он состоит из:
- **Concurrent Collections** — набор коллекций, специализированных под работу в многопоточной среде.
- **Queues** — специализированные очереди для многопоточной среды (блокирующие и неблокирующие).
- **Synchronisers** — специализированные утилиты для работы в многопоточной среде.
- **Executors** — механизмы для создания пулов потоков.
- **Locks** — механизмы синхронизации потоков (более гибкие нежели стандартные — synchronized, wait, notify, notifyAll).
- **Atomics** — классы оптимизированные под многопоточное выполнение, именно у них каждая операция — атомарная.

### 18) Расскажите о синхронизации между потоками. Для чего используют методы wait (), notify () — notifyAll () join ()?
Насколько я понял вопрос, синхронизация между потоками — это о ключевом модификаторе — `synhronized`.
 
Данный модификатор можно поставить либо непосредственно у блока:
```java
synchronized (Main.class) {
   // некоторая логика
}
```
Либо непосредственно в сигнатуре метода:
```java
public synchronized void move() {
   // некоторая логика}
```
Как я и сказал ранее, `synhronized` это механизм, позволяющий закрывать блок / метод от других потоков, когда в него уже зашел один поток.
 
Представим блок / метод как комнату. Некоторый поток, придя к ней, зайдет в нее и закроет ее на ключ, другие потоки, придя к комнате и увидев, что она закрыта, будут ждать возле нее пока она не освободится. Сделав свои дела, первый поток выходит из комнаты и освобождает ключ.
 
И я не зря постоянно говорил о ключе, ведь он действительно существует. Это специальный объект, который имеет состояние занято / свободно. Этот объект прикреплен к каждому объекту Java, поэтому при использовании synhronized блока нам нужно в скобках указывать объект, на чей мьютекс мы хотим закрывать дверь:
```java
Cat cat = new Cat();
synchronized (cat) {
   // некоторая логика
}
```
Также можно использовать мьютекс класса, как я это сделал в первом примере (`Main.class`).
 
Когда мы используем `synhronized` на методе, мы ведь не указываем объект на которым хотим закрыть верно? 
 
В таком случае для нестатического метода будет закрываться на мьютекс объекта this, то есть текущий объект данного класса. Статический будет закрываться на мьютекс текущего класса (`this.getClass();`).
 
`Wait()` — метод, который освобождает мьютекс и переводит текущий поток в режим ожидания как бы прикрепляясь к текущему монитору (что-то вроде якоря). Из-за этого данный метод может быть вызван только из `synhronized` блока или метода (иначе что ему освобождать и чего ему ожидать).
 
Также отмечу, что это метод класса `Object`.

Точнее не один, а даже три:
- `Wait()` — переводит текущий поток в режим ожидания пока другой поток не вызовет метод `notify()` или `notifyAll()` для этого объекта (об этих методах поговорим дальше).

- `Wait (long timeout)` — переводит текущий поток в режим ожидания пока другой поток не вызовет метод `notify()` или `notifyAll()` для этого объекта или не истечет указанное время — timeout.

- `Wait (long timeout, int nanos)` — аналогичен предыдущему, только nanos позволяет указать наносекунды (более точная настройка времени).

- `Notify()` — метод позволяющий пробудить один рандомный поток текущего блока синхронизации. Опять же, может быть вызван только в `synhronized` блоке или методе (ведь в других местах ему не будет кого размораживать).

- `NotifyAll()` — метод, пробуждающий все ожидающие потоки на текущем мониторе (тоже используется только в `synhronized` блоке или методе).

### 19) Как остановить поток?
Первое, что нужно сказать — это то, что при полном выполнении метода `run()` поток автоматически уничтожается. Но иногда нужно убить его досрочно, до завершения данного метода.

И что тогда делать? Возможно, у объекта `Thread` использовать метод `stop()`?

Как бы не так! 

Данный метод считается устаревшим и может привести к сбоям системы.

Ну а что тогда? 
 
Есть два способа сделать это:
 
**Первый** — это использование своего внутреннего логического флага.

Давайте рассмотрим на примере.
 
У нас есть своя реализация потока, который должен выводить на экран некую фразу до его полной остановки:
```java
public class CustomThread extends Thread {
private boolean isActive;

   public CustomThread() {
       this.isActive = true;
   }

   @Override
   public void run() {
       {
           while (isActive) {
               System.out.println("Поток выполняет некую логику...");
           }
           System.out.println("Поток остановлен!");
       }
   }

   public void stopRunningThread() {
       isActive = false;
   }
}
```
При использовании метода `stopRunning()` внутренний флаг становится **false** и метод `run` прекращает свою работу.
 
Давайте запустим его в `main`:
```java
System.out.println("Начало выполнения программы");
CustomThread thread = new CustomThread();
thread.start();
Thread.sleep(3);
// пока наш основной поток спит, вспомогательный  CustomThread работает и выводит в коноль своё сообщение
thread.stopRunningThread();
System.out.println("Конец выполнения программы");
```

В итоге в консоли мы увидим что-то вроде этого:
```
Начало выполнения программы
Поток выполняет некую логику...
Поток выполняет некую логику...
Поток выполняет некую логику...
Поток выполняет некую логику...
Поток выполняет некую логику...
Поток выполняет некую логику...
Конец выполнения программы
Поток остановлен!
```

А это значит, что наш поток отработал, вывел некоторое количество сообщений в консоль и был успешно остановлен.
 
Отмечу, что количество выведенных сообщений от запуска к запуску будет разным, иногда дополнительный поток даже и не выводил ничего.
 
Как я заметил, это зависит от времени сна основного потока, чем оно больше, тем меньше шанс что дополнительный поток ничего не выведет. При времени сна 1мс вывода сообщений почти никогда не происходит, но если выставить 20мс, почти всегда срабатывает. 
 
Возможно, при малом времени поток просто не успевает запуститься и начать свою работу, а его сразу же останавливают.
 
**Второй** способ заключается в использовании на объекте `Thread` метода `interrupted()`, который возвращает значение внутреннего флага прерывания (по умолчанию этот флаг **false**) и другого его метода `interrupt()` — ставящего этот флаг в true (когда этот флаг true поток должен остановить свою работу).
 
Смотрим пример:
```java
public class CustomThread extends Thread {

   @Override
   public void run() {
       {
           while (!Thread.interrupted()) {
               System.out.println("Поток выполняет некую логику...");
           }
           System.out.println("Поток остановлен!");
       }
   }
}
```

Запуск в main:
```java
System.out.println("Начало выполнения программы");
Thread thread = new CustomThread();
thread.start();
Thread.sleep(3);
thread.interrupt();
System.out.println("Конец выполнения программы");
```

Итог выполнения будет таким же, как и в первом случае, но данный подход мне нравится больше: мы пишем меньше кода и больше используем уже готовый, стандатный функционал.

### 20) Как между потоками обмениваться данными?

Для обмена данными между потоками можно использовать много разных подходов и средств: например, воспользоваться атомарными переменными, синхронизированными коллекциями, семафором. Но для решения данной задачи я приведу пример с `Exchanger`.
 
`Exchanger` — это класс синхронизации из concurrent пакета, который облегчает обмен элементами между парой потоков за счет создания общей точки синхронизации. Его использование упрощает обмен данными между двумя потоками.
 
Механизм его работы весьма прост: он ждет, пока два отдельных потока не вызовут его метод `exchange()`. 

Между ними создаётся что-то вроде точки обмена: первый поток кладет свой объект и получает взамен объект другого, а тот в свою очередь получает объект первого и кладет свой.

То есть, первый поток использует метод `exchange()` и бездействует до тех пор, пока другой поток не вызовет метод `exchange()` у этого же объекта и между ними не произойдёт обмен данными.

В качестве примера рассмотрим следующую реализацию класса Thread:
```java
public class CustomThread extends Thread {
 private String threadName;
 private String message;
 private Exchanger<String> exchanger;

 public CustomThread(String threadName, Exchanger<String> exchanger) {
   this.threadName = threadName;
   this.exchanger = exchanger;
 }

 public void setMessage(final String message) {
   this.message = message;
 }

 @Override
 public void run() {
   while (true) {
     try {
       message = exchanger.exchange(message);
       System.out.println(threadName + " поток получил сообщение: " + message);
       Thread.sleep(1000);
     } catch (Exception e) {
       e.printStackTrace();
     }
   }
 }
}
```

В конструкторе потока мы задаём объект `Exchanger`, принимающий объекты типа `String`, а в запуске (в методе `run`) используем его `exchange()` для обмена сообщением с другим потоком, использующим данный метод в этом же `Exchanger`.

Давайте запустим его в `main`:
```java
Exchanger<String> exchanger = new Exchanger<>();
CustomThread first = new CustomThread("Первый ", exchanger);
first.setMessage("Сообщение первого потока");
CustomThread second = new CustomThread("Второй", exchanger);
second.setMessage("Сообщение второго потока");
first.start();
second.start();
```
В консоли будет выведено:
```
Первый  поток получил сообщение: Сообщение второго потока
Второй поток получил сообщение: Сообщение первого потока
Второй поток получил сообщение: Сообщение второго потока
Первый  поток получил сообщение: Сообщение первого потока
Второй поток получил сообщение: Сообщение первого потока
Первый  поток получил сообщение: Сообщение второго потока
                                                  ...
```

Это значит, что обмен данными между потоками проходит успешно.

### 21) В чем заключается отличие класса Thread от интерфейса Runnable?

Первое, что отмечу, `Thread` — это класс, `Runnable` — интерфейс, что весьма очевидное отличие =D

![](https://cdn.javarush.com/images/article/4ecd768e-4daa-4421-b59b-54a6f6e68cad/512.webp)

Также скажу, что Thread использует `Runnable` (композиция). То есть, у нас есть два пути:

1. Наследоваться от Thread, переопределить метод run, после чего создать данный объект и запустить поток через метод `start()`.

2. Реализовать `Runnable` в определенном классе, реализовать его метод `run()`, после чего создать объект `Thread`, задав ему в конструктор этот объект-реализацию интерфейса `Runnable`. Ну и в конце запустить объект `Thread` с помощью метода `start()`.

Что же предпочтительнее? Давайте немного поразмыслим:
- при реализации интерфейса `Runnable` вы не изменяете поведение потока. По сути вы просто даете потоку что-то запустить. А это у нас композиция, что в свою очередь считается хорошим подходом.

- реализация `Runnable` даёт больше гибкости вашему классу. Если вы наследуетесь от `Thread`, то действие, которое вы выполняете, всегда будет в потоке. Но если вы реализуете `Runnable`, это не обязательно будет просто поток. Ведь вы можете как запустить его в потоке, так и передать его какой-либо службе-исполнителю. Ну или просто передать его куда-то как задачу в однопоточном приложении.

- использование `Runnable` позволяет логически отделить выполнение задачи от логики управления потоками.

- в Java возможно только одиночное наследование, поэтому можно расширить только один класс. В то же время количество расширяемых интерфейсов неограниченно (ну не совсем неограниченное, а 65535, но вряд ли вы когда-то упретесь в этот лимит).

Ну а что именно предпочтительнее использовать, решать уже вам ^^

### 22) Есть потоки Т1, Т2 и Т3. Как реализовать их последовательное выполнение?

Самое первое и самое простое, что приходит на ум — это использование метода `join()`. Он приостанавливает выполнение текущего (вызвавшего данный метод) потока до тех пор, пока поток, на котором был вызван метод, не закончит свое выполнение. 
 
Создадим свою реализацию потока:
 ```java
public class CustomThread extends Thread {
private String threadName;

 public CustomThread(final String  threadName){
   this.threadName = threadName;
 }

 @Override
 public void run() {
   System.out.println(threadName + " - начал свою работу");
   try {
     // происходит некая логика
     Thread.sleep(1000);
   } catch (InterruptedException e) {
     e.printStackTrace();
   }

   System.out.println(threadName + " - закончил свою работу");
 }
}
```
Запустим три таких потока поочередно, используя `join()`:
 ```java
CustomThread t1 = new CustomThread("Первый поток");
t1.start();
t1.join();
CustomThread t2 = new CustomThread("Второй поток");
t2.start();
t2.join();
CustomThread t3 = new CustomThread("Третий поток");
t3.start();
t3.join();
```
Вывод в консоли:
```
Первый поток - начал свою работу
Первый поток - закончил свою работу
Второй поток - начал свою работу
Второй поток - закончил свою работу
Третий поток - начал свою работу
Третий поток - закончил свою работу
```

Это значит, что мы справились с нашей задачей.

### 23) Что такое прокси-объект? Приведите примеры
**Прокси** — это структурный паттерн проектирования, позволяющий подставлять вместо реальных объектов специальные объекты-заменители, или другими словами — прокси-объекты.
 
Эти прокси-объекты перехватывают вызовы к изначальному объекту, позволяя вклинить некоторую логику до или после передачи вызова оригиналу.

![](https://cdn.javarush.com/images/article/d9287c2f-fb1f-483a-91e3-03a5309b5407/512.jpeg)

Примеры использования объекта-прокси:
- Как удаленный прокси — используется, когда нам нужен удаленный объект (объект в другом адресном пространстве), который необходимо представить локально. В этом случае прокси будет заниматься созданием соединения, кодирования, декодированием и прочим, в то время как клиент будет использовать его, как если бы изначальный объект, находящийся в локальном пространстве.

- Как виртуальный прокси — используется, когда нужен ресурсоемкий объект. В таком случае объект-прокси служит чем-то вроде изображения реального объекта, которого на самом деле еще нет. Когда к же данному объекту отправляется реальный запрос (вызов метода), лишь тогда происходит загрузка оригинального объекта и выполнение метода. Данный подход еще называется отложенной инициализацией, это бывает весьма удобно, ведь в некоторых ситуациях оригинальный объект может и не пригодиться, тогда и затрат на его создание не будет.

- Как защитный прокси — используется, когда нужно контролировать доступ к некоторому объекту на основе прав клиента. То есть если клиент с недостающими правами доступа попытается обратиться к оригинальному объекту, прокси его перехватит и не пустит.

Рассмотрим пример виртуального прокси:
 
У нас есть некоторый интерфейс обработчика:
```java
public interface Processor {
 void process();
}
```
Реализация которого задействует слишком много ресурсов, но при этом он может быть использован не при каждом запуске приложения:
```java
public class HiperDifficultProcessor implements Processor {
 @Override
 public void process() {
   // некоторый сверхсложная обработка данных
 }
}
```
Класс прокси:
```java
public class HiperDifficultProcessorProxy implements Processor {
private HiperDifficultProcessor processor;

 @Override
 public void process() {
   if (processor == null) {
     processor = new HiperDifficultProcessor();
   }
   processor.process();
 }
}
```
Запустим его в main:
```java
Processor processor = new HiperDifficultProcessorProxy();
// тут тяжеловсеного оригинального объекта, ещё не сущетсвует
// но при этом есть объект, который его представляет и у которого можно вызывать его методы
processor.process(); // лишь теперь, объект оригинал был создан
```
Отмечу, что проксирование используют многие фреймворки, а для Spring это и вовсе ключевой паттерн (Spring прошит им вдоль и поперек).

### 24) Что такое High Cohesion и Low Coupling? Приведите примеры.

**High Cohesion** или **Высокая связанность** — это понятие, когда некоторый класс содержит элементы, которые тесно связаны друг с другом и объединены по своему предназначению.

Например, все методы в классе `User` должны представлять поведение пользователя.

Класс имеет низкую связность, если он содержит несвязанные элементы. Например, класс User, содержащий метод валидации адреса электронной почты:
```java
public class User {
private String name;
private String email;

 public String getName() {
   return this.name;
 }

 public void setName(final String name) {
   this.name = name;
 }

 public String getEmail() {
   return this.email;
 }

 public void setEmail(final String email) {
   this.email = email;
 }

 public boolean isValidEmail() {
   // некоторая логика валидации емейла
 }
}
```
Класс пользователя может нести ответственность за хранение адреса электронной почты пользователя, но никак не за его проверку или отправку электронного письма.

Поэтому, чтобы достичь высокой связности, выносим метод валидации в отдельный класс утилиту:
```java
public class EmailUtil {
 public static boolean isValidEmail(String email) {
   // некоторая логика валидации емейла
 }
}
```
И используем по мере надобности (например, перед сохранением user-у).
 
**Low Coupling** или **Низкое зацепление** — это понятие описывающее низкую взаимозависимость между программными модулями. По сути, взаимозависимость заключается в том, как изменение одного требует изменения другого.
 
Два класса имеют сильную связь (или плотную связь), если они тесно связаны. Например, два конкретных класса, хранящие ссылки друг на друга и вызывающие методы друг друга.
 
Слабосвязанные классы более просты в разработке и поддержке. Поскольку они независимы друг от друга, их можно разрабатывать и тестировать их параллельно. Кроме того, они могут быть изменены и обновлены, не влияя друг на друга. 
 
Рассмотрим пример сильно связанных классов. У нас есть некоторый класс студента:
```java
public class Student {
 private Long id;
 private String name;
 private List<Lesson> lesson;
}
```
Который в себе содержит список уроков:
```java
public class Lesson {
 private Long id;
 private String name;
 private List<Student> students;
}
```
Каждый урок содержит ссылку на посещающих студентов. Невероятно сильное сцепление, вам так не кажется?
 
Как же можно снизить его?
 
Во-первых, сделаем так, чтобы студенты имели не список предметов, а список их идентификаторов: 
```java
public class Student {
 private Long id;
 private String name;
 private List<Long> lessonIds;
}
```
Во-вторых, классу урока вовсе не обязательно знать о всех студентах, поэтому вовсе удалим их список:
```java
public class Lesson {
 private Long id;
 private String name;
}
```
Так стало гораздо проще, и связь стала гораздо слабее, вы не находите?
