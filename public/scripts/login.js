const usernameInputEl = document.querySelector("#username-input");
const passwordInputEl = document.querySelector("#password-input");
const loginBtnEl = document.querySelector("#login-btn");
const signupBtnEl = document.querySelector("#signin-btn");
let addNewBtnEl = document.querySelector('#new-post-btn');
let modalEl = document.querySelector('#main-modal');

function delay(seconds = 1) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function closeModal() {
    addNewBtnEl.classList.remove('modal-active');
    modalEl.removeAttribute('open');
    await delay(3);
}

async function authenticate(event) {
    event.preventDefault();

    const auth = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameInputEl.value,
            password: passwordInputEl.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (auth.ok) {
        await closeModal();
        document.location.replace('/');
    }

}

loginBtnEl.addEventListener("click", authenticate);
signupBtnEl.addEventListener("click", function () { document.location.replace('/signup'); });