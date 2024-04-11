const formAddReviewEl = document.querySelector('.add-review-form');
const selectProductEl = document.getElementById('product-name');
const reviewAreaEl = document.getElementById('user-review');
const addReviewBtnEl = document.querySelector('.add-review-btn');
formAddReviewEl.addEventListener('submit', ev => {
    ev.preventDefault();
    const productName = selectProductEl.value.trim();
    const userReview = reviewAreaEl.value.trim();
    if (productName === '') {
        alert('Please select a product');
        return;
    }
    if (userReview === '') {
        alert('Please enter a review');
        return;
    }
    let reviews = [];
    if (localStorage.getItem(productName)) {
        reviews = JSON.parse(localStorage.getItem(productName));
    }
    reviews.push(userReview);
    localStorage.setItem(productName, JSON.stringify(reviews));
    reviewAreaEl.value = '';
});