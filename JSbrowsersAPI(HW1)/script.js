// Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

// На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии, а именно:
// - название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"

// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.

// Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие, иначе она должна быть неактивна.

// Пользователь может записаться на один курс только один раз.

// Если количество участников уже максимально, то пользователь не может записаться, даже если он не записывался ранее.

// Сохраняйте данные в LocalStorage, чтобы они сохранялись и отображались при перезагрузке страницы.

const classes = [
    {
        id: 1,
        name: "Yoga",
        time: "10:00 - 11:00",
        maxParticipants: 15,
        currentParticipants: 8
    },
    {
        id: 2,
        name: "Pilates",
        time: "11: 30 - 12: 30",
        maxParticipants: 10,
        currentParticipants: 5
    },
    {
        id: 3,
        name: "Crossfit",
        time: "13:00 - 14:00",
        maxParticipants: 20,
        currentParticipants: 15
    },
    {
        id: 4,
        name: "Dance",
        time: "14:30 - 15:30",
        maxParticipants: 12,
        currentParticipants: 10
    },
    {
        id: 5,
        name: "Box",
        time: "16:00 - 17:00",
        maxParticipants: 8,
        currentParticipants: 8
    }
];
const localStorageClassesKey = 'classes';

const tableElement = document.querySelector('.table-classes');

let classesData = getClasses();

if (!classesData) {
    setClasses(classes);
    classesData = getClasses();
}

classesData.forEach(classInfo => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${classInfo.name}</td>
    <td>${classInfo.time}</td>
    <td>${classInfo.maxParticipants}</td>
    <td>${classInfo.currentParticipants}</td>
    <td>
        <button class="join-btn">Join</button>
        <button class="cancel-btn">Cancel</button>
    </td>
    `;
    tableElement.append(row);
});

const joinButtons = document.querySelectorAll('.join-btn');
const cancelButtons = document.querySelectorAll('.cancel-btn');

joinButtons.forEach((button, index) => {
    const classInfo = classesData[index];
    if (classInfo.isJoined || classInfo.currentParticipants === classInfo.maxParticipants) {
        button.disabled = true;
    }
    button.addEventListener('click', () => {
        if (!classInfo.isJoined && classInfo.currentParticipants < classInfo.maxParticipants) {
            classInfo.currentParticipants++;
            classInfo.isJoined = true;
            setClasses(classesData);
            updateUI();
        }
    });
});

cancelButtons.forEach((button, index) => {
    button.disabled = true;
    const classInfo = classesData[index];
    if (classInfo.isJoined) {
        button.disabled = false;
    }
    button.addEventListener('click', () => {
        classInfo.currentParticipants--;
        classInfo.isJoined = false;
        setClasses(classesData);
        updateUI();
    });
});


function getClasses() {
    return JSON.parse(localStorage.getItem(localStorageClassesKey));
}

function setClasses(classes) {
    return localStorage.setItem(localStorageClassesKey, JSON.stringify(classes));
}

function updateUI() {
    const classesData = getClasses();

    classesData.forEach((classInfo, index) => {
        const row = document.querySelectorAll('tr')[index + 1];
        const joinButton = row.querySelector('.join-btn');
        const cancelButton = row.querySelector('.cancel-btn');

        row.children[3].textContent = classInfo.currentParticipants;

        if (classInfo.currentParticipants === classInfo.maxParticipants || classInfo.isJoined) {
            joinButton.disabled = true;
        } else {
            joinButton.disabled = false;
        }

        if (classInfo.isJoined) {
            cancelButton.disabled = false;
        } else {
            cancelButton.disabled = true;
        }
    });
}