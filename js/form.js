'use strict';
(function () {
  // форма загрузки
  var imageForm = document.querySelector('#upload-select-image');
  // поле загрузки файла
  var uploadFile = imageForm.querySelector('#upload-file');
  // форма кадрирования изображения
  window.uploadOverlay = imageForm.querySelector('.upload-overlay');
  // открытие формы кадрирования
  uploadFile.addEventListener('change', function () {
    window.uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', window.overlayEscHandler);
  });
  // закрытие формы кадрирования
  var uploadFormCancel = imageForm.querySelector('.upload-form-cancel');
  uploadFormCancel.addEventListener('click', function () {
    window.uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.overlayEscHandler);
  });
  // отмена Esc при фокусе на комментарии
  var comment = window.uploadOverlay.querySelector('.upload-form-description');
  comment.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.overlayEscHandler);
  });
  comment.addEventListener('blur', function () {
    document.addEventListener('keydown', window.overlayEscHandler);
  });
  // Применение эффекта к изображению (через делегирование)
  var effectContainer = uploadOverlay.querySelector('.upload-effect-controls');
  var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');
  // делегирование эффектов
  effectContainer.addEventListener('change', function (evt) {
    var target = evt.target.value;
    effectImagePreview.className = 'effect-image-preview effect-' + target + '';
  });
  // изменение масштаба изображения
  var resizeMin = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var resizeMax = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var resizeValue = uploadOverlay.querySelector('.upload-resize-controls-value');

  resizeMin.addEventListener('click', function () {
    if (parseFloat(resizeValue.value) > +resizeValue.min) {
      resizeValue.value = '' + (parseFloat(resizeValue.value) - resizeValue.step) + '%';
      effectImagePreview.style = 'transform: scale(' + parseFloat(resizeValue.value) / resizeValue.max + ')';
    }
  });
  resizeMax.addEventListener('click', function () {
    if (parseFloat(buttonValue.value) < +resizeValue.max) {
      resizeValue.value = '' + (parseFloat(resizeValue.value) + +resizeValue.step) + '%';
      effectImagePreview.style = 'transform: scale(' + parseFloat(resizeValue.value) / resizeValue.max + ')';
    }
  });

  // валидация формы
  var hashTag = uploadOverlay.querySelector('.upload-form-hashtags');
  hashTag.required = false;

  var hashTagValid = function () {
    var hashTagSplit = hashTag.value.split(' '); // разделение тегов через пробел
    var hashTagLength = hashTagSplit.length;
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
      for (var j = 0; j < hashTagLength; j++) {
        // теги не чувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом
        if (hashTagSplit[i].toLowerCase() === hashTagSplit[j].toLowerCase() && i !== j) {
          return true;
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
})();