let addNewBtnEl =  document.querySelector('new-post-btn');

function toggleModal(event){
    const trigger = event.target;
    if(trigger.classList.contains('modal-active')){
        trigger.classList.toggle('modal-active');
        (document.querySelectorAll('dialog[open]') || []).forEach(modal => {//get all elements with "modal-close" class and run for each
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


document.addEventListener('DOMContentLoaded', () => {
    addNewBtnEl.addEventListener('click', toggleModal);
})