const addBtn = document.querySelector('.new_note_btn');
const divPlacement = document.get
addBtn.addEventListener('click', addNew);

function addNew(){
    const newTextArea = document.createElement('textarea');
    newTextArea.classList.add('note-style')
    document.body.appendChild(newTextArea);
};