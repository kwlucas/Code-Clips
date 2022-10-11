let addNewBtnEl = document.querySelector('#new-post-btn');
let viewPostEl = document.querySelector('#view-post');


function delay(seconds = 1) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

//Open and close the/a modal when a modal trigger item is clicked
//(Mostly for testing or placeholder purposes)
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

//Open the modal from given selector and then switch to the given url/route
async function openModal(selector, linkTo = '/') {
    //Get the modal using the selector
    const modal = document.querySelector(selector);
    //Give the modal the open attribute
    modal.setAttribute('open', '');
    document.documentElement.classList.add('scroll-disabled');
    //Apply the "modal-active" class to the "add new" button if it is not already applied. (applying the class runs the open modal animation)
    if (!addNewBtnEl.classList.contains('modal-active')) {
        addNewBtnEl.classList.add('modal-active');
    }
    await delay(1);
    //Switch to given page/route
    if (linkTo !== '/') {
        document.location.replace(linkTo);
    } else {
        console.log('no redirect link provided!');
        await delay(5);
        document.location.replace(linkTo);
    }
}

async function openPost(event) {
    //Make sure you do not hit overlapping clickable elements such as the bookmarks
    event.stopPropagation();
    //Get the "post_id" of the post from the element attribute
    const postId = await event.target.getAttribute('post_id');
    addNewBtnEl.classList.add('modal-active');
    //Use the post id to navigate to the proper route to view the post
    openModal('#main-modal', `/post/${postId}`);
}

function setUpPosts() {
    (document.querySelectorAll('.post[post_id]') || []).forEach(postEl => {//get all elements with "post" class and run for each
        //Get the "post_id" of the post from the element attribute
        const postId = postEl.getAttribute('post_id');
        //Make all the posts clickable
        postEl.addEventListener('click', openPost);
        //get all bookmarked posts
        if (postEl.classList.contains('saved')) {
            //Make sure all instances of a saved post is given the "saved" class (thats what changed the bookmark button color)
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
    //Get the post element that the bookmark button is linked to/nested within
    let postEl = event.target.parentElement.parentElement.parentElement;
    //Get the "post_id" of the post from the element attribute
    let postId = postEl.getAttribute('post_id');
    //console.log(postEl);
    //If th post is saved then use the API to delete the bookmark
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
        //If the API request returns an "unauthorized" status code, meaning the user is not signed switch to the login page
        if(response.status == 401){
            await openModal('#main-modal', '/login');
        }
        else {
            //Change the bookmark button color of all existing instances of the post on the page
            (document.querySelectorAll(`.post[post_id='${postId}']`) || []).forEach(savedPostEl => {//get all elements with the "post" class and "post_id" attribute equal to sepcified value and run for each
                savedPostEl.classList.remove('saved');
            });
            //Remove all instances of the post from the "Your Bookmarks" section
            (document.querySelectorAll(`#users-posts .post[post_id='${postId}']`) || []).forEach(savedPostEl => {//get all elements with the "post" class and "post_id" attribute equal to sepcified value within users-post id element and run for each
                savedPostEl.remove();
            });
        }
    }
    else {
        //Using the API create a new bookmark
        const response = await fetch('/api/bookmarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'post_id': Number(postId)
            }),
        });
        //If the API request returns an "unauthorized" status code, meaning the user is not signed switch to the login page
        if(response.status == 401){
            await openModal('#main-modal', '/login');
        }
        else {
            //Change the bookmark button color of all existing instances of the post on the page
            (document.querySelectorAll(`.post[post_id='${postId}']`) || []).forEach(savedPostEl => {//get all elements with the "post" class and "post_id" attribute equal to sepcified value and run for each
                savedPostEl.classList.add('saved');
            });
            //Reload the page (while preserving scroll position) in order to change the instances of the posts in the "Your Bookmarks" section.
            document.location.reload();
        }
    }
}

//Scroll to the right in the row
function scrollR(event) {
    //Get the container of the post elements
    let scrollBoxEl = event.target.parentElement.previousElementSibling;
    //console.log(scrollBoxEl);
    scrollBoxEl.scrollLeft += 270;
}

//Scroll to the left in the row
function scrollL(event) {
    //Get the container of the post elements
    let scrollBoxEl = event.target.parentElement.nextElementSibling;
    //console.log(scrollBoxEl);
    scrollBoxEl.scrollLeft -= 270;
}


document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.modal-trigger') || []).forEach(triggerEl => {//get all elements with "modal-trigger" class and run for each
        triggerEl.addEventListener('click', toggleModal);
    });
    //Make it so that when you click the "Add New" button it will redirect to the new page/route
    addNewBtnEl.addEventListener('click', function () { openModal('#main-modal', '/new')});

    //Make it so the arrow buttons are linked to the scrolling functions
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

    //Check if the user is logged in by searching for the hidden "logged_in" element.
    if(document.querySelectorAll('div[logged_in]').length > 0){
        //console.log('logged in detected');
        //Set all "log buttons" to say "Log out" and when clicked uses API to log the user out
        (document.querySelectorAll('.log-btn') || []).forEach(logBtnEl => {//get all elements with "log-btn" class and run for each
            logBtnEl.textContent = 'Log Out';
            logBtnEl.addEventListener('click', async function () {
                await fetch('/api/users/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                //Once logged out/ session is deleted reload the page
                document.location.reload();
            });
        });
    }
    else {
        //console.log('logged in not detected');
        //Set all the "log buttons" to say "Sign In" and when clicked go to the login page
        (document.querySelectorAll('.log-btn') || []).forEach(logBtnEl => {//get all elements with "log-btn" class and run for each
            logBtnEl.textContent = 'Sign In'
            logBtnEl.addEventListener('click', async function () {
                openModal('#main-modal', '/login');
            });
        });
    }
    setUpPosts();
})