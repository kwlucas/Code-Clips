const usernameInputEl = document.querySelector("#username-input");
const passwordInputEl = document.querySelector("#password-input");
const signupBtnEl = document.querySelector("#signup-btn");
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

async function createAccount(event) {
    event.preventDefault();

    const auth = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameInputEl.value,
            password: passwordInputEl.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (auth.ok) {
        await closeModal();
    }

}

addNewBtnEl.addEventListener('click', closeModal);
signupBtnEl.addEventListener('click', createAccount);