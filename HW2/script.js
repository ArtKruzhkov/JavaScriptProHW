//Task1
// Реализуйте класс Book, представляющий книгу, со следующими свойствами и методами:
// Свойство title (название) - строка, название книги.
// Свойство author (автор) - строка, имя автора книги.
// Свойство pages (количество страниц) - число, количество страниц в книге.
// Метод displayInfo() - выводит информацию о книге (название, автор и количество страниц).
class Book {
    title = '';
    author = '';
    pages = null;
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    };
    displayInfo = () => {
        console.log(`Book name: ${this.title}. Author: ${this.author}. Pages: ${this.pages}`);
    }
};
const book1 = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 223);
book1.displayInfo();
//Task2
// Реализуйте класс Student, представляющий студента, со следующими свойствами и методами:
// Свойство name (имя) - строка, имя студента.
// Свойство age (возраст) - число, возраст студента.
// Свойство grade (класс) - строка, класс, в котором учится студент.
// Метод displayInfo() - выводит информацию о студенте (имя, возраст и класс).
class Student {
    name = '';
    age = null;
    grade = '';
    constructor(name, age, grade) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    };
    displayInfo = () => {
        console.log(`Name: ${this.name}\nAge: ${this.age}\nGrade: ${this.grade}`);
    }
};
const student1 = new Student("John Smith", 16, "10th grade");
student1.displayInfo();
const student2 = new Student("Jane Doe", 17, "11th grade");
student2.displayInfo();