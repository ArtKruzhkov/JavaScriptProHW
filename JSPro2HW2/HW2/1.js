"use strict";
/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/
const books = [
    "The Great Gatsby",
    "To Kill a Mockingbird",
    "The Chronicles of Narnia",
    "The Hobbit"
];

class Library {
    #books;
    constructor(books) {
        try {
            if (new Set(books).size !== books.length) {
                throw new Error('Dublicates in the array');
            }
            this.#books = books;
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    get allBooks() {
        return this.#books;
    }

    addBook(title) {
        try {
            if (this.#books.includes(title)) {
                throw new Error(`Book with title: '${title}' already in the library`);
            }
            this.#books.push(title);
            console.log(`Book with title: '${title}' added to the library`);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    removeBook(title) {
        try {
            if (!this.#books.includes(title)) {
                throw new Error(`Book with title: '${title}' not in the library`);
            }
            this.#books.splice(this.#books.indexOf(title), 1);
            console.log(`Book with title: '${title}' removed from the library`);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    hasBook(title) {
        return this.#books.includes(title);
    }
}
const newLibrary = new Library(books);
// console.log(newLibrary);
console.log(newLibrary.allBooks);
newLibrary.addBook('The Great Gatsby');
newLibrary.addBook('The Lord of the Rings');
console.log(newLibrary.allBooks);
newLibrary.removeBook('1984');
newLibrary.removeBook('The Lord of the Rings');
console.log(newLibrary.allBooks);
console.log(newLibrary.hasBook('The Hobbit'));
console.log(newLibrary.hasBook('1984'));