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
  // add new entry to the data model
  data.nextEntryId++;
  data.entries.unshift(entryObj);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

  // switches to the list view
  $entries.className = 'view entries';
  $entryForm.className = 'view entry-form hidden';
  data.view = 'entries';

  // inserts new domtree on the top of list
  var $ulELement = document.querySelector('ul');
  var newEntry = createEntryListItem(entryObj);
  $ulELement.prepend(newEntry);
}

$form.addEventListener('submit', updateEntry);

function createEntryListItem(data) {

  var liElement = document.createElement('li');
  liElement.setAttribute('class', 'row');
  liElement.setAttribute('data-entry-id', data.nextEntryId - 1);

  var imageElement = document.createElement('img');
  imageElement.setAttribute('class', 'column-half');
  imageElement.setAttribute('src', data.photourl);

  liElement.appendChild(imageElement);

  var divElement = document.createElement('div');
  divElement.setAttribute('class', 'column-half');

  liElement.appendChild(divElement);

  var titleDivElement = document.createElement('div');
  titleDivElement.setAttribute('class', 'row space-between');

  divElement.appendChild(titleDivElement);

  var h1Element = document.createElement('h1');
  h1Element.textContent = data.title;

  var editElement = document.createElement('i');
  editElement.setAttribute('class', 'fa-solid fa-pen edit-icon display align-items');

  var pElement = document.createElement('p');
  pElement.textContent = data.notes;

  titleDivElement.appendChild(h1Element);
  titleDivElement.appendChild(editElement);
  divElement.appendChild(pElement);

  return liElement;
}

var ulElement = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', function (event) {

  for (var i = 0; i < data.entries.length; i++) {
    var result = createEntryListItem(data.entries[i]);
    ulElement.appendChild(result);
  }
});

var $newbutton = document.querySelector('.new-button');
var $entryTab = document.querySelector('.entry-tab');
var $entryForm = document.querySelector('.entry-form');
var $entries = document.querySelector('.entries');
var $formTab = document.querySelector('.form-tab');

$newbutton.addEventListener('click', function (event) {
  if ($entryForm !== '') {
    $entries.className = 'entries hidden';
    $entryForm.className = 'entry-form';
    data.view = 'entry-form';
  }
});

$entryTab.addEventListener('click', function (event) {
  if ($entries !== '') {
    $entryForm.className = 'entry-form hidden';
    $entries.className = 'entries';
    data.view = 'entries';
  } else {
    return 'No entries have been recorded';
  }
});

$formTab.addEventListener('click', function (event) {
  if ($entryForm !== '') {
    $entries.className = 'entries hidden';
    $entryForm.className = 'entry-form';
    data.view = 'entry-form';
  }
});

// this is needed to refresh the page
if (data.view === 'entry-form') {
  $entries.className = 'view entries hidden';
  $entryForm.className = 'view entry-form';
  data.view = 'entry-form';
} else {
  $entryForm.className = 'view entry-form hidden';
  $entries.className = 'view entries';
  data.view = 'entries';
}

// Listen for clicks on the parent element of all rendered entries
ulElement.addEventListener('click', function (event) {
  // console.log('ok');
  if (event.target && event.target.matches('i')) {
    $entries.className = 'view entries hidden';
    $entryForm.className = 'view entry-form';
    data.view = 'entry-form';
  }
});
