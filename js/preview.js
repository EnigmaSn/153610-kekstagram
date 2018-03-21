'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  // окно с картинкой
  window.galleryOverlay = document.querySelector('.gallery-overlay');
  // заполнить окно данными
  window.fillGalleryOverlay = function (photo) {
    window.galleryOverlay.querySelector('.gallery-overlay-image').src = photo.url;
    window.galleryOverlay.querySelector('.likes-count').textContent = photo.likes;
    window.galleryOverlay.querySelector('.comments-count').textContent = photo.comments.length;
  };
  // функция закрыть окно
  window.overlayCloseHandler = function () {
    window.galleryOverlay.classList.add('hidden');
    window.uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.overlayEscHandler);
  };
  // закрыть окно кликом
  var closeGallary = window.galleryOverlay.querySelector('.gallery-overlay-close');
  closeGallary.addEventListener('click', window.overlayCloseHandler);
  // закрыть окно клавишей
  closeGallary.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.overlayCloseHandler();
    }
  });
})();