'use strict';
(function () {
  // шаблон
  var similarPictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
  // заполнение шаблона
  window.getPicture = function (picture) {
    var newPicture = similarPictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src = picture.url;
    newPicture.querySelector('.picture-likes').textContent = picture.likes;
    newPicture.querySelector('.picture-comments').textContent = picture.comments.length;
    newPicture.addEventListener('click', pictureClickHandler(picture));
    return newPicture;
  };
  var pictureClickHandler = function (picture) {
    return function (evt) {
      evt.preventDefault();
      window.galleryOverlay.classList.remove('hidden');
      document.addEventListener('keydown', window.overlayEscHandler);
      window.fillGalleryOverlay(picture);
    };
  };
})();