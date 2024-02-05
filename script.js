document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.getElementById('noteForm');
    const noteInput = document.getElementById('noteInput');
    const noteList = document.getElementById('noteList');
    const toggleCompletedButton = document.getElementById('toggleCompleted');
    let completedVisible = true;

    // Відмітити нотатку як виконану або у процесі
    function toggleNoteStatus(event) {
        const checkbox = event.target;
        const listItem = checkbox.parentNode.parentNode;
        
        if (checkbox.classList.contains('checkbox-empty')) {
            checkbox.classList.remove('checkbox-empty');
            checkbox.classList.add('checkbox-in-progress');
            listItem.classList.add('in-progress');
        } else if (checkbox.classList.contains('checkbox-in-progress')) {
            checkbox.classList.remove('checkbox-in-progress');
            listItem.classList.remove('in-progress');
            checkbox.classList.add('checkbox-completed');
            listItem.classList.add('completed');
        } else {
            checkbox.classList.remove('checkbox-completed');
            checkbox.classList.add('checkbox-empty');
            listItem.classList.remove('completed');
            
        }
    }

    // Додати нову нотатку
    function addNote(event) {
        event.preventDefault(); // Зупинити стандартну подію відправлення форми

        const notes = noteInput.value.split(/\n\s*\n/); // Розділити введений текст на окремі нотатки

        notes.forEach(function(noteText) {
            if (noteText.trim() !== '') {
                const noteItem = document.createElement('li');
                noteItem.className = 'note-item';
                const checkboxContainer = document.createElement('div');
                checkboxContainer.className = 'checkbox-container';
                const checkbox = document.createElement('div');
                checkbox.className = 'checkbox checkbox-empty';
                checkbox.addEventListener('click', toggleNoteStatus);
                checkboxContainer.appendChild(checkbox);
                const noteTextElement = document.createElement('span');
                noteTextElement.textContent = noteText.trim();
                noteItem.appendChild(checkboxContainer);
                noteItem.appendChild(noteTextElement);
                noteList.appendChild(noteItem);
            }
        });

        noteInput.value = ''; // Очистити поле введення
    }

    
    // Показати або приховати виконані нотатки
        function toggleCompleted() {
            const completedNotes = document.querySelectorAll('.note-item.completed');

            completedNotes.forEach(function(note) {
            note.classList.toggle('hidden');
            });

             toggleCompletedButton.textContent = completedVisible ? 'show done' : 'hide done';
            completedVisible = !completedVisible;

}


    noteForm.addEventListener('submit', addNote);
    toggleCompletedButton.addEventListener('click', toggleCompleted);

    if (!completedVisible) {
        const newCompletedNotes = document.querySelectorAll('.note-item.completed:not(.hidden)');
        newCompletedNotes.forEach(function(newNote) {
            newNote.classList.add('hidden');
        });
    }

    // Функція для збереження списку в localStorage
function saveList() {
    const noteList = document.getElementById('noteList').innerHTML;
    localStorage.setItem('noteList', noteList);
}

// Функція для завантаження списку з localStorage
function loadList() {
    const savedList = localStorage.getItem('noteList');
    if (savedList) {
        document.getElementById('noteList').innerHTML = savedList;
    }
}

// Викликаємо функцію завантаження при завантаженні сторінки
window.onload = function() {
    loadList();
};

// Викликаємо функцію збереження при зміні списку
document.getElementById('noteForm').addEventListener('submit', function(event) {
    saveList();
});


});


