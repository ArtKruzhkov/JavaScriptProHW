//Task1
// "Получение данных о пользователе"
// Реализуйте функцию getUserData, которая принимает идентификатор пользователя(ID) в качестве аргумента и
// использует fetch для получения данных о пользователе с заданным ID с удаленного сервера.Функция должна возвращать
// промис, который разрешается с данными о пользователе в виде объекта.Если пользователь с указанным ID не найден,
// промис должен быть отклонен с соответствующим сообщением об ошибке. Подсказка, с последовательностью действий:
// getUserData использует fetch для получения данных о пользователе с удаленного сервера. Если запрос успешен
// (с кодом 200), функция извлекает данные из ответа с помощью response.json() и возвращает объект с данными
// о пользователе.Если запрос неуспешен, функция отклоняет промис с сообщением об ошибке.
// https://jsonplaceholder.typicode.com/users
function getUsersData(id) {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((result) => {
            if (!result.ok) {
                throw new Error('Error for fetch data from server.')
            }
            return result.json();
        })
        .then((data) => {
            let findUser = false;
            data.forEach(element => {
                if (element.id === id) {
                    console.log('Info for user with id:', id, element);
                    findUser = true;
                }
            });
            if (!findUser) {
                console.error('No user found with id:', id);
            }
        })
        .catch((err) => {
            console.error(err.message);
        });
};
getUsersData(51);
getUsersData(5);


//Task2
// "Отправка данных на сервер"
// Реализуйте функцию saveUserData, которая принимает объект с данными о пользователе в качестве аргумента и
// использует fetch для отправки этих данных на удаленный сервер для сохранения.Функция должна возвращать промис,
// который разрешается, если данные успешно отправлены, или отклоняется в случае ошибки.
// saveUserData использует fetch для отправки данных о пользователе на удаленный сервер для сохранения.
// Она отправляет POST-запрос на URL-адрес /users с указанием типа содержимого application/json и сериализует
// объект с данными о пользователе в JSON-строку с помощью JSON.stringify(). Если запрос успешен (с кодом 200),
// функция разрешает промис. Если запрос неуспешен, функция отклоняет промис с сообщением
function saveUserData(userData) {
    return fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to save user data.');
            }
            console.log('Data was sent successful');
            return response.json(); // Возвращаем данные после успешной отправки
        })
        .catch((err) => {
            console.error(err.message);
            throw err;
        });
}
const user = {
    name: 'John Smith',
    age: 30,
    email: 'john@example.com'
};
saveUserData(user);


//Task3
// Напишите функцию changeStyleDelayed, которая принимает идентификатор элемента и время задержки (в миллисекундах)
// в качестве аргументов. Функция должна изменить стиль элемента через указанное время.
function changeStyleDelayed(elementId, delay) {
    setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.color = 'red';
        } else {
            console.error(`Element with id '${elementId}' not found`);
        }
    }, delay);
};
changeStyleDelayed('myElement', 2000);