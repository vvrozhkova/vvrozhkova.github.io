---
title: Java. Основы ООП
category: java
description: Классы и объекты; 4 столпа ООП - Инкапсуляция, Наследование, Полиморфизм, Абстракция; Ключевые слова - this, super, static, final; Абстрактные классы и интерфейсы.
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

## 1. Что такое ООП и зачем оно нужно

**ООП (Объектно-Ориентированное Программирование)** — это подход, при котором программа строится из **объектов**, которые взаимодействуют друг с другом. Каждый объект объединяет в себе **данные** (состояние) и **поведение** (методы).

**Аналогия из жизни**

Представь, что ты проектируешь игру. Вместо того чтобы писать один гигантский файл с тысячами строк, ты думаешь объектами:

- Игрок — имеет имя, здоровье, уровень. Может атаковать, лечиться, двигаться.
- Монстр — имеет имя, здоровье, силу. Может атаковать, получать урон.
- Зелье — имеет тип, силу лечения. Может быть использовано.

Каждый из этих объектов — самостоятельная единица со своими данными и поведением. Это и есть ООП.

**Зачем это нужно?**

|Без ООП|С ООП|
|-|-|
|Весь код в одном месте|Код разбит на логические блоки|
|Сложно поддерживать|Легко найти и исправить баг|
|Сложно переиспользовать|Один класс — много объектов|
|Хаос при росте проекта|Структура масштабируется|

## 2. Классы и объекты

**Класс — это чертёж (шаблон)**

**Класс** описывает, какие данные и поведение будут у объектов. Это как чертёж дома: на чертеже нет настоящего дома, но описано, где стены, окна, двери.

**Объект — это конкретный экземпляр**

**Объект** — это конкретная «постройка» по чертежу. По одному чертежу можно построить много домов, каждый со своим адресом и жильцами.

```java
// КЛАСС (чертёж)
public class Cat {
    // Поля (данные / состояние)
    String name;
    int age;
    String color;

    // Методы (поведение)
    public void meow() {
        System.out.println(name + " говорит: Мяу!");
    }

    public void sleep() {
        System.out.println(name + " спит... 💤");
    }
}
```
### Создание объектов

```java
public class Main {
    public static void main(String[] args) {
        // Создаём объекты (экземпляры класса Cat)
        Cat cat1 = new Cat();
        cat1.name = "Мурка";
        cat1.age = 3;
        cat1.color = "рыжий";

        Cat cat2 = new Cat();
        cat2.name = "Барсик";
        cat2.age = 5;
        cat2.color = "чёрный";

        // Используем методы
        cat1.meow();   // "Мурка говорит: Мяу!"
        cat2.sleep();  // "Барсик спит... 💤"

        System.out.println(cat1.name); // "Мурка"
        System.out.println(cat2.age);  // 5
    }
}
```

> 🔍 Разбор:
> - Cat cat1 — объявляем переменную ссылочного типа Cat
> - new Cat() — оператор new создаёт объект в памяти и возвращает ссылку на него
> - cat1.name = "Мурка" — через точку обращаемся к полю объекта
> - cat1.meow() — вызываем метод конкретного объекта

### Конструктор

**Конструктор** — это специальный метод, который вызывается при создании объекта (new). Он инициализирует поля.

```java
public class Cat {
    String name;
    int age;
    String color;

    // Конструктор
    public Cat(String name, int age, String color) {
        this.name = name;
        this.age = age;
        this.color = color;
    }

    // Конструктор по умолчанию (без параметров)
    public Cat() {
        this.name = "Безымянный";
        this.age = 0;
        this.color = "неизвестный";
    }

    public void meow() {
        System.out.println(name + " говорит: Мяу!");
    }
}
```

Теперь создание объектов выглядит чище:

```java
Cat cat1 = new Cat("Мурка", 3, "рыжий");
Cat cat2 = new Cat("Барсик", 5, "чёрный");
Cat cat3 = new Cat(); // Безымянный, 0, неизвестный
```

> ⚠️ Важно: если ты не напишешь ни одного конструктора, Java автоматически создаст конструктор по умолчанию (пустой). Но как только ты написал свой конструктор с параметрами — автоматический пустой конструктор исчезает. Если он нужен — напиши его явно.

### Перегрузка конструкторов

Конструкторы можно перегружать, как обычные методы:

```java
public class Cat {
    String name;
    int age;

    public Cat(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Cat(String name) {
        this.name = name;
        this.age = 0;
    }

    public Cat() {
        this.name = "Безымянный";
        this.age = 0;
    }
}
```

## 3. Ключевые слова: this, super, static, final

### this — ссылка на текущий объект

this используется внутри метода или конструктора и указывает на тот самый объект, у которого вызван этот метод.

#### Разрешение конфликта имён

```java
public class Cat {
    String name;

    public Cat(String name) {
        // this.name — поле объекта
        // name — параметр конструктора
        this.name = name;
    }
}
```

Без this Java подумала бы, что ты присваиваешь параметр самому себе.

#### Вызов другого конструктора

```java
public class Cat {
    String name;
    int age;

    public Cat(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Cat(String name) {
        this(name, 0); // вызываем конструктор выше
    }
}
```

> ⚠️ this(...) должен быть первой строкой в конструкторе.

### static — принадлежит классу, а не объекту

```java
public class Cat {
    static int totalCats = 0; // общее поле для ВСЕХ котов

    String name;

    public Cat(String name) {
        this.name = name;
        totalCats++; // увеличиваем при создании каждого кота
    }

    public static void printTotal() {
        System.out.println("Всего котов: " + totalCats);
        // System.out.println(name); // ❌ ОШИБКА! static метод не видит нестатические поля
    }
}
```

```java
Cat c1 = new Cat("Мурка");
Cat c2 = new Cat("Барсик");
Cat.printTotal(); // "Всего котов: 2" — вызываем через класс, не через объект
```
	
||Нестатическое|Статическое|
|-|-|-|
|Поле|У каждого объекта своё|Одно на весь класс|
|Метод|Вызывается через объект|Вызывается через класс|
|Видит|Всё|Только статическое|

### final — «окончательный», нельзя изменить

```java
// final переменная — константа
final double PI = 3.14159;
// PI = 3.14; // ❌ ОШИБКА: нельзя переприсвоить

// final метод — нельзя переопределить в наследнике
public final void meow() { ... }

// final класс — нельзя наследоваться от него
public final class String { ... } // String в Java — final!
```

> 💡 Соглашение: константы именуются в UPPER_SNAKE_CASE: MAX_SIZE, DEFAULT_NAME.

### super — ссылка на родительский класс

Подробно разберём в разделе «Наследование», но вот превью:

```java
public class Kitten extends Cat {
    public Kitten(String name) {
        super(name); // вызываем конструктор родителя Cat
    }

    @Override
    public void meow() {
        super.meow(); // вызываем метод родителя
        System.out.println("...но тихонько");
    }
}
```

## 4. Четыре столпа ООП

### Столп 1: Инкапсуляция

**Инкапсуляция** — это сокрытие внутреннего состояния объекта и предоставление доступа к нему только через публичные методы.

**Аналогия**
Представь банкомат. Ты не можешь залезть внутрь и взять деньги руками. Ты взаимодействуешь через интерфейс: вставляешь карту, вводишь пин-код, нажимаешь кнопки. Банкомат инкапсулирует свои внутренности.

**Зачем?**
- Защита данных: никто не установит возраст кота в −5
- Контроль: можно добавить валидацию, логирование
- Гибкость: можно изменить внутреннюю реализацию, не ломая внешний код

**Модификаторы доступа**

|Модификатор|Класс|Пакет|Наследник|Все|
|-|-|-|-|-|
|private|✅|❌|❌|❌|
|(default)|✅|✅|❌|❌|
|protected|✅|✅|✅|❌|
|public|✅|✅|✅|✅|

#### Пример инкапсуляции

```java
public class Cat {
    // Поля — private! Никто снаружи не может менять напрямую
    private String name;
    private int age;

    public Cat(String name, int age) {
        setName(name); // используем сеттер даже в конструкторе
        setAge(age);
    }

    // Геттер — для чтения
    public String getName() {
        return name;
    }

    // Сеттер — для записи с валидацией
    public void setName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Имя не может быть пустым");
        }
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age < 0 || age > 30) {
            throw new IllegalArgumentException("Некорректный возраст: " + age);
        }
        this.age = age;
    }

    public void meow() {
        System.out.println(name + " говорит: Мяу!");
    }
}
```

```java
Cat cat = new Cat("Мурка", 3);
System.out.println(cat.getName()); // "Мурка"
cat.setAge(4);                     // ✅ OK
// cat.setAge(-5);                 // 💥 Исключение!
// cat.age = -5;                   // 💥 Ошибка компиляции: private
```

### Столп 2: Наследование

**Наследование** — это механизм, позволяющий одному классу (потомку) получить поля и методы другого класса (родителя).

**Аналогия**

«Кошка» — это «Животное». Кошка наследует от Животного способность дышать, есть, спать. Но добавляет своё: мурлыкать, царапаться.

**Синтаксис**

```java
// Родительский класс (суперкласс)
public class Animal {
    protected String name;
    protected int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void eat() {
        System.out.println(name + " ест");
    }

    public void sleep() {
        System.out.println(name + " спит");
    }
}

// Дочерний класс (подкласс)
public class Cat extends Animal {
    private String color;

    public Cat(String name, int age, String color) {
        super(name, age); // вызываем конструктор родителя
        this.color = color;
    }

    // Новый метод, которого нет у Animal
    public void meow() {
        System.out.println(name + " говорит: Мяу!");
    }
}

// Ещё один дочерний класс
public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);
        this.breed = breed;
    }

    public void bark() {
        System.out.println(name + " говорит: Гав!");
    }
}
```

```java
Cat cat = new Cat("Мурка", 3, "рыжий");
cat.eat();   // "Мурка ест" — унаследованный метод
cat.meow();  // "Мурка говорит: Мяу!" — свой метод

Dog dog = new Dog("Рекс", 5, "овчарка");
dog.sleep(); // "Рекс спит" — унаследованный метод
dog.bark();  // "Рекс говорит: Гав!" — свой метод
```

> ⚠️ Важно: в Java одиночное наследование — класс может наследоваться только от одного родителя. Но может реализовывать много интерфейсов (об этом позже).

#### Переопределение методов (Override)

Дочерний класс может **переопределить** метод родителя — дать ему новую реализацию:

```java
public class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println(name + " ест рыбу 🐟");
    }
}
```

> 💡 Аннотация @Override — не обязательна, но очень рекомендуется. Компилятор проверит, что ты действительно переопределяешь метод родителя, а не создаёшь новый с похожим именем (например, из-за опечатки).

### Столп 3: Полиморфизм

**Полиморфизм** (от греч. «много форм») — это возможность работать с объектами разных классов через общий интерфейс (родительский тип), при этом каждый объект ведёт себя по-своему.

**Аналогия**

Команда «Голос!» для собаки означает «Гав!», для кошки — «Мяу!», для утки — «Кря!». Одна команда — разное поведение в зависимости от того, кто её выполняет.

**Пример**

```java
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void makeSound() {
        System.out.println(name + " издаёт звук");
    }
}

public class Cat extends Animal {
    public Cat(String name) { super(name); }

    @Override
    public void makeSound() {
        System.out.println(name + ": Мяу!");
    }
}

public class Dog extends Animal {
    public Dog(String name) { super(name); }

    @Override
    public void makeSound() {
        System.out.println(name + ": Гав!");
    }
}

public class Duck extends Animal {
    public Duck(String name) { super(name); }

    @Override
    public void makeSound() {
        System.out.println(name + ": Кря!");
    }
}
```

А теперь — магия **полиморфизма**:

```java
public class Main {
    public static void main(String[] args) {
        // Массив типа Animal, но внутри — разные объекты
        Animal[] animals = {
            new Cat("Мурка"),
            new Dog("Рекс"),
            new Duck("Дональд"),
            new Cat("Барсик")
        };

        // Один цикл — разное поведение!
        for (Animal animal : animals) {
            animal.makeSound();
        }
        // Мурка: Мяу!
        // Рекс: Гав!
        // Дональд: Кря!
        // Барсик: Мяу!
    }
}
```

**Что здесь произошло:**

- Переменная animal имеет тип Animal (компилятор знает только методы Animal)
- Но в рантайме JVM смотрит на реальный тип объекта и вызывает переопределённый метод
- Это называется динамическое связывание (dynamic dispatch)

**Upcasting и Downcasting**

```java
// Upcasting (восходящее приведение) — всегда безопасно
Cat cat = new Cat("Мурка");
Animal animal = cat; // Cat → Animal (автоматически)

// Downcasting (нисходящее приведение) — нужно явно, может упасть
Animal a = new Cat("Мурка");
Cat c = (Cat) a;     // ✅ OK, потому что a реально Cat

Animal b = new Dog("Рекс");
// Cat c2 = (Cat) b; // 💥 ClassCastException! Dog — не Cat

// Безопасная проверка перед downcasting:
if (b instanceof Cat) {
    Cat c2 = (Cat) b;
}
```

>💡 instanceof — оператор, который проверяет, является ли объект экземпляром указанного класса.

**Два вида полиморфизма**

|Вид|Механизм|Когда определяется|
|-|-|-|
|Компиляции (статический)|Перегрузка методов|При компиляции|
|Выполнения (динамический)|Переопределение методов|При выполнении программы|

### Столп 4: Абстракция

**Абстракция** — это выделение существенных характеристик объекта и игнорирование несущественных деталей.

**Аналогия**

Когда ты водишь машину, ты используешь руль, педали и кнопки. Тебе не нужно знать, как работает двигатель внутреннего сгорания, коробка передач или система впрыска топлива. Это **абстракция** — тебе предоставлен простой интерфейс, а сложность скрыта внутри.

В Java абстракция реализуется через **абстрактные классы** и **интерфейсы**.

## 5. Абстрактные классы

**Абстрактный класс** — это класс, который нельзя инстанциировать (создать объект). Он может содержать:

- Обычные методы с реализацией
- **Абстрактные методы** — без тела (только сигнатура), которые обязаны реализовать наследники

```java
public abstract class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    // Обычный метод
    public void printColor() {
        System.out.println("Цвет: " + color);
    }

    // Абстрактные методы — наследники ОБЯЗАНЫ их реализовать
    public abstract double area();
    public abstract double perimeter();
}
```

```java
public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}

public class Rectangle extends Shape {
    private double width, height;

    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }

    @Override
    public double perimeter() {
        return 2 * (width + height);
    }
}
```

```java
// Shape s = new Shape("красный"); // ❌ ОШИБКА: нельзя создать объект абстрактного класса

Shape circle = new Circle("синий", 5.0);
Shape rect = new Rectangle("зелёный", 3.0, 4.0);

System.out.println("Площадь круга: " + circle.area());       // 78.54
System.out.println("Периметр прямоугольника: " + rect.perimeter()); // 14.0
```

## 6. Интерфейсы

**Интерфейс** — это «контракт», который описывает, **что** класс должен уметь делать, но не **как**.

```java
public interface Flyable {
    void fly(); // абстрактный метод (по умолчанию public abstract)
}

public interface Swimmable {
    void swim();
}
```

Класс **реализует** интерфейс с помощью `implements`:

```java
public class Duck extends Animal implements Flyable, Swimmable {
    public Duck(String name) { super(name); }

    @Override
    public void fly() {
        System.out.println(name + " летит 🦆");
    }

    @Override
    public void swim() {
        System.out.println(name + " плывёт 🌊");
    }

    @Override
    public void makeSound() {
        System.out.println(name + ": Кря!");
    }
}
```

> 💡 Класс может реализовать сколько угодно интерфейсов — это обход ограничения одиночного наследования.

### Методы по умолчанию в интерфейсах (Java 8+)

Интерфейсы могут содержать методы с реализацией:

```java
public interface Loggable {
    void log(String message); // абстрактный

    default void logError(String error) {
        log("❌ ERROR: " + error); // реализация по умолчанию
    }

    default void logInfo(String info) {
        log("ℹ️ INFO: " + info);
    }
}
```

#### Статические и приватные методы в интерфейсах

```java
public interface MathUtils {
    static double square(double x) {
        return x * x;
    }

    // Java 9+
    private void helperMethod() {
        // вспомогательная логика
    }
}
```

## 7. Абстрактный класс vs Интерфейс

|Характеристика|Абстрактный класс|Интерфейс|
|-|-|-|
|Ключевое слово|abstract class|interface|
|Наследование|extends (один)|implements (много)|
|Конструктор|✅ Есть|❌ Нет|
|Поля|Любые|Только public static final (константы)|
|Методы|Абстрактные + обычные|Абстрактные + default + static|
|Когда использовать|«is-a» + общая логика|«can-do» (способность)|

### Когда что выбрать?

- **Абстрактный класс:** когда у классов есть общее состояние (поля) и общая логика, и они связаны отношением «является» (Cat является Animal)

- **Интерфейс:** когда нужно описать способность (Flyable, Swimmable, Serializable), которую могут иметь совершенно разные классы

>💡 Правило большого пальца: если сомневаешься — начни с интерфейса. Интерфейсы более гибкие.

## 8. Полный пример: система зоопарка

Соберём всё вместе:

```java
// === ИНТЕРФЕЙСЫ ===
public interface Feedable {
    void feed(String food);
}

public interface Playable {
    void play();
}

// === АБСТРАКТНЫЙ КЛАСС ===
public abstract class Animal implements Feedable {
    private String name;
    private int age;
    private double health;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
        this.health = 100.0;
    }

    public String getName() { return name; }
    public int getAge() { return age; }
    public double getHealth() { return health; }

    public void heal(double amount) {
        this.health = Math.min(100, this.health + amount);
    }

    public abstract String makeSound();

    @Override
    public String toString() {
        return name + " (" + age + " лет, здоровье: " + health + ")";
    }
}

// === КОНКРЕТНЫЕ КЛАССЫ ===
public class Cat extends Animal implements Playable {
    public Cat(String name, int age) { super(name, age); }

    @Override
    public String makeSound() { return "Мяу!"; }

    @Override
    public void feed(String food) {
        System.out.println(getName() + " ест " + food + " 🐟");
        heal(10);
    }

    @Override
    public void play() {
        System.out.println(getName() + " играет с клубком 🧶");
    }
}

public class Dog extends Animal implements Playable {
    public Dog(String name, int age) { super(name, age); }

    @Override
    public String makeSound() { return "Гав!"; }

    @Override
    public void feed(String food) {
        System.out.println(getName() + " ест " + food + " 🦴");
        heal(15);
    }

    @Override
    public void play() {
        System.out.println(getName() + " играет с мячом 🎾");
    }
}

// === ГЛАВНЫЙ КЛАСС ===
public class Zoo {
    public static void main(String[] args) {
        Animal[] animals = {
            new Cat("Мурка", 3),
            new Dog("Рекс", 5),
            new Cat("Барсик", 1)
        };

        // Полиморфизм в действии
        for (Animal animal : animals) {
            System.out.println(animal);
            System.out.println("  Звук: " + animal.makeSound());
            animal.feed("корм");
        }

        // Проверка интерфейса
        for (Animal animal : animals) {
            if (animal instanceof Playable p) {
                p.play(); // Java 16+ pattern matching
            }
        }
    }
}
```

## 9. 🎯 Мини-задания для практики

1. **Банковский аккаунт** — создай класс `BankAccount` с инкапсулированными полями `balance`, `owner`. Методы: `deposit(double)`, `withdraw(double)` (с проверкой на достаточность средств), `getBalance()`.
2. **Фигуры** — создай абстрактный класс `Shape` с абстрактными методами `area()` и `perimeter()`. Реализуй `Circle`, `Rectangle`, `Triangle`. Напиши метод, который принимает массив `Shape[]` и находит фигуру с наибольшей площадью.
3. **Интерфейсы** — создай интерфейс Sortable с методом `sort(int[])`. Реализуй два класса: `BubbleSorter` и `QuickSorter`, каждый со своей реализацией. Напиши метод, который принимает `Sortable` и массив, и сортирует его.
4. **Наследование** — создай иерархию: `Vehicle → Car`, `Motorcycle`, `Truck`. У `Vehicle`: `speed`, `fuel`. Метод `drive(int km)`. У каждого подкласса своя реализация расхода топлива.
5. **Система уведомлений** — интерфейс `Notifier` с методом `send(String message)`. Реализации: `EmailNotifier`, `SmsNotifier`, `PushNotifier`. Метод `notifyAll(List<Notifier> notifiers, String msg)`, который отправляет через все каналы.

## 📝 Что запомнить

1. Класс = чертёж, объект = экземпляр. Создаём через new
2. Конструктор инициализирует объект, может быть перегружен
3. Инкапсуляция = private поля + public геттеры/сеттеры
4. Наследование = extends, один родитель, super для вызова родителя
5. Полиморфизм = один тип переменной, разное поведение в рантайме
6. Абстракция = абстрактные классы (abstract) и интерфейсы (interface)
7. this = текущий объект, static = принадлежит классу, final = нельзя изменить
8. Интерфейс можно реализовать много раз, наследоваться — только от одного класса

## Вопросы на собеседованиях

### 1) Какие особенности есть у Java?

**Ответ:**

1. ООП концепты:
    1. объектная ориентированность;
    2. наследование;
    3. инкапсуляция;
    4. полиморфизм;
    5. абстракция.

2. Кроссплатформенность: программа на Java может быть запущена на любой платформе без каких-либо изменений. Единственное, что нужно — установленная JVM (java virtual machine).

3. Высокая производительность: JIT(Just In Time compiler) позволяет высокую производительность. JIT конвертирует байт-код в машинный код и потом JVM стартует выполнение.

4. Мультипоточность: поток выполнения, известный как Thread. JVM создает thread, который называется main thread. Программист может создать несколько потоков наследованием от класса Thread или реализуя интерфейс Runnable.

### 2) Что такое наследование?

Под наследованием подразумевается, что один класс может наследовать("extends") другой класс.

Таким образом можно переиспользовать код с класса, от которого наследуются.

Существующий класс известен как `superclass`, а создаваемый — `subclass`. Также еще говорят `parent` и `child`.

```java
public class Animal {
   private int age;
}

public class Dog extends Animal {

}
```

где Animal — это parent, а Dog — child.

### 3) Что такое инкапсуляция?
Такой вопрос часто встречается на собеседовании Java-разработчика. Инкапсуляция — это сокрытие реализации при помощи модификаторов доступа, при помощи геттеров и сеттеров. Это делается для того, чтобы закрыть доступ для внешнего использования в тех местах, где разработчики считают нужным.

Доступный пример из жизни — это автомобиль. У нас нет прямого доступа к работе двигателя. Для нас работа заключается в том, чтобы вставить ключ в зажигание и включить двигатель. А какие уже процессы будут происходить под капотом — не наше дело.

Даже более того, наше вмешательство в эту деятельность может привести к непредсказуемой ситуации, из-за которой можно и машину сломать, и себе навредить. Ровно то же самое происходит и в программировании.

### 4) Что такое полиморфизм?
Полиморфизм — это способность программы идентично использовать объекты с одинаковым интерфейсом без информации о конкретном типе этого объекта. Как говорится, один интерфейс — множество реализаций.

При помощи полиморфизма можно объединять и использовать разные типы объектов по их общему поведению.

Например, есть у нас класс Animal, у которого есть два наследника — Dog  и Cat. У общего класса Animal есть общее поведение для всех — издавать звук. В случае, когда нужно собрать воедино всех наследников класса Animal и выполнить метод "издавать звук", используем возможности полиморфизма. Вот как будет это выглядеть:

```java
List<Animal> animals = Arrays.asList(new Cat(), new Dog(), new Cat());
animals.forEach(animal -> animal.makeSound());
```

Таким образом, полиморфизм помогает нам. Причем это относится и к полиморфным (перегруженным) методам.


### 5) Что такое конструктор в Java?

Следующие характеристики являются валидными:

1. Когда новый объект создается, программа использует для этого соответствующий конструктор.
2. Конструктор похож на метод. Его особенность заключается в том, что нет возвращающего элемента (в том числе и void), а его имя совпадает с именем класса.
3. Если не пишется никакого конструктора явно, пустой конструктор будет создан автоматически.
4. Конструктор может быть переопределен.
5. Если был создан конструктор с параметрами, а нужен еще и без параметров, его нужно писать отдельно, так как он не создается автоматически.

### 6) Какие два класса не наследуются от Object?

Не ведитесь на провокации, нет таких классов: все классы прямо или через предков наследуются от класса Object!


### 7) Что такое Interface?

Множественное наследование не реализовано в джаве, поэтому чтобы преодолеть эту проблему, были добавлены интерфейсы в том виде, в котором мы их знаем ;)

Долгое время у интерфейсов были только методы без их реализации. В рамках этого ответа поговорим именно о них.

Например:

```java
public interface Animal {
   void makeSound();
   void eat();
   void sleep();
}
```

Из этого вытекают некоторые нюансы:

- все методы в интерфейсе — публичные и абстрактные;
- все переменные — public static final;
- классы не наследуют их (extends), реализовывают (implements). Причем реализовывать можно сколь угодно много интерфейсов.
- классы, которые реализуют интерфейс, должны предоставить реализацию всех методов, которые есть в интерфейсе.

Вот так:

```java
public class Cat implements Animal {
   public void makeSound() {
       // реализация метода
   }

   public void eat() {
       // реализация
   }

   public void sleep() {
       // реализация
   }
}
```

### 8) Что такое default method в Interface?

Теперь поговорим о дефолтных методах. Для чего, для кого? Эти методы добавили, чтобы все сделать "и вашим, и нашим".

О чем это я? Да о том, что с одной стороны нужно было добавить новую функциональность: лямбды, Stream API, с другой стороны, нужно было оставить то, чем славится джава — обратную совместимость. Для этого нужно было ввести уже готовые решения в интерфейсы. Так к нам и пришли дефолтные методы.

То есть, дефолтный метод — это реализованный метод в интерфейсе, у которого есть ключевое слово default.

Например, всем известный метод stream() в интерфейсе Collection. Проверьте, этот интерфейс вовсе не так прост как кажется ;).

Или также не менее известный метод forEach() из интерфейса Iterable. Его также не было до тех пор, пока не добавили дефолтные методы.

### 9) А как тогда наследовать два одинаковых дефолтных метода?

Исходя из предыдущего ответа на то, что такое дефолтный метод, можно задать другой вопрос.

Если можно реализовать методы в интерфейсах, то теоретически можно реализовать два интерфейса с одинаковым методом, и как такое делать?

Есть два разных интерфейса с одинаковым методом:

```java
interface A {
   default void foo() {
       System.out.println("Foo A");
   }
}

interface B {
   default void foo() {
       System.out.println("Foo B");
   }
}
```

И есть класс, который реализует эти два интерфейса. Чтобы не было неопределенности и скомпилировался код, нам нужно переопределить метод foo() в классе C, причем можно просто вызвать в нем метод foo() любого из интерфейсов — A или B. Но только как выбрать специфический метод интерфейса А или В?

Для этого есть конструкция такого вида: A.super.foo():

```java
public class C implements A, B {
   @Override
   public void foo() {
       A.super.foo();
   }
}
```

или:

```java
public class C implements A, B {
   @Override
   public void foo() {
       B.super.foo();
   }
}
```

Таким образом, метод foo() класса C будет использовать либо дефолтный метод foo() из интерфейса A, либо метод foo() из интерфейса B.

### 10) Что такое абстрактные методы и классы?

В джава есть зарезервированное слово abstract, которое используется для обозначения абстрактных классов и методов.
Для начала — определения.

Абстрактным методом называется метод, который создан без реализации с ключевым словом abstract в абстрактном классе. То есть, это метод как в интерфейсе, только с добавкой ключевого слова, например:

`public abstract void foo();`

Абстрактным классом называется класс, который имеет также abstract слово:

```java
public abstract class A {

}
```

У абстрактного класса есть несколько особенностей:

- на его основе нельзя создать объект;
- он может иметь абстрактные методы;
- он может и не иметь абстрактные методы.

Абстрактные классы нужны для обобщения какой-то абстракции (сорян за тавтологию), которой в реальной жизни нет, но она содержит множество общих поведений и состояний (то есть, методов и переменных).

Примеров из жизни — хоть отбавляй. Всё вокруг нас. Это может быть "животное", "машина", "геометрическая фигура" и так далее.

### 11) Какая разница между абстрактным классом и интерфейсом?

Абстрактный класс:

- абстрактные классы имеют дефолтный конструктор; он вызывается каждый раз, когда создается потомок этого абстрактного класса;
- содержит как абстрактные методы, так и не абстрактные. По большому счету может и не содержать абстрактных методов, но все равно быть абстрактным классом;
- класс, который наследуется от абстрактного, должен реализовать только абстрактные методы;
- абстрактный класс может содержать Instance Variable(смотри вопрос №5).

Интерфейс:

- не имеет никакого конструктора и не может быть инициализирован;
- только абстрактные методы должны быть добавлены (не считая default methods);
- классы, реализующие интерфейс, должны реализовать все методы (не считая default methods);
- интерфейсы могут содержать только константы.

### 12) Что такое ключевое слово final и где его использовать?

Ключевое слово final можно использовать для переменных, методов и классов.
- final переменную нельзя переназначить на другой объект.
- final класс бесплоден)) у него не может быть наследников.
- final метод не может быть переопределен у предка.

Пробежали по верхам, теперь обсудим более подробно.

#### final переменные

Java дает нам два способа создать переменную и присвоить ей некоторое значение:
1. Можно объявить переменную и инициализировать ее позже.
2. Можно объявить переменную и сразу же назначить ее.

Пример с использованием final переменной для этих случаев:  

```java
public class FinalExample {

   //статическая переменная final, которая сразу же инициализируется:
   final static String FINAL_EXAMPLE_NAME = "I'm likely final one";

   //final переменная, которая не инициализирована, но работать будет только если
   //инициализировать это в конструкторе:
   final long creationTime;

   public FinalExample() {
       this.creationTime = System.currentTimeMillis();
   }

   public static void main(String[] args) {
       FinalExample finalExample = new FinalExample();
       System.out.println(finalExample.creationTime);

       // final поле FinalExample.FINAL_EXAMPLE_NAME не может быть заасайнено
//    FinalExample.FINAL_EXAMPLE_NAME = "Not you're not!";

       // final поле Config.creationTime не может быть заасайнено
//    finalExample.creationTime = 1L;
   }
}
```

#### Можно ли считать Final переменную константой?

Поскольку у нас не получится присвоить новое значение для final переменной, кажется, что это переменные константы. Но это только на первый взгляд.

Если тип данных, на который ссылается переменная —  immutable, то да, это константа.

А если тип данных mutable, то есть изменяемый, при помощи методов и переменных можно будет изменить значение объекта, на который ссылается final переменная, и в таком случае назвать ее константой нельзя.

Так вот, на примере видно, что часть финальных переменных действительно константы, а часть — нет, и их можно изменить.

```java
public class FinalExample {

   //неизменяемые финальные переменные:
   final static String FINAL_EXAMPLE_NAME = "I'm likely final one";
   final static Integer FINAL_EXAMPLE_COUNT  = 10;

   //изменяемые фильнаные переменные
   final List<String> addresses = new ArrayList();
   final StringBuilder finalStringBuilder = new StringBuilder("constant?");
}
```

#### Local final переменные

Когда final переменная создается внутри метода, ее называют local final переменная:

```java
public class FinalExample {

   public static void main(String[] args) {
       // Вот так можно
       final int minAgeForDriveCar = 18;

       // а можно и так, в цикле foreach:
       for (final String arg : args) {
           System.out.println(arg);
       }
   }

}
```

Мы можем использовать ключевое слово final в расширенном цикле for, потому что после завершения итерации цикла for каждый раз создается новая переменная. Только это все не относится к нормальному циклу for, поэтому приведенный ниже код выдаст ошибку времени компиляции.

```java
// final local переиенная j не может быть назначена
for (final int i = 0; i < args.length; i ++) {
   System.out.println(args[i]);
}
```

#### Final класс

Нельзя расширять класс, объявленный как final. Проще говоря, никакой класс не может наследоваться от данного. Прекрасным примером final класса в JDK является String. 

Первый шаг к созданию неизменяемого класса — пометить его как final, и тогда нельзя будет его расширить:

```java
public final class FinalExample {
}

// Здесь будет ошибка компиляции
class WantsToInheritFinalClass extends FinalExample {
}
```

#### Final методы

Когда метод маркирован как final, его называют final метод (логично, правда?). Final метод нельзя переопределять у класса наследника. 

К слову, методы в классе Object — wait() и notify() — это final, поэтому у нас нет возможность их переопределять.

```java
public class FinalExample {
   public final String generateAddress() {
       return "Some address";
   }
}

class ChildOfFinalExample extends FinalExample {

   // здесь будет ошибка компиляции
   @Override
   public String generateAddress() {
       return "My OWN Address";
   }
}
```

#### Как и где использовать final в Java

- использовать ключевое слово final, чтобы определить некоторые константы уровня класса;
- создавать final переменные для объектов, когда вы не хотите, чтобы они были изменены. Например, специфичные для объекта свойства, которые мы можем использовать для целей логирования;
- если не нужно, чтобы класс был расширен, отметить его как окончательный;
- если нужно создать immutable< класс, нужно сделать его финальным;
- если нужно, чтоб реализация метода не менялась в наследниках, обозначить метод как final. Это очень важно, чтобы быть уверенным, что реализация не изменится.

### 13) Что такое mutable immutable?

#### Mutable

Mutable называются объекты, чьи состояния и переменные можно изменить после создания. Например такие классы, как StringBuilder, StringBuffer.

Пример:

```java
public class MutableExample {

   private String address;

   public MutableExample(String address) {
       this.address = address;
   }

   public String getAddress() {
       return address;
   }

   // этот сеттер может изменить поле name
   public void setAddress(String address) {
       this.address = address;
   }

   public static void main(String[] args) {

       MutableExample obj = new MutableExample("first address");
       System.out.println(obj.getAddress());

       // обновляем поле name, значит это mutable объект
       obj.setAddress("Updated address");
       System.out.println(obj.getAddress());
   }
}
```

#### Immutable

Immutable называются объекты, состояния и переменные которых нельзя изменить после создания объекта. Чем не отличный ключ для HashMap, да?) Например, String, Integer, Double и так далее.

Пример:

```java
// сделаем этот класс финальным, чтобы никто не мог его изменить
public final class ImmutableExample {

   private String address;

   ImmutableExample (String address) {
       this.address = address;
   }

   public String getAddress() {
       return address;
   }

   //удаляем сеттер

   public static void main(String[] args) {

       ImmutableExample obj = new ImmutableExample("old address");
       System.out.println(obj.getAddress());

       // Поэтому никак не изменить это поле, значит это immutable объект
       // obj.setName("new address");
       // System.out.println(obj.getName());

   }
}
```

### 14) Как написать immutable класс?

После того, как выясните, что такое mutable и immutable объекты, следующий вопрос будет закономерный — как написать его?

Чтоб написать immutable неизменяемый класс, нужно следовать простым пунктам:
сделать класс финальным.
сделать все поля приватными и создать только геттеры к ним. Сеттеры, разумеется, не нужно.
Сделать все mutable поля final, чтобы установить значение можно было только один раз.
инициализировать все поля через конструктор, выполняя глубокое копирование (то есть, копируя и сам объект, и его переменные, и переменные переменных, и так далее)
клонировать объекты mutable переменных в геттерах, чтобы возвращать только копии значений, а не ссылки на актуальные объекты.
Пример:

```java
/**
* Пример по созданию immutable объекта.
*/
public final class FinalClassExample {

   private final int age;

   private final String name;

   private final HashMap<String, String> addresses;

   public int getAge() {
       return age;
   }


   public String getName() {
       return name;
   }

   /**
    * Клонируем объект перед тем, как вернуть его.
    */
   public HashMap<String, String> getAddresses() {
       return (HashMap<String, String>) addresses.clone();
   }

   /**
    * В конструкторе выполняем глубокое копирование для mutable объектов.
    */
   public FinalClassExample(int age, String name, HashMap<String, String> addresses) {
       System.out.println("Выполняем глубокое копирование в конструкторе");
       this.age = age;
       this.name = name;
       HashMap<String, String> temporaryMap = new HashMap<>();
       String key;
       Iterator<String> iterator = addresses.keySet().iterator();
       while (iterator.hasNext()) {
           key = iterator.next();
           temporaryMap.put(key, addresses.get(key));
       }
       this.addresses = temporaryMap;
   }
}
```

### 15) Назовите все методы класса Object

У класса Object есть 11 методов:

- Class<?> getClass() — получение класса текущего объекта;
- int hashCode() — получение хеш кода текущего объекта;
- boolean equals​(Object obj) — сравнение текущего объекта с другим;
- Object clone() — создание и возвращение копии текущего объекта;
- String toString() — получение строкового представления объекта;
- void notify() — пробуждение одного потока, ожидающего на мониторе данного объекта (выбор потока рандомный);
- void notifyAll() — пробуждение всех потоков, ожидающего на мониторе данного объекта;
- void wait() — переключает текущий поток в режим ожидания (замораживает его) на текущий монитор, работает только в synchronized блоке, пока какой-нибудь notify или notifyAll не разбудит поток;
- void wait(long timeout) — также замораживает текущий поток на текущий монитор (на текущий synchronized), но уже с таймером выхода из этого состояния (ну или опять же: пока notify или notifyAll не разбудит);
- void wait(long timeout, int nanos) — метод, аналогичный вышеописанному, но с более точным таймеров выхода из заморозки;
- void finalize() — перед удалением этого объекта сборщиком мусора вызывается этот метод (напоследок). Он используется для очистки занимаемых ресурсов.

Для корректного использования методов hashCode, equals​, clone, toString, finalize их необходимо переопределять, учитывая текущую задачу и обстоятельства.

### 16) Объекты каких стандартных классов immutable есть в Java?

Immutable — это объект, который не позволяет изменять свои первоначальные параметры. Возможно, он имеет методы, которые возвращают новые объекты данного типа, с параметрами, которые вы хотели изменить.
 
Некоторые стандартные immutable объекты:
безусловно, самый известный immutable объект в Java — это String;
экземпляры классов-оберток, которые оборачивают стандартные типы: Boolean, Character, Byte, Short, Integer, Long, Double, Float;
объекты, которые как правило используются для особо БОЛЬШИХ чисел — BigInteger и BigDecimal;
объект, который является единицей в стектрейсах (например, в стектрейсе исключений) StackTraceElement;
объект класса File — может изменять файлы, но при этом сам по себе он неизменен;
UUID — который часто используется как уникальный id элементов;
все объекты классов пакета java.time;
Locale — используется для определения географического, политического или культурного региона.

### 17) Каковы преимущества immutable object перед обычными объектами?
Такие объекты — безопасные при использовании в многопоточной среде. Используя их, вы можете не беспокоиться о том, что будут утеряны данные из-за состояния гонки потоков. В отличие от работы с обычными объектами: в таком случае вам придется очень хорошо продумать и проработать механизмы использования объекта в параллельной среде.
Immutable объекты являются хорошими ключами в map, ведь если использовать изменяемый объект, а затем объект изменит свое состояние, при использовании HashMap может возникнуть путаница: объект все еще будет присутствовать, и если использовать containsKey(), то его можно и не найти.
Immutable объекты отлично подходят для хранения неизменных (константных) данных, которые ни в коем случае не должны быть изменены во время работы программы.
“Атомарность по отношению к сбою” — если immutable объект выбросит исключение, то он всё равно не останется в нежелательном (сломанном) состоянии.
Данные классы просты в тестировании.
Не нужны такие дополнительные механизмы как конструктор копирования и реализация клона.

### 18) В чём преимущества ООП в целом и по сравнению с процедурным программированием?

Итак, преимущества ООП:

1. Сложные приложения писать проще, чем процедурным программированием, так как у нас все разбито на маленькие модули — объекты, которые взаимодействуют между собой — и в итоге программирование сводится ко взаимоотношениями между объектами.
2. Приложения, написанные с помощью ООП, гораздо более простые в модификации (при соблюдении концепций проектирования).
3. Так как данные и операции над ними образуют единую сущность, они не размазываются по всему приложению (что нередко бывает при процедурном программировании).
4. Инкапсуляция информации защищает наиболее критичные данные для работы от пользователя.
5. Возможно переиспользование одного и того же кода, с разными данными, ведь классы позволяют создавать множество объектов, у каждого из которых есть собственные значения атрибутов.
6. Наследование и полиморфизм также позволяют переиспользовать и расширять уже существующий код (вместо дублирования похожего функционала).
7. Более простая расширяемость приложения, нежели при процедурном подходе.
8. Подход ООП дает возможность абстрагироваться от деталей реализации.

### 19) Расскажите, какие недостатки есть в ООП

К сожалению, и они присутствуют:

1. ООП требует большой объём теоретических знаний, который нужно освоить, прежде чем вы сможете что-либо написать.Разбор вопросов и ответов на собеседовании. Часть 2 - 5
2. Идеи ООП не так просты для понимания и применения на практике (нужно быть в душе немного философом).
3. При применении ООП немного снижается производительность функционирования ПО из-за более сложной организации системы.
4. Для ООП подхода требуется больше памяти, так как всё состоит из классов, интерфейсов, методов, которые занимают гораздо больше памяти, нежели обычные переменные.
5. Временные затраты на первоначальный анализ больше, чем при процедурном.

### 20) Что такое статический и динамический полиморфизм

Полиморфизм дает возможность объектам вести себя по-разному для одного и того же класса или интерфейса.

Существует два вида полиморфизма, которые еще известны как ранее и позднее связывание.

#### Статический полиморфизм, или ранее связывание:

- происходит во время компиляции (на ранней стадии жизненного цикла программы);
- решает, какой метод выполнять во время компиляции;
- перегрузка метода — это пример статического полиморфизма;
- к раннему связыванию относятся приватные, статические и терминальные методы;
- наследование не участвует в раннем связывании;
- в статическом полиморфизме участвуют не конкретные объекты, а информация о классе, тип которого представлен слева от имени переменной.

#### Динамический полиморфизм, или позднее связывание:

- происходит во время выполнения (во время работы программы);
- динамический полиморфизм решает, какая конкретно реализация будет у метода во время выполнения;
- переопределение метода — пример динамического полиморфизма;
- позднее связывание — это назначение конкретного объекта, ссылки его типа или его суперкласса;
- наследование связано с динамическим полиморфизмом.

### 21) Дайте определение принципа абстракции в ООП

Абстракция в ООП — это способ выделить набор значимых характеристик объекта, исключив незначимые детали.

То есть при проектировании программы с ООП подходом вы сосредотачиваетесь на моделях в общем, без углубления в детали их реализации. В Java за абстракцию отвечают интерфейсы.

Например, у вас есть машина, и это будет интерфейс. А различные взаимодействия с ней — например, завести двигатель, использовать коробку передач — это функции, которые мы используем без углубления в детали реализации.

Ведь в тот момент, когда вы ведете машину, вы не думаете, как конкретно коробка передач исполняет своё предназначение, или как ключ заводит двигатель, или каким именно образом руль поворачивает колеса. 

И если даже реализацию одной из этой функциональности заменить (например, двигатель), вы этого можете и не заметить. Вам это не важно: вы не углубляетесь в детали реализации. Вам важно чтобы действие выполнялось.

Собственно, это и есть абстрагирование от деталей реализации.
 
### 22) Какие элементы языка отвечают за инкапсуляцию?

Как мы помним, инкапсуляция — это сокрытие деталей реализации класса. То есть, когда наш класс используется извне, внутренняя начинка и логика не очевидны. И какие же элементы языка отвечают за это? Естественно, модификаторы доступа!
 
То, что нам необходимо скрыть, мы отмечаем модификатором private. Например, приватные поля класса или какие-нибудь внутренние методы, помогающие реализовать некий внутренний функционал.
 
А к тому, к чему мы хотим предоставить внешний доступ, добавляем модификатор доступа public. Например, метод, отвечающий за предоставление какой-то функциональности (внутри которого может использоваться множество приватных методов) или те же геттеры и сеттеры для доступа к приватным полям класса.
 
Ах, да у нас еще есть модификаторы default и protected, которые можно использовать для более гибкой и специфической настройки доступов к избранным частям класса.

### 23) Какие элементы языка отвечают за наследование?

Наследование — это механизм, который позволяет создавать классы на основе другого класса.

В Java для этих целей используют ключевое слово extends. Например, у нас есть некий класс Cat, и мы хотим создать его наследника — Lion. В коде это будет выглядеть как-то так:
 
public class Lion extends Cat

И это значит, что класс Lion наследует все методы и переменные класса Cat, кроме статических.
 
Также к элементам языка, отвечающим за наследование, можно отнести super. Это ссылка, аналогичная this, но если this ссылается на объект, в котором ее вызвали, то super ссылается на текущий объект родителя.
 
Как правило super используется:
Для вызова конструктора суперкласса: например, у класса Cat есть внутренняя переменная name, которую нужно проинициализировать в конструкторе. В конструкторе класса Lion это будет выглядеть так:

```java
public Lion(final String name) {
   super(name);
}
```

Для обращения к полям и методам родителя: например, в классе Cat у нас есть проинициализированное поле age:
```java
public class Cat {
   int age = 10;
   В то же время у нас есть такое же проинициализированное поле в Lion:

public class Lion extends Cat {
   int age = 15;
```

И если мы хотим обратиться из объекта Lion к переменной age родительского объекта, это нужно делать через super:

super.name

### 24) Какие элементы языка отвечают за полиморфизм?

Полиморфизм — это способность объекта одной сигнатуры принимать множество форм (множество реализаций).Разбор вопросов и ответов с собеседований на Java-разработчика. Часть 3 - 2Можно смело сказать, что в Java за полиморфизм отвечают ключевые слова implements и extends. 
 
implements — когда мы создаем наш интерфейс, мы реализуем в каком-то классе одну из его возможных форм, но ведь она не единственная форма, не так ли? 
 
Вспомним, как выглядит применение implements:

public class Cat implements Animal

И в Cat классе мы должны реализовать все абстрактные методы, представленные в интерфейсе Animal.
 
Так же и наследование: в классе-наследнике мы можем переопределить уже существующую реализацию метода. Например: несколько наследников -> несколько различных переопределений одного и того же метода.

Ну либо суперкласс был абстрактным и у него есть некий метод, который нужно реализовывать по-особому для каждого его наследника. То есть, можно сказать, что метод будет принимать множество форм.
 
Также в этом нам может помочь аннотация @Override, которая ставится над реализуемыми методами и обозначает, что мы хотим реализовать или переопределить (если реализация уже существует в суперклассе) тот или иной  метод суперкласса или интерфейса. 
 
Она не обязательна и используется для более легкого обнаружения ошибок. Этой аннотацией вы показываете компилятору, что хотите переопределить/имплементировать метод суперкласса/интерфейса, и он будет следить, чтобы вы не сделали ошибок в сигнатуре метода.

### 25)Что такое класс, объект, интерфейс?

Как мы помним, Java — это ООП язык. То есть, программы на Java построены на взаимодействии между объектами. Получается, программа — это такой себе муравейник, где каждый муравей это — объект.

Объекты — это некоторые сгруппированные данные, в которых содержатся различные методы (функции) для взаимодействия с этими внутренними данными.
 
А классы — это инструкции, шаблоны для создания объектов. То есть, может быть множество объектов, построенных по одной и той же инструкции, наполненных разными или одинаковыми значениями данных. Если приводить пример из жизни, можно сказать, что класс — это чертеж здания, а объект — конкретно созданное здание по этому чертежу.   
 
Интерфейсы — это аналоги классов с той разницей, что по ним нельзя создать объекты. Их цель — добавить элемент абстракции в Java. Точнее, добавить гибкость во взаимоотношениях классов и объектов.
Под гибкостью имеем в виду описанные ранее полиморфизм и абстракцию, которые в свою очередь открывают множество возможностей для построения внутренней архитектуры приложения.

### 26) Что такое класс POJO? Приведите пример такого класса

POJO — Plain Old Java Object — старый добрый Java-объект: простой объект, класса, который не унаследован от какого-то специфического класса и не реализует никаких служебных интерфейсов сверх тех, которые нужны для бизнес-модели.
 
Другими словами POJO класс — это просто класс без особых требований. Единственное требование — отсутствие различных наворотов, завязанных на определенном фреймворке.

Как правило такие классы не наследуют от других классов (кроме классов POJO из того же пакета), не реализуют интерфейсов — иногда делается исключение для маркерных интерфейсов из стандартной библиотеки типа Serializable или Cloneable — не используют аннотаций и не зависят от сторонних библиотек. 
 
Но отмечу, что у POJO могут быть и методы с бизнес-логикой, и произвольного вида конструкторы.
 
Если разрешить аннотации, не вносящие изменения в семантику класса (без которых назначение объекта и логика его работы не изменятся), к POJO также можно отнести Entity сущности JPA и объекты DTO, десериализуемые из XML или JSON, правила для которых заданы в аннотациях.
 
Также для POJO классов желательно переопределить equals и hashCode, ведь это может помочь им лучше выполнять свою роль.
 
Пример POJO класса:

```java
public class User {
   private Long id;
   private String firstName;
   private String lastName;
   private Long age;

   public User(final Long id, final String firstName, final String lastName, final long age) {
       this.id = id;
       this.firstName = firstName;
       this.lastName = lastName;
       this.age = age;
   }

   public Long getId() {
       return this.id;
   }

   public String getFirstName() {
       return this.firstName;
   }

   public String getLastName() {
       return this.lastName;
   }

   public Long getAge() {
       return this.age;
   }

   @Override
   public boolean equals(final Object o) {
       if (this == o) return true;
       if (o == null || this.getClass() != o.getClass()) return false;
       final User user = (User) o;
       return Objects.equals(this.id, user.id) &&
               Objects.equals(this.firstName, user.firstName) &&
               Objects.equals(this.lastName, user.lastName) &&
               Objects.equals(this.age, user.age);
   }

   @Override
   public int hashCode() {
       return Objects.hash(this.id, this.firstName, this.lastName, this.age);
   }
}
```

### 27) Какие элементы может содержать класс?

Класс может содержать такие элементы:

- поля класса;
- статические поля класса;
- блок инициализации;
- статический блок инициализации;
- конструкторы (пустой всегда определен по умолчанию);
- методы;
- статические методы;
- различные аннотации (которые могут висеть над самим классом или его составляющими);
- дженерики;
- наследования от других классов (extends) или имплементации от интерфейсов (implements).

### 28) Расскажите о наследовании в Java. Каковы особенности использования ключевого слова super?

Выше я уже рассказал о наследовании и ключевом слове super в Java. Упомяну еще несколько важных моментов:

1. Возможно наследование лишь одного класса: множественное наследование в Java отсутствует (но с появлением дефолтных методов в Java 8 это утверждение станет весьма спорным).
2. Приватные методы и поля наследуются тоже, просто к ним не будет доступа с наследника (но если у нас, к примеру, приватное поле и к нему есть public или protected — геттеры и сеттеры, с полем можно работать через них).
3. final классы не наследуются.
4. final методы не переопределяются (но их можно наследовать и перегружать).
5. static методы и переменные не наследуются (т. к. они привязаны не к объектам, а к классам).
6. При наследовании от абстрактных классов, обязательна реализация их абстрактных методов, либо текущий класс тоже нужно объявить абстрактным.
7. При наличии не дефолтных конструкторов в родителе, в классе потомке их обязательно нужно переопределять (но @Override над ними не пишется).
8. Переопределенным методам в наследнике можно расширять модификатор доступа: private -> default -> protected -> public.
9. Переопределенным методам в наследнике можно сужать прописываемые исключения, например: Exception -> IOException -> FileNotFoundException.

### 29) Что такое сигнатура метода? Приведите примеры правильных и неправильных сигнатур

Сигнатура метода — это имя метода плюс типы входящих параметров (причем порядок параметров имеет значение). В сигнатуру метода не входит возвращаемое значение, а также бросаемые им исключения.
 
Пример правильной сигнатуры:

`doSomething(int, double, double)`

 Пример неправильной сигнатуры:

`void doSomething(int firstArg, int secondArg) throws Exception`

Сигнатура метода в сочетании с типом возвращаемого значения и перечнем бросаемых исключений называется контрактом метода.

### 30) Можно ли в конструкторе использовать return?

Можно, но без возвращаемого значения справа от return. То есть можно использовать return; как вспомогательную конструкцию при вычислениях в конструкторе, чтобы срочно закончить (прервать) выполнение дальнейшего кода и завершить инициализацию объекта. 

Например, у нас есть класс Cat, и если Cat бездомный — isHomeless = true, нам нужно закончить инициализацию и не заполнять другие поля (ведь они нам неизвестны, так как котик бездомный):  

```java
public Cat(int age, String name, boolean isHomeless) {
   if (isHomeless){
       this.isHomeless = isHomeless;
       return;
   }
   this.isHomeless = isHomeless;
   this.age = age;
   this.name = name;
}
```
 Но если говорить о конкретных значениях, конструктор не может использовать return для возврата какого-то значения, потому что:
при объявлении конструктора у вас не будет ничего похожего на возвращаемый тип;
как правило, конструктор неявно вызывается во время создания экземпляра;
конструктор — это не метод: это отдельный механизм, единственная цель которого — инициализировать переменные экземпляра, а именно созданием объекта занимается оператор new.

### 31) Можно ли из конструктора бросить исключение?

С исключениями конструкторы работают точно так же, как и методы.

И если методы позволяют нам пробрасывать исключения, прописывая в заголовке метода throws <ТипИсключения>, то и конструктор позволяет нам это делать, и так же при наследовании и определении конструктора наследника мы можем расширять тип исключения. Например, IOException -> Exception (но не наоборот).
 
В качестве примера для пробрасывания конструктором исключения возьмем класс Cat. Допустим, при его создании мы хотим вводить имя и возраст с консоли:

```java
public Cat() throws IOException {
   BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
   this.name = reader.readLine();
   this.age = Integer.parseInt(reader.readLine());
}
```

Так как reader.readLine() бросает исключение IOException, в заголовке мы его прописываем как возможное выбрасываемое исключение.

### 32) Из каких элементов состоит заголовок класса? Напишите пример

Говоря об элементах, составляющих заголовок класса, рассмотрим небольшую схему:

- обязательные составляющие будут в скобках <>
- необязательные — в {}

**{модификатор доступа класса}{статичность класса}{финальность класса}{абстрактность класса}<имя класса>{наследование от класса Родителя} {реализация интерфейсов}**
 
Итак, что мы имеем:

**{модификатор доступа класса}** — для класса доступны лишь модификаторы public и отсутствующий модификатор доступа, то есть default.

**{статичность класса} **— static — модификатор, который указывает, что данный класс статичен, применим только к внутренним классам (классам внутри других классов).

**{финальность класса}** — как мы помним, это модификатор final, при наличии которого класс стает не наследуемым (пример из коробки — String).

**{абстрактность класса}** — модификатор — abstract, который указывает на то, что данный класс может иметь нереализованные методы. 

Этот модификатор конфликтует с модификатором final, то есть в заголовке класса может быть только один из них, так как модификатор abstract подразумевает, что данный класс будет унаследован и будут реализованы его абстрактные части. А final указывает на то, что это финальная (окончательная) версия класса, и унаследован он быть не может. Собственно, одновременное использование обоих модификаторов будет абсурдным, и компилятор не даст нам этого сделать.  

**`<class>`** — ключевое обязательное слово, которое указывает на объявление класса.

**<имя класса>** — простое имя класса, которое является идентификатором конкретного Java класса. Полное имя класса состоит из полного составного имени пакета + . + простое имя класса.

**{наследование от класса Родителя}** — указание класса родителя (если таковой имеется) с помощью ключевого слова extends. Например, .. extends ParentClass.

**{реализация интерфейсов}** — указание интерфейсов, которые данный класс реализует (если они имеются) с помощью ключевого слова implements. Например: … implements FirstInterface, SecondInterface…

Ну и в качестве примера заголовка класса рассмотрим заголовок класса Lion, который наследуется от Cat и реализует интерфейс WildAnimal:

`public final class Lion extends Cat implements WildAnimal`

### 33) Из каких элементов состоит заголовок метода? Напишите пример

Опять же, при рассмотрении элементов, из которых состоит заголовок метода, рассмотрим небольшую схему, в которой:

- обязательные составляющие — в скобках <>
- необязательные — в {}

**{модификатор доступа}{статичность метода}{абстрактность метода}{финальность метода}{модификатор синхронизации} {модификатор native}<возвращаемое значение><имя метода> <(> {аргументы метода} <)>{бросаемые исключения}**
 
**{модификатор доступа}** — для метода доступны все модификаторы доступа — public, protected, default, private.
 
**{статичность метода}** — static — модификатор, который указывает, что данный метод статичен, то есть привязан не к объекту, а к классу.
 
**{абстрактность метода}** — модификатор abstract, который указывает на то, что реализация (тело) метода отсутствует. Для корректной работы также нужен модификатор abstract у класса, в котором приведен метод. Как и в заголовке класса, данный модификатор конфликтует с модификатором final, но помимо него конфликтует и с модификатором static, т.к. абстрактный метод подразумевает переопределение метода в наследнике, а статические методы не переопределяются.
 
**{финальность метода}** — final — модификатор, указывающий на то, что данный метод нельзя переопределить.
 
**{модификатор синхронизации}** — synchronized — модификатор, который означает, что данный метод защищен от одновременного доступа к нему из разных потоков. Если метод не статический, он закрывается на мьютекc this объекта. Если метод статический, он закрывается на мьютекс текущего класса.
 
**{модификатор native}** — native — данный модификатор указывает на то, что метод написан на другом языке программирования.
 
**<возвращаемое значение>** — тип значения, который должен вернуть метод. Если он не должен ничего возвращать — void.
 
**<имя метода>** — имя метода, его идентификатор его в системе.
 
**{аргументы метода}** — аргументы (параметры), которые принимает метод: они необходимы для реализации его функционала.
 
**{бросаемые исключения} **— throws ТипИсключения — перечисление проверяемых исключений, которые может бросать данный метод.
 
И в качестве примера заголовка метода приведу этот:
 
`public static void main(String[] args) throws IOException`

### 34) Создайте в объекте-наследнике конструктор по умолчанию, если в базовом он не определен (но определен другой конструктор)

Я не до конца понимаю сам вопрос, но возможно имеется в виду, что, к примеру, в родителе у нас есть некоторый кастомный конструктор:

```java
public Cat(int age, String name) {
   this.age = age;
   this.name = name;
}
```

Поэтому в классе предке нам обязательно нужно определить конструктор, который будет заполнять (вызывать) родительский конструктор:
```java
public  class Lion extends Cat {

   public Lion(int age, String name) {
       super(age, name);
   }
}
```

### 35) Когда применяется ключевое слово this?

В Java this используется в двух разных значениях.
 
1. Как ссылка на текущий объект, типа this.age = 9. То есть this ссылается на объект, в котором была вызвана и к которому относится код, использующий this. Главная функция — повысить читабельность кода и избежать неоднозначности. Например, при одинаковом имени внутреннего поля класса и аргумента метода:

```java
public void setName(String name) {
   this.name = name;
}
```

То есть, this.name — поле объекта
name — аргумент метода
 
Ссылка this не может использоваться в статических методах.
 
2. this можно применять в конструкторе в форме вызова метода, типа this(value). В таком случае это будет вызов другого конструктора этого же класса. 
 
Словом, можно вызвать сразу два конструктора при создании объекта:

```java
public Cat(int age, String name) {
   this(name);
   this.age = age;
}

public Cat(String name) {
   this.name = name;
}
```

При создании объекта Cat и вызове первого конструктора будут вызваны оба поля объекта и успешно проинициализированы.
 
Есть пара нюансов:
1. this() работает только в конструкторе.
2. Ссылка на другой конструктор должна находиться в первой строке блока (тела) конструктора. Поэтому в одном конструкторе более одного (другого) конструктора данного класса вызвать нельзя.

### 36) Что такое инициализатор?

Насколько я понимаю, в данном вопросе речь идет об обычных и статистических блоках инициализации.
 
Для начала давайте вспомним, что такое инициализация. 
 
Инициализация — это создание, активация, подготовка к работе, определение параметров. Приведение программы или компонента в состояние готовности к использованию.
 
Как вы помните, во время создания объекта переменную класса можно инициализировать непосредственно при объявлении:
 ```java
class Cat {
   private int age = 9;
   private  String name = "Tom";
```
Или задавать извне через конструктор:
 ```java
class Cat {
   private int age;
   private  String name;

   public Cat(int age, String name) {
       this.age = age;
       this.name = name;
   }
```
Но есть и ещё один способ: задавать внутреннюю переменную объекта через блок инициализации, который имеет вид фигурных скобок { } внутри класса, без имени (как у метода или конструктора):
 ```java
class Cat {
   private int age;
   private  String name;

   {
       age = 10;
       name = "Tom";
   }
```
То есть блок инициализации — это часть кода, которая загружается при создании объекта. 
 
Как правило такие блоки используются для выполнения некоторых сложных вычислений, которые необходимы при загрузке класса. Результаты этих вычислений можно задавать как значения для переменных.
 
Также помимо обычных блоков инициализации существуют статические, которые выглядят так же, но перед фигурной скобкой имеют ключевое слово static:
 ```java
class Cat {
   private static int age;
   private static String name;

   static{
       age = 10;
       name = "Tom";
   }
```
Этот блок в точности такой же, как и предыдущий. Но если обычный срабатывает при инициализации каждого объекта, то статический отработает лишь однажды, при загрузке класса. 
 
В таком блоке, как правило, тоже производят некоторые сложные вычисления для последующей инициализации статических переменных класса. Для статического блока действуют те же ограничения, что и для статических методов: в нем нельзя использовать не статические данные, как и ссылку на текущий объект — this.Разбор вопросов и ответов с собеседований на Java-разработчика. Часть 4 - 6Далее мы с вами можем увидеть порядок инициализации класса (вместе с его предком) для лучшего понимания момента, когда срабатывают блоки инициализации.

### 37) Для наследования класса public class Child extends Parent напишите порядок инициализации объекта

При загрузке класса Child будет следующий порядок инициализации:

1. Статические поля класса Parent.
2. Статический блок инициализации класса Parent.
3. Статические поля класса Сhild.
4. Статический блок инициализации класса Child.
5. Не статические поля класса Parent.
6. Не статический блок инициализации класса Parent.
7. Конструктор класса Parent.
8. Не статические поля класса Сhild.
9. Не статический блок инициализации класса Сhild.
10. Конструктор класса Сhild.

### 38) Какие вы знаете отношения между классами (объектами)?

Между классами в Java есть два вида отношений:

- отношения IS-A
Принцип IS-A в ООП основан на наследовании классов или реализации интерфейсов. К примеру, если класс Lion наследует Cat, мы говорим, что Lion является Cat:

`Lion IS-A Cat`

(но не всякий Cat является Lion-ом)
 
Точно такая же ситуация с интерфейсами. Если класс Lion реализует интерфейс WildAnimal, то они также находятся в отношении:

`Lion IS-A WildAnimal`

- отношения HAS-A

Данный тип отношений основан на использовании классов другими классами, ещё называемый “ассоциация”. 

Ассоциация — это один класс ссылается на другой класс (или даже друг на друга).

Например, класс Car может ссылаться на класс Passenger, и это будет отношение:

`Car HAS-A Passenger`

И наоборот: если Passenger имеет ссылку на Car, то это будет отношение:

`Passenger HAS-A Car`

### 39) Какие ассоциативные связи между объектами вы знаете?

Агрегация и композиция — не что иное, как частные случаи ассоциации. 
 
Агрегация — отношение, когда один объект является частью другого. Например, пассажир может находиться в машине. Также пассажиров может быть несколько или не быть вовсе (если мы говорим про теслу, то и водитель не обязателен).
 
Например:

```java
public class Car {
   private List passengers = new ArrayList<>();

 void setPassenger(Passenger passenger) {
     passengers.add(passenger);
 }

   void move() {
       for (Passenger passenger : passengers) {
           System.out.println("Перевозка пассажира - " + passenger.toString());
       }
       passengers.clear();
   }
}
```

То есть нам не важно количество пассажиров (и есть ли они вообще): от этого функционал класса Car не зависит.
 
Также агрегация подразумевает, что при использовании объекта другим объектом первый можно использовать еще в других объектах.
 
Например, один и тот же студент может входить и в кружок вязания, и в музыкальную группу рокеров, и при этом ходить в группу изучающих английских. Как вы поняли, агрегация — это более свободные ассоциативные отношения классов.Разбор вопросов и ответов с собеседований на Java-разработчика. Часть 4 - 8Композиция — еще более жесткое отношение, когда объект не только является частью другого объекта, но и работа другого объекта очень зависит от первого. 
 
Например, двигатель у машины. Хоть двигатель и может быть без машины, но вне ее он бесполезен. 
 
Ну и машина не может работать без двигателя:

```java
public class Car {
   private Engine engine;

   public Car(Engine engine) {
       this.engine = engine;
   }

   void startMoving() {
       engine.start();
           ...
   }
```

Также композиция подразумевает, что при использовании объекта другим объектом первый не может принадлежать кому-либо другому.  Если вернуться к нашему примеру, двигатель может принадлежать только одной машине, но никак не двум или более одновременно.

### 40) Что такое модификаторы доступа в Java? Назовите их. Для чего они используются?

Ранее я уже описывал модификаторы доступа в вопросе об элементах Java, отвечающих за инкапсуляцию. Но все же напомню.
 
Модификаторы доступа в Java — это ключевые слова, которые описывают предоставляемый уровень доступа к определенному компоненту Java.
 
Модификаторы доступа могут быть:

- public — элемент с данным модификатором будет общедоступным. Т.е. поля и методы, классы, объявленные с модификатором public, видны другим классам как из текущего пакета, так и из внешних пакетов;
- protected — элемент с данным модификатором будет доступен из любого места в текущем классе текущего пакета или в классах-наследниках, даже если они находятся в других пакетах;
- default, или отсутствующий модификатор — данный модификатор используется неявно, когда модификатор доступа не указывается вовсе. Он похож на предыдущий, кроме допустимости видимости в классах-наследниках, которые находятся в других пакетах;
- private — самый закрытый из всех модификаторов, который допускает доступ к элементу только в пределах текущего класса.

### 41) Назовите основную особенность статических и переменных методов

Весьма странная формулировка — “переменные методы”. Наверняка здесь имеются в виду обычные, нестатические методы.
 
Так вот, основная разница в том, что статические методы принадлежат классу и, собственно, для них не нужно создавать экземпляр данного класса: его можно вызывать лишь используя тип класса.
 
Например, у нас есть статический метод, чтобы погладить кота:
```java
public class CatService {
   public static void petTheCat(Cat cat) {
       System.out.println("Погладить кота - " + cat.getName());
   }
```
 Для его вызова нам не нужен экземпляр класса CatService:

```java
Cat cat = new Cat(7, "Bobi");
CatService.petTheCat(cat);
```
 
В то время как обычные методы привязаны (принадлежат) объекту, и чтобы их вызвать, необходимо иметь экземпляр (объект), у которого и будет вызван метод.
 
Например, у кота есть нестатический метод — мяукать:
```java
class Cat {
   public void mew() {
       System.out.println("Meow! Meow! Meow!");
   }
```
 Для вызова этого метода нам понадобится конкретный экземпляр кота:
```java
Cat cat = new Cat(7, "Bobi");
cat.mew();
```

### 42) Какие основные ограничения действуют на статические и “переменные” методы?

Как я и сказал ранее, основное ограничение обычного метода в том, что всегда должен быть некоторый экземпляр, у которого данный метод будет вызываться. А вот статический метод этого не требует, но он и не может ссылаться на ссылку this — на элементы текущего объекта — поскольку текущего объекта для него не существует.

### 43) Что значит ключевое слово static? Может ли статический метод быть переопределен или перегружен?

Элемент, обозначенный ключевым словом static, принадлежит не объекту класса, а именно классу, и он загружается при загрузке самого класса.
 
Статические элементы — единственные на всю программу, а обычные — единственные на конкретный объект.
 
Статическими могут быть:

- поля класса;
- блок инициализации класса;
- метод класса;
- внутренние классы класса (однако, та ещё тавтология).

Статический метод нельзя переопределить: он принадлежит классу и не наследуется, но в то же время его можно перегрузить.

### 44) Может ли метод быть статическим и абстрактным одновременно?

В предыдущей статье я это уже упоминал: метод не может быть абстрактным и статическим одновременно. Абстрактность метода подразумевает, что он должен быть переопределен в наследнике. 
 
В то же время статический метод принадлежит классу, и его нельзя переопределить: это вызовет противоречие, которое увидит компилятор и начнет ругаться. Если у вас возникла такая ситуация, стоит всерьёз задуматься о правильности построения архитектуры вашего приложения (ведь с ней явно что-то не так).Разбор вопросов и ответов с собеседований на Java-разработчика. Часть 5 - 3

### 45) Можно ли использовать статические методы в середине обычных? Наоборот? Почему?

Статические методы можно использовать в обычных, так как этому ничего не препятствует.
 
В то же время обратная ситуация невозможна: статический метод не может использовать обычный метод, не имея ссылки на конкретный экземпляр данного класса. А как мы помним, для статических членов класса ссылка this недоступна: конкретных объектов класса может быть сколько угодно, и у каждого из них внутри будет ссылка на самого себя — this.
 
И как тогда понять, какую именно ссылку this нужно взять? А никак.

Поэтому и статические элементы не могут ссылаться на нестатические, без ссылки на конкретный объект.

Собственно, статический метод может использовать не статический, только если имеет ссылку на конкретный объект. Например ту, которая пришла в качестве аргумента:

```java
public static void petTheCat(Cat cat) {
   System.out.println("Погладить кота - " + cat.getName());
}
```

Тут мы видим, что в статическом методе petTheCat вызывается обычный, нестатический метод объекта Cat — getName.

### 46) Что такое interface? Может ли быть final interface?

Как мы помним, в Java нет множественного наследования. Интерфейсы — это что-то вроде его альтернативы. 
 
Интерфейс похож на очень урезанный класс. Они определяют функционал без конкретной реализации, который реализуют классы, имплементирующие (реализующие) эти интерфейсы.
 
Пример интерфейса:
```java
public interface Animal {
    void voice();
}
```
 Пример реализации интерфейса классом:

```java
class Cat implements Animal {

   @Override
   public void voice() {
       System.out.println("Meow! Meow! Meow!");
   }
}
```

Главное, что нужно знать об использовании интерфейсов:

1. Методы интерфейса должны содержать только заголовок, без конкретного тела метода, т.е. должны быть абстрактными (но без применения ключевого слова abstract). Исключение из этого — статические и дефолтные методы, для которых необходимо иметь тело метода.
2. Класс может реализовывать множество интерфейсов (как и говорил, это альтернатива множественному наследованию), которые прописываются через запятую: class Lion implements Animal, Wild.
3. Интерфейсы создаются при помощи ключевого слова — interface.
4. При реализации интерфейса классом используется ключевое слово — implements.
5. Класс, который реализует определенный интерфейс, обязан реализовать все его абстрактные методы, либо должен объявить себя абстрактным.
6. Основная цель использования интерфейсов — реализация полиморфизма (способность объектов принимать множество форм).
7. В интерфейсе, как правило, не пишут модификаторы доступа для методов: они по умолчанию public, и другие модификаторы, отличные от public, задавать нельзя. Начиная с Java 9 можно использовать private модификаторы для методов.
8. Переменные интерфейсов по умолчанию static final, иначе говоря — константы: их всегда нужно проинициализировать непосредственно в интерфейсе.
9. Нельзя создать объект интерфейса.

Ответ на вопрос, могут ли быть интерфейсы финальными — конечно же, нет.
 
Ведь сама суть интерфейсов в том, чтобы их реализовывали. А как мы все прекрасно помним, final на уровне класса делает его не наследуемым, и в случае с интерфейсом — не реализуемым. 
 
А зачем нам интерфейс, который нельзя реализовать и использовать? 

Верно — незачем! И компилятор так считает))
Смысл разве что появился с введением статических методов в интерфейсы с Java 8, но это не изменило того факта, что интерфейс не может быть финальным.

### 47) Где можно инициализировать статические поля?

Статические поля можно инициализировать:

- непосредственно при объявлении, через знак равенства =;
- в статическом блоке инициализации;
- в нестатическом блоке инициализации, но при этом вы должны понимать что при каждом создании объекта данное поле будет - перезаписываться этим блоком инициализации;
- в конструкторе класса. При каждом вызове данного конструктора (т.е. при создании объекта через этот конструктор) данное поле будет перезаписываться;
- в статических методах;
- в нестатических методах;
- во внутренних статических и нестатических, локальных и анонимных классах.

### 48) Что такое анонимные классы?

Анонимные классы — это классы, у которых нет собственного типа. 

О чем это я?
 
Когда мы говорили об интерфейсах, я упомянул, что нельзя создать объект интерфейса: можно лишь создать объект класса, который реализует интерфейс.
 
А что если вы не хотите реализовывать интерфейс в каком-то классе, но при этом вам нужен объект типа интерфейса? И скорее всего, это будет единичный случай использования данного объекта. И у вас нет нужды создавать полноценный класс реализацию.
 
Как вы это сделаете? Правильно! Через анонимный класс! Предположим, у нас есть некоторый интерфейс Animal:

```java
public final interface Animal {
   public void voice();
}
```
 Если мы хотим создать экземпляр данного интерфейса через анонимный класс:
```java
Animal cat = new Animal() {
   @Override
   public void voice() {
       System.out.println("Meow! Meow! Meow!");
   }
};
```
И далее вы можете спокойной использовать данный объект и его реализованный метод — voice.
 
То есть анонимный класс реализует данный интерфейс и все его абстрактные методы прямо здесь и сейчас. Иначе нам не создать объект интерфейса/абстрактного класса,  так как присутствуют не реализованные/абстрактные методы.
 
Как я упомянул, анонимные классы используются не только для реализации абстрактных методов интерфейса, но и для реализации абстрактных методов абстрактного класса.
 
Данный подход хорош для ситуаций, когда объект используется разово или данная реализация методов нужна только единожды, и нет нужды создавать отдельный класс, который будет реализовывать необходимый абстрактный класс/интерфейс. 
 
Но также отмечу, что использование анонимных классов — редкое явление в работе: как правило предпочтение все же отдается обычным классам.  
 
### 49) Что такое примитивные классы?

Как по мне, это весьма странный вопрос и, возможно, это такой вопрос-ловушка, ведь в Java нет такого понятия как примитивные классы: разве что есть понятие примитивные типы, которое мы уже рассматривали ранее.
 
Как мы помним, в Java есть 8 примитивных типов — byte, short, int, long, float, double, char, boolean.

### 50) Что такое класс «обертка» (wrapper)?

Главная проблема использования примитивных типов в Java — это то, что они все же не классы, а Java — всё же ООП язык. То есть программы, написанные на этом языке, сводятся к взаимодействию между объектами. 
 
Ну а примитивы — это не объекты. У них нет методов, даже стандартных от класса Object. Ну а если нам понадобилось использовать примитив как ключ в Map? Тогда у него нужно вызвать метод hashCode. Также там можно вызвать метод equals. Что тогда?
 
Моментов, где должен быть именно класс, а не примитив, может быть очень и очень много, что делает примитивы неиспользуемыми и нежелательными элементами в программе, ведь это рушит саму идею ООП.
 
Но не всё так плохо, как кажется. Ведь в Java есть понятие обертки примитивов. У каждого примитивного типа есть класс-аналог:

- byte -> Byte.class
- short -> Short.class
- int -> Integer.class
- long -> Long.class
- float -> Float.class
- double -> Double.class
- char -> Character.class
- boolean -> Boolean.class

Это представление простых типов, но в виде полноценных классов с кучей разнообразных и функциональных методов.

Для удобного использования этих классов ввели понятия autoboxing и unboxing.

Autoboxing — автоматическое преобразование примитивного типа в класс-аналог при надобности (например, int в Integer).

Unboxing — процесс, обратный предыдущему: автоматическое преобразование класса-обертки примитива к примитивному типу (например, Integer к int).

Благодаря введению классов-оберток примитивов и процессов autoboxing-а и unboxing-а, примитивные типы смогли стать полноценными членами ООП языка — Java.Разбор вопросов и ответов с собеседований на Java-разработчика. Часть 5 - 7Чтобы ознакомиться с этой темой подробнее, настойчиво рекомендую почитать вот эту статью.

### 51) Что такое Nested class? Когда он используется?

Nested class — внутренний класс, который является членом другого класса. В Java существует 4 вида таких внутренних классов:

#### 1. Внутренний класс

Данный вид классов объявляется непосредственно в теле другого класса. Вложенный внутренний класс может получить доступ к любому приватному полю или методу экземпляра внешнего класса.
 
В качестве примера, создадим зоопарк, в котором у нас будет животное — зебра:
```java
public class Zoo {
   class Zebra {
       public void toFeed(String food) {
           System.out.println("Дать зебре - " + food);
       }
   }
}
```
Ничего сложного, не так ли?
 
Давайте взглянем на пример создания объекта внутреннего класса:
```java 
Zoo.Zebra zebra = new Zoo().new Zebra();
zebra.toFeed("яблоко");
```
Как вы уже увидели, обязательно нужно создавать объект обрамляющего класса, на основе ссылки которого можно создать объект внутреннего класса.
 
Также хотелось бы отметить, что вложенный внутренний класс не может иметь в себе статических методов или статических полей. Именно потому, что внутренний класс неявно связан с объектом своего внешнего класса, и он не может объявлять никаких статических методов внутри себя.
 
#### 2. Статические вложенные классы

Данный класс схож с предыдущим, только у него модификатор доступа static возле объявления класса.
 
Так как у этого вида классов нет доступа к не статическим полям внешнего класса, он больше похож на статическую часть внешнего класса, чем на внутренний класс.
 
При этом у данных класса есть доступ ко всем статическим членам внешнего класса, даже к приватным.
 
Пример статического вложенного класса:
 
 ```java
public class Zoo {
   static class Zebra {
       public void toFeed(String food) {
           System.out.println("Дать зебре - " + food);
       }
   }
}
 ```
Способ создания немного отличается от предыдущего:
 ```java
Zoo.Zebra zebra = new Zoo.Zebra();
zebra.toFeed("яблоко");
```
Тут нам не нужен объект внешнего класса для создания объекта вложенного статического класса. От внешнего класса нам нужен только его тип, чтобы можно было найти расположение вложенного класса.
 
#### 3. Локальные классы

Локальные классы — это классы, объявленные внутри тела метода, при этом создание и использование объекта локального класса возможно исключительно в пределах этого метода.
 
Пример:
 ```java
public class Zoo {
   public void toFeed(String animal, String food) {
       switch(animal){
           case "зебра":
               class Zebra {
                   void toFeedZebra(String food) {
                       System.out.println("Дать зебре - " + food);
                   }
               }
               Zebra zebra = new Zebra();
               zebra.toFeedZebra(food);
               ...
```
 
Пример использования:
 ```java
Zoo zoo = new Zoo();
zoo.toFeed("зебра", "яблоко");
```
Не видя код метода toFeed, вы бы и не заподозрили о существовании локального класса, не так ли?
 
Локальный класс не может быть static или transient, но его можно пометить как abstract или final (только ИЛИ, т.к. использование этих двух модификаторов приведет к конфликту).
 
#### 4. Анонимные классы

Про анонимные классы мы уже говорили выше, и как вы помните, их можно создать из двух источников — интерфейсы и классы.
 
Причины использования
 
Внутренние статические и не статические классы используют потому, что иногда лучше встроить небольшие классы в более общие и хранить их вместе: так у них будет более высокая связанность и общая цель. Собственно, использование вложенных классов увеличивает инкапсуляцию кода.
 
Причиной выбора локальных классов может послужить то, что данный класс используется исключительно в пределах одного метода. Нужно ли в таком случае размазывать код по приложению? Нет. Но при этом добавлю, что в своей практике я ни разу не видел использование локальных классов, т.к. потребность в них весьма спорная.
 
Ну а причиной использования анонимных классов может быть то, что конкретная реализация интерфейса или абстрактного класса будет необходима лишь единожды, поэтому нет нужды создавать под это отдельный, полноценный класс с реализацией. Взамен — по-простому — реализовали нужный нам метод(ы) через анонимный класс, использовали этот объект и забыли о нем (ну а Garbage collector о нем вспомнил).Разбор вопросов и ответов с собеседований на Java-разработчика. Часть 5 - 8Изучить внутренние классы подробнее вам помогут эта и эта статьи.

### 52) Какие модификаторы доступа могут быть у класса?

Как мы помним, существуют разные виды классов и для них применимы разные модификаторы доступа:
внешний класс может иметь модификатор доступа public или быть без модификатора (модификатор по умолчанию);
внутренний класс поддерживает все 4 модификатора доступа;
вложенный статический класс поддерживает все модификаторы доступа, кроме protected, т.к. данный модификатор подразумевает наследование, что противоречит статическому члену класса (статические элементы не наследуются);
локальный класс может быть только с модификатором по умолчанию (т.е. без модификатора вовсе);
анонимный класс: отсутствует объявление типа класса, то и модификаторы доступа отсутствуют вовсе.

### 53) Дайте краткую характеристику Enum в Java
Enum — перечисление, набор строковых констант, объединенных общим типом. Объявляется через ключевое слово — enum.
 
Вот пример с enum — допустимые роли в некоторой школе:

```java
public enum Role {
   STUDENT,
   TEACHER,
   DIRECTOR,
   SECURITY_GUARD
}
```

Слова, написанные большими буквами, и есть те самые константы перечисления, которые объявляются упрощенно, без использования оператора new.
 
Использование перечислений заметно упрощает жизнь, так как они помогают избежать ошибок и путаницы в наименованиях (так как может быть только определенный перечень значений).
 
Лично для меня они очень удобны при использовании в логической конструкции Switch.

### 54) Может Enum реализовывать (implements) интерфейсы?
Да. Ведь перечисления должны представлять не просто пассивные наборы (как например, роли).
 
В Java они могут представлять более сложные объекты с некоторым функционалом, поэтому вам, возможно, понадобится добавить к ним дополнительный функционал. 
 
Также это позволит использовать возможности полиморфизма, подставляя значение enum в места, где необходим тип имплементируемого интерфейса.

### 55) Может Enum расширять (extends) класс?
Нет, не может, так как перечисление — это подкласс по умолчанию универсального класса Enum `<T>`, где T представляет универсальный тип перечисления. Это не что иное, как общий базовый класс для всех типов перечисления языка Java. 
 
Преобразование enum в класс выполняется компилятором Java во время компиляции. Это расширение явно в коде не указывается, но всегда незримо присутствует.

### 56) Можно ли создать Enum без экземпляров объектов?
Как по мне, вопрос немного странный, ну или я его не до конца понял.
 
У меня есть две интерпретации:
 
1. Может ли быть enum без значений — да, конечно, это будет что-то вроде пустого класса — бессмысленно:

```java
public enum Role {
}
```

И вызвав:

```java
var s = Role.values();
System.out.println(s);
```
Мы получим в консоли:

```java
[Lflyweight.Role;@9f70c54
```
(пустой массив значений Role)
 
2. Можно ли создать enum без оператора new — да, конечно. Как я выше уже сказал, для значений (перечислений) enum не нужно использовать оператор new, так как это — статические значения.

### 57) Можно ли мы переопределить метод toString() для Enum?
Да, конечно вы можете переопределить метод toString(), чтобы определить конкретный способ отображения вашего enum при вызове метода toString (при переводе enum в обычную строку, например, для вывод в консоль или логи).

```java
public enum Role {
   STUDENT,
   TEACHER,
   DIRECTOR,
   SECURITY_GUARD;

   @Override
   public String toString() {
       return "Выбрана роль - " + super.toString();
   }
}
```

### 58) Что будет, если мы не будем переопределять метод toString() для Enum?
Предположим, у нас есть следующий enum:
```java
public enum Role {
   STUDENT,
   TEACHER,
   DIRECTOR,
   SECURITY_GUARD;
}
```
Выведем в консоли студента, вызвав у него toString():

`System.out.println(Role.STUDENT.toString());`

Результат в консоли:
```
STUDENT
```
То есть по умолчанию toString() для enum-а — название самой константы.

### 59) Можно ли указывать конструктор внутри Enum?
Да, конечно. Именно через конструктор и задаются значения внутренних переменных enum.
 
В качестве примера к предыдущему enum добавим два поля — ageFrom и ageTo — чтобы обозначить возрастные рамки для каждой роли:
 ```java
public enum Role {
   STUDENT(5,18),
   TEACHER(20,60),
   DIRECTOR(40,70),
   SECURITY_GUARD(18,50);

   int ageFrom;
   int ageTo;

   Role(int ageFrom, int ageTo) {
       this.ageFrom = ageFrom;
       this.ageTo = ageTo;
   }
}
```

### 60) В чём разница между == и equals()?
Это один из самых распространенных вопросов на собеседованиях на Java-разработчика.
 
Начнём с того, что когда мы сравниваем простые значения (int, char, double…), мы делаем это через ==, так как переменные содержат конкретные значения и мы их можем сравнить. Да и примитивные переменные не являются полноценными объектами — не наследуются от Object и не имеют метод equals().
 
Когда мы говорим о сравнении переменных, которые ссылаются на объекты, то == будет сравнивать лишь значение ссылок — на тот же объект они ссылаются или нет. И даже если один объект будет идентичен другому, сравнение через == даст отрицательный результат (false), ведь это другой объект. 
 
Как вы поняли, для сравнения ссылочных переменных используется метод equals(). Это один из стандартных методов класса Object, который нужен для полноценного сравнения объектов. 
 
Но сразу стоит уточнить: для правильной работы этого метода его нужно переопределить, написав, как именно должны сравниваться объекты данного класса. Если вы не переопределите метод, по умолчанию он будет сравнивать объекты по ==. 
 
В IntelliJ IDEA можно переопределять его автоматически (средствами IDEA) —> alt + insert, в появившемся окошке выбираем equals() and hashCode() —> выбираем, какие поля класса должны участвовать —> и вуаля, автоматическая имплементация методов выполнена.
 
Вот пример того, как будет выглядеть автоматически сгенерированный метод equals для простейшего класса Cat с двумя полями — int age и String name:
 
```java
@Override
public boolean equals(final Object o) {
   if (this == o) return true;
   if (o == null || this.getClass() != o.getClass()) return false;
   final Cat cat = (Cat) o;
   return this.age == cat.age &&
           Objects.equals(this.name, cat.name);
}
```

Если говорить о разнице == и equals для enum-ов, её особо и нет.
Ведь enum хранит константы, и даже сравнивая через == аналогичные значения, мы будем получать true, так как ссылки будут всегда на одни и те же объекты.
 
Ну и при использовании equals у нас также будет правильно отрабатывать функционал, тем более если вы зайдёт в тело метода equals для enum-а, увидите, что в классе Enum реализация метода следующая: 

![](https://cdn.javarush.com/images/article/fbd47289-1d8d-4174-a218-bf41e3b21c15/512.jpeg)

То есть внутри — старое доброе сравнение по ссылкам! Подводя итог: для enum сравнение и через ==, и через equals корректное.

### 61) Что делает метод ordinal() в Enum?
При вызове метода int ordinal() на элементе enum-а мы получим порядковый номер с нуля этого значения в общем ряде перечислений.
 
Давайте используем данный метод на одном элементе из предыдущего рассмотренного enum-а — Role:
 
`System.out.println(Role.DIRECTOR.ordinal());`

 Соответственно, в консоли выведется:
```
2
```

### 62) Можно ли использовать Enum c TreeSet или TreeMap в Java?
Использование enum типов в TreeSet и TreeMap допустимо.
 
И мы можем написать:
```java
TreeSet<Role> treeSet = new TreeSet<>();
treeSet.add(Role.SECURITY_GUARD);
treeSet.add(Role.DIRECTOR);
treeSet.add(Role.TEACHER);
treeSet.add(Role.STUDENT);
treeSet.forEach(System.out::println);
```

И в консоли будет выведено:
```
STUDENT
TEACHER
DIRECTOR
SECURITY_GUARD
```

Мы получили вывод не по алфавиту. Дело в том, что если мы используем элементы enum-а для значений TreeSet или как ключи для TreeMap, элементы сортируются по их естественному порядку (по порядку, в котором они и заданы в enum).
 
Понимание этих особенностей помогает нам писать код качественнее.

### 62) Как связаны методы ordinal() и compareTo() в Enum?
Как было сказано ранее, ordinal() возвращает порядковый номер значения в общем списке перечислений.
 
Также в разборе предыдущего вопроса вы увидели, что элементы перечислений, попав, например, в TreeSet (отсортированное множество) принимают порядок, в котором они объявлены в enum. И как мы знаем, TreeSet и TreeMap сортируют элементы посредством вызова у них метода compareTo() интерфейса Comparable.
 
Из этого можно сделать предположение, что класс Enum имплементирует интерфейс Comparable, реализуя его в метод compareTo(), внутри которого и используется ordinal() для задания порядка сортировки.
 
Зайдя в класс Enum, мы видим подтверждение этого:

![](https://cdn.javarush.com/images/article/cb072bbb-7029-4c7d-a023-4a5ca3713f28/512.jpeg)

И тело самого метода:

![](https://cdn.javarush.com/images/article/bd80a553-7741-4ef9-b2c3-9b6b93affa64/512.jpeg)

Метод ordinal() тут не вызывается. Вместо этого используется переменная ordinal — порядковый номер элемента в перечислении.
 
Сам же метод ordinal() 

![](https://cdn.javarush.com/images/article/19551399-798f-480b-a91e-00c554840ec2/256.jpeg)

— не более чем геттер для переменной ordinal.

### 63) Напишите пример EnumM
В вопросах рассмотренных выше я уже приводил примеры enum-ов и не вижу смысла дублировать код (например, вопрос номер 72 про конструктор в enum).

### 64) Можно ли использовать Enum в switch case?
Можно и нужно!
 
Оглядываясь на свою практику, отмечу, что одним из наиболее частых мест применения enum являются логические конструкции типа switch.
 
В таком случае вы можете предусмотреть все возможные вариации case, и после прописания логики для всех значений enum-а использование оператора default может даже не понадобиться! Ведь если вы используете String или числовое значение, например, типа int, вам может прийти не предусмотренное значение, что в свою очередь невозможно с использованием enum-а.
 
Как бы выглядел switch для рассмотренного ранее примера:
 ```java
public void doSomething(Role role) {
   switch (role) {
       case STUDENT:
           // некая логика для STUDENT
           break;
       case TEACHER:
           // некая логика для TEACHER
           break;
       case DIRECTOR:
           // некая логика для DIRECTOR
           break;
       case SECURITY_GUARD:
           // некая логика для SECURITY_GUARD
           break;
   }
}
```

### 65) Как получить все имеющиеся значения в экземпляре Enum?
Если нужно получить все экземпляры перечисления, есть метод values(), который возвращает массив всех доступных значений определенного enum-а в естественно порядке (в порядке задания в enum).

Пример:
```java
Role[] roles = Role.values();
for (Role role : roles) {
   System.out.println(role);
}
```

В консоли будет вывод:
```
STUDENT
TEACHER
DIRECTOR
SECURITY_GUARD
```

### 66) Дайте краткую характеристику class object в Java
Во второй части разбора мы уже говорили о методах класса `Object`, и я напомню, что класс Object — прародитель всех классов в Java. У него есть 11 методов, которые, соответственно, наследуются всеми классами.
Информацию обо всех 11 методах можно найти во второй части разбора вопросов.

### 67)Для чего используют Equals и HashCode в Java?

- `hashCode()` — это метод класса `Object`, который наследуется всеми классами. Его задача — генерирование некоторого числа, которое представляет конкретный объект.
 
Примером использования данного метода может служить его применение в HashMap на объекте ключа для дальнейшего определения локального хешкода, по которому определится ячейка внутреннего массива (бакета), в которой будет сохранена пара.
 
Также как правило данный метод используется в методе `equals()` как один из его основных инструментов определения идентичности объектов.
 
- `equals()` — метод класса `Object`, задача которого — сравнивать объекты и определять, равны они или нет.
 
Данный метод используется повсеместно там, где нам необходимо сравнить объекты, ведь обычное сравнение через == не подходит для объектов, т.к. сравнивает только ссылки на них.

### 68) Расскажите про контракт между Equals и HashCode в Java?
Первое, что скажу — для корректной работы методов `equals()` и `hashCode()` их нужно правильно переопределить. После этого они должны соблюдать правила:
- одинаковые объекты, для которых сравнение через equals возвращает true, обязательно имеют одинаковые хеш-коды;
- объекты с одинаковыми хеш-кодами не всегда могут быть равны.

### 69) Выдвигаются ли условия переопределения соглашения при переопределении Equals?
Переопределенный метод `equals()` должен соблюдать следующие условия (правила):
- **рефлексивность** — для любого значения x выражение вида x.equals(x) всегда должно возвращать true (когда при этом x != null).

- **симметричность** — для любых значений x и y выражение вида x.equals(y) должно возвращать true только в том случае, если y.equals(x) возвращает true.

- **транзитивность** — для любых значений x, y и z, если выражение x.equals(y) возвращает true, при этом y.equals(z) тоже возвращает true, тогда и x.equals(z) должно вернуть значение true.

- **согласованность** — для любых значений x и y повторный вызов x.equals(y) будет всегда возвращать значение предыдущего вызова этого метода при условии, что поля, используемые для сравнения этих двух объектов, не были изменены между вызовами.

- **сравнение null** — для любого значения x при вызове x.equals(null) будет возвращено — false.

### 70) Что будет, если не переопределить Equals и HashCode?
В таком случае `hashCode()` будет возвращать число, сгенерированное на основе ячейки памяти, в которой хранится данный объект. То есть два объекта с совершенно одинаковыми полями при вызове непереопределенного `hashCode()` будут получать разные значения (ведь они хранятся в разных ячейках памяти).
 
Непереопределенный `equals()` сравнивает ссылки — указывают ли они на один и тот же объект или нет. То есть сравнение идет через ==, и в случае с объектами с одинаковыми полями будет всегда возвращать false. True будет только при сравнении ссылок на один и тот же объект.
 
Иногда есть логика в том, чтобы не переопределять эти методы. Например, вы хотите чтобы все объекты определенного класса были уникальными и переопределение этих методов только испортит логику уникальности.

Главное — понимать нюансы переопределенных и непереопределенных данных методов и использовать оба подхода в зависимости от ситуации.

### 71) Почему симметричность выполняется, только если x.equals (y) возвращает true?
Немного странный вопрос.
 
Если объект A равен объекту B, то и объект B равен объекту А. Если же B не равен объекту A, то как возможно обратное? Это обычная логика.

### 72) Что такое коллизия в HashCode? Как с ней бороться?
**Коллизия в hashCode** — это ситуация, в которой два разных объекта имеют одинаковое значение hashCode. Как это возможно?
 
Дело в том, что `hashcode` отображается в типе `Integer`, который, в свою очередь, имеет диапазон от -2147483648 до 2147483647, то есть приблизительно 4 миллиарда разных целых чисел.
 
Этот диапазон огромен, тем не менее, не бесконечен. Поэтому, возможны ситуации когда два совершенно разных объекта имеют одинаковый хеш-код. Это весьма маловероятно, но возможно.
 
Увеличивать частоту одинаковых хеш-кодов может еще плохо реализованная хеш-функция, которая будет, к примеру, возвращать числа в небольшом диапазоне, что увеличит шанс коллизий.
 
Для борьбы с коллизией нужно иметь хорошую имплементацию метода `hashCode`, чтобы разброс значений был максимальным и шанс повторения значений был минимальным.

### 73) Что будет, если элемент, участвующий в контракте с HashCode, изменит свое значение?
Если элемент, который участвует в подсчете хеш-кода был изменен, то и сам хеш-код объекта будет изменен (при хорошей хеш-функции). Поэтому в HashMap рекомендуется использовать иммутабельные (неизменяемые) объекты в качестве ключа, ведь их внутреннее состояние (поля) невозможно изменить после создания. Соответственно их хеш-код также не преобразуется после создания. 
 
Если же в качестве ключа использовать изменяемый объект, то при изменении полей данного объекта изменится его хеш-код и как итог можно потерять данную пару в HashMap. Ведь она будет сохранена в бакете для первоначального хеш-кода, а после изменения его поиск будет производиться в другом бакете.

### 74) Напишите методы Equals and HashCode для класса Student, который состоит из полей String name и int age

```java
public class Student {
int age;
String name;

 @Override
 public boolean equals(final Object o) {
   if (this == o) {
     return true;
   }
   if (o == null || this.getClass() != o.getClass()) {
     return false;
   }

   final Student student = (Student) o;

   if (this.age != student.age) {
     return false;
   }
   return this.name != null ? this.name.equals(student.name) : student.name == null;
 }

 @Override
 public int hashCode() {
   int result = this.age;
   result = 31 * result + (this.name != null ? this.name.hashCode() : 0);
   return result;
 }
}
```

`Equals:`
- Сперва мы сравниваем непосредственно ссылки, ведь если ссылки на один и тот же объект, какой смысл продолжать проверку? Все и так будет true.

- Проверка на null и на совпадение типов классов, ведь если объект — аргумент null или другого типа, то это значит, что объекты не равны — false.

- Приведение объекта аргумента к одному типу (вдруг это был объект родительского типа).

- Сравнение примитивного поля класса (ведь для него достаточно сравнения через =!), если поле не равно — false.

- Проверка непримитивного поля на null и на equals (в String метод переопределен и будет корректно сравнивать), если же оба поля null, либо equals, то проверка заканчивается и метод возвращает true.

`HashCode:`
- Задание начального значения хеш-кода равным примитиву age объекта.

- Умножение текущего хеш-кода на 31 (для большего разброса) и добавление к нему хеш-кода непримитивного строкового поля (если оно не null).

- Возвращение результата.

- В результате такого переопределения хеш-кода объекты с одинаковыми значениями name и int всегда будут возвращать одно и тоже значение.

### 75) В чем разница применения if (obj instanceof Student) и if (getClass () == obj.getClass ())?

Давайте разберемся, что делает каждый подход:
- `instanceof` проверяет, является ли ссылка на объект с левой стороны экземпляром типа с правой стороны или некоторым его подтипом.

- `getClass()` == ... проверяет идентичность типов.

То есть, если `getClass()` проверяет полную идентичность класса, то `instanceof` вернет true даже если объект будет всего лишь подтипом, что может дать нам большую гибкость при активном использовании полиморфизма.
 
Собственно, оба подхода хороши, если понимать особенности их работы и применять в нужных местах. 

### 76) Дайте краткую характеристику метода clone ().
`Clone()` — метод класса `Object`, предназначением которого — создание и возвращение клона текущего объекта (копии текущего объекта).

Для его использования необходимо имплементировать интерфейс маркер `Cloneable`:

```java
Student implements Cloneable
```

И переопределить сам метод `clone()`:

```java
@Override
protected Object clone() throws CloneNotSupportedException {
 return super.clone();
}
```

Ведь в классе `Object` он protected, то есть будет виден только в самом классе `Student`, но не виден для классов извне.

### 77) В чем заключается особенность работы метода clone () с полями объекта типа ссылки?
При клонировании объектов копируются только примитивные значения и значение ссылок на объекты. Это значит, что если объект имеет во внутреннем поле ссылку на другой объект, то будет клонирована только эта ссылка, сам же этот другой объект клонирован не будет. Собственно, это и называют — поверхностным клонированием.
 
Ну а что, если вам нужно полноценное клонирование с клонированием всех вложенных объектов? Как сделать, чтобы это были не копии ссылок, а полноценные клоны объекты с другими занимаемыми ячейками памяти в куче?

На самом деле все довольно просто — для этого вам нужно в каждом классе этих внутренних объектов также переопределить метод `clone()` и добавить интерфейс маркер — `Cloneable`. Тогда будут скопированные не ссылки на объекты, а сами объекты, ведь теперь они тоже имеют возможность копировать себя.

### 78) В чем преимущества и недостатки ООП, если сравнивать с процедурным / функциональным программированием?
В разборе вопросов для Juinior был данный вопрос, и соответственно я уже ответил на него.
 
Ищите этот вопрос и ответ на него в данной части статьи, вопросы 16 и 17.

### 79) Чем отличается агрегация от композиции?
В ООП существует несколько видов взаимодействия объектов, объединенных под общим понятием "Has-A Relationship". Это отношение указывает на то, что один объект является составной частью другого объекта.
 
При этом существует два подвида этого отношения: 

Композиция — один объект создает другой объект и время жизни другого объекта зависит от времени жизни создавшего.
Агрегация — объект получает ссылку (указатель) на другой объект в процессе конструирования (при этом время жизни другого объекта не зависит от времени жизни создавшего).
 
Для большего понимания, давайте рассмотрим конкретный пример. У нас есть некоторый класс машины — `Car`, у которого в свою очередь есть внутренние поля типа — двигатель — `Engine` и список пассажиров — `List<Passenger>`, также у него есть метод начала движения — `startMoving()`:

```java
public class Car {

 private Engine engine;
 private List<Passenger> passengers;

 public Car(final List<Passenger> passengers) {
   this.engine = new Engine();
   this.passengers = passengers;
 }

 public void addPassenger(Passenger passenger) {
   passengers.add(passenger);
 }

 public void removePassengerByIndex(Long index) {
   passengers.remove(index);
 }

 public void startMoving() {
   engine.start();
   System.out.println("Машина начала своё движение");
   for (Passenger passenger : passengers) {
     System.out.println("В машине есть пассажир - " + passenger.getName());
   }
 }
}
```
В данном случае Композицией является связь между `Car` и `Engine`, так как работоспособность машины напрямую зависит от наличия объекта двигателя, ведь если `engine = null`, то мы получим **NullPointerException**.
 
В свою очередь, и двигатель не может существовать без машины (зачем нам двигатель без машины?) и не может принадлежать нескольким машинам в один момент времени. Это значит то, что если мы удалим объект `Car`, то на объект `Engine` не будет больше ссылок, и его вскоре удалит `Garbage Collector`. Как вы видите, данная связь является весьма строгой (сильной).
 
Агрегацией является связь между `Car` и `Passenger`, так как работоспособность `Car` никоим образом не зависит от объектов типа `Passenger` и их количества.

Они могут как выходить из машины — `removePassengerByIndex(Long index)`, так и заходить новые — `addPassenger(Passenger passenger)`, несмотря на это, функционирование машины продолжится должным образом. В свою очередь, объекты Passenger могут существовать и без объекта Car. Как вы понимаете, это гораздо более слабая связь, нежели мы видим у композиции.

Но это еще не все, объект, который связан агрегацией с другим, может также иметь данную связь с другими объектами в один и тот же момент времени.
 
Например, вы как Java-студент, записаны на курсы английского, ООП и логарифмы в один и тот же момент времени, но при этом вы не являетесь критически необходимой частью их, без которой невозможно нормальное функционирование (как например, преподаватель).

### 80) Каким образом можно реализовать множественное наследование в Java?
**Множественное наследование** — это особенность объектно-ориентированной концепции, когда класс может наследовать свойства более чем одного родительского класса. 
 
Проблема возникает, когда существуют методы с одинаковой сигнатурой как в супер классах, так и в подклассе. При вызове метода компилятор не может определить, какой метод класса должен быть вызван, и даже при вызове метода класса, который получает приоритет.
 
Поэтому множественное наследование Java не поддерживает! Но есть своего рода лазейка, о которой мы и поговорим далее.
 
Как я и упомянул ранее, с выходом Java 8, интерфейсам была добавлена возможность иметь методы по умолчанию — `default` методы.
 
Если имплементирующий интерфейс класс не переопределяет данный метод, то будет использована данная реализация по умолчанию (переопределять дефолтный метод не обязательно, как например имплементировать абстрактный).
 
В таком случае, возможно имплементация различных интерфейсов одним классом и использование их методов по умолчанию. 
 
Рассмотрим пример. У нас есть некоторый интерфейс летуна, с default методом fly():
```java
public interface Flyer {
 default void fly() {
   System.out.println("Я лечу!!!");
 }
}
```
Интерфейс ходуна, с `default` методом `walk()`:
```java
public interface Walker {
 default void walk() {
   System.out.println("Я хожу!!!");
 }
}
```
Интерфейс плавуна, с методом swim():
```java
public interface Swimmer {
 default void swim() {
   System.out.println("Я плыву!!!");
 }
}
```
Ну а теперь имплементируем все это в одном классе утки:
```java
public class Duck implements Flyer, Swimmer, Walker {
}
```

И запустим, все методы нашей утки:
```java
Duck donald = new Duck();
donald.walk();
donald.fly();
donald.swim();
```
В консоли мы получим:
```
Я хожу!!!
Я лечу!!!
Я плыву!!!
```

А это значит, что мы верно изобразили множественное наследование, хоть это и не оно.

Также отмечу, если класс будет имплементировать интерфейсы с дефолтными методами, которые имеют одинаковые названия методов и одинаковые аргументы в этих методах, то компилятор начнет ругаться на несовместимость, так как он не понимает какой метод действительно нужно применять.
 
Выходов тут несколько:
- Переименовать методы в интерфейсах, чтобы они различались между собой.
- Переопределить такие спорные методы в классе имплементации.
- Наследоваться от класса, который реализует данные спорные методы (тогда ваш класс будет использовать именно его реализацию).

### 81) Какая разница между методами final, finally и finalize()?

`final` — это ключевое слово, который используется для наложения ограничений на класс, метод или переменную, ограничение означающее:
- Для переменной — после первичной инициализации, переменную переопределить нельзя.
- Для метода — метод не может быть переопределен в подклассе (классе наследнике).
- Для класса — класс не может быть унаследован.

`finally` — это ключевое слово перед блоком с кодом, используется при обработке исключений, совместно с блоком try и совместно (или взаимозаменяемо) с блоком catch. Код в данном блоке выполняется в любом случае, независимо от того, будет ли выброшено исключение или нет.
 
`finalize()` — метод класса Object, вызывается перед удалением каждого объекта сборщиком мусора, будет вызван этот метод (напоследок), используется для очистки занимаемых ресурсов.

### 82)  Можно ли использовать private или protected переменные в interface?
Нет, нельзя. Так как когда вы объявляете интерфейс, компилятор Java автоматически добавляет ключевые слова `public` и `abstract` перед методами интерфейса и ключевые слова `public`, `static` и `final` перед членами данных.
 
Собственно, если вы добавите `private` или `protected`, возникнет конфликт, и компилятор будет ругаться на модификатор доступа сообщением: “Modifier ‘<выбранный модификатор>’ not allowed here”
 
Почему же компилятор добавляет `public`, `static` и `final` переменным в интерфейсе?
 
Давайте разберёмся:
- `public` — интерфейс предоставляет возможность клиенту взаимодействовать с объектом. Если бы переменные не были общедоступными, у клиентов не было бы к ним доступа.
- `static` — интерфейсы не могут быть созданы (а точнее, их объекты), поэтому переменная статична.
- `final` — так как интерфейс используется для достижения 100% абстракции, переменная имеет свой конечный вид (и не будет изменена).

### 83) Что такое Classloader и для чего используется?
`Classloader` — или Загрузчик классов — обеспечивает загрузку классов Java.

А точнее, обеспечивают загрузку его наследники — конкретные загрузчики классов, т.к. сам `ClassLoader` абстрактен. 
 
Каждый раз, когда загружается какой-либо .class-файл, например, после обращения к конструктору или статическому методу соответствующего класса, это действие выполняет один из наследников класса `ClassLoader`.
 
Есть три вида наследников:
1. **Bootstrap ClassLoader** — базовый загрузчик, реализован на уровне JVM и не имеет обратной связи со средой выполнения, так как является частью ядра JVM и написан в машинном коде. Данный загрузчик служит родительским элементом для всех других экземпляров ClassLoader.

В основном отвечает за загрузку внутренних классов JDK, обычно rt.jar и других основных библиотек, расположенных в каталоге *$ JAVA_HOME / jre / lib*. У разных платформ могут быть разные реализации этого загрузчика классов.

2. **Extension Classloader** — загрузчик расширений, потомок класса базового загрузчика. Заботится о загрузке расширения стандартных базовых классов Java. Загружается из каталога расширений JDK, обычно — *$ JAVA_HOME / lib / ext* или любого другого каталога, упомянутого в системном свойстве java.ext.dirs (с помощью данной опции можно управлять загрузкой расширений).

3. **System ClassLoader** — системный загрузчик, реализованный на уровне JRE, который заботится о загрузке всех классов уровня приложения в JVM. Он загружает файлы, найденные в переменном окружении классов *-classpath* или *-cp* опции командной строки.

![](https://cdn.javarush.com/images/article/55679f3e-baa9-4442-8715-929d8c44d598/512.webp)

Загрузчики классов — это часть среды выполнения Java. 

В тот момент когда JVM запрашивает класс, загрузчик классов пытается найти класс и загрузить определение класса в среду выполнения, используя полное имя класса.

Метод `java.lang.ClassLoader.loadClass()` отвечает за загрузку определения класса во время выполнения. 

Он пытается загрузить класс на основе полного имени. Если класс еще не загружен, он делегирует запрос загрузчику родительского класса. 

Этот процесс происходит рекурсивно выглядит так:

1. System Classloader пытается найти класс в своем кеше.

    1.1. Если класс найден, загрузка успешно завершена.

    1.2. Если класс не найден, загрузка делегируется к Extension Classloader-у.

2. Extension Classloader пытается найти класс в собственном кеше.

    2.1. Если класс найден — успешно завершена.

    2.2. Если класс не найден, загрузка делегируется Bootstrap Classloader-у.

3. Bootstrap Classloader пытается найти класс в собственном кеше.

    3.1. Если класс найден, загрузка успешно завершена.

    3.2. Если класс не найден, базовый Bootstrap Classloader попытается его загрузить.

4. Если загрузка:

    4.1. Прошла успешно — загрузка класса завершена.

    4.2. Не прошла успешно — управление передается к Extension Classloader.

5. Extension Classloader пытается загрузить класс, и если загрузка:

    5.1. Прошла успешно — загрузка класса завершена.

    5.2. Не прошла успешно — управление передается к System Classloader.

6. System Classloader пытается загрузить класс, и если загрузка:

    6.1. Прошла успешно — загрузка класса завершена.

    6.2. Не прошла успешно — генерируется исключение — ClassNotFoundException.

### 84) Что такое Run-Time Data Areas?

**Run-Time Data Ares** — области данных среды выполнения JVM. 
 
JVM определяет некоторые области данных времени выполнения, необходимые во время выполнения программы. Одни из них создаются при запуске JVM. Другие являются локальными по отношению к потокам и создаются только при создании потока (и уничтожаются, когда поток уничтожается). 
 
Области данных среды выполнения JVM выглядят так:

![](https://cdn.javarush.com/images/article/0fd344e9-cc14-4d88-b544-2735144da82f/512.webp)

- PC Register — регистр ПК — локален для каждого потока и содержит адрес инструкции JVM, которую поток выполняет в данный момент.

- JVM Stack — область памяти, которая используется как хранилище для локальных переменных и временных результатов. У каждого потока есть свой отдельный стек: как только поток завершается, этот стек также уничтожается. Стоит отметить, что преимуществом stack над heap является производительность, в то время как heap безусловно имеет преимущество в масштабе хранилища.

- Native Method Stack — область данных для каждого потока, в которой хранятся элементы данных, аналогичные стеку JVM, для выполнения собственных (не Java) методов.

- Heap — используется всеми потоками как хранилище которое содержит объекты, метаданные классов, массивы и т. д., которые создаются во время выполнения. Данная область создается при запуске JVM и уничтожается при завершении ее работы.

- Method area — область метода — эта область времени выполнения общая для всех потоков и создается при запуске JVM. Он хранит структуры для каждого класса, такие как пул констант (Runtime Constant Pool — пул для хранения констант), код для конструкторов и методов, данные метода и т. д.

### 85) В чем особенность класса String?
Ранее в разборе мы неоднократно говорили про те или иные особенности `String` (для этого был отдельный раздел). Сейчас же подведем итог по особенностям `String`:

1. Это самый популярный объект в Java, который применяют для разнообразных целей. По частоте использования он не уступает даже примитивным типам.

2. Объект данного класса можно создать без использования ключевого слова new — непосредственно через кавычки `String str = “строка”;`.

3. `String` — это `immutable` класс: при создании объекта данного класса его данные нельзя изменить (когда вы к некоторой строке добавляете + “другую строку”, как результат вы получите новую, третью строку). Неизменность класса String делает его потокобезопасным.

4. Класс `String` финализирован (имеет модификатор `final`), поэтому его наследование невозможно.

5. У `String` есть свой пул строк, область памяти в heap, которая кеширует создаваемые строковые значения.

В Java присутствуют аналоги `String`, также предназначенные для работы с строками — `StringBuilder` и `StringBuffer`, но с тем отличием, что они изменяемые. 

### 86) Что такое ковариантность типов?
Для понимания ковариантности мы рассмотрим пример.
 
Предположим, у нас есть класс животного:
```java
public class Animal {
 void voice() {
   System.out.println("*тишина*");
 }
}
```
И некоторый расширяющий его класс `Dog`:
```java
public class Dog extends Animal {

 @Override
 public void voice() {
   System.out.println("Гав, гав, гав!!!");
 }
}
```
Как мы помним, родительскому типу мы можем без проблем присваивать объекты типа наследника:
```java
Animal animal = new Dog();
```

Это у нас будет ничто иное как полиморфизм. Удобно, гибко не так ли? 
 
Ну а в случае со списком животных? Сможем ли мы задать списку с дженериком `Animal` список с объектами `Dog`? 
```java
List<Dog> dogs = new ArrayList<>();
List<Animal> animals = dogs;
```
В таком случае строка присвоения списку животных списка собак будет подчеркнута красным, т.е. компилятор не пропустит данный код.
 
Несмотря на то, что вроде как это присваивание весьма логично (ведь переменной типа `Animal` мы можем присвоить объект `Dog`) его сделать нельзя.
 
Это происходит потому, что если бы это было допустимо, в список, который изначально предназначен для Dog, мы сможем положить объект `Animal`, при этом думая, что в списке у нас только `Dogs`. 
 
И потом, к примеру, возьмём с помощью метода `get()` объект у того списка dogs, думая, что это собака, и вызовем у него некоторый метод объекта `Dog`, которого нет у `Animal`. И как вы понимаете, это невозможно — упадет ошибка. Но, к счастью, компилятор не пропускает данную логическую ошибку с присвоением списка потомков, списку родителей (и наоборот). 
 
В Java возможно присвоение объектов списков лишь переменным списков с совпадающими дженериками. Это и называется инвариацией.
 
Если бы могли это сделать, это называлось бы и называлось ковариацией.
 
То есть, **ковариация** — это если бы мы могли переменной типа `List<Animal>` задать объект типа `ArrayList<Dog>`. 
 
Получается что в Java ковариантность не поддерживается? Как бы не так!

Но это делается своим, особым путем.
 
Для этого используется конструкция `? extends Animal`. Она ставится дженериком переменной, которой мы хотим задать объект списка, с дженериком потомка.
 
Эта конструкция дженерика значит, что подойдёт любой тип, который является потомком типа `Animal` (и тип `Animal` также попадает под это обобщение).
 
В свою очередь, `Animal` может быть не только классом, но и интерфейсом (и пусть вас не вводит в заблуждение ключевое слово `extends`).
 
Наше предыдущее присваивание мы можем выполнить следующим образом:
```java
List<Dog> dogs = new ArrayList<>();
List<? extends Animal> animals = dogs;
```

В результате вы увидите в IDE, что компилятор не будет ругаться на данную конструкцию.
 
Давайте проверим работоспособность данной конструкции. Предположим, у нас есть метод, который заставляет всех переданных ему животных издать звуки:
```java
public static void animalsVoice(List<? extends Animal> animals) {
 for (Animal animal : animals) {
   animal.voice();
 }
}
```
Передадим ему список с собаками:
```java
List<Dog> dogs = new ArrayList<>();
dogs.add(new Dog());
dogs.add(new Dog());
dogs.add(new Dog());
animalsVoice(dogs);
```
В консоли мы увидим следующий вывод:
```
Гав, гав, гав!!!
Гав, гав, гав!!!
Гав, гав, гав!!!
```
А значит данный подход к ковариантности успешно работает.
 
Отмечу, что в список с данным дженериком `? extends Animal` мы не можем вставить новые данные никакого типа: ни типа `Dog`, ни даже типа `Animal`:
```java
List<Dog> dogs = new ArrayList<>();
List<? extends Animal> animals = dogs;
animals.add(new Dog());
dogs.add(new Animal());
```
Собственно, в последних двух строках компилятор будет подчеркивать красным вставку объектов.
 
Это связано с тем, что мы не можем быть на сто процентов уверены, список с объектами какого типа будет присвоен списку с данных дженериком `<? extends Animal>`.

Хотелось бы ещё рассказать про **контравариантность**, так как обычно это понятие идет всегда вместе с ковариантностью, и как правило спрашивают о них вместе.
 
Это понятие — некоторая противоположность ковариантности, так как для данной конструкции используется тип наследника.
 
Предположим, нам нужен список, которому можно будет присвоить список с типом объектов, не являющихся предками объекта `Dog`. При этом мы заранее не знаем, что это будут за конкретные типы.
 
В таком случае нас может выручить конструкция вида `? super Dog`, для которой подходят все типы — прародители класса `Dog`: 
 
```java
List<Animal> animals = new ArrayList<>();
List<? super Dog> dogs = animals;
dogs.add(new Dog());
dogs.add(new Dog());
```

Мы можем смело добавлять в список с таким дженериком объекты типа `Dog`, ведь у него в любом случае присутствуют все реализованные методы любого его прародителя.

Но мы не сможем добавить объект типа `Animal`, так как нет уверенности, что внутри будут именно объекты этого типа, а не, например, `Dog`. Ведь мы можем запросить у элемента данного списка метод класса `Dog`, которого не будет в наличии у `Animal`. В таком случае возникнет ошибка компиляции.
 
Также, если бы мы захотели реализовать предыдущий метод, но уже с данным дженериком: 
```java
public static void animalsVoice(List<? super Dog> dogs) {
 for (Dog dog : dogs) {
   dog.voice();
 }
}
```
мы бы получили ошибку компиляции в цикле for, так как мы не можем быть уверены, что пришедший список содержит объекты типа Dog и свободно использовать его методы.
 
Если у данного списка мы вызовем метод `dogs.get(0);`  — мы получим объект типа `Object`.
 
То есть для работы метода `animalsVoice()` нам как минимум нужно добавить небольшие манипуляции с сужением данных вида:
```java
public static void animalsVoice(List<? super Dog> dogs) {
 for (Object obj : dogs) {
   if (obj instanceof Dog) {
     Dog dog = (Dog) obj;
     dog.voice();
   }
 }
}
```

### 87) Можно ли объявлять main method как final?
Да, несомненно, ничто не мешает нам объявить метод `main()` как `final`. Компилятор не выдаст ошибок.

Но стоит помнить, что какой-либо метод после объявления его как `final` станет последним методом — не переопределяемым. Хотя, кто будет переопределять `main`???

### 88) Можно ли импортировать те же package / class дважды? Какие могут быть последствия?
Да можно. Последствия? У нас будет пара ненужных импортов, которые Intelijj IDEA будет отображать как серые, т.е. неиспользуемые.

### 89) Что такое Casting? Когда можем получить исключение ClassCastException?

**Casting**, или *приведение типов* — это процесс преобразования одного типа данных в другой тип данных: вручную (неявное приведение) или автоматически (явное приведение типов).

Автоматическое преобразование выполняет компилятор, а ручное — разработчик.
 
Приведение типов для примитивов и классов несколько отличается, поэтому и рассмотрим их по отдельности.
 
**Примитивные типы**
Пример **автоматического приведения** примитивных типов:
 ```java
int value = 17;
double convertedValue = value;
```
Как видите, никаких дополнительных манипуляций помимо знака = тут не нужно.
 
Пример **ручного приведения** примитивных типов:
 ```java
double value = 17.89;
int convertedValue = (int)value;
```

В этом случае мы можем наблюдать ручное приведение, которое реализуется с помощью (int), при этом часть за запятой будет отброшена, и `convertedValue` будет иметь значение - 17.
 
 
Ну а теперь давайте перейдем к объектам.
 
**Ссылочные типы**
Для ссылочных типов **автоматическое приведение** возможно для классов наследников к классам родителям. Это так же называется **полиморфизмом**.
 
Предположим, у нас есть класс `Lion`, который наследуется от класса `Cat`. В этом случае автоматическое преобразование будет выглядеть так:

`Cat cat = new Lion();`

А вот с явным приведением всенесколько сложнее, ведь нет функционала обрезания лишнего, как у примитивов.
 
И сделав просто явно преобразование вида:

`Lion lion= (Lion)new Cat();`

Вы и получите ошибку:
![](https://cdn.javarush.com/images/article/1b2073c5-6f87-4878-9744-cd45de165099/1080.webp)
В самом деле, вы можете классу наследнику `Lion` добавить методы, которых не было изначально в классе Cat, и потом пытаться их вызвать, ведь типа объекта у вас станет `Lion`. Ну а в этом логики никакой нет.
 
Поэтому, сужение типа возможно лишь когда изначальный объект типа `Lion`, но был позже приведен к классу родителя:
 ```java
Lion lion = new Lion();
Cat cat = lion;
Lion newLion = (Lion)cat;
```
Также, для большей надежности, сужающее приведение для объектов рекомендуется с использованием конструкции instanceOf:
 ```java
if (cat instanceof Lion) {
 newLion = (Lion)new Cat();
}
```

### 90) Почему современные фреймворки используют в основном только unchecked exceptions?

Думаю, это все потому, что обработка checked исключений — это ещё тот спагетти код, который повсеместно повторяется, при этом не во всех случаях действительно нужен.

В таких случаях легче уже сделать обработку внутри фреймворка, чтобы лишний раз не перекладывать это на плечи разработчиков.
 
Да, несомненно, аварийная ситуация может возникнуть, но эти самые **uncheked** исключения можно обрабатывать более удобным способом, не заморачиваясь над обработкой в `try-catch` и не прокидывая дальше по методам. Достаточно всего лишь в exceptionHandler-е конвертировать исключение в некоторый HTTP-ответ.

### 91) Что такое static import?
При использовании статических данных (методов, переменных) можно не создавать сам объект, а делать это по имени класса, но и в таком случае нам необходима ссылка на класс. С ней все просто: она добавляется при помощи обычного импорта.
 
Но что если мы заходим использовать статический метод без написания имени класса, как будто это статический метод текущего класса? Это возможно с помощью статического импорта!
 
В таком случае мы должны прописывать `static import` и ссылку на тот метод. Как вот например, статический метод класса Math для вычисления значения косинуса:

`import static java.lang.Math.cos;`

В итоге мы можем использовать метод без указания имени класса:

`double result = cos(60);`

Также элементарно мы можем подгрузить сразу все статические методы класса с помощью статического импорта:

`import static java.lang.Math.*;`

### 92) Какая связь между методами hashCode() и equals()?
Согласно Oracle, существует следующее правило: 
 
Если два объекта равны (т.е. метод `equals()` возвращает **true**), у них должен быть одинаковый хэш-код.
 
При этом не стоит забывать, что одинаковый хэш-код может быть у двух разных объектов.
 
Чтобы разобраться, почему же `equals()` и `hashCode()` переопределяют всегда в паре, рассмотрим следующие случаи:
 
1. Оба метода переопределенные.

В таком случае два разных объекта с одинаковыми внутренними состояниями будут возвращать при `equals()` — **true**, в то время как и `hashCode()` будет у обоих возвращать одно и то же число.

Получается, все окей, ибо правило выполняется.

2. Оба метода не переопределенные.

В таком случае два разных объекта с одинаковыми внутренними состояниями при `equals()` будут возвращать **false**, так как сравнение идёт по ссылке через оператор ==.

Метод `hashCode()` также вернет разные значения (скорее всего), так как он выдает преобразованное значение адреса ячейки памяти. Но у одного и того же объекта это значение будет одинаковым, как и `equals()` в данном случае вернет **true**, только когда ссылки указывают на один и тот же объект.

Получается, и в данном случае все окей и правило выполняется.

3. Переопределен `equals()`, не переопределен `hashCode()`.

В таком случае для двух разных объектов с одинаковыми внутренними состояниями `equals()` будет возвращать **true**, а `hashCode()` будет возвращать (скорее всего) разные значения.

Происходит нарушение правила, поэтому так делать не рекомендуется.

4. Не переопределен `equals()`, переопределен `hashCode()`.

В таком случае для двух разных объектов с одинаковыми внутренними состояниями `equals()` будет возвращать **false**, а `hashCode()` будет возвращать одинаковые значения.

Происходит нарушение правила, поэтому подход неверный.

Как вы видите, выполнение правила возможно лишь когда equals() и hashCode() переопределяются оба либо оба не переопределяются вовсе.

### 93) Когда используют BufferedInputStream и BufferedOutputStream классы?
`InputStream` используется для побайтового чтения данных из некоторого ресурса, а OutputStream — для побайтовой записи. Но побайтовые операции могут быть весьма неудобными и требуют дополнительной обработки (чтобы нормально считывать/записывать тексты). Собственно, для упрощения таких байтовых записей ввели `BufferedOutputStream`, а для чтения `BufferedInputStream`.
 
Эти классы являются не чем иным как буферами, накапливающими данные, позволяющими работать с данными не побайтово, а целыми пакетами данных (массивами).
 
При создании `BufferedInputStream` принимает в конструктор экземпляр типа `InputStream`, с которого идёт считка данных:
```java
BufferedInputStream bufferedInputStream = new BufferedInputStream(System.in);
byte[] arr = new byte[100];
bufferedInputStream.read(arr);
```

- `System.in` — это объект типа InputStream, который считывает данные с консоли.

То есть с помощью данного объекта BufferedInputStream мы можем читать данные с `InputStream`, записывая их в переданный массив. Получается своего рода обертка класса `InputStream`.
 
Массив `arr` из данного примера — массив которому достаются данные из BufferedInputStream. Тот в свою очередь читает данные из `InputStream` другим массивом, который по умолчанию имеет размер 2048 байт.
 
Аналогично и для `BufferedOutputStream`: в конструктор необходимо передать экземпляр типа OutputStream, в который мы будем писать данные целыми массивами:
```java
byte[] arr = "Hello world!!!".getBytes();
BufferedOutputStream bufferedInputStream = new BufferedOutputStream(System.out);
bufferedInputStream.write(arr);
bufferedInputStream.flush();
```

- `System.out` — это объект типа OutputStream, который записывает данные в консоли.

Метод `flush()` отправляет данные с `BufferedOutputStream` в `OutputStream`, очищая при этом `BufferedOutputStream`. Без этого метода ничего записываться и не будет.
 
И аналогично предыдущему примеру: `arr` — это массив, из которого записываются данные в `BufferedOutputStream`. С него же они пишутся в `OutputStream` уже другим массивом, который по умолчанию имеет размер 512 байт.
