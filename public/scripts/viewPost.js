const addNewBtnEl = document.querySelector('#new-post-btn');
const modalEl = document.querySelector('#main-modal');
const snippetEl = document.querySelector('#post-view-snippet');
const copyBtnEl = document.querySelector('#snippet-copy-btn');

function delay(seconds = 1) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function closeModal() {
    addNewBtnEl.classList.remove('modal-active');
    modalEl.removeAttribute('open');
    document.documentElement.classList.remove('scroll-disabled');
    await delay(2);
    document.location.replace('/');
}

copyBtnEl.addEventListener('click', function (event) { 
    event.preventDefault();
    navigator.clipboard.writeText(snippetEl.textContent) 
});
addNewBtnEl.addEventListener('click', closeModal);
document.documentElement.classList.add('scroll-disabled');