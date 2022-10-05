let addNewBtnEl = document.querySelector('#new-post-btn');
let viewPostEl = document.querySelector('#view-post');


function delay(seconds = 1) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }

function toggleModal(event) {
    event.preventDefault();
    const trigger = event.target;
    if (trigger.classList.contains('modal-active')) {
        trigger.classList.toggle('modal-active');
        (document.querySelectorAll('dialog[open]') || []).forEach(modal => {//get all open modals and run for each
            modal.removeAttribute('open');
        });
        return;
    };

    if (trigger.hasAttribute('linked-modal')) {
        trigger.classList.add('modal-active');
        const linkedModal = trigger.getAttribute('linked-modal');
        document.querySelector(`#${linkedModal}`).toggleAttribute('open');
        return;
    }

    if (trigger.hasAttribute('open')) {
        trigger.toggleAttribute('open');
        return;
    }
}

async function openModal(selector, linkTo ='/') {
    const modal = document.querySelector(selector);
    modal.addAttribute('open');
    await delay();
    if(linkTo !== '/'){
        document.location.replace(linkTo);
    } else {
        console.log('no redirect link provided!');
        await delay(5);
        document.location.replace(linkTo);
    }
}

function openPost(event) {
    const postId = event.target.getAttribute('post_id');
    addNewBtnEl.classList.add('modal-active');
    openModal('#main-modal', `/posts/${postId}`);
}

function setUpPosts() {
    (document.querySelectorAll('.post[post_id]') || []).forEach(postEl => {//get all elements with "post" class and run for each
        const postId = postEl.getAttribute('post_id');
        postEl.addEventListener('click', openPost);
        if(postEl.classList.contains('saved')){
            (document.querySelectorAll(`.post[post_id=${postId}]`) || []).forEach(savedPostEl => {//get all elements with "post" class and run for each
                if(!savedPostEl.classList.contains('saved')){
                    savedPostEl.classList.add('saved');
                }
            });
        }
    });
}

function scrollR(event) {
    let scrollBoxEl = event.target.parentElement.previousElementSibling;
    console.log(scrollBoxEl);
    scrollBoxEl.scrollLeft += 270;
}

function scrollL(event) {
    let scrollBoxEl = event.target.parentElement.nextElementSibling;
    console.log(scrollBoxEl);
    scrollBoxEl.scrollLeft -= 270;
}


document.addEventListener('DOMContentLoaded', () => {
    addNewBtnEl.addEventListener('click', toggleModal);
    (document.querySelectorAll('.arrow-btn') || []).forEach(arrowEl => {//get all elements with "arrow-btn" class and run for each
        if (arrowEl.classList.contains('right')) {
            arrowEl.addEventListener('click', scrollR);
        } else {
            arrowEl.addEventListener('click', scrollL);
        }
    });

    (document.querySelectorAll('.bookmark-btn') || []).forEach(bookmarkEl => {//get all elements with "arrow-btn" class and run for each
        bookmarkEl.addEventListener('click', toggleBookmark);
    });
})