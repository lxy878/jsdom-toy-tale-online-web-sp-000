let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Fetch Andy's Toys
function allToys (){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => addToys(json));
}

function addToys(json){
  const toyCollection = document.querySelector('div#toy-collection');
  for (const obj of json){
    const div = document.createElement('div');
    div.className = 'card';
    addName(obj, div);
    addImage(obj, div);
    addLike(obj, div);
    addButton(obj, div);
    toyCollection.appendChild(div);
  }
}

// Add Toy Info to the Card

function addButton(obj, div) {
  const button = document.createElement('button');
  button.className = 'like-btn';
  button.innerText = 'Like';
  button.addEventListener('click', () => {
    increaseLike(obj);
    window.location.reload(true);
  });
  button.id = `${obj.id}`;
  div.appendChild(button);
}

function addLike(obj, div) {
  const p = document.createElement('p');
  p.innerText = `${obj.likes} likes`;
  div.appendChild(p);
}

function addImage(obj, div){
  const img = document.createElement('img');
  img.className = 'toy-avatar';
  img.src  = obj.image;
  div.appendChild(img);
}

function addName(obj, div){
  const h2 = document.createElement('h2');
  h2.innerText = obj.name;
  div.appendChild(h2);
}

// Add a New Toy
const body = {
  "name": "Jessie",
  "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  "likes": 0
}

const configureToy = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(body)
}

function submit(config) {
  fetch('http://localhost:3000/toys', config)
  .then(resp => resp.json())
  .then(obj => console.log(obj))
  .catch(error => console.log(error.message));
}

document.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementsByName('name')[0].value;
  const image = document.getElementsByName('image')[0].value;
  const newBody = Object.assign({}, body, {name, image});
  const newConfig = Object.assign({}, configureToy, {['body']: JSON.stringify(newBody)});
  console.log(newConfig);
  submit(newConfig);
});

// Increase Toy's Likes
function increaseLike(obj){
  fetch(`http://localhost:3000/toys/${obj.id}`, config = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      'likes': (obj.likes+1)
    })
  }).then(resp => console.log(resp))
}
