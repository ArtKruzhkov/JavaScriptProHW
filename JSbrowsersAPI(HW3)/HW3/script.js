const apiKey = 'f3GzBHxhabqbTUxi_06RkStkmedvi61mZh_ihB0rrVQ';
const likedPhotosKey = 'likedPhotos';

async function getRandomImage() {
    try {
        const response = await fetch('https://api.unsplash.com/photos/random', {
            headers: {
                Authorization: `Client-ID ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();

        return data;

    } catch (error) {
        throw error;
    }
}

async function getImageAndGenerateHTML() {
    try {
        const result = await getRandomImage();
        generateHTML(result);

        const likedPhotos = JSON.parse(localStorage.getItem(likedPhotosKey)) || {};
        const likeButton = document.querySelector('.icon-btn');
        const likeCountSpan = document.querySelector('.like-count');

        likeButton.addEventListener('click', ev => {
            if (likeButton.classList.contains('like-active')) {
                likeButton.classList.remove('like-active');
                likeCountSpan.textContent = parseInt(likeCountSpan.textContent) - 1;
                delete likedPhotos[result.id];
                if (Object.keys(likedPhotos).length === 0) {
                    localStorage.removeItem(likedPhotosKey);
                } else {
                    localStorage.setItem(likedPhotosKey, JSON.stringify(likedPhotos));
                }
            } else {
                likeButton.classList.add('like-active');
                likeCountSpan.textContent = parseInt(likeCountSpan.textContent) + 1;

                likedPhotos[result.id] = {
                    likes: parseInt(likeCountSpan.textContent),
                    userName: result.user.name,
                    userProfileLink: result.user.links.html,
                    smallImageUrl: result.urls.small
                };
                localStorage.setItem(likedPhotosKey, JSON.stringify(likedPhotos));
            }
        });

    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function generateHTML(data) {
    const containerEl = document.querySelector('.container');
    containerEl.insertAdjacentHTML('beforeend',
        `
        <div class="image-wrap" data-id="${data.id}">
            <img src="${data.urls.small}" alt="random-image">
            <div class="info-wrap">
                <p class="image-info">
                    ${data.user.name}
                    <a href="${data.user.links.html}" class="user-link">Link for profile</a>
                </p>
                <div class="btn-box">
                    <button class="icon-btn"><i class="fas fa-heart"></i></button>
                    <span class="like-count">${data.likes}</span>
                </div>
            </div>
        </div>
    `)
}

function showLikedPhotos() {
    const likedPhotos = JSON.parse(localStorage.getItem(likedPhotosKey)) || {};
    const containerEl = document.querySelector('.container');
    containerEl.innerHTML = '';
    Object.keys(likedPhotos).forEach(photoId => {
        const photoData = likedPhotos[photoId];
        const imageWrap = document.createElement('div');
        imageWrap.classList.add('image-wrap');
        imageWrap.dataset.id = photoId;
        imageWrap.innerHTML = `
            <img src="${photoData.smallImageUrl}" alt="random-image">
            <div class="info-wrap">
                <p class="image-info">
                    ${photoData.userName}
                    <a href="${photoData.userProfileLink}" class="user-link">Link for profile</a>
                </p>
                <div class="btn-box">
                    <button class="icon-btn like-active"><i class="fas fa-heart"></i></button>
                    <span class="like-count">${photoData.likes}</span>
                </div>
            </div>
        `;
        containerEl.appendChild(imageWrap);

        const likeButton = imageWrap.querySelector('.icon-btn');
        likeButton.addEventListener('click', () => {
            likeButton.classList.remove('like-active');
            delete likedPhotos[photoId];
            localStorage.setItem(likedPhotosKey, JSON.stringify(likedPhotos));
            containerEl.removeChild(imageWrap);

            if (Object.keys(likedPhotos).length === 0) {
                localStorage.removeItem(likedPhotosKey);
            }
        });

    });
}

document.addEventListener('DOMContentLoaded', ev => {
    getImageAndGenerateHTML();
    const showLikedButton = document.querySelector('.show-liked');
    showLikedButton.addEventListener('click', showLikedPhotos);
});