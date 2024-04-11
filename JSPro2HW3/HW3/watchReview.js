document.addEventListener('DOMContentLoaded', function () {
    const productsContainerEl = document.querySelector('.products');

    function showReviews(productName) {
        const reviews = JSON.parse(localStorage.getItem(productName) || '[]');
        const reviewsList = document.createElement('ul');
        reviewsList.style.display = 'none';
        reviews.forEach((review, index) => {
            const reviewItem = document.createElement('li');
            reviewItem.textContent = review;
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function () {
                reviews.splice(index, 1);
                if (reviews.length === 0) {
                    localStorage.removeItem(productName);
                    productsContainerEl.removeChild(reviewsList.parentElement);
                } else {
                    reviewsList.removeChild(reviewItem);
                    localStorage.setItem(productName, JSON.stringify(reviews));
                }
            });
            reviewItem.append(deleteButton);
            reviewsList.append(reviewItem);
        });
        return reviewsList;
    }

    for (let i = 0; i < localStorage.length; i++) {
        const productName = localStorage.key(i);
        const reviewsList = showReviews(productName);
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        const productTitleEl = document.createElement('p');
        productTitleEl.classList.add('product-title');
        productTitleEl.textContent = productName;
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Show Reviews';
        toggleButton.addEventListener('click', function () {
            if (reviewsList.style.display === 'none') {
                reviewsList.style.display = 'block';
                toggleButton.textContent = 'Hide Reviews';
            } else {
                reviewsList.style.display = 'none';
                toggleButton.textContent = 'Show Reviews';
            }
        });
        productDiv.append(productTitleEl);
        productDiv.append(toggleButton);
        productDiv.append(reviewsList);
        productsContainerEl.append(productDiv);
    }
});

