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

function createEntryListItem(data) {

  var liElement = document.createElement('li');
  liElement.setAttribute('class', 'row');

  var imageElement = document.createElement('img');
  imageElement.setAttribute('class', 'column-half');
  imageElement.setAttribute('src', data.photourl);

  liElement.appendChild(imageElement);

  var divElement = document.createElement('div');
  divElement.setAttribute('class', 'column-half');

  liElement.appendChild(divElement);

  var h1Element = document.createElement('h1');
  h1Element.textContent = data.title;

  var pElement = document.createElement('p');
  pElement.textContent = data.notes;

  divElement.appendChild(h1Element);
  divElement.appendChild(pElement);

  return liElement;
}

document.addEventListener('DOMContentLoaded', function (event) {
  var ulElement = document.querySelector('ul');

  for (var i = 0; i < data.entries.length; i++) {
    var result = createEntryListItem(data.entries[i]);
    ulElement.appendChild(result);
  }
});
