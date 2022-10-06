const addNewBtnEl = document.querySelector('#new-post-btn');
const modalEl = document.querySelector('#main-modal');
const titleInputEl = document.querySelector('#title-input');
const snippetInputEl = document.querySelector('#snippet-input');
const descriptionInputEl = document.querySelector('#description-input');
const submitBtnEl = document.querySelector('#submit-btn');

function delay(seconds = 1) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
//Run the close modal animation before returning to homepage
async function closeModal() {
    addNewBtnEl.classList.remove('modal-active');
    modalEl.removeAttribute('open');
    document.documentElement.classList.remove('scroll-disabled');
    await delay(2);
    document.location.replace('/');
}

async function createPost(event) {
    event.preventDefault();
    //Create the new post using API
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: titleInputEl.value,
            snippet: snippetInputEl.value,
            description: descriptionInputEl.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    //verify that the post was created and request was not rejected before closing the modal/returning to homepage
    if (response.ok) {
        await closeModal();
    }
}

//While typing in the snippetInput element make it so that the "tab" key will create an indent
snippetInputEl.addEventListener('keydown', function(event) {
    if (event.key == 'Tab') {
      event.preventDefault();
      let start = this.selectionStart;
      let end = this.selectionEnd;
  
      // split the text area at cursor insert a tab character and then merge the two parts together around it
      this.value = this.value.substring(0, start) +
        "\t" + this.value.substring(end);
  
      // replace cursor in position
      this.selectionStart =
        this.selectionEnd = start + 1;
    }
  });

submitBtnEl.addEventListener('click', createPost);
addNewBtnEl.addEventListener('click', closeModal);
document.documentElement.classList.add('scroll-disabled');