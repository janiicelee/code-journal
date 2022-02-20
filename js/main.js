/* global data */
/* exported data */

var $image = document.querySelector('#image');
var $photoUrl = document.querySelector('#photourl');

function updateImagePreview(event) {
  $image.setAttribute('src', $photoUrl.value);
}

$photoUrl.addEventListener('input', updateImagePreview);

var $form = document.querySelector('form');
var $ulELement = document.querySelector('ul');

function updateEntry(event) {
  event.preventDefault();
  var entryObj = {};
  if (data.editing === null) {
    entryObj = {
      title: $form.elements.title.value,
      photourl: $form.elements.photourl.value,
      notes: $form.elements.notes.value,
      entryId: data.nextEntryId
    };

    // add new entry to the data model
    data.nextEntryId++;
    data.entries.unshift(entryObj);
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $ulELement.prepend(createEntryListItem(entryObj));
    $form.reset();
  } else if (data.editing !== null) {
    entryObj.title = $form.elements.title.value;
    entryObj.photourl = $form.elements.photourl.value;
    entryObj.notes = $form.elements.notes.value;
    entryObj.entryId = data.editing.entryId;

    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryid === entryObj.entryId) {
        data.entries[i] = entryObj;
      }
    }
    data.editing = null;
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $liClosest.replaceWith(createEntryListItem(entryObj));
    $form.reset();
  }
  // switches to the list view
  $entries.className = 'view entries';
  $entryForm.className = 'view entry-form hidden';
  data.view = 'entries';
}

$form.addEventListener('submit', updateEntry);

function createEntryListItem(data) {
  var liElement = document.createElement('li');
  liElement.setAttribute('class', 'row');
  liElement.setAttribute('data-entry-id', data.entryId);

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

var $liClosest = null;

// Listen for clicks on the parent element of all rendered entries
ulElement.addEventListener('click', function (event) {

  var $h1Element = document.querySelector('h1');

  if (event.target && event.target.matches('I')) {
    $liClosest = event.target.closest('li');
    var $entryId = $liClosest.getAttribute('data-entry-id');
    $entryId = JSON.parse($entryId);
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $entryId) {
        data.editing = data.entries[i];
      }
    }

    // populate the input fields with object stored in data.editing
    $form.elements.title.value = data.editing.title;
    $form.elements.photourl.value = data.editing.photourl;
    $form.elements.notes.value = data.editing.notes;
    $image.setAttribute('src', data.editing.photourl);

    $entries.className = 'view entries hidden';
    $entryForm.className = 'view entry-form';
    $h1Element.textContent = 'Edit Entry';
    data.view = 'entry-form';
  }
});

var $deleteButton = document.querySelector('.delete-button');

$entries.addEventListener('click', function (event) {
  if (event.target.matches('I')) {
    $deleteButton.className = 'delete-button';
  } else {
    $deleteButton.className = 'delete-button visibility-hidden';
  }
});
