let addNewBtnEl =  document.querySelector('#new-post-btn');
let viewPostEl = document.querySelector('#view-post');


function toggleModal(event){
    const trigger = event.target;
    if(trigger.classList.contains('modal-active')){
        trigger.classList.toggle('modal-active');
        (document.querySelectorAll('dialog[open]') || []).forEach(modal => {//get all open modals and run for each
            modal.removeAttribute('open');
        });
        return;
    };

    if(trigger.hasAttribute('linked-modal')){
        const linkedModal = trigger.getAttribute('linked-modal');
        document.querySelector(`#${linkedModal}`).toggleAttribute('open');
        return;
    }

    if(trigger.hasAttribute('open')){
        trigger.toggleAttribute('open');
        return;
    }   
}

function openModal(selector){
    const modal = document.querySelector(selector);
    modal.addAttribute('open');
}

async function openPost(event) {
    const postId = event.target.getAttribute('post_id');
    openModal('#main-modal');
    addNewBtnEl.classList.add('modal-active');
    const { id, title, snippet, description, user_id } = await fetch(`api/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          }
    });
    const { username } = await fetch(`api/users/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          }
    });
    document.querySelector('#post-view-title').textContent = title;
    document.querySelector('#post-view-author').textContent = username;
    document.querySelector('#post-view-snippet').textContent = snippet;
    document.querySelector('#post-view-description').textContent = description;
}

function refreshPosts(){
    (document.querySelectorAll('.post[post_id]') || []).forEach(postEl => {//get all elements with "post" class and run for each
       postEl.addEventListener('click', openPost)
    });
}


document.addEventListener('DOMContentLoaded', () => {
    addNewBtnEl.addEventListener('click', toggleModal);
})