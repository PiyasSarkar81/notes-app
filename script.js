const notesContainer = document.querySelector('.container');
const createBtn = document.querySelector('.btn');
let notes = document.querySelectorAll('.input-box');

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes');
}

function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}


createBtn.addEventListener('click', () => {
    const inputBox = document.createElement('p');
    const img = document.createElement('img');

    inputBox.className = "input-box";
    inputBox.setAttribute('contenteditable', 'true');
    img.src = "images/delete.png";
    img.alt = "Delete Note";

    notesContainer.appendChild(inputBox).appendChild(img);
});

notesContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.parentElement.remove();
        updateStorage();
    }
    else if (e.target.tagName === 'P') {
        notes = document.querySelectorAll('.input-box');
        notes.forEach(note => {
            note.onkeyup = () => {
                updateStorage();
            }
        });
    }
});

showNotes();

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.execCommand('insertHTML', false, '<br>');
        e.preventDefault();
    }
});