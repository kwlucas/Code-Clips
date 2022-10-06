const usernameInputEl = document.querySelector("#username-input");
const passwordInputEl = document.querySelector("#password-input");
const signupBtnEl = document.querySelector("#signup-btn");
const addNewBtnEl = document.querySelector('#new-post-btn');
const modalEl = document.querySelector('#main-modal');

function delay(seconds = 1) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

//Play the close modal animation before switching pages
async function closeModal() {
    addNewBtnEl.classList.remove('modal-active');
    modalEl.removeAttribute('open');
    document.documentElement.classList.remove('scroll-disabled');
    await delay(2);
    //switch to home page
    document.location.replace('/');
}

async function createAccount(event) {
    event.preventDefault();
    //Create new user with given credentials using API
    const auth = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameInputEl.value,
            password: passwordInputEl.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    //If username and password are accepted and the user is created close the modal/return to homepage
    if (auth.ok) {
        await closeModal();
    }

}

addNewBtnEl.addEventListener('click', closeModal);
signupBtnEl.addEventListener('click', createAccount);
//Disable scrolling
document.documentElement.classList.add('scroll-disabled');