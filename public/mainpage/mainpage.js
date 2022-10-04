 const addBtn = document.querySelector('.new_note_btn');
const divPlacement = document.get
addBtn.addEventListener('click', addNew);

function addNew(postTitle){
    const newTextArea = document.createElement('textarea');
    newTextArea.classList.add('note-style')
    newTextArea.textContent = postTitle;
    document.body.appendChild(newTextArea);
};

 async function getPost(userBookmarks){
 let post = await fetch(`/api/posts/${userBookmarks.post_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }})
   addNew(post.title);
}
data.forEach(getPost(element));