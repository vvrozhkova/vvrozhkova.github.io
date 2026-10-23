---
title: Java. Ввод/Вывод (I/O и NIO)
category: java
description: Чтение и запись файлов, работа с путями.
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

До этого мы работали с данными в памяти программы. Но в реальных приложениях нужно читать файлы, записывать логи, обрабатывать конфигурации, работать с сетью. Давай разберёмся, как Java работает с внешним миром.

## 1. Что такое I/O и NIO?

В Java есть **два поколения** API для работы с вводом/выводом:

### I/O (Input/Output) — «старое» API (с Java 1.0, 1996)

- Потоковая модель — данные читаются/пишутся последовательно, байт за байтом
- Блокирующие операции — поток ждёт, пока данные не будут прочитаны
- Основные классы: InputStream, OutputStream, Reader, Writer, File
- Простое, но медленное для больших файлов

### NIO (New I/O) — «новое» API (с Java 1.4, 2002)

- Буферная модель — данные читаются блоками в буфер
- Неблокирующие операции — можно обрабатывать несколько каналов одновременно
- NIO.2 (Java 7, 2011) — добавила удобный API для работы с файлами: Path, Files, Paths
- Быстрее, гибче, современнее

>💡 Современный подход: для работы с файлами используй NIO.2 (Path, Files). Для работы с сетью и высоконагруженных систем — NIO с каналами и буферами. В этой теме сосредоточимся на NIO.2 для файлов — это то, что тебе нужно в 95% случаев.

## 2. Работа с путями: Path, Paths, Path.of()

Прежде чем читать файл, нужно указать, где он находится. Для этого в Java используется интерфейс Path.

### Создание Path

```java
import java.nio.file.Path;
import java.nio.file.Paths;

// Способ 1: Path.of() — современный (Java 11+)
Path path1 = Path.of("folder", "file.txt");

// Способ 2: Paths.get() — старый (Java 7+)
Path path2 = Paths.get("folder", "file.txt");

// Способ 3: из строки
Path path3 = Path.of("/home/vika/documents/report.txt");
Path path4 = Path.of("C:\\Users\\Vika\\Documents\\report.txt"); // Windows

// Способ 4: объединение путей
Path base = Path.of("/home/vika");
Path full = base.resolve("documents/report.txt"); // /home/vika/documents/report.txt
```

### Полезные методы Path

```java
Path path = Path.of("/home/vika/documents/report.txt");

System.out.println(path.getFileName());       // "report.txt"
System.out.println(path.getParent());         // "/home/vika/documents"
System.out.println(path.getRoot());           // "/"
System.out.println(path.getNameCount());      // 4 (home, vika, documents, report.txt)
System.out.println(path.getName(0));          // "home"
System.out.println(path.subpath(1, 3));       // "vika/documents"

// Расширение файла (нет встроенного метода, но можно так):
String fileName = path.getFileName().toString();
String extension = fileName.substring(fileName.lastIndexOf('.') + 1); // "txt"

// Абсолютный и относительный пути
Path relative = Path.of("documents/report.txt");
Path absolute = relative.toAbsolutePath(); // /текущая/директория/documents/report.txt
Path normalized = path.normalize();        // убирает . и ..

// Проверки
System.out.println(path.isAbsolute());     // true
System.out.println(path.startsWith("/home")); // true
System.out.println(path.endsWith(".txt")); // true

// Преобразование между Path и File
File file = path.toFile();                 // Path → File
Path pathBack = file.toPath();             // File → Path
```

### Path vs File

|Характеристика|File (старое)|Path (новое)|
|-|-|-|
|Пакет|java.io|java.nio.file|
|Появилось в|Java 1.0|Java 7 (NIO.2)|
|Методы|Ограниченные|Богатый API|
|Символические ссылки|Плохая поддержка|✅ Полная поддержка|
|Метаданные файла|Ограниченно|✅ Files.readAttributes()|
|Рекомендация|❌ Избегай|✅ Используй|

>💡 Правило: в новом коде всегда используй Path, а не File. File оставлен для обратной совместимости.

## 3. Проверка существования и атрибутов файла

Класс Files предоставляет статические методы для работы с файлами:

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;

Path path = Path.of("report.txt");

// Проверки
boolean exists = Files.exists(path);
boolean notExists = Files.notExists(path);
boolean isFile = Files.isRegularFile(path);
boolean isDirectory = Files.isDirectory(path);
boolean isReadable = Files.isReadable(path);
boolean isWritable = Files.isWritable(path);
boolean isExecutable = Files.isExecutable(path);
long size = Files.size(path); // размер в байтах

// Чтение атрибутов
BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);
System.out.println("Размер: " + attrs.size());
System.out.println("Создан: " + attrs.creationTime());
System.out.println("Изменён: " + attrs.lastModifiedTime());
System.out.println("Это файл: " + attrs.isRegularFile());
System.out.println("Это директория: " + attrs.isDirectory());
```

## 4. Создание, копирование, перемещение, удаление

```java
Path file = Path.of("newfile.txt");
Path dir = Path.of("newdir");

// Создание файла
Files.createFile(file);

// Создание директории
Files.createDirectory(dir);

// Создание вложенных директорий (как mkdir -p)
Files.createDirectories(Path.of("a/b/c/d"));

// Копирование
Files.copy(
    Path.of("source.txt"),
    Path.of("destination.txt"),
    StandardCopyOption.REPLACE_EXISTING // перезаписать, если существует
);

// Перемещение (переименование)
Files.move(
    Path.of("old.txt"),
    Path.of("new.txt"),
    StandardCopyOption.REPLACE_EXISTING
);

// Удаление файла
Files.delete(file); // бросает исключение, если файл не найден
Files.deleteIfExists(file); // не бросает исключение

// Удаление директории (должна быть пуста!)
Files.delete(dir);
```

## 5. Чтение файлов

### Способ 1: `Files.readString()` — весь файл в строку (Java 11+)

Самый простой способ для небольших файлов:

```java
String content = Files.readString(Path.of("file.txt"));
System.out.println(content);

// С указанием кодировки
String contentUtf8 = Files.readString(Path.of("file.txt"), StandardCharsets.UTF_8);
```

### Способ 2: `Files.readAllLines()` — все строки в список

```java
List<String> lines = Files.readAllLines(Path.of("file.txt"));

for (String line : lines) {
    System.out.println(line);
}
```

### Способ 3: `Files.lines()` — поток строк (ленивое чтение)

Для больших файлов — читает по одной строке, не загружая всё в память:

```java
try (Stream<String> lines = Files.lines(Path.of("bigfile.txt"))) {
    lines
        .filter(line -> !line.isBlank())
        .map(String::toUpperCase)
        .forEach(System.out::println);
}
```

### Способ 4: `BufferedReader` — построчное чтение (классический способ)

```java
try (BufferedReader reader = Files.newBufferedReader(Path.of("file.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}
```

## Способ 5: `Files.readAllBytes()` — весь файл в массив байт

Для бинарных файлов (изображения, аудио и т.д.):

```java
byte[] bytes = Files.readAllBytes(Path.of("image.png"));
```

### Сравнение способов чтения

|Способ|Когда использовать|Размер файла|
|-|-|-|
|`Files.readString()`|Небольшой текстовый файл|Маленький (< 10 МБ)|
|`Files.readAllLines()`|Нужен список строк|Маленький|
|`Files.lines()`|Обработка через Stream API|Любой (ленивое)|
|`BufferedReader`|Построчная обработка|Любой|
|`Files.readAllBytes()`|Бинарные файлы|Маленький|

## 6. Запись в файлы

### Способ 1: `Files.writeString()` — записать строку (Java 11+)

```java
Files.writeString(Path.of("output.txt"), "Привет, Вика!\n");

// Добавить в конец файла (append)
Files.writeString(
    Path.of("output.txt"),
    "Вторая строка\n",
    StandardOpenOption.APPEND
);

// С кодировкой
Files.writeString(
    Path.of("output.txt"),
    "Текст",
    StandardCharsets.UTF_8
);
```

### Способ 2: `Files.write()` — записать список строк

```java
List<String> lines = List.of("Первая строка", "Вторая строка", "Третья строка");

Files.write(Path.of("output.txt"), lines);

// С опциями
Files.write(
    Path.of("output.txt"),
    lines,
    StandardCharsets.UTF_8,
    StandardOpenOption.CREATE,
    StandardOpenOption.APPEND
);
```

### Способ 3: `BufferedWriter` — построчная запись

```java
try (BufferedWriter writer = Files.newBufferedWriter(Path.of("output.txt"))) {
    writer.write("Первая строка");
    writer.newLine(); // перенос строки (универсальный)
    writer.write("Вторая строка");
}
```

### Способ 4: `Files.write()` — записать байты

```java
byte[] data = {72, 101, 108, 108, 111}; // "Hello" в ASCII
Files.write(Path.of("binary.dat"), data);
```

### Стандартные опции открытия файла (`StandardOpenOption`)

|Опция|Описание|
|-|-|
|CREATE|Создать файл, если не существует|
|CREATE_NEW|Создать новый файл, бросить исключение, если уже есть|
|TRUNCATE_EXISTING|Очистить файл при открытии (по умолчанию)|
|APPEND|Добавлять в конец файла|
|READ|Открыть для чтения|
|WRITE|Открыть для записи|

## 7. Работа с директориями

### Обход директории

```java
Path dir = Path.of("my_folder");

// Способ 1: list() — только верхний уровень (ленивый)
try (Stream<Path> entries = Files.list(dir)) {
    entries.forEach(System.out::println);
}

// Способ 2: walk() — рекурсивно (ленивый)
try (Stream<Path> entries = Files.walk(dir)) {
    entries
        .filter(Files::isRegularFile)
        .filter(p -> p.toString().endsWith(".txt"))
        .forEach(System.out::println);
}

// Способ 3: find() — рекурсивно с фильтром (ленивый)
try (Stream<Path> entries = Files.find(dir, 3, (path, attrs) -> 
        attrs.isRegularFile() && path.toString().endsWith(".java"))) {
    entries.forEach(System.out::println);
}

// Способ 4: newDirectoryStream() — старый способ
try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir, "*.txt")) {
    for (Path entry : stream) {
        System.out.println(entry);
    }
}
```

### Создание временных файлов и директорий

```java
// Временный файл в системной директории
Path tempFile = Files.createTempFile("prefix-", ".txt");
// /tmp/prefix-1234567890.txt

// Временный файл в конкретной директории
Path tempInDir = Files.createTempFile(Path.of("/home/vika"), "log-", ".txt");

// Временная директория
Path tempDir = Files.createTempDirectory("myapp-");

// Не забудь удалить после использования!
Files.deleteIfExists(tempFile);
```

## 8. Потоки ввода-вывода (I/O Streams)

Хотя для файлов удобнее NIO.2, важно понимать основы потоков — они используются в сети, консоли, сжатии и т.д.

### Иерархия потоков

```java
Потоки байт (для бинарных данных):
  InputStream  → FileInputStream, ByteArrayInputStream, BufferedInputStream
  OutputStream → FileOutputStream, ByteArrayOutputStream, BufferedOutputStream

Потоки символов (для текста):
  Reader  → FileReader, BufferedReader, InputStreamReader
  Writer  → FileWriter, BufferedWriter, OutputStreamWriter
```

### Байтовые потоки

```java
// Запись байт
try (OutputStream out = new FileOutputStream("data.bin")) {
    out.write(72);  // 'H'
    out.write(101); // 'e'
    out.write(new byte[]{108, 108, 111}); // "llo"
}

// Чтение байт
try (InputStream in = new FileInputStream("data.bin")) {
    int b;
    while ((b = in.read()) != -1) {
        System.out.print((char) b);
    }
}
```

### Символьные потоки (для текста)

```java
// Запись текста
try (Writer writer = new FileWriter("text.txt");
     BufferedWriter buffered = new BufferedWriter(writer)) {
    buffered.write("Привет, мир!");
    buffered.newLine();
    buffered.write("Вика учит Java");
}

// Чтение текста
try (Reader reader = new FileReader("text.txt");
     BufferedReader buffered = new BufferedReader(reader)) {
    String line;
    while ((line = buffered.readLine()) != null) {
        System.out.println(line);
    }
}
```

### `InputStreamReader` / `OutputStreamWriter` — мост между байтами и символами

```java
// Чтение с указанием кодировки
try (InputStream in = new FileInputStream("file.txt");
     Reader reader = new InputStreamReader(in, StandardCharsets.UTF_8);
     BufferedReader buffered = new BufferedReader(reader)) {
    
    String line;
    while ((line = buffered.readLine()) != null) {
        System.out.println(line);
    }
}
```

### Буферизация — зачем она нужна?

Без буфера каждый `write()` или `read()` обращается к диску — это медленно. Буфер накапливает данные и делает одно большое обращение.

```java
// ❌ Медленно — 1000 обращений к диску
try (OutputStream out = new FileOutputStream("file.txt")) {
    for (int i = 0; i < 1000; i++) {
        out.write(i);
    }
}

// ✅ Быстро — одно обращение к диску
try (OutputStream out = new BufferedOutputStream(new FileOutputStream("file.txt"))) {
    for (int i = 0; i < 1000; i++) {
        out.write(i); // пишется в буфер в памяти
    }
} // при закрытии буфер сбрасывается на диск
```

## 9. try-with-resources — обязательно для I/O!

Все потоки и ридеры реализуют `AutoCloseable`, поэтому всегда используй `try-with-resources`:

```java
// ✅ ПРАВИЛЬНО
try (BufferedReader reader = Files.newBufferedReader(Path.of("file.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    System.err.println("Ошибка чтения: " + e.getMessage());
}

// ❌ НЕПРАВИЛЬНО — можно забыть закрыть
BufferedReader reader = null;
try {
    reader = Files.newBufferedReader(Path.of("file.txt"));
    // ...
} finally {
    if (reader != null) {
        reader.close(); // может бросить своё исключение!
    }
}
```

## 10. Практические примеры

### Пример 1: Копирование файла

```java
public class FileCopier {
    public static void copy(Path source, Path target) throws IOException {
        // Способ 1: одной строкой (NIO.2)
        Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
        
        // Способ 2: через потоки (для больших файлов)
        try (InputStream in = Files.newInputStream(source);
             OutputStream out = Files.newOutputStream(target, 
                 StandardOpenOption.CREATE, 
                 StandardOpenOption.TRUNCATE_EXISTING)) {
            
            byte[] buffer = new byte[8192]; // 8 КБ буфер
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
        }
    }
}
```

### Пример 2: Подсчёт строк в файле

```java
public class LineCounter {
    public static long countLines(Path file) throws IOException {
        try (Stream<String> lines = Files.lines(file)) {
            return lines.count();
        }
    }

    public static void main(String[] args) throws IOException {
        long count = countLines(Path.of("bigfile.txt"));
        System.out.println("Строк: " + count);
    }
}
```

### Пример 3: Поиск файлов по содержимому

```java
public class ContentSearcher {
    public static List<Path> findFilesWithWord(Path directory, String word) throws IOException {
        List<Path> result = new ArrayList<>();

        try (Stream<Path> files = Files.walk(directory)) {
            files.filter(Files::isRegularFile)
                 .forEach(file -> {
                     try {
                         boolean contains = Files.lines(file)
                             .anyMatch(line -> line.contains(word));
                         if (contains) {
                             result.add(file);
                         }
                     } catch (IOException e) {
                         System.err.println("Не удалось прочитать: " + file);
                     }
                 });
        }
        return result;
    }
}
```

### Пример 4: Чтение CSV-файла

```java
public class CsvReader {
    public record Person(String name, int age, String city) {}

    public static List<Person> readCsv(Path file) throws IOException {
        List<Person> people = new ArrayList<>();

        try (BufferedReader reader = Files.newBufferedReader(file)) {
            String header = reader.readLine(); // пропускаем заголовок
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length == 3) {
                    people.add(new Person(
                        parts[0].trim(),
                        Integer.parseInt(parts[1].trim()),
                        parts[2].trim()
                    ));
                }
            }
        }
        return people;
    }
}
```

### Пример 5: Запись лога с временной меткой

```java
public class SimpleLogger {
    private final Path logFile;

    public SimpleLogger(Path logFile) {
        this.logFile = logFile;
    }

    public synchronized void log(String message) throws IOException {
        String timestamp = LocalDateTime.now()
            .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String line = "[" + timestamp + "] " + message + System.lineSeparator();

        Files.writeString(
            logFile,
            line,
            StandardCharsets.UTF_8,
            StandardOpenOption.CREATE,
            StandardOpenOption.APPEND
        );
    }
}
```

### Пример 6: Обработка большого файла через Stream

```java
public class BigFileProcessor {
    public static void main(String[] args) throws IOException {
        Path input = Path.of("input.txt");
        Path output = Path.of("output.txt");

        // Читаем, обрабатываем и записываем построчно
        try (Stream<String> lines = Files.lines(input);
             BufferedWriter writer = Files.newBufferedWriter(output)) {

            lines
                .filter(line -> !line.isBlank())
                .map(String::toUpperCase)
                .forEach(line -> {
                    try {
                        writer.write(line);
                        writer.newLine();
                    } catch (IOException e) {
                        throw new UncheckedIOException(e);
                    }
                });
        }
    }
}
```

## 11. 🎯 Мини-задания для практики

1. **Счётчик слов** — прочитай текстовый файл, подсчитай количество слов, строк и символов. Выведи статистику.
2. **Копирование директории** — напиши метод, который рекурсивно копирует всю директорию со всеми вложенными файлами и папками.
3. **Поиск дубликатов** — найди в директории все файлы с одинаковым содержимым (используй хеш-суммы или сравнение байт).
4. **Конвертер регистров** — прочитай файл, преобразуй все буквы в верхний регистр и запиши результат в новый файл.
5. **Агрегатор логов** — прочитай все .log файлы в директории, отфильтруй строки с "ERROR", сгруппируй по дате и сохрани в один итоговый файл.
6. **CSV процессор** — прочитай CSV-файл с данными о товарах (name, price, quantity). С помощью Stream API найди:
- Товар с максимальной стоимостью (price × quantity)
- Среднюю цену по всем товарам
- Товары дороже 1000
7. **Удаление пустых файлов** — найди в директории все файлы размером 0 байт и удали их.
8. **Шифр Цезаря для файлов** — прочитай файл, зашифруй каждую букву сдвигом на N позиций, запиши в новый файл.

## 12. 💡 Частые ошибки новичков

|Ошибка|Как правильно|
|-|-|
|`new File("path")` в новом коде|Используй `Path.of("path")`|
|Забыл закрыть поток|Всегда используй try-with-resources|
|`Files.readString()` для гигабайтного файла|Используй `Files.lines()` или `BufferedReader`|
|Не указал кодировку|Всегда указывай `StandardCharsets.UTF_8`|
|path + "/file.txt" для объединения|Используй `path.resolve("file.txt")`|
|Забыл про `StandardOpenOption.APPEND`|По умолчанию файл перезаписывается|
|`Files.delete()` для непустой директории|Сначала удали содержимое рекурсивно|
|Обработка `IOException` пустым catch|Хотя бы логируй ошибку|

### Антипаттерн: игнорирование IOException

```java
// ❌ ПЛОХО
try {
    Files.readString(path);
} catch (IOException e) {
    // ничего не делаем — ошибка исчезает!
}

// ✅ ХОРОШО
try {
    Files.readString(path);
} catch (IOException e) {
    System.err.println("Ошибка чтения файла " + path + ": " + e.getMessage());
    // или пробросить дальше, или залогировать через SLF4J
}
```

## 13. 📝 Что запомнить

1. **NIO.2** — современный API для работы с файлами (Path, Files, Paths)
2. **Path** — путь к файлу/директории, используй вместо File
3. **Path.of()** — современный способ создания пути (Java 11+)
4. **Files.readString() / writeString()** — для небольших файлов
5. **Files.lines()** — ленивое чтение больших файлов через Stream
6. **BufferedReader / BufferedWriter** — построчная обработка
7. **try-with-resources** — обязательно для всех потоков и ридеров
8. **Кодировка** — всегда указывай StandardCharsets.UTF_8
9. **StandardOpenOption** — APPEND, CREATE, TRUNCATE_EXISTING для управления записью
10. **Files.walk()** — рекурсивный обход директорий
11. **Буферизация** — BufferedInputStream/Writer ускоряет работу
12. **Потоки байт vs символы** — `InputStream`/`OutputStream` для бинарных, `Reader`/`Writer` для текста