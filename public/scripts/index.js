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
        document.documentElement.classList.toggle('scroll-disabled');
        (document.querySelectorAll('dialog[open]') || []).forEach(modal => {//get all open modals and run for each
            modal.removeAttribute('open');
        });
        return;
    };

    if (trigger.hasAttribute('linked-modal')) {
        trigger.classList.add('modal-active');
        document.documentElement.classList.add('scroll-disabled');
        const linkedModal = trigger.getAttribute('linked-modal');
        document.querySelector(`#${linkedModal}`).toggleAttribute('open');
        return;
    }

    if (trigger.hasAttribute('open')) {
        trigger.toggleAttribute('open');
        document.documentElement.classList.remove('scroll-disabled');
        return;
    }
}

async function openModal(selector, linkTo = '/') {
    const modal = document.querySelector(selector);
    modal.setAttribute('open', '');
    document.documentElement.classList.add('scroll-disabled');
    if (!addNewBtnEl.classList.contains('modal-active')) {
        addNewBtnEl.classList.add('modal-active');
    }
    await delay(1);
    if (linkTo !== '/') {
        document.location.replace(linkTo);
    } else {
        console.log('no redirect link provided!');
        await delay(5);
        document.location.replace(linkTo);
    }
}

function openPost(event) {
    event.stopPropagation();
    const postId = event.target.getAttribute('post_id');
    addNewBtnEl.classList.add('modal-active');
    openModal('#main-modal', `/post/${postId}`);
}

function setUpPosts() {
    (document.querySelectorAll('.post[post_id]') || []).forEach(postEl => {//get all elements with "post" class and run for each
        const postId = postEl.getAttribute('post_id');
        postEl.addEventListener('click', openPost);
        if (postEl.classList.contains('saved')) {
            (document.querySelectorAll(`[post_id='${postId}']`) || []).forEach(savedPostEl => {//get all elements with "post" class and run for each
                if (!savedPostEl.classList.contains('saved')) {
                    savedPostEl.classList.add('saved');
                }
            });
        }
    });
}

async function toggleBookmark(event) {
    event.stopPropagation();
    let postEl = event.target.parentElement.parentElement.parentElement;
    let postId = postEl.getAttribute('post_id');
    //console.log(postEl);
    if (postEl.classList.contains('saved')) {
        const response = await fetch('/api/bookmarks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'post_id': Number(postId)
            }),
        });
        if(response.status == 401){
            await openModal('#main-modal', '/login');
        }
        else {
            (document.querySelectorAll(`.post[post_id='${postId}']`) || []).forEach(savedPostEl => {//get all elements with the "post" class and "post_id" attribute equal to sepcified value and run for each
                savedPostEl.classList.remove('saved');
            });
            (document.querySelectorAll(`#users-posts .post[post_id='${postId}']`) || []).forEach(savedPostEl => {//get all elements with the "post" class and "post_id" attribute equal to sepcified value within users-post id element and run for each
                savedPostEl.remove();
            });
        }
    }
    else {
        const response = await fetch('/api/bookmarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'post_id': Number(postId)
            }),
        });
        if(response.status == 401){
            await openModal('#main-modal', '/login');
        }
        else {
            (document.querySelectorAll(`.post[post_id='${postId}']`) || []).forEach(savedPostEl => {//get all elements with the "post" class and "post_id" attribute equal to sepcified value and run for each
                savedPostEl.classList.add('saved');
            });
            document.location.reload();
        }
    }
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

    if(document.querySelectorAll('div[logged_in]').length > 0){
        console.log('logged in detected');
        console.log(document.querySelectorAll('div[logged_in]'));
        (document.querySelectorAll('.log-btn') || []).forEach(logBtnEl => {//get all elements with "log-btn" class and run for each
            logBtnEl.textContent = 'Log Out'
            logBtnEl.addEventListener('click', async function () {
                await fetch('/api/users/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                document.location.reload();
            });
        });
    }
    else {
        console.log('logged in not detected');
        (document.querySelectorAll('.log-btn') || []).forEach(logBtnEl => {//get all elements with "log-btn" class and run for each
            logBtnEl.textContent = 'Sign In'
            logBtnEl.addEventListener('click', async function () {
                openModal('#main-modal', '/login');
            });
        });
    }
    setUpPosts();
})