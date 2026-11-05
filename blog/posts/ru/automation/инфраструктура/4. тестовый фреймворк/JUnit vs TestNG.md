---
title: JUnit vs TestNG
category: automation
description: JUnit vs TestNG
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

## Добавление метаинформации

### Обозначение тестового метода 

- TestNG

```java
@Test
public void regularTest(){

}
```

- JUnit

> Все импорты без \*, потому что * в импортах, это не очень хорошо. 
Например, при review человеку сложно понять, что именно пришло из заимпорченного класса.

В аннотацию Test не добавляется ничего, там нет дополнительных опций.

```java
@Test
public void regularTest(){

}
```

### Добавление описания к тесту

- TestNG

```java
@Test(description = "Test description")
public void displayNameTest(){

}
```

- JUnit

```java
@Test
@DisplayName("Test description")
public void displayNameTest(){

}
```

### Способ игнорировать тесты

- TestNG

```java
@Test(enabled = false)
public void ignoredTest(){

}
```

- JUnit

Будет выброшен exception с указанным описанием. В описание также можно указать номер задачи на исправление.

```java
@Test
@Disabled("Bad test!!! AE-1")
public void ignoredTest(){

}
```

### Запуск тестов по группам

> в группу можно добавлять номер issue и тогда можно запускать проверку по задаче

- TestNG

```java
@Test(groups = {"web", "critical"})
public void taggedTest(){

}
```

- JUnit

```java
@Test
@Tags({@Tag("web"), @Tag("criticla")})
public void taggedTest(){

}
```

### Тест будет падать, если он идет дольше указанного времени

- TestNG

```java
@Test(timeOut = 2)
public void timeoutTest(){

}
```

- JUnit

```java
@Test
@Timeout(value = 2, unit = TimeUnit.MINUTES)
public void timeoutTest(){

}
```

### Тест запускается несколько раз

- создавать нагрузку :))
- запуск теста с рандомными данными, при каждом запуске используются новые данные

- TestNG

```java
@Test(invocationCount = 10)
public void repeatedTest(){

}
```

- JUnit

```java
@RepeatedTest(10)
public void repeatedTest(){

}
```

### Custom Annotations (JUnit)

Можно создать свою аннотацию для которой задать поределенные параметры и этой аннотацией обозначать нужные тесты.

> Можно изначально добавить свою аннотацию и использовать ее везде, тк в случае добаления каких то опции всем тестам достаточно будет добавить их только для одной кастомной аннотации.

```java
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

public class AnnotationsCustomTest{

    @FastTest
    public void customTagTest(){
    }
    
    @Test
    @Tag(("fast"))
    @Target({ElementType.TYPE, ElementType.METHOD})
    @Retention(RetentionPolicy.RUNTIME)
    public @interface FastTest{
    }
}
```

## Параметризованные тесты 

- TestNG

```java
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import org.testng.util.Strings;

import static org.testng.Assert.assertEquals;

public class ParamsTest {
    @DataProvider(name = "test1")
    public static Object[][] primeNumbers(){
        return new Object[][]{
            {null, true},
            {"", true},
            {" ", true},
            {"not blank", false} 
        };
    }

    @Test(dataProvider = "test1")
    public void testBlankString(String input, boolean expected){
        essertEquals(expected, Strings.isNullOrEmpty(input));
    }
}
```

- JUnit

Аналог TestNG

```java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.platform.commons.util.StringUtils;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ParamsTest {

    private static Stream<Arguments> blankStringParameters() {
        return Stream.of(
                Arguments.of(null, true),
                Arguments.of("", true),
                Arguments.of(" ", true),
                Arguments.of("not blank", false)
        );
    }

    @ParameterizedTest
    @MethodSource("blankStringParameters")
    void testBlankString(String input, boolean expected) {
        assertEquals(expected, StringUtils.isBlank(input));
    }
}
```

и есть другой способ

```java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.EnumSource;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.platform.commons.util.StringUtils;

import java.time.Month;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ParamsTest {

    @ParameterizedTest
    @NullAndEmptySource
    @ValueSource(strings = {" ", "\t", "\n"})
    void isBlank_ShouldReturnTrueForAllTypesOfBlankStrings(String input){
        assertTrue(StringUtils.isBlank(input));
    }

    @ParameterizedTest
    @EnumSource(value = Month.class,  names = {"APRIL", "JUNE", "JULY"})
    void someMonths_Are30DaysLong(Month month) {
        final boolean isALeapYear = false;
        assertEquals(30, month.length(isALeapYear));
    }
    
    @ParameterizedTest
    @CsvSource({"test,TEST", "tEst,TEST", "Java,JAVA"})
    void toUpperCase_ShouldGenerateTheExpectedUppercaseValue(String input, String expected){
        String actualValue = input.toUpperCase();
        assertEquals(expected, actualValue);
    }
}
```

## Параметризация через класс

- TestNg

```java
@Test(dataProvider = "user",
    dataProviderClass = UserDataProvider.class)
public void register(User user){
    assert user.getName().equals("Ivan"); 
}
```

Либо через IAnnotationTransformer;

- JUnit

```java
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.ParameterContext;
import org.junit.jupiter.api.extension.ParameterResolver;

public class UserParameterResolver implements ParameterResolver {


    @Override
    public boolean supportsParameter(ParameterContext parameterContext, 
                                     ExtensionContext extensionContext) {
        return parameterContext.getParameter().getType().equals(User.class);
    }

    @Override
    public Object resolveParameter(ParameterContext parameterContext,
                                   ExtensionContext extensionContext) {
        return new User("Ivan");
    }
}
```

```java

@ExtendWith(UserParameterResolver.class)
class Parametrized{
    
    @Test
    void canRegister(User user){
        
    }
}
```

## Проверка exception

Проверить, что тест выбрасывает Exception(негативный сценарий);

- TestNG

```java
@Test(expectedEceptions = ArithmeticException.class)
public void divisionWithException(){
    int i = 1/0;
}
```

- JUnit

Метод assertThrows кроме проверки также возвращает сам exception и можно далее с ним делать какие нибудь другие проверки.

```java
@Test
void exceptionTest(){
    final Object nullable = null;
    final NullPointerException exeption =  assertThrows(
                NullPointerException.class,
                () -> nullable.toString(),
                "Expected toString() to throw, but it didn't");
}
```

## Before/After методы

- TestNG

Имеются аннотации: BeforeSuite, BeforeClass, BeforeTest, BeforeGroup, BeforeMethod, AfterClass, AfterTest, afterGroup, AfterMethod, AfterSuite.

- JUnit 

Аннотации: BeforeAll, BeforeEach, AfterEach, AfterAll.

## Зависимые тесты и порядок запуска тестов

dependsOnGroups - зависимость от прохождения тестов определенной группы, 
dependsOnMethod - зависимость от определенного тестового метода

```java
@Test(dependsOnGroups = "ololo")
public void firstTest(){

}

@Test(dependsOnMethod = "firstTest")
public void secondTest(){

}
```

- JUnit

Запрещает делать зависимые тесты.

Можно задавать порядок тестов:

```java
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class OrderedTest {
    
    @Test
    @Order(1)
    void firstTest(){}
    
    @Test
    @Order(2)
    void secondTest(){}
}
```

Можно указываеть зависимость от определенных параметров:

```java
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.condition.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ConditionalTest {

    @Test
    @EnabledOnOs(OS.MAC)
    void onlyOnMacOS(){}

    @Test
    @EnabledForJreRange(min = JRE.JAVA_9)
    void fromJava9toCurrentJavaFeatureNumber(){}
    
    @Test
    @EnabledIfSystemProperty(named = "os.arch", matches = ".*64.*")
    void onlyOn64BitArchitectures(){}
}
```

## Слушатели (Listeners)

- TestNG

Можно создать свой класс Listener который имплементит заданные интерфейсы, например, ISuiteListener
и задавать выполнение определенной логика до, после теста и т.д. не используя специальные аннотации.

- JUnit

Используются Extensions. Все Extensions имплементируют класс Extension можно в него перейти и посмотреть все что его имплементит, чтобы найти нужный.

```java
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.AfterEachCallback;
import org.junit.jupiter.api.extension.BeforeEachCallback;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.extension.ExtensionContext;

public class ExtensionsTest {

    @Test
    @ExtendWith(ResourceExtension.class)
    public void extensionTest(){
        
    }
    
    public static class ResourceExtension implements BeforeEachCallback, AfterEachCallback{
        @Override
        public void beforeEach(ExtensionContext context) throws Exception{
            System.out.println("Starting database...");
        }
        
        @Override
        public void afterEach(ExtensionContext context) throws Exception{
            System.out.println("Stopping database...");
        }
    }
}
```

## Параллельные тесты

- TestNG

Можно задать в xml параметр parallel = "methods|tests|classes|instances" и thread-count="5". 

- JUnit 

Можно воспользоваться опцией Gradle. Можно распараллелить тесты по агентам. ???

## Soft Assertions

- TestNG

```java
private SoftAssert softAssert = new SoftAssert();

@Test
public void testForSoftAssertionsFailure(){
    softAssert.assertTrue(false);
    softAssert.assertEquals(1, 2);
    softAssert.assertAll();
}
```

- JUnit

Используется метод assertAll;

```java
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class SoftAssertionsTest {
    
    @Test
    void testWithSoftAssert(){
        assertAll(
                () -> assertTrue(false),
                () -> assertEquals(1, 2)
        );
    }
}
```

## Источник информации 

❗ [#6 Recheck, Karate, JetBrains Academy. Сравнение TestNG и JUnit 5](https://www.youtube.com/watch?v=_sN6JpVpQ-c)

❗ [TestNG vs JUnit 5 battle (Sergey Pirogov, Ukraine)](https://www.youtube.com/watch?v=vRmVZV0fjK8)