//Task1
// Дан массив const arr = [1, 5, 7, 9] с помощью Math.min и spread оператора,
// найти минимальное число в массиве, решение задание должно состоять из одной строки
const arr = [1, 5, 7, 9];
console.log(`Task1\nMin number in [${arr}] is ${Math.min(...arr)}`);


//Task2
console.log('-----Task2-------');
// Напишите функцию createCounter, которая создает счетчик и возвращает объект
// с двумя методами: increment и decrement. Метод increment должен увеличивать значение
// счетчика на 1, а метод decrement должен уменьшать значение счетчика на 1.
// Значение счетчика должно быть доступно только через методы объекта, а не напрямую.
function createCounter(num) {
    let value = num;
    return {
        increment: function () {
            value += 1;
        },
        decrement: function () {
            value -= 1;
        },
        getValue: function () {
            return value;
        }
    };
};
const counter = createCounter(2);
console.log(`Start value: ${counter.getValue()}`);
counter.increment();
console.log(counter.getValue());
counter.decrement();
console.log(counter.getValue());



//Task3
// Напишите рекурсивную функцию findElementByClass, которая принимает корневой элемент
// дерева DOM и название класса в качестве аргументов и возвращает первый найденный
// элемент с указанным классом в этом дереве.
console.log('------Task3------');

function findElementByClass(root, className) {
    if (root.classList.contains(className)) {
        return root;
    };
    for (let i = 0; i < root.children.length; i++) {
        const foundElement = findElementByClass(root.children[i], className);
        if (foundElement !== null) {
            return foundElement;
        };
    };
    return null;
};
const rootElement = document.getElementById('root');
const foundElement = findElementByClass(rootElement, 'my-class');
console.log('First element with class "my-class":');
console.log(foundElement);

function findElementsByClass(root, className) {
    const foundElements = [];
    if (root.classList.contains(className)) {
        foundElements.push(root);
    }
    Array.from(root.children).forEach(child => {
        foundElements.push(...findElementsByClass(child, className));
    });
    return foundElements;
};
const foundElements = findElementsByClass(rootElement, 'my-class');
console.log('All elements with class "my-class":');
console.log(foundElements);