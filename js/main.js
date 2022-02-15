/* global data */
/* exported data */

var $button = document.querySelector('.button');
var $image = document.querySelector('#image');
var $photoUrl = document.querySelector('#photo-url');

function updateImagePreview(event) {
  $image.setAttribute('src', $photoUrl.value);
}

$button.addEventListener('click', updateImagePreview);

var $form = document.querySelector('form');

$form.addEventListener('submit', updateEntry);

function updateEntry(event) {
  event.preventDefault();
  var entryObj = {
    title: $form.elements.title.value,
    photoUrl: $form.elements.photoUrl.value,
    notes: $form.elements.notes.value,
    nextEntryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entryObj);
  return entryObj;
}
