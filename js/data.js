'use strict';

(function () {
  // получить случайное число
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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
  var randomComments = [
    [userComments[getRandom(0, userComments.length)]],
    [userComments[getRandom(0, userComments.length)], userComments[getRandom(0, userComments.length)]]
  ];
  // массив фотографий пользователей, вкл лайки, комментарии и фото
  window.getPhotos = function (value) { // в глобальнуб область видимости
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
})();