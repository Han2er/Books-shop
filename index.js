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
  });

const descText = document.createElement("p");

const description = document.createElement("div");
description.id = "description-window";
description.appendChild(descText);
description.addEventListener("click", function () {
  descText.innerHTML = "";
  description.classList.toggle("show");
});

main.appendChild(description);

//create cart container
const cartList = document.createElement("div");
cartList.id = "cart-list";
cartList.className = "hide";
main.appendChild(cartList);

//create card builder function
const cardBuilder = (book, mainList) => {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = book.title;
  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = book.author;
  const bookPrice = document.createElement("p");
  bookPrice.innerText = `Price: \$${book.price}`;
  bookPrice.className = "price";
  const bookDescribtion = document.createElement("p");
  bookDescribtion.className = "description button";
  bookDescribtion.innerHTML = "Description";
  bookDescribtion.addEventListener("click", function (e) {
    console.log(e.target);
    descText.innerHTML = `${book.title} by ${book.author}<br/><br/>${book.description}`;
    description.classList.toggle("show");
  });

  const carText = document.createElement("p");
  carText.innerText = "Add to cart";

  const addCartBtn = document.createElement("div");
  addCartBtn.className = "add-cart button";
  addCartBtn.appendChild(carText);

  const cardInfo = document.createElement("div");
  cardInfo.className = "card-info";
  cardInfo.appendChild(bookTitle);
  cardInfo.appendChild(bookAuthor);
  cardInfo.appendChild(bookPrice);
  cardInfo.appendChild(bookDescribtion);
  cardInfo.appendChild(addCartBtn);

  const bookCover = document.createElement("img");
  bookCover.src = book.imageLink;
  bookCover.alt = book.title;

  const card = document.createElement("div");
  card.className = "card";
  card.appendChild(bookCover);
  card.appendChild(cardInfo);

  mainList.appendChild(card);

  addCartBtn.addEventListener("click", function (e) {
    cartList.className = "show";
    cartListCardBuilder(book, cartList);
  });
};

//create cart-list card builder
const cartListCardBuilder = (book, mainList) => {
  const bookCoverImg = document.createElement("img");
  bookCoverImg.src = book.imageLink;
  bookCoverImg.alt = book.title;

  const bookCoverDiv = document.createElement("div");
  bookCoverDiv.className = "book-cover-incart";
  bookCoverDiv.appendChild(bookCoverImg);

  const title = document.createElement("h4");
  title.innerText = book.title;

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "bi bi-trash3";

  const deleteBook = document.createElement("div");
  deleteBook.className = "delete-book";
  deleteBook.appendChild(deleteIcon);

  const addedBook = document.createElement("div");
  addedBook.className = "added-book";
  addedBook.appendChild(bookCoverDiv);
  addedBook.appendChild(title);
  addedBook.appendChild(deleteBook);

  mainList.appendChild(addedBook);
};
