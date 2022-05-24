const div = document.createElement("div");
const p = document.createElement("p");

//create header
document.body
  .appendChild(document.createElement("header"))
  .setAttribute("id", "header");

const header = document.getElementById("header");
header
  .appendChild(document.createElement("h3"))
  .appendChild(document.createTextNode("Home"));
header
  .appendChild(document.createElement("h1"))
  .appendChild(document.createTextNode("Book Shop"));
header.appendChild(document.createElement("div")).id = "bag";

const bag = document.getElementById("bag");
bag
  .appendChild(document.createElement("p"))
  .appendChild(document.createTextNode("2"));
bag.appendChild(document.createElement("div")).id = "bag-icon";

//add main section
const main = document.createElement("main");
main.id = "main";
document.body.appendChild(main);

fetch("./src/books.json") //path to the file with json data
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.map((book) => {
      cardBuilder(book, main);
    });

    // data.map((book) => {
    //   main.innerHTML += `
    //   <div class='card'>
    //     <img src=${book.imageLink} alt=${book.title}>
    //     <div class="card-info">
    //         <h3>${book.title}</h3>
    //         <p>${book.author}</p>
    //         <p class="price">Price: $${book.price}</p>
    //         <p class="description button"><i class="bi bi-info-circle"></i> Description</p>
    //       <div class="add-cart">
    //         <p class="add-to-cart button" >Add to cart</p>
    //       </div>
    //     </div>
    //   </div>`;
    // });
    // console.log(data);
  });

const descText = document.createElement("p");

const description = document.createElement("div");
description.id = "description-window";
description.appendChild(descText);
description.addEventListener("click", function () {
  descText.innerHTML = "";
  description.classList.toggle("show-description");
});

main.appendChild(description);

//create card builder function
const cardBuilder = (book, index, mainList) => {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = book.title;
  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = book.author;
  const bookPrice = document.createElement("p");
  bookPrice.innerText = `Price: \$${book.price}`;
  bookPrice.className = "price";
  const bookDescribtion = document.createElement("p");
  bookDescribtion.className = "description button";
  bookDescribtion.innerHTML = "description";
  bookDescribtion.addEventListener("click", function (e) {
    console.log(e.target);
    descText.innerHTML = `${book.title} by ${book.author}<br/>${book.description}`;
    description.classList.toggle("show-description");
  });

  const cartBtn = document.createElement("p");
  cartBtn.innerText = "Add to cart";

  const addCart = document.createElement("div");
  addCart.className = "add-cart button";
  addCart.appendChild(cartBtn);

  const cardInfo = document.createElement("div");
  cardInfo.className = "card-info";
  cardInfo.appendChild(bookTitle);
  cardInfo.appendChild(bookAuthor);
  cardInfo.appendChild(bookPrice);
  cardInfo.appendChild(bookDescribtion);
  cardInfo.appendChild(addCart);

  const bookCover = document.createElement("img");
  bookCover.src = book.imageLink;
  bookCover.alt = book.title;

  const card = document.createElement("div");
  card.className = "card";
  card.appendChild(bookCover);
  card.appendChild(cardInfo);

  main.appendChild(card);
};
