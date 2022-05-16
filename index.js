const div = document.createElement("div");
const p = document.createElement("p");
const header = document.createElement("header");
const nav = document.createElement("nav");
const h1_text = "Wellcome to my Book Shop";

const card = p.setAttribute("class", "card");

// newP.setAttribute("id", "esaa");

//add H1 page title
document.body
  .appendChild(header)
  .appendChild(nav)
  .appendChild(document.createElement("h1"))
  .appendChild(document.createTextNode(h1_text));

document.body.appendChild(document.createElement("main")).id = "main";
// create card elements in main section

const main = document.getElementById("main");
for (let i = 0; i < 6; i++) {
  // main.innerHTML += `<div class='card'>${i}</div>`;
}

fetch("./src/books.json") //path to the file with json data
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.map((book) => {
      main.innerHTML += `
      <div class='card'>
        <img src=${book.imageLink} alt=${book.title}>
        <div class="card-wraper">
          <h3>${book.title}</h3>
          <p>${book.author}</p>
          <p>Price $${book.price}</p>
          <a class="decription">Description</a>
          <a class="add-to-cart">Add to cart</a>
        </div>
      </div>`;
    });
    console.log(data);
  });
