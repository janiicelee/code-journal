/* global data */
/* exported data */

var $button = document.querySelector('.button');
var $image = document.querySelector('#image');
var $photoUrl = document.querySelector('#photo-url');

function updateImagePreview(event) {
  $image.setAttribute('src', $photoUrl.value);
}

$button.addEventListener('click', updateImagePreview);
