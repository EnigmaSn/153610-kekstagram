'use strict';
(function () {
  // обозначение клавиш
  // обозначение клавиш
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // элемент
  var similarPictureElement = document.querySelector('.pictures');
  // получение фотографий
  var userPhotos = window.getPhotos(25);
  // заполнение блока
  var renderPictures = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < userPhotos.length; i++) {
      var pictureOne = window.getPicture(userPhotos[i]);
      fragment.appendChild(pictureOne);
    }
    similarPictureElement.appendChild(fragment);
  };
  renderPictures();
  // закрыть окно Esc
  window.overlayEscHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.overlayCloseHandler();
    }
  };
})();