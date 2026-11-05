---
title: JUnit 5
category: automation
description: JUnit 5
tags: ["Автоматизация тестирования"]
icon: "fas fa-robot"
image: "null"
date: 2022-06-18
keywords: "qa, Автоматизация тестирования"
links: [
        {
          items: [
                { title: "Моя подготовка", link: "/moya-podgotovka/" },
                { title: "Курс по автоматизации тестирования Java", link: "/kurs-po-avtomatizaczii-testirovaniya-java/" },
                { title: "Профессионально работаем с IntelliJ IDEA", link: "/professionalno-rabotaem-s-intelli-j-idea/" },
                { title: "Что такое Selenium?", link: "/chto-takoe-selenium/" },
                { title: "Инфраструктура проекта автотестирования", link: "/infrastruktura-proekta-avtotestirovaniya/" },
                { title: "Основы Java", link: "/osnovy-java/" },
                { title: "Система сборки. Ant, Maven, Gradle", link: "/sistema-sborki-ant-maven-gradle/" },
                { title: "JUnit 5", link: "/j-unit-5/" },
          ]
        }
      ]
---

Зачастую для тестов нужно сделать какие то действия: до тестов, после тестов или перед каждым тестом.
Для этих целей используются такие тест ранеры как JUnit или TestNG.

JUnit5 разделен на 3 глобальных модулей: Platform, Jupiter, Vintage.

Platform - база которая позволяет строить свои собственные фреймворки для запуска тестов. На основе этого модуля сделали интеграцию с Intellij Idea, maven, gradle и сам Junit5. Сюда же входит лаунчер который позволяет запускать тесты из консоли. 

Jupiter - прораммный код самого Junit5. Также этот модуль содержит новую концепцию extensions(расширений), которая заменила ранеры и правила из JUnit4. 

Vintage - модуль для обратной совместимости. Позволяет запускать тесты написанных на JUnit3 и JUnit4. 

## Подключение зависимостей

Для подключения JUnit5 добавляем в зависимости модуль Platform(junit-platform-launcher) и движок Jupiter(junit-jupiter-engine)

### Maven

```xml
<!-- https://mvnrepository.com/artifact/org.junit.platform/junit-platform-launcher -->
<dependency>
    <groupId>org.junit.platform</groupId>
    <artifactId>junit-platform-launcher</artifactId>
    <version>1.10.2</version>
    <scope>test</scope>
</dependency>

<!-- https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-engine -->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-engine</artifactId>
    <version>5.10.2</version>
    <scope>test</scope>
</dependency>
```

### Gradle

```groovy
// https://mvnrepository.com/artifact/org.junit.platform/junit-platform-launcher
testImplementation 'org.junit.platform:junit-platform-launcher:1.10.2'

// https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-engine
testImplementation 'org.junit.jupiter:junit-jupiter-engine:5.10.2'
```

После добавления к методу аннотации @Test в IDEA появляется кнопка play соответсвенно этот метод теперь можно запустить и его выполнит движок Junit. Если запустить класс то будут выполнены все тестовые методы из данного класса.

Можно определять тестовые методы без модификатора (public, private, protected).

```java
@Test
void someTest(){
    assertTrue(true);
}
```

## Аннотации JUnit 5
JUnit 5 предлагает следующие аннотации для написания тестов.

| Аннотации | Описание |
| --- | --- |
| @BeforeEach | Аннотированный метод будет запускаться перед каждым тестовым методом в тестовом классе. |
| @AfterEach | Аннотированный метод будет запускаться после каждого тестового метода в тестовом классе. |
| @BeforeAll | Аннотированный метод будет запущен перед всеми тестовыми методами в тестовом классе. Этот метод должен быть статическим. |
| @AfterAll | Аннотированный метод будет запущен после всех тестовых методов в тестовом классе. Этот метод должен быть статическим. |
| @Test | Он используется, чтобы пометить метод как тест junit. |
| @DisplayName | Используется для предоставления любого настраиваемого отображаемого имени для тестового класса или тестового метода |
| @Disable | Он используется для отключения или игнорирования тестового класса или тестового метода из набора тестов. |
| @Nested | Используется для создания вложенных тестовых классов |
| @Tag | Пометьте методы тестирования или классы тестов тегами для обнаружения и фильтрации тестов. |
| @TestFactory | Отметить метод - это тестовая фабрика для динамических тестов. |


### @BeforeAll

Аннотация @BoforeAll используются для указания о том, что аннотированный метод должен быть выполнен перед всеми @Test, @RepeatedTest, @ParameterizedTest и @TestFactory методами в текущем классе.

По умолчанию тестовые методы будут выполняться в том же потоке, что и аннотированный @BeforeAll метод.

Аннотированный @BeforeAll метод ДОЛЖЕН быть статическим методом в тестовом классе.

```java
@BeforeAll
public static void init(){
    System.out.println("BeforeAll init() method called");
}
```

Или мы можем применить эту аннотацию к default методам интерфейса, если тестовый интерфейс или тестовый класс аннотированы с помощью @TestInstance(Lifecycle.PER_CLASS).

```java
@TestInstance(Lifecycle.PER_CLASS)
interface TestLifecycleLogger {

    @BeforeAll
    default void beforeAllTests() {
        //
    }
}
```

Если этого не сделать, JUnit выдаст ошибку времени выполнения типа JUnitException.

```java
org.junit.platform.commons.JUnitException: 
@BeforeAll method 'public void com.howtodoinjava.junit5.examples. 
JUnit5AnnotationsExample.init()' must be static.
at org.junit.jupiter.engine.descriptor. 
LifecycleMethodUtils.assertStatic(LifecycleMethodUtils.java:66)
```

#### @BeforeAll в родительском и дочернем классах

@BeforeAll методы наследуются от родительских классов (или интерфейсов), если они не скрыты или не переопределены. 

Кроме того, @BeforeAll методы из родительских классов (или интерфейсов) будут выполняться перед @BeforeAll методами в дочерних классах.

### @BeforeEach

Аннотация @BeforeEach используется для обозначения того, что аннотированный метод должен выполняться перед каждым методом @Test, @RepeatedTest, @ParameterizedTest, или @TestFactory в текущем классе.

Аннотация JUnit 5 @BeforeEach является одним из методов жизненного цикла и заменяет аннотацию @Before в JUnit 4.

По умолчанию тестовые методы будут выполняться в том же потоке, что и аннотированный @BeforeEach метод.

```java
@BeforeEach
public void initEach(){
     //test setup code
}

@Test
void succeedingTest() {
    //test code and assertions
}
```

Аннотированный @BeforeEach метод НЕ ДОЛЖЕН быть статическим, иначе он вызовет ошибку времени выполнения.

```java
@BeforeEach
public static void initEach(){
     //test setup code
}

//Error


org.junit.platform.commons.JUnitException: @BeforeEach method 'public static void com.howtodoinjava.junit5.examples. JUnit5AnnotationsExample.initEach()' must not be static.
at org.junit.jupiter.engine.descriptor. LifecycleMethodUtils.assertNonStatic(LifecycleMethodUtils.java:73)
```

#### @BeforeEach в родительском и дочернем классах

Метод @BeforeEach наследуется от родительских классов (или интерфейсов) до тех пор, пока они не скрыты или не  переопределены. 

Кроме того, каждый метод с аннотацией @Before из родительских классов (или интерфейсов) будет выполняться перед каждым методом с аннотацией @Before в дочерних классах.

## @ParameterizedTest

Используется, чтобы выполнить тест несколько раз, но с разными аргументами. 

1. Включите зависимость junit-jupiter-params, чтобы использовать параметризованные тесты.

Последнюю версию можно найти по этой ссылке https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-params.

pom.xml

```java
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-params</artifactId>
    <version>${junit-version}</version>
    <scope>test</scope>
</dependency>
```

2. Нам не нужно использовать аннотацию @Test, вместо этого в таких тестах используется только аннотация @ParameterizedTest.
Мы должны объявить по крайней мере один источник аргументов, предоставляющий аргументы для каждого вызова, которые будут использоваться в тестовом методе.

В данном примере testPalindrome будет вызываться 2 раза для каждой строки, указанной в аннотации @ValueSource. Мы получаем доступ к аргументу, используя параметр word метода.

Используйте аргумент name в аннотации @ParameterizedTest, чтобы настроить отображаемое сообщение.

```java
public class ParameterizedTests 
{
    public boolean isPalindrome(String s) {
        return s == null ? false : StringUtils.reverse(s).equals(s);
    }
    
    @ParameterizedTest(name = "{index} - {0} is a palindrome")
    @ValueSource(strings = { "12321", "pop" })
    void testPalindrome(String word) {
        assertTrue(isPalindrome(word));
    }
}
```

### Источники тестовых аргументов

#### Аннотация @ValueSource
Используйте @ValueSource для простых буквальных значений, таких как примитивы и строки.

Она определяет один массив значений и может использоваться только для предоставления одного аргумента для каждого параметризованного вызова теста.

Java поддерживает автобоксирование, поэтому мы также можем использовать литералы в их классах-оболочках.

Мы не можем передавать null в качестве аргумента даже для типов String и Class.

```java
@ParameterizedTest
@ValueSource(ints = { 1, 2, 3 })
void testMethod(int argument) {
    //test code
}

@ParameterizedTest
@ValueSource(ints = { 1, 2, 3 })
void testMethodWithAutoboxing(Integer argument) {
    //test code
}
```

#### Аннотация @NullSource

Она предоставляет единственный null аргумент методу, аннотированному @ParameterizedTest.

```java
@ParameterizedTest
@NullSource
void testMethodNullSource(Integer argument) {
    assertTrue(argument == null);
}
```

#### Аннотация @EmptySource
Она предоставляет метод, аннотированный @ParameterizedTest, с единственным пустым аргументом следующих типов:

java.lang.String

java.util.List

java.util.Set

java.util.Map

примитивные массивы (например, int [])

массивы объектов (например, String [])

```java
@ParameterizedTest
@EmptySource
void testMethodEmptySource(String argument) {
    assertTrue(StringUtils.isEmpty(argument));
}
```

#### Аннотация @NullAndEmptySource
Она сочетает в себе функциональность @NullSource и @EmptySource. В данном примере тестовый метод будет вызываться два раза - сначала со значением null, а затем со значением empty.

```java
@ParameterizedTest
@NullAndEmptySource
void testMethodNullAndEmptySource(String argument) {
    assertTrue(StringUtils.isEmpty(argument));
}

```

##### Проверка null и non-null значений в одном тесте

Мы уже знаем, что аннотация @ValueSource не поддерживает значение null.

Таким образом, используя @NullSource и @EmptySource в аннотации @ValueSource, мы можем тестировать null, non-null и пустые значения в одном и том же тесте.

#### Аннотация @EnumSource
Это удобный способ использования Enum констант. Метод тестирования будет вызываться для каждой константы перечисления за раз.

В данном примере тестовый метод будет вызываться 4 раза, по одному разу для каждой Enum константы.

```java
enum Direction {
    EAST, WEST, NORTH, SOUTH
}

@ParameterizedTest
@EnumSource(Direction.class)
void testWithEnumSource(Direction d) {
    assertNotNull(d);
}
```

#### Аннотация @MethodSource
Она используется для ссылки на один или несколько фабричных методов тестового класса или внешних классов. Фабричный метод должен генерировать поток аргументов, где каждый аргумент в потоке будет использоваться методом, аннотированным @ParameterizedTest.

Фабричный метод должен быть static, если тестовый класс не аннотирован с помощью @TestInstance(Lifecycle.PER_CLASS).

Кроме того, фабричный метод не должен принимать аргументы.

```java
@ParameterizedTest
@MethodSource("argsProviderFactory")
void testWithMethodSource(String argument) {
    assertNotNull(argument);
}

static Stream<String> argsProviderFactory() {
    return Stream.of("alex", "brian");
}
```

Если мы явно не предоставим имя фабричного метода через @MethodSource, JUnit будет искать фабричный метод, имя которого по умолчанию совпадает с именем текущего метода с аннотацией @ParameterizedTest.

Поэтому, в примере, если мы не предоставим имя метода argsProviderFactory в аннотации @MethodSource, Junit будет искать имя метода testWithMethodSource с возвращаемым типом `Stream<String>`.

```java
@ParameterizedTest
@MethodSource
void testWithMethodSource(String argument) {
    assertNotNull(argument);
}

static Stream<String> testWithMethodSource() {
    return Stream.of("alex", "brian");
}
```

Также поддерживаются потоки для примитивных типов (DoubleStream, IntStream и LongStream).

```java
@ParameterizedTest
@MethodSource("argsProviderFactory")
void testWithMethodSource(int argument) {
    assertNotEquals(9, argument);
}

static IntStream argsProviderFactory() {
    return IntStream.range(0, 10);
}
```

#### Аннотация @CsvSource
Эта аннотация позволяет нам задавать списки аргументов как значения, разделенные запятыми. Каждый CSV токен представляет собой строку CSV и приводит к одному вызову параметризованного теста.

Задайте для свойства ignoreLeadingAndTrailingWhitespace значение true или false, указывающее на то, что Junit должен принимать или игнорировать пробелы в CSV токенах.

```java
@ParameterizedTest
@CsvSource(value = {
    "alex, 30",
    "brian, 35",
    "charles, 40"
}, ignoreLeadingAndTrailingWhitespace = true)
void testWithCsvSource(String name, int age) {
    assertNotNull(name);
    assertTrue(age > 0);
}
```

#### Аннотация @CsvFileSource
Эта аннотация очень похожа на @CsvSource за исключением того, что мы читаем токены CSV из файла вместо чтения токенов в исходном тексте. CSV файл можно прочитать по classpath или из локальной файловой системы.

Разделителем по умолчанию является запятая (,), но мы можем использовать другой символ, установив атрибут разделителя.

Обратите внимание, что любая строка, начинающаяся с символа #, будет интерпретироваться как комментарий и игнорироваться.

```java
@ParameterizedTest
@CsvFileSource(resources = "employeeData.csv", numLinesToSkip = 0)
void testWithCsvFileSource(String name, int age) {
    assertNotNull(name);
    assertTrue(age > 0);
}
```

#### Аннотация @ArgumentsSource
Аннотацию @ArgumentsSource можно использовать для указания настраиваемого многоразового поставщика аргументов ArgumentsProvider.

```java
@ParameterizedTest(name = "{index} - {0} is older than 40")
@ArgumentsSource(EmployeesArgumentsProvider.class)
void isEmployeeAgeGreaterThan40(Employee e) {
    assertTrue(Period.between(e.getDob(), LocalDate.now()).get(ChronoUnit.YEARS) > 40);
}

class EmployeesArgumentsProvider implements ArgumentsProvider {
    @Override
    public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
        return Stream.of(
          Arguments.of(new Employee(1, "Alex", LocalDate.of(1980, 2, 3))),
          Arguments.of(new Employee(2, "Brian", LocalDate.of(1979, 2, 3))),
          Arguments.of(new Employee(3, "Charles", LocalDate.of(1978, 2, 3)))
        );
    }
}
```

### Параметризованные тесты с несколькими аргументами

Чтобы написать тесты, которые могут использовать несколько аргументов, мы можем использовать следующие аннотации:

#### Аннотация @CsvSource
Как показано в предыдущем разделе 3.7, с помощью аннотации @CsvSource мы можем предоставить множество литералов и простых типов аргументов.

Нам нужно предоставить все аргументы в одном токене CSV, а затем определить соответствующие аргументы метода.

```java
@ParameterizedTest
@CsvSource({
    "alex, 30, HR, Active",
    "brian, 35, Technology, Active",
    "charles, 40, Finance, Purged"
})
void testWithCsvSource(String name, int age, String department, String status) {
    //test code
}
```

#### Интерфейс ArgumentsProvider
Чтобы предоставить несколько тестовых аргументов сложных или настраиваемых типов, мы должны использовать аннотацию @ArgumentsSource с аннотацией ArgumentsProvider.

В примере мы передаем три аргумента метода тестирования testArgumentsSource, типов Employee, LocalDateи enum константы типа Direction.

```java
@ParameterizedTest
@ArgumentsSource(EmployeesArgumentsProvider.class)
void testArgumentsSource(Employee e, LocalDate date, Direction d) {
    assertTrue(Period.between(e.getDob(), LocalDate.now()).get(ChronoUnit.YEARS) > 40);
    assertNotNull(date);
    assertNotNull(d);
}

class EmployeesArgumentsProvider implements ArgumentsProvider {
    @Override
    public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
        return Stream.of(
          Arguments.of(new Employee(1, "Alex", 
                  LocalDate.of(1980, 2, 3)), LocalDate.now(), Direction.EAST),
          Arguments.of(new Employee(2, "Brian", 
                  LocalDate.of(1979, 2, 3)), LocalDate.now(), Direction.NORTH),
          Arguments.of(new Employee(3, "Charles", 
                  LocalDate.of(1978, 2, 3)), LocalDate.now(), Direction.SOUTH)
        );
    }
```

## Build tool support

```groovy
test {
    useJUnitPlatform {
        includeTags 'fast', 'smoke'
        excludeTags 'slow', 'ci'

        include 'org/foo/**'
        exclude 'org/boo/**'
    }
}
```

https://www.youtube.com/watch?v=RAOAcq97KZM

https://www.youtube.com/watch?v=w1ey2zjf3-s

https://www.youtube.com/watch?v=DAszLeWMsqU

https://www.youtube.com/watch?v=751gMXH-lEE

https://www.youtube.com/watch?v=r-8EGXMFJaw

https://www.youtube.com/watch?v=ZIkIUCyJBGU

https://www.youtube.com/watch?v=3pOjh6O7-cg

https://www.youtube.com/watch?v=W1INR0I3FCo&list=PLnh8EajVFTl5AqvBosxUefReW4nC35P0x