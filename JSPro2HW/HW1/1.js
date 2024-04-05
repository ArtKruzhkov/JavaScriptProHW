"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/
const albums = [
  {
    title: "After Hours",
    artist: "The Weeknd",
    year: "2020"
  },
  {
    title: "Hollywood's Bleeding",
    artist: "Post Malone",
    year: "2019"
  },
  {
    title: "Manic",
    artist: "Halsey",
    year: "2020"
  },
  {
    title: "Fine Line",
    artist: "Harry Styles",
    year: "2019"
  },
  {
    title: "Future Nostalgia",
    artist: "Dua Lipa",
    year: "2020"
  }
];


const albumsCollection = {
  albums,
  [Symbol.iterator]: function* () {
    for (const album of this.albums) {
      yield album;
    }
  }
};

for (const album of albumsCollection) {
  console.log(`${album.title} - ${album.artist} (${album.year})`);
};