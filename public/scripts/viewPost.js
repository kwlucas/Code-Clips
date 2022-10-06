const addNewBtnEl = document.querySelector('#new-post-btn');
const modalEl = document.querySelector('#main-modal');

function delay(seconds = 1) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function closeModal() {
    addNewBtnEl.classList.remove('modal-active');
    modalEl.removeAttribute('open');
    await delay(2);
    document.location.replace('/');
}

addNewBtnEl.addEventListener('click', closeModal);