'use strict';

// получить случайное число
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// массив комментариев
var userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// масив случайных комментариев
// Комментарий должен генерироваться случайным образом. Для комментария нужно взять одно или два случайных предложений из предложенных выше
var randomComments = [
  [userComments[getRandom(0, userComments.length - 1)]],
  [userComments[getRandom(0, userComments.length - 1)], userComments[getRandom(0, userComments.length - 1)]]
];

// массив фотографий пользователей, вкл лайки, комментарии и фото
var getPhotos = function (value) {
  var photos = [];
  for (var i = 0; i < value; i++) {
    photos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandom(15, 200),
      comments: randomComments[getRandom(0, randomComments.length - 1)]
    });
  }
  return photos;
};
var userPhotos = getPhotos(25);

// шаблон
var similarPictureTemplate = document.querySelector('#picture-template').content;
// элемент
var similarPictureElement = document.querySelector('.pictures');
// заполнение шаблона
var getPicture = function (picture) {
  var newPicture = similarPictureTemplate.cloneNode(true);
  newPicture.querySelector('img').src = picture.url;
  newPicture.querySelector('.picture-likes').textContent = picture.likes;
  newPicture.querySelector('.picture-comments').textContent = picture.comments.length;
  return newPicture;
};

// заполнение блока
var renderPictures = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < userPhotos.length; i++) {
    fragment.appendChild(getPicture(userPhotos[i]));
  }
  similarPictureElement.appendChild(fragment);
};
renderPictures();

// показать элемент
var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');
// заполнить элемент данными
var fillgalleryOverlay = function (count) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = userPhotos[count].url;
  galleryOverlay.querySelector('.likes-count').textContent = userPhotos[count].likes;
  galleryOverlay.querySelector('.comments-count').textContent = userPhotos[count].comments.length;
};
fillgalleryOverlay(0);

