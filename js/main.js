let elUsers = document.querySelector(".js-users")
let elUSersTemplate = document.querySelector(".template-users").content
let elPosts = document.querySelector(".js-posts")
let elPostsTemplate = document.querySelector(".posts__template").content;
let elComments = document.querySelector(".js-comments")
const templateComments = document.querySelector( ".comments__template").content;
const loadingImg = document.querySelector(".loading__img");


const containerUsers = [];
const containerPosts = [];


function renderUsers(arr,node){
  const fragmentUsers = document.createDocumentFragment();
  
    loadingImg.style.display = "none";
    arr.forEach(el =>{
      const templateUsers = elUSersTemplate.cloneNode(true);
      containerUsers.push(el.id);
      
      
      templateUsers.querySelector(".users__text").textContent = el.username;
      templateUsers.querySelector(".users-name").textContent = el.name;
      templateUsers.querySelector(".users-id").textContent = el.id;
      templateUsers.querySelector(".users-street").textContent = el.address.street;
      templateUsers.querySelector(".users-suite").textContent = el.address.suite;
      templateUsers.querySelector(".users-city").textContent = el.address.city;
      templateUsers.querySelector(".users-zipcode").textContent = el.address.zipcode;
      templateUsers.querySelector(".users-title").textContent = el.company.name;
      templateUsers.querySelector(".users-phrase").textContent = el.company.catchPhrase;
      templateUsers.querySelector(".users-bs").textContent = el.company.bs;
      templateUsers.querySelector(".users-phone").textContent = el.phone;
      templateUsers.querySelector(".users-geo").textContent = "geo";
      templateUsers.querySelector(".users-website").textContent = el.website;
      templateUsers.querySelector(".users-email").textContent = el.email;
      
      
      templateUsers.querySelector(".users-phone").href = `tel:${el.phone}`;
      templateUsers.querySelector(".users-geo").href = `https://google.com/maps/place/${el.address.geo.lat},${el.address.geo.lng}`;
      templateUsers.querySelector(".users-website").href = `https://${el.website}`;
      templateUsers.querySelector(".users-email").href = `mailto:${el.email}`;
      templateUsers.querySelector(".users__item").dataset.id = el.id;
      
      
      fragmentUsers.appendChild(templateUsers);
    })
  
  node.appendChild(fragmentUsers)
}


const renderPosts = function(arr, node){
  node.innerHTML = "";
  
  const fragmentPosts = document.createDocumentFragment();
  
    loadingImg.style.display = "none";
    arr.forEach((element) => {
      containerPosts.push(element.id);
      console.log(element);
      const templatePosts = elPostsTemplate.cloneNode(true);
      templatePosts.querySelector(".posts-title").textContent = element.title;
      templatePosts.querySelector(".posts-text").textContent = element.body;
      templatePosts.querySelector(".posts-item").dataset.id = element.id;
      
      
      fragmentPosts.appendChild(templatePosts);
    });
  
  node.appendChild(fragmentPosts);
};

const renderComments = (arr, element) => {
  element.innerHTML = "";
  const fragmentComments = document.createDocumentFragment();
  if (arr.length > 0) {
    loadingImg.style.display = "none";
    
    arr.forEach((e) => {
      const newTemplateComments = templateComments.cloneNode(true);
      newTemplateComments.querySelector(".comments-name").textContent = e.name;
      newTemplateComments.querySelector(".comments-email").textContent = e.email;
      newTemplateComments.querySelector(".comments-text").textContent = e.body;
      
      newTemplateComments.querySelector(".comments-email").href = `mailto:${e.email}`;
      
      fragmentComments.appendChild(newTemplateComments);
    });
  }
  element.appendChild(fragmentComments);
};


async function getUsers(){
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const data = await res.json()
  console.log(data);
  renderUsers(data,elUsers)
}

getUsers()



async function getPosts(usersId){
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usersId}`)
  const data = await res.json();
  console.log(data);
  renderPosts(data, elPosts);
  
};

async function getComments(postId){
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const data = await res.json();
    renderComments(data, elComments);
  };
  
  
  
  elUsers.addEventListener("click", (evt) => {
    elComments.innerHTML = "";
    if (evt.target.matches(".users__item")) {
      loadingImg.style.display = "block";
      const usersListItemId = evt.target.dataset.id  - 0;
      containerUsers.forEach((userId) => {
        if (usersListItemId === userId) {
          console.log(userId);
          getPosts(userId);
        }
      });
    }
    console.log(elPosts);
  });
  
  
  
  elPosts.addEventListener("click", (evt) => {
    if (evt.target.matches(".posts-item")) {
      loadingImg.style.display = "flex";
      const postsListItemId = evt.target.dataset.id - 0;
      containerPosts.forEach((postId) => {
        if (postsListItemId === postId) {
          getComments(postId);
        }
      });
    }
  });
  