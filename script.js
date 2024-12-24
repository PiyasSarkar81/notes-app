const notesContainer = document.querySelector('.note-container');
const createBtn = document.querySelector('.btn');
let notes = document.querySelectorAll('.input-box');

function showNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notesContainer.innerHTML = savedNotes;
        setupNotes();
    }
}

function updateStorage() {
    localStorage.setItem('notes', notesContainer.innerHTML);
}

function setupNotes() {
    notes = document.querySelectorAll('.input-box');
    notes.forEach(note => {
        note.onkeyup = () => {
            updateStorage();
        };
    });
}

createBtn.addEventListener('click', () => {
    const inputBox = document.createElement('p');
    const img = document.createElement('img');

    inputBox.className = "input-box";
    inputBox.setAttribute('contenteditable', 'true');
    img.src = "images/delete.png";
    img.alt = "Delete Note";

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    updateStorage();
    setupNotes();
});

notesContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.parentElement.remove();
        updateStorage();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.execCommand('insertHTML', false, '<br>');
        e.preventDefault();
    }
});

showNotes();
