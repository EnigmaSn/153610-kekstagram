'use strict';
// получить случайное число
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
// обозначение клавиш
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
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
var randomComments = [
  [userComments[getRandom(0, userComments.length)]],
  [userComments[getRandom(0, userComments.length)], userComments[getRandom(0, userComments.length)]]
];
// массив фотографий пользователей, вкл лайки, комментарии и фото
var getPhotos = function (value) {
  var photos = [];
  for (var i = 0; i < value; i++) {
    photos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandom(15, 200),
      comments: randomComments[getRandom(0, randomComments.length)]
    });
  }
  return photos;
};
var userPhotos = getPhotos(25);
// шаблон
var similarPictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

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
    var pictureOne = getPicture(userPhotos[i]);
    pictureOne.addEventListener('click', pictureClickHandler(i));
    fragment.appendChild(pictureOne);
  }
  similarPictureElement.appendChild(fragment);
};

var pictureClickHandler = function (i) {
  var overlayOpenHandler = function (evt) {
    evt.preventDefault();
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', overlayEscHandler);
    fillGalleryOverlay(userPhotos[i]);
  };
  return overlayOpenHandler;
};

renderPictures();

// окно с картинкой
var galleryOverlay = document.querySelector('.gallery-overlay');
// заполнить окно данными
var fillGalleryOverlay = function (photo) {
  galleryOverlay.querySelector('.gallery-overlay-image').src = photo.url;
  galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
  galleryOverlay.querySelector('.comments-count').textContent = photo.comments.length;
};

// общая функция закрыть окно
var overlayCloseHandler = function () {
  galleryOverlay.classList.add('hidden');
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', overlayEscHandler);
};

// закрыть окно Esc
var overlayEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    overlayCloseHandler();
  }
};
// закрыть окно кликом
var closeGallery = galleryOverlay.querySelector('.gallery-overlay-close');
closeGallery.addEventListener('click', overlayCloseHandler);
// закрыть окно клавишей enter на крестике
closeGallery.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    overlayCloseHandler();
  }
});

// форма загрузки
var imageForm = document.querySelector('#upload-select-image');
// поле загрузки файла
var uploadFile = imageForm.querySelector('#upload-file');
// форма кадрирования изображения
var uploadOverlay = imageForm.querySelector('.upload-overlay');

// открытие формы кадрирования
uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', overlayEscHandler);
});

// закрытие формы кадрирования
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
uploadFormCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', overlayEscHandler);
});

// отмена Esc при фокусе на комментарии
var comment = uploadOverlay.querySelector('.upload-form-description');
comment.addEventListener('focus', function () {
  document.removeEventListener('keydown', overlayEscHandler);
});
comment.addEventListener('blur', function () {
  document.addEventListener('keydown', overlayEscHandler);
});

// закрытие по ENTER при фокусе на крестике
uploadFormCancel.addEventListener('focus', function () {
  uploadFormCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      overlayCloseHandler();
    }
  });
});

comment.required = false;
comment.maxLength = 140;

// Форма ввода масштаба
// ??
var resizeControls = uploadOverlay.querySelector('.upload-resize-controls-value');
resizeControls.step = 25;
resizeControls.min = 25;
resizeControls.maxLength = 100;

// Применение эффекта к изображению (через делегирование)
var effectContainer = uploadOverlay.querySelector('.upload-effect-controls');
var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');

effectContainer.addEventListener('change', function (evt) {
  var target = evt.target.value;
  effectImagePreview.className = 'effect-image-preview effect-' + target;
});

// изменение масштаба
var resizeMin = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var resizeMax = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var resizeValue = uploadOverlay.querySelector('.upload-resize-controls-value');

resizeMin.addEventListener('click', function () {
  if (parseFloat(resizeValue.value) > +resizeValue.min) {
    resizeValue.value = '' + (parseFloat(resizeValue.value) - +resizeValue.step) + '%';
    effectImagePreview.style = 'transform: scale(' + parseFloat(resizeValue.value) / resizeValue.max + ')';
  }
});
resizeMax.addEventListener('click', function () {
  if (parseFloat(resizeValue.value) < +resizeValue.max) {
    resizeValue.value = '' + (parseFloat(resizeValue.value) + +resizeValue.step) + '%';
    effectImagePreview.style = 'transform: scale(' + parseFloat(resizeValue.value) / resizeValue.max + ')';
  }
});

// Хэш-теги
var hashTag = uploadOverlay.querySelector('.upload-form-hashtags');
var hashTagSplit = hashTag.value.split(' '); // разделение тегов через пробел
var hashTagLength = hashTagSplit.length;
hashTag.required = false;

var hashTagValid = function () {
  // через условия
  // true = error
  if (hashTag.value.length === 0) {
    return false; // хэш-теги не обязательны
  }
  if (hashTagLength > 5) {
    return true; // нельзя указать больше пяти хэш-тегов
  }
  for (var i = 0; i < hashTagLength; i++) {
    if (hashTagSplit[i][0] !== '#') {
      return true; // хэш-тег начинается с символа `#` (решётка) и состоит из одного слова
    }
    if (hashTagSplit[i].length > 20) {
      return true; // максимальная длина одного хэш-тега 20 символов
    }
    for (var j = 0; j < hashTagLength[i]; j++) {
      // теги не чувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом
      if (hashTagSplit[i].toLowerCase() === hashTagSplit[j].toLowerCase() && i !== j) {
        return true; // доделать
      }
    }
  }
  return false;
};

var submitFormHandler = function (evt) {
  if (hashTagValid() === true) {
    hashTag.style.borderColor = 'red';
    evt.preventDefault();
  }
};
imageForm.addEventListener('submit', submitFormHandler);
