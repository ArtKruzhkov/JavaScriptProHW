"use strict";
/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв, как и продукт, должен иметь уникальный id, для упрощения, используем 
функцию `uid()`, она нам будет возвращать случайный id в виде небольшой строки.
*/
console.log('==========TASK 2==========');
function uid() {
  return Math.random().toString(36).slice(2);
}

const initialData = [
  {
    id: uid(),
    product: "Apple iPhone 13",
    reviews: [
      {
        id: uid(),
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: uid(),
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    id: uid(),
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: uid(),
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    id: uid(),
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: uid(),
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

const productsContainerEl = document.querySelector('.products');
initialData.forEach(productData => {
  const productEl = document.createElement('div');
  productEl.classList.add('product');
  productEl.innerHTML = `<h2 class='product__name'>${productData.product}</h2>`;
  productsContainerEl.append(productEl);

  const reviewsListEl = document.createElement('ul');
  reviewsListEl.classList.add('product__reviewsList');
  productEl.append(reviewsListEl);

  productData.reviews.forEach(review => {
    const reviewItemEl = document.createElement('li');
    reviewItemEl.classList.add('product__reviewItem');
    reviewItemEl.textContent = review.text;
    reviewsListEl.append(reviewItemEl);
  });

  const reviewFormEl = document.createElement('form');
  reviewFormEl.innerHTML = `
                <input type="text" placeholder="Write your review">
                <button type="submit">Add review</button>
                `;
  productEl.append(reviewFormEl);

  reviewFormEl.addEventListener('submit', ev => {
    ev.preventDefault();
    const reviewInputEl = reviewFormEl.querySelector('input');
    const reviewText = reviewInputEl.value;
    const errorDiv = reviewFormEl.querySelector('.error_item');
    if (reviewText.length >= 50 && reviewText.length <= 500) {
      if (errorDiv) {
        errorDiv.remove();
      }
      const newReview = {
        id: uid(),
        text: reviewText
      };
      productData.reviews.push(newReview);
      const newReviewItem = document.createElement('li');
      newReviewItem.textContent = reviewText;
      reviewsListEl.append(newReviewItem);
      reviewInputEl.value = '';
    } else {
      if (!errorDiv) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error_item');
        errorDiv.textContent = 'Review must be between 50 and 500 characters';
        errorDiv.style.color = 'red';
        reviewFormEl.append(errorDiv);
      }
    }
  });
});