/* global data */
/* exported data */

var $image = document.querySelector('#image');
var $photoUrl = document.querySelector('#photourl');

function updateImagePreview(event) {
  $image.setAttribute('src', $photoUrl.value);
}

$photoUrl.addEventListener('input', updateImagePreview);

var $form = document.querySelector('form');

function updateEntry(event) {
  event.preventDefault();
  var entryObj = {
    title: $form.elements.title.value,
    photourl: $form.elements.photourl.value,
    notes: $form.elements.notes.value,
    nextEntryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entryObj);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', updateEntry);
