---
title: Java. Исключения (Exceptions)
category: java
description: Иерархия исключений, try-catch-finally, создание собственных исключений.
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

## 1. Что такое исключение и зачем оно нужно

**Исключение (Exception)** — это событие, которое происходит во время выполнения программы и нарушает нормальный поток инструкций.

**Аналогия**

Представь, что ты готовишь по рецепту. Внезапно обнаруживаешь, что закончились яйца. У тебя есть варианты:

- Паниковать и бросить всё — программа падает с ошибкой
- Заменить яйца на что-то другое — обработать ситуацию и продолжить
- Позвонить маме и попросить помощи — передать обработку выше по стеку

Исключения — это именно такой механизм. Они позволяют отделить «нормальную» логику от обработки ошибок.

#### Без исключений vs с исключениями

```java
// ❌ БЕЗ исключений — код превращается в лапшу
public int divide(int a, int b) {
    if (b == 0) {
        System.out.println("Ошибка: деление на ноль");
        return -1; // а что, если -1 — это валидный результат?
    }
    return a / b;
}

// ✅ С исключениями — чистая логика
public int divide(int a, int b) {
    return a / b; // Java сама бросит ArithmeticException при b == 0
}
```

## 2. Иерархия исключений

Все исключения в Java — это объекты, унаследованные от класса Throwable. Давай посмотрим на иерархию:

```
                  Throwable
                 /         \
              Error      Exception
                            |
                    -----------------
                    |               |
           RuntimeException    Checked Exceptions
           (unchecked)         (IOException, SQLException...)
```

### Throwable — прародитель всего

Базовый класс для всего, что можно «бросить» с помощью throw.

### Error — серьёзные проблемы JVM

Ошибки, которые не нужно ловить — они означают, что с JVM что-то не так.

|Пример|Что означает|
|-|-|
|OutOfMemoryError|Закончилась память|
|StackOverflowError|Бесконечная рекурсия|
|NoClassDefFoundError|Класс не найден|

> 💡 Правило: Error мы не обрабатываем. Если JVM «умирает» — программа должна упасть.

### Exception — исключения, которые можно обработать

Делятся на два типа:

#### Checked (проверяемые) исключения

Компилятор требует их обработать: либо поймать в try-catch, либо объявить в throws.

Примеры:

- IOException — проблемы с вводом/выводом
- SQLException — проблемы с базой данных
- ClassNotFoundException — класс не найден
- FileNotFoundException — файл не найден

```java
// ❌ Компилятор не скомпилирует!
public void readFile() {
    FileReader fr = new FileReader("file.txt"); // FileNotFoundException
}

// ✅ Нужно обработать
public void readFile() throws IOException {
    FileReader fr = new FileReader("file.txt");
}
```

#### Unchecked (непроверяемые) исключения — RuntimeException и его наследники

Компилятор не требует их обрабатывать, но они могут возникнуть в рантайме. Обычно это ошибки программиста.

|Исключение|Когда возникает|
|-|-|
|NullPointerException|Обращение к null|
|ArrayIndexOutOfBoundsException|Выход за границы массива|
|ArithmeticException|Деление на ноль|
|ClassCastException|Неверное приведение типов|
|IllegalArgumentException|Некорректный аргумент метода|
|NumberFormatException|Невозможно преобразовать строку в число|

```java
// Компилятор не ругается, но упадёт в рантайме
int[] arr = {1, 2, 3};
int x = arr[10]; // 💥 ArrayIndexOutOfBoundsException
```

#### Сводная таблица
|Тип|Проверка компилятором|Пример|Обрабатывать обязательно?|
|-|-|-|-|
|Error|Нет|OutOfMemoryError|❌ Не стоит|
|Checked Exception|✅ Да|IOException|✅ Обязательно|
|RuntimeException|❌ Нет|NullPointerException|По ситуации|

## 3. try-catch-finally

### Базовый синтаксис

```java
try {
    // Код, который МОЖЕТ бросить исключение
} catch (ТипИсключения e) {
    // Что делать, если произошло это исключение
} finally {
    // Выполнится ВСЕГДА, было исключение или нет
}
```

#### Пример

```java
public class DivisionDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.print("Введите первое число: ");
            int a = Integer.parseInt(scanner.nextLine());

            System.out.print("Введите второе число: ");
            int b = Integer.parseInt(scanner.nextLine());

            int result = a / b;
            System.out.println("Результат: " + result);

        } catch (NumberFormatException e) {
            System.out.println("Ошибка: введено не число!");
        } catch (ArithmeticException e) {
            System.out.println("Ошибка: деление на ноль!");
        } catch (Exception e) {
            // Ловим всё остальное (должен быть ПОСЛЕДНИМ!)
            System.out.println("Неизвестная ошибка: " + e.getMessage());
        } finally {
            System.out.println("Спасибо за использование программы!");
        }
    }
}
```

#### Правила catch

1. Порядок важен: от более специфичных к более общим
2. Нельзя поставить Exception первым — компилятор выдаст ошибку
3. Нельзя ловить одно и то же исключение дважды

```java
try {
    // ...
} catch (FileNotFoundException e) {     // сначала конкретное
    // ...
} catch (IOException e) {               // потом его родитель
    // ...
} catch (Exception e) {                 // в конце — самое общее
    // ...
}
```

### Multi-catch (Java 7+)

Если несколько исключений обрабатываются одинаково:

```java
try {
    // ...
} catch (NumberFormatException | ArithmeticException e) {
    System.out.println("Ошибка вычислений: " + e.getMessage());
}
```

### Методы Throwable

```java
try {
    int[] arr = {1, 2, 3};
    System.out.println(arr[10]);
} catch (Exception e) {
    System.out.println(e.getMessage());      // Короткое описание: "Index 10 out of bounds..."
    System.out.println(e.toString());        // Тип + сообщение
    e.printStackTrace();                     // Полный стек вызовов (в консоль ошибок)
}
```

### finally — когда он выполняется?

|Ситуация|finally выполнится?|
|Исключения не было|✅ Да|
|Исключение было и поймано|✅ Да|
|Исключение было и НЕ поймано|✅ Да (перед падением)|
|В try был return|✅ Да (перед выходом)|
|Вызван System.exit(0)|❌ Нет|
|Убита JVM|❌ Нет|

```java
public static int test() {
    try {
        return 1;
    } catch (Exception e) {
        return 2;
    } finally {
        System.out.println("finally"); // выведется ПЕРЕД возвратом 1
    }
}
```

> 💡 Когда использовать finally: для освобождения ресурсов — закрытия файлов, соединений с БД, сетевых сокетов. Но в современном Java для этого лучше использовать try-with-resources 👇

## 4. try-with-resources (Java 7+)

Если ресурс реализует интерфейс AutoCloseable, его можно объявить прямо в try, и он автоматически закроется.

### Без try-with-resources (старый способ)

```java
FileReader reader = null;
try {
    reader = new FileReader("file.txt");
    // читаем файл...
} catch (IOException e) {
    e.printStackTrace();
} finally {
    if (reader != null) {
        try {
            reader.close(); // может бросить своё исключение!
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### С try-with-resources (современный способ)

```java
try (FileReader reader = new FileReader("file.txt");
     BufferedReader br = new BufferedReader(reader)) {
    
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
    
} catch (IOException e) {
    e.printStackTrace();
}
// reader и br ЗАКРОЮТСЯ АВТОМАТИЧЕСКИ, даже если было исключение
```

> 💡 Правило: всегда используй try-with-resources для работы с файлами, соединениями, потоками. Это короче, чище и безопаснее.

## 5. throw и throws

### throw — бросить исключение вручную

```java
public void setAge(int age) {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("Некорректный возраст: " + age);
    }
    this.age = age;
}
```

### throws — объявить, что метод может бросить исключение

```java
// Checked exception — ОБЯЗАТЕЛЬНО объявляем в сигнатуре
public void readFile(String path) throws IOException {
    FileReader fr = new FileReader(path);
    // ...
}

// Unchecked — можно не объявлять, но можно (для документации)
public void divide(int a, int b) throws ArithmeticException {
    // ...
}
```

#### Разница

|Ключевое слово|Где используется|Что делает|
|-|-|-|
|throw|В теле метода|Бросает объект исключения|
|throws|В сигнатуре метода|Объявляет, какие исключения может бросить|

```java
public void processFile(String path) throws IOException {  // throws — объявление
    if (path == null) {
        throw new IllegalArgumentException("Path is null");  // throw — бросок
    }
    FileReader fr = new FileReader(path);  // сам бросает IOException
}
```

## 6. Создание собственных исключений

Иногда стандартных исключений не хватает. Например, тебе нужно специальное исключение `InsufficientFundsException` для банковского аккаунта.

### Checked vs Unchecked своё исключение

```java
// CHECKED — наследуемся от Exception
public class InsufficientFundsException extends Exception {
    private double amount;

    public InsufficientFundsException(String message, double amount) {
        super(message);
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }
}

// UNCHECKED — наследуемся от RuntimeException
public class InvalidUserInputException extends RuntimeException {
    public InvalidUserInputException(String message) {
        super(message);
    }
}
```

### Когда что использовать?

Тип
Когда использовать
Checked (extends Exception)
Когда вызывающий код обязан отреагировать (например, «недостаточно средств», «файл не найден»)
Unchecked (extends RuntimeException)
Когда это ошибка программиста или ситуация, которую нельзя предсказать (например, «неверный аргумент»)

> 💡 Современный тренд: в Java всё чаще используют RuntimeException. Checked-исключения считаются многими разработчиками «тяжёлыми» — они загроможждают код.

### Использование своего исключения

```java
public class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(
                "Недостаточно средств. Не хватает: " + (amount - balance),
                amount - balance
            );
        }
        balance -= amount;
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount(1000);

        try {
            account.withdraw(1500);
        } catch (InsufficientFundsException e) {
            System.out.println("Ошибка: " + e.getMessage());
            System.out.println("Не хватает: " + e.getAmount());
        }
    }
}
```

## 7. Цепочка исключений (Exception Chaining)

Иногда одно исключение вызывает другое. Чтобы не потерять информацию об оригинале, используй цепочку:

```java
public class UserRepository {
    public User getUser(int id) throws UserNotFoundException {
        try {
            // ... запрос к БД
        } catch (SQLException e) {
            // Упаковываем SQLException в наше исключение
            throw new UserNotFoundException("Пользователь " + id + " не найден", e);
        }
    }
}

public class UserNotFoundException extends Exception {
    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause); // cause — оригинальное исключение
    }
}
```

Теперь в стеке будет видно и `UserNotFoundException`, и его причину — `SQLException`.

## 8. Практические примеры

### Пример 1: Валидация email

```java
public class EmailValidator {
    public static void validate(String email) throws InvalidEmailException {
        if (email == null) {
            throw new InvalidEmailException("Email не может быть null");
        }
        if (!email.contains("@")) {
            throw new InvalidEmailException("Email должен содержать @");
        }
        if (!email.contains(".")) {
            throw new InvalidEmailException("Email должен содержать домен");
        }
    }
}

public class InvalidEmailException extends Exception {
    public InvalidEmailException(String message) {
        super(message);
    }
}
```

### Пример 2: Калькулятор с обработкой ошибок

```java
public class Calculator {
    public static double calculate(String expression) {
        try {
            String[] parts = expression.split(" ");
            if (parts.length != 3) {
                throw new IllegalArgumentException("Формат: число операция число");
            }

            double a = Double.parseDouble(parts[0]);
            String op = parts[1];
            double b = Double.parseDouble(parts[2]);

            return switch (op) {
                case "+" -> a + b;
                case "-" -> a - b;
                case "*" -> a * b;
                case "/" -> {
                    if (b == 0) throw new ArithmeticException("Деление на ноль");
                    yield a / b;
                }
                default -> throw new UnsupportedOperationException("Операция: " + op);
            };

        } catch (NumberFormatException e) {
            System.out.println("Ошибка: некорректные числа");
        } catch (ArithmeticException e) {
            System.out.println("Ошибка: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Неизвестная ошибка: " + e.getMessage());
        }
        return Double.NaN;
    }

    public static void main(String[] args) {
        System.out.println(calculate("10 + 5"));   // 15.0
        System.out.println(calculate("10 / 0"));   // Ошибка + NaN
        System.out.println(calculate("abc + 5"));  // Ошибка + NaN
    }
}
```

### Пример 3: Работа с файлами

```java
public class FileProcessor {
    public static List<String> readLines(String path) throws IOException {
        List<String> lines = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = reader.readLine()) != null) {
                lines.add(line);
            }
        } catch (FileNotFoundException e) {
            System.out.println("Файл не найден: " + path);
            throw e; // пробрасываем дальше
        } catch (IOException e) {
            System.out.println("Ошибка чтения: " + e.getMessage());
            throw e;
        }

        return lines;
    }
}
```

## 9. 🎯 Мини-задания для практики

1. **Безопасный парсер** — напиши метод parseIntSafe(String), который возвращает Integer или null, если строка не является числом. Не используй try-catch — сначала попробуй через проверку символов. Затем реализуй через try-catch.
2. **Валидатор пароля** — создай метод validatePassword(String), который бросает разные исключения:
- PasswordTooShortException (менее 8 символов)
- PasswordNoDigitException (нет цифр)
- PasswordNoUpperCaseException (нет заглавных букв)
Все три — свои классы, наследники RuntimeException.
3. **Стек с исключениями** — реализуй простую структуру данных «стек» (массив фиксированного размера). Методы push(int) и pop(). Бросай StackOverflowException при переполнении и StackUnderflowException при попытке достать из пустого стека.
4. **Банкомат** — напиши класс ATM с методами deposit, withdraw, getBalance. Обработай все возможные ошибки: некорректные суммы, недостаточный баланс, превышение лимита.
5. **Логгер с ресурсами** — напиши класс Logger, который открывает файл для записи в конструкторе и закрывает в методе close(). Реализуй AutoCloseable, чтобы его можно было использовать в try-with-resources.

### Антипаттерн: «проглатывание» исключений

```java
// ❌ ПЛОХО
try {
    doSomething();
} catch (Exception e) {
    // ничего не делаем — ошибка исчезает бесследно!
}

// ✅ ХОРОШО
try {
    doSomething();
} catch (SpecificException e) {
    log.error("Ошибка при ...", e);
    // или: переопределить, уведомить пользователя, retry и т.д.
}
```

## 11. 📝 Что запомнить
1. Иерархия: Throwable → Error (не ловим) и Exception (ловим)
2. Checked (IOException) — компилятор заставляет обрабатывать
3. Unchecked (RuntimeException) — ошибки программиста, обрабатывать по ситуации
4. try-catch-finally: try — опасный код, catch — обработка, finally — всегда выполняется
5. Порядок catch: от конкретного к общему
6. try-with-resources — автоматически закрывает ресурсы
7. throw — бросаем исключение, throws — объявляем в сигнатуре
8. Свои исключения: наследуем от Exception (checked) или RuntimeException (unchecked)
9. Никогда не проглатывай исключения — хотя бы логируй их
10. Исключения — для исключительных ситуаций, не для обычной логики

## Вопросы на собеседованиях

### 1) Что такое Exception?

Exception — это проблема, которая может возникнуть в runtime. Это исключительная ситуация, которая возникает из-за каких-то причин. 

Диаграмма наследования исключений выглядит так (нужно знать ее назубок ;) ):

![](https://cdn.javarush.com/images/article/273e683e-f4a7-472e-9d61-566ae1f6f4ab/512.webp)

На диаграмме видно, что в целом все исключения делятся на две группы — **exceptions** и **error**.

**Error** — используются JVM для отображения ошибок, после которых работа приложения уже не имеет смысла. Например StackOverFlowError, которая говорит, что стек заполнен и программа уже не может работать.

Exception — исключения, которые генерируются программно в коде. Есть разные исключения, проверяемые и непроверяемые, но главное, что они есть, и их можно перехватить и продолжить работу приложения.

Exceptions, в свою очередь, еще делятся на тех, кто наследуется от RuntimeException и других наследников Exception. 

В рамках этого вопроса информации достаточно. О том, что такое проверяемые / непроверяемые исключения, поговорим ниже.

### 2) Как JVM обрабатывает исключения?

Как это работает? Как только где-то создается исключение, runtime создает Exception Object (обозначим как ExcObj). В нем хранится вся необходимая для работы информация — само исключение, которое вызывалось и место, где это произошло.

Создание ExcObj и передача в runtime есть ничто иное как “выбрасывание исключения”.

ExcObj содержит методы, по которым можно дойти до место создания исключения. Это множество методов называется Call Stack.

Далее, runtime система ищет метод в Call Stack, который сможет обработать наше исключение. 

Если он таки находит соответствующий обработчик, то есть тип исключения совпадает с типом в обработчике, все хорошо. 

Если не находит, то runtime передает всё в default exception handler, который подготавливает ответ и завершает работу.

Как это выглядит наглядно:

```java
/**
* Пример, в котором показываются две опции — когда находится обработчик для исключения и когда нет.
*/
class ThrowerExceptionExample {

   public static void main(String[] args) throws IllegalAccessException {

       ThrowerExceptionExample example = new ThrowerExceptionExample();

       System.out.println(example.populateString());
   }

   /**
    * Здесь происходит перехват одного из возможных исключений — {@link IOException}.
    * А вот второй будет пробрасываться дальше вверх по вызову.
    */
   private String populateString() throws IllegalAccessException {
       try {
           return randomThrower();
       } catch (IOException e) {
           return "Caught IOException";
       }
   }

   /**
    * Здесь две опции: или бросается {@link IOException} или {@link IllegalAccessException}.
    * Выбирается случайным образом.
    */
   private String randomThrower() throws IOException, IllegalAccessException {
       if (new Random().nextBoolean()) {
           throw new IOException();
       } else {
           throw new IllegalAccessException();
       }
   }
}
```

В нашем случае CallStack схематично будет иметь вид: 

`randomThrower() => populateString() => main(String[] args)`

Есть две опции: случайным образом будет выброшено одно или другое исключение. Для IOException все ок, если будет сгенерировано оно, то результатом работы будет: "Caught IOException".

А вот если будет второе исключение, обработчика на которого нет, программа будет остановлена с таким выводом:

```java
Exception in thread "main" java.lang.IllegalAccessException
  at ThrowerExceptionExample.randomThrower(CollectionExample.java:38)
  at ThrowerExceptionExample.populateString(CollectionExample.java:24)
  at ThrowerExceptionExample.main(CollectionExample.java:15)
```

### 3) Как программистам обрабатывать исключения?

В вопросах выше уже использовались те или иные ключевые слова для работы с исключениями, теперь нужно поговорить о них более подробно.

Какие есть ключевые слова? 

- try
- catch
- throw
- throws
- finally

Важно отметить, что catch, throw и throws можно использовать только с java.lang.Throwable. С другими типами работать это не будет.

Сейчас обсудим именно try, catch и finally.

- try-catch-finally — это конструкция, при помощи которой можно правильным образом перехватить и обработать исключение.
- try — может быть только один раз, в нем и происходит логика;
- catch — блок, который принимает какой-то тип исключения, их может быть множество. Например, в блоке try будет генерироваться несколько исключений, которые никак друг с другом не связаны;
- finally — “наконец-то” и этот блок. Это блок, который выполнится в любом случае, независимо от того, что делается в try, catch.

Вот как это выглядит:

```java
try {
   // сюда передают тот код, который может вызвать исключение.
} catch (IOException e) {
   // первый catch блок, который принимает IOException и все его подтипы(потомки).
   // Например, нет файла при чтении, выпадает FileNotFoundException, и мы уже соответствующе
   // обрабатываем это.
} catch (IllegalAccessException e) {
   // если нужно, можно добавить больше одного catch блока, в этом нет проблем.
} catch (OneException | TwoException e) {
   // можно даже объединять несколько в один блок
} catch (Throwable t) {
   // а можно сказать, что мы принимаем ВСЁ))))
} finally {
   // этот блок может быть, а может и не быть.
   // и он точно выполнится.
}
```

### 4) throw и throws в Java

#### throw

throw используют в случае, когда нужно явно создать новое исключение. Применяют его для создания и выбрасывания пользовательских исключений. 

Например, исключения, связанные с валидацией. Обычно для валидации наследуются от RuntimeException.

Пример:

```java
// пример пробрасывания исключения
throw new RuntimeException("because I can :D");
```

Важно, что использовать эту конструкцию можно только тем, что наследуется от Throwable. То есть, нельзя сказать так:

```java
throw new String("как тебе такое, Илон Маск?");
```

Далее, работа потока обрывается и начинается поиск обработчика, который смог бы обработать его. Когда не находит, идет к методу, который вызвал его, и так поиск будет идти наверх по строке вызовов пока либо не найдет соответствующий обработчик, либо оставит работу приложения.

Смотрим:

```java
// Пример, который демонстрирует работу throw
class ThrowExample {

   void willThrow() throws IOException {
       throw new IOException("Because I Can!");
   }

   void doSomething() {
       System.out.println("Doing something");
       try {
           willThrow();
       } catch (IOException e) {
           System.out.println("IOException was successfully handled.");
       }
   }

   public static void main(String args[]) {
       ThrowExample throwExample = new ThrowExample();
       throwExample.doSomething();
   }
}
```

Если запустить программу, получим такой результат:

```
Doing something
IOException was successfully handled.
```

#### throws

throws — механизм, при помощи которого метод может выбрасывать одно или более исключений. Добавляются они через запятую. 

Смотрим как это легко и просто:

```java
private Object willThrow() throws RuntimeException, IOException, FileNotFoundException
```

Причем важно отметить, что могут быть как проверяемые таки непроверяемые исключения. 

Разумеется, что непроверяемые исключения можно и не добавлять в throws, но правила хорошего тона говорят об обратном.

Если это проверяемые, то используя метод, который их генерирует, нужно как-то его обработать. Есть два варианта:

1. Написать try-catch с соответствующим и выше по наследованию исключением.
2. Использовать throws точно так же, чтобы эта проблема была уже у кого-то другого :D

### 5) Checked и Unchecked исключения в Java

B Java есть два типа исключений — checked и unchecked.

#### Checked исключения:

Это исключения, которые проверяются во время компиляции. Если какой-то код в методе во время исключения выдает checked исключение, метод обязан либо обработать его при помощи try-catch, либо пробросить его дальше

На примере, который считывает картинку из пути "/users/romankh3/image.png", обновляет ее каким-то образом(для нас это не важно) и сохраняет ее обратно. 

```java
class CheckedImageExample {
   public static void main(String[] args) {
       File imageFile = new File("/users/romankh3/image.png");
       BufferedImage image = ImageIO.read(imageFile);
       updateAndSaveImage(image, imageFile);
   }

   private static void updateAndSaveImage(BufferedImage image, File imageFile) {
       ImageIO.write(image, "png", imageFile);
   }
}
```

Такой код компилироваться не будет, так как статические методы ImageIO.read() и ImageIO.write() выбрасывают исключение IOException, которое является checked (проверяемым) и должно соответственно быть обработанным.

Здесь две опции, которые мы уже обсудили выше: или использовать try-catch, или пробросить дальше. Для лучшего усвоения сделаем и так, и эдак.

То есть в методе updateAndSave просто пробросим, а уже в главном методе воспользуемся try-catch:

```java
class CheckedImageExample {
   public static void main(String[] args) {
       File imageFile = new File("/users/romankh3/image.png");
       try {
           BufferedImage image = ImageIO.read(imageFile);
           updateAndSaveImage(image, imageFile);
       } catch (IOException e) {
           e.printStackTrace();
       }
   }

   private static void updateAndSaveImage(BufferedImage image, File imageFile) throws IOException {
       ImageIO.write(image, "png", imageFile);
   }
}
```

#### Unchecked исключения:

Это те исключения, которые на этапе компиляции не проверяются. То есть метод может генерировать RuntimeException, а компилятор не напомнит каким-то образом это обработать.

Как показано ниже, у нас все, кто наследуются от RuntimeException и Error являются непроверяемыми.

![](https://cdn.javarush.com/images/article/114eb6e8-44e3-4681-aec1-e4a7bcdd0695/512.webp)

Рассмотрим следующую Java-программу. Код прекрасно компилируется, но при запуске выдает исключение ArrayIndexOutOfBoundsException. Компилятор позволяет его компилировать, потому что ArrayIndexOutOfBoundsException является непроверенным исключением.

Обычная ситуация с массивом, которая может быть:

```java
class CheckedImageExample {
   public static void main(String[] args) {
       int[] array = new int[3];
       array[5] = 12;
   }
}
```

Результатом будет:

```java
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 5
  at main(CheckedImageExample.java:12)
```

Кстати, вы уже заметили, что в Java короткие имена никто не дает? Чем больше, тем лучше. Он, Spring Framework, в этом при успел очень сильно: возьми только какой-нибудь BeanFactoryPostProcessor класс)))

### 6) Что такое try-with-resources?

Это механизм, при помощи которого нужно правильно закрывать все ресурсы.

Как-то не понятно, да?) 

Для начала, что такое ресурс...

Ресурс — это объект, после работы с которым нужно закрыть его, то есть вызвать метод close(). Ресурсом называются все объекты, которые реализуют интерфейс AutoClosable, который, в свою очередь реализует интерфейс Closeable. 

Для нас важно понять, что все InputStream, OutpuStream являются ресурсами и их нужно правильно и успешно высвобождать. Вот как раз для этого и нужно нам использовать try-with-resource конструкцию. 

Вот как она выглядит:

```java
private void unzipFile(File zipFile) throws IOException {
   try(ZipInputStream zipOutputStream = new ZipInputStream(new FileInputStream(zipFile))) {
       ZipEntry zipEntry = zipOutputStream.getNextEntry();
       while (zipEntry != null) {

       }
   }
}

private void saveZipEntry(ZipEntry zipEntry) {
   // логика сохранения
}
```

Вот этом примере ресурс — это ZipInputStream, после работы с которым нужно будет закрыть его. И чтоб не думать о том, что нужно вызвать метод close(), мы просто определяем эту переменную в блоке try, как показано в примере и в рамках этого блока выполняем все необходимое. Что делает пример? Он разархивирует zip архив. Для этого нужно воспользоваться InputStream’ом.

Определять можно больше одной переменной, разделяют их точкой с запятой.

### 7) В чем различие между try-with-resources и try-catch-finally при работе с ресурсами?

Как правило при использовании try-catch-finally блок final применяли для закрытия ресурсов. В Java 7 появился новый вид оператора try-with-resources, аналог try-catch-finally для освобождения ресурсов, но более компактный и удобочитаемый.

Давайте вспомним, как выглядит try-catch-finally:
```java
String text = "some text......";
BufferedWriter bufferedWriter = null;
try {
   bufferedWriter = new BufferedWriter(new FileWriter("someFileName"));
   bufferedWriter.write(text);
} catch (IOException e) {
   e.printStackTrace();
} finally {
   try {
       bufferedWriter.close();
   } catch (IOException e) {
       e.printStackTrace();
   }
}
```

А теперь давайте перепишем этот код, но с использованием try-with-resources:
```java
String text = "some text......";
try(BufferedWriter bufferedWriter =new BufferedWriter(new FileWriter("someFileName"))) {
   bufferedWriter.write(text);
} catch (IOException e) {
   e.printStackTrace();
}
```

Как-то проще стало, не находите? Помимо упрощения, ещё есть пара моментов:

1. В try-with-resources ресурсы, объявленные в скобках (которые будут закрыты), должны имплементировать AutoCloseable интерфейс и его единственный метод — close().

Метод close выполняется в неявном finally блоке, иначе как программа поймет, как именно данный закрывать ресурс?

Но, скорее всего, вы редко будете писать свои имплементации ресурсов и их метод закрытия.

2. Последовательность выполнения блоков:

    1. Блок try.
    2. Неявный finally.
    3. Блок catch, который ловит исключения в предыдущих шагах.
    4. Явный finally.
    
Как правило исключения, которые выпали ниже по списку, перебивают те, что выпали выше.

Представьте ситуацию, что при использовании try-catch-finally у вас в try падает исключение. Соответственно, сразу начинает исполняться определенный блок catch, в котором вы прописываете другое исключение (например, с сообщением, которое более подробно описывает ошибку), и вы хотите, чтобы метод прокидывал это исключение дальше. Следом идет выполнение блока finally, и в нём тоже падает исключение. Но уже другое.
 
Какое же из этих двух исключений в итоге выбросит данный метод? Исключение, которое выбросил блок finally!
 
Но и тут есть один момент с try-with-resources. 
 
Теперь рассмотрим поведение try-with-resources в этой же ситуации. У нас падает исключение в блоке try при попытке закрытия ресурсов в методе close(), то есть в неявном finally.
 
Какое же из этих исключений отловит catch? То, которое выбросил блок try! Исключение из неявного finally (из метода close()) будет игнорироваться. Это игнорирование еще называют подавлением исключений.

### 8) В чем разница между error и exception?
Как исключения, так и ошибки являются подклассами класса `Throwable`. Тем не менее, они имеют свои различия. 

Ошибка указывает на проблему, которая в основном возникает из-за нехватки системных ресурсов. И наше приложение не должно обнаруживать эти типы проблем. Некоторые из примеров ошибок — сбой системы и ошибка нехватки памяти. Ошибки в основном возникают во время выполнения, так как они относятся к непроверенному типу. 

**Исключения** — это проблемы, которые могут возникнуть во время выполнения и во время компиляции. Как правило это происходит в коде, написанном разработчиками. То есть exception более предсказуемые и более зависящие от нас как от разработчиков. В это же время errors более случайны и более независимы от нас, а скорее зависимы от неполадок самой системы, в которой работает наше приложение.

### 9) Какая разница между checked и unchecked, exception, throw, throws.
Как я и сказал ранее, **exception** — это ошибка во время выполнения программы и во время компиляции, которая произошла в  написанном разработчике коде (из-за некой нештатной ситуации).
 
**Checked** — вид исключений, которые нужно всегда обрабатывать посредством использования механизма — `try — catch` или пробрасывать в методы выше.

**Throws** используется в заголовке метода для обозначения возможных брошенных исключений данным методом. То есть это и есть механизм “проброски” исключений в методы выше.
 
**Unchecked** — вид исключений, которые не нужно обрабатывать, они, как правило, менее предсказуемы и менее вероятны. Тем не менее, по желанию их тоже можно обработать.

**Throw** используется, при ручном броске исключения, например:

`throw new Exception();`

### 10) Какова иерархия исключений?
Иерархия исключений весьма велика обширна, даже слишком, чтобы о ней вот тут так все рассказать. Поэтому, мы рассмотрим лишь ключевые ее звенья:

![](https://cdn.javarush.com/images/article/a290c6bc-6eec-4b48-b006-fbe33332bbb0/800.jpeg)

Тут на самом верху иерархии мы видим класс — `Throwable` — общий класс, предок иерархии исключений, который в свою очередь делится на:

- Error — критические, непроверяемые ошибки.
- Exception — проверяемые исключения.

Exception делится на различные непроверяемые runtime исключения и разнообразные проверяемые исключения.

### 11) Что такое checked и unchecked exception?
Как я раньше и говорил:
- **Checked** — исключения, которые вы обязаны как-то обработать, то есть либо обработать в блоке `try — catch`, либо “пробросить“ в метод выше. Для этого в сигнатуре метода после перечисления аргументов метода нужно использовать ключевое слово `trows <тип исключения>`, которое указывает для пользователей метода, что метод может кинуть данное исключение (что-то вроде предупреждения) и передаст обязанность обрабатывать исключение уже для пользователей сего метода.

- **Unchecked** — исключения, которые обрабатывать не нужно, так как они не проверяются во время компиляции и, как правило, более непредсказуемые. То есть, основная разница с checked в том, что для них эти механизмы try — catch или пробрасывания работают также, но они не являются обязательными.

### 12) Напишите пример перехвата и обработки исключения в блоке try — catch метода

```java
try{                                                 // начало блока перехвата
 throw new Exception();                             // ручной бросок исключения
} catch (Exception e) {                              // данное исключение и его потомки будут перехватываться
 System.out.println("Упс, что-то пошло не так =("); // вывод некоторого исключения в консоль
}
```

### 13) Напишите пример перехвата и обработки исключения с использованием собственных исключений

Сперва напишем свой класс исключения, который наследуется от Exception и переопределим ему конструктор с сообщением ошибки:

 ```java
public class CustomException extends Exception {

 public CustomException(final String message) {
   super(message);
 }
}
```

Ну а далее бросим его вручную и перехватим как и в предыдущем вопросе:

```java
try{
 throw new CustomException("Упс, что-то пошло не так =(");
} catch (CustomException e) {
 System.out.println(e.getMessage());
}
```

И опять же при запуске вы получите вывод в консоль:
```
Упс, что-то пошло не так =(
```

### 14) Какие есть правила для проверки исключений при наследовании?
Если я правильно понимаю вопрос, тут спрашивают про правила работы с исключениями при наследовании, и они таковы:
- Переопределяемый или реализуемый метод в наследнике / реализации не может выбрасывать контролируемые исключения, которые выше по иерархии чем исключения в методе суперкласса / интерфейса.
То есть если у нас есть некий интерфейс `Animal` с методом, бросающим `IOException`:

```java
public  interface Animal {
   void voice() throws IOException;
}
```
В реализации данного интерфейса мы не можем выставить более общее бросаемое исключение (например, **Exception**, **Throwable**), но можем заменить его на исключение наследника, как, например, на **FileNotFoundException**:

```java
public class Cat implements Animal {
   @Override
   public void voice() throws FileNotFoundException {
// некоторая реализация
   }
}
```

- Конструктор подкласса должен включить в свой блок `throws` все классы исключений пробрасываемым конструктором суперкласса, к которому идет обращение при создании объекта.

Предположим, что конструктор класса `Animal` бросает множество исключений: 

```java
public class Animal {
  public Animal() throws ArithmeticException, NullPointerException, IOException {
  }
```

Тогда наследник класса в конструкторе также обязан их указать:
```java
public class Cat extends Animal {
   public Cat() throws ArithmeticException, NullPointerException, IOException {
       super();
   }
```

Либо, как и в случае с методами — можно указать не те же исключения, а более общие. 
 
В нашем случае достаточно будет указать более общее исключение — Exception, так как это общий предок всех рассмотренных трех исключений:

```java
public class Cat extends Animal {
   public Cat() throws Exception {
       super();
   }
```

### 15) Могли бы вы написать код, когда блок finally не будет выполнен?
Для начала вспомним, что же такое `finally`. Ранее мы рассматривали механизм перехвата исключений: блок `try` очерчивает зону перехвата, в то же время блок (блоки) `catch` — это код, который сработает при падении определенного исключения. 
 
`Finally` — третий блок кода после слова `finally`, который является взаимозаменяемым с `catch`, но не взаимоисключающим. Суть данного блока в том, что код в нем срабатывает всегда, независимо от результата срабатывания `try` или `catch` (независимо от того упало ли исключение или нет).
 
Случаи его несрабатывания весьма редки и они являются нештатными.
 
Самый простой случай несрабатывания — это когда в коде выше будет вызван метод System.exit(0), который завершает программу (тушит ее):

```java
try {
   throw new IOException();
} catch (IOException e) {
   System.exit(0);
} finally {
   System.out.println("Данное сообщение не будет выведенно в консоль");
}
```

Также есть некоторые другие ситуации, в которых `finally` не сработает:
- Аварийное завершение программы, вызванное критическими неполадками системы, либо падение некоторой ***Error***, которая “уронит” приложение (примером error может стать та же **StackOwerflowError** возникающая при переполнении памяти стека).
- Когда через блок `try…finally` проходит `deamon`-поток и параллельно с этим программа завершается. Ведь `deamon`-поток — это поток для фоновых действий, то есть он не является приоритетным и обязательным и приложение не будет ждать окончания его работы.
- Самый банальный бесконечный цикл, в `try` или `catch`, попав в который поток там останется навсегда:
```java
try {
   while (true) {
   }
} finally {
   System.out.println("Данное сообщение не будет выведенно в консоль");
}
```

### 16) Напишите пример обработки нескольких исключений в одном блоке catch

1. Возможно вопрос был задан некорректно.

Насколько я понимаю в данном вопросе имеется в виду множество catch для одного блока try:
```java
try {
  throw new FileNotFoundException();
} catch (FileNotFoundException e) {
   System.out.print("Упс, у вас упало исключение - " + e);
} catch (IOException e) {
   System.out.print("Упс, у вас упало исключение - " + e);
} catch (Exception e) {
   System.out.print("Упс, у вас упало исключение - " + e);
}
```

Если в блоке `try` падает исключение, то блоки `catch` поочередно сверху вниз пытаются его перехватить, если у некоторого блока catch это получается, он получает право на обработку исключения, в то время когда остальные блоки ниже уже не смогут попытаться перехватить и по своему обработать его.
 
Поэтому, более узкие исключения ставятся в цепочке `catch` блоков выше, а более широкие — пониже. К примеру, если у нас в первом `catch` блоке отлавливается исключение класса **Exception**, то в остальные блоки проверяемые исключения попасть никак не смогут (остальные блоки с наследниками **Exception** будут абсолютно бесполезны).

2. Вопрос был задан корректно

В таком случае наша обработка будет иметь вид вроде следующего:
```java
try {
  throw new NullPointerException();
} catch (Exception e) {
   if (e instanceof FileNotFoundException) {
       // некоторая обработка с сужением типа (FileNotFoundException)e
   } else if (e instanceof ArithmeticException) {
       // некоторая обработка с сужением типа (ArithmeticException)e
   } else if(e instanceof NullPointerException) {
       // некоторая обработка с сужением типа (NullPointerException)e
   }
```
Словив исключение через `catch`, мы пытаемся выяснить его конкретный тип через метод instanceof, который используется для проверки — принадлежит ли объект определенному типу, чтобы потом без негативных последствий можно было сузить его до этого типа.
 
Оба рассмотренных подхода могут применяться в одной и той же ситуации, но 
про некорректность вопроса я сказал из-за того, что второй вариант я бы не назвал хорошим и в своей практике ни разу не встречал, в то же время первый способ с мультикетчами получил широкое распространение.

### 17) Какой оператор позволяет принудительно выбросить исключение? Напишите пример
Выше я уже неоднократно использовал, тем не менее повторю это ключевое слово — `throw`.
 
Пример использования (принудительная выброска исключения):
 
`throw new NullPointerException();`

### 18)Может метод main выбросить throws-исключение? Если да, то куда передаст?
В первую очередь хочу отметить, то что `main` это не более чем обычный метод, и да, он вызывается виртуальной машиной для начала выполнения программы, но кроме этого он может быть вызван и из любого другого кода.
 
То есть на него также распространяются обычные правила указания выбрасываемых проверяемых исключений (checked exceptions) после `throws`: 
 
`public static void main(String[] args) throws IOException {`

Соответственно в нем тоже могут падать исключения.
 
Если `main` не был вызван в каком-то методе, а был запущен как точка запуска программы, то выброшенное им исключение будет обрабатываться перехватчиком **UncaughtExceptionHandler**. 
 
Данный обработчик один на свой поток (то есть по одному обработчику в каждом потоке). При надобности можно создать свой обработчик и задать его с помощью метода `setDefaultUncaughtExceptionHandler`, вызванного у объекта `Thread`.