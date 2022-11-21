let totalPrice = 0;
let bookCounter = 0;

//create header

document.body
  .appendChild(document.createElement("header"))
  .setAttribute("id", "header");

const header = document.getElementById("header");
header
  .appendChild(document.createElement("h2"))
  .appendChild(document.createTextNode("Home"));
header
  .appendChild(document.createElement("h1"))
  .appendChild(document.createTextNode("Book Shop"));
header.appendChild(document.createElement("div")).id = "bag";

header.firstChild.addEventListener("click", () => {
  location.reload();
});

const bookCount = document.createElement("p");
// bookCount.id = "book-count";
const bag = document.getElementById("bag");
bag.appendChild(bookCount);
bag.appendChild(document.createElement("div")).id = "bag-icon";
bag.addEventListener("click", function (e) {
  cartList.classList.toggle("show");
  cartList.classList.toggle("hide");
});

//add main section
const main = document.createElement("main");
main.id = "main";
document.body.appendChild(main);

// add books container
const booksWrapper = document.createElement("div");
booksWrapper.className = "books-wrapper";
main.appendChild(booksWrapper);

///////////////////////////////
// Grab Books data
fetch("./src/books.json") //path to the file with json data
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.map((book) => {
      cardBuilder(book, booksWrapper);
    });
  });
///////////////////////////////

//create description window

const descText = document.createElement("p");

const description = document.createElement("div");
description.id = "description-window";
description.appendChild(descText);
description.addEventListener("click", function () {
  descText.innerHTML = "";
  description.classList.toggle("show");
});

main.appendChild(description);

//create cart list container
const cartPrice = document.createElement("p");
cartPrice.className = "cart-price";
const clearBooks = document.createElement("p");
clearBooks.innerText = "Clear";
clearBooks.className = "clear-all";

const checkout = document.createElement("h5");
checkout.innerText = "Checkout";
checkout.className = "checkout";
checkout.addEventListener("click", function (e) {
  window.open("./checkout/checkout.html", "_self");
});

const cartActions = document.createElement("div");
cartActions.className = "cart-actions";
cartActions.appendChild(cartPrice);
cartActions.appendChild(clearBooks);
cartActions.appendChild(checkout);

const cartList = document.createElement("div");
cartList.id = "cart-list";
cartList.className = "hide";
cartList.appendChild(cartActions);
// drop zone
cartList.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.target.style.opacity = 1;
});
cartList.addEventListener("dragleave", (e) => {
  e.preventDefault();
  cartList.style.opacity = 0.5;
});
cartList.addEventListener("drop", (e) => {
  e.preventDefault();
  const droppedId = e.dataTransfer.getData("text/plain");
  const dropEl = document.getElementById(droppedId);
  cartList.className = "show";
  cartListCardBuilder(dropEl, cartList);
});
////

main.appendChild(cartList);
clearBooks.addEventListener("click", function (e) {
  let n = cartList.children.length;
  for (let i = 1; i < n; i++) {
    cartList.lastChild.remove();
    cartPrice.innerText = `Total: \$${(totalPrice = 0)}`;
    bookCount.innerText = `${(bookCounter = 0)}`;
  }
});
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

  const cartText = document.createElement("p");
  cartText.innerText = "Add to cart";

  const addCartBtn = document.createElement("div");
  addCartBtn.className = "add-cart button";
  addCartBtn.appendChild(cartText);
  addCartBtn.addEventListener("click", () => {
    cartList.className = "show";
    cartListCardBuilder(book, cartList);
  });

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
  card.draggable = true;
  card.id = (
    book.title.replace(/\s/g, "-") +
    "-by-" +
    book.author.replace(/\s/g, "-")
  ).toLowerCase();
  card.className = "card";
  // drag events
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", card.id);
    cartList.style.visibility = "visible";
    cartList.style.opacity = 0.5;
  });
  card.addEventListener("dragend", () => {
    cartList.style.visibility = "";
    cartList.style.opacity = "";
  });

  card.appendChild(bookCover);
  card.appendChild(cardInfo);

  mainList.appendChild(card);
};

//create cart-list card builder
const cartListCardBuilder = (book, mainList) => {
  let titleValue = "";
  let bookPrice = 0;
  let imgSrc = "";

  if (book.title) {
    imgSrc = book.imageLink;
    titleValue = book.title;
    bookPrice = book.price;
  } else {
    imgSrc = book.firstChild.src;
    titleValue = book.lastChild.firstChild.innerText;
    bookPrice = +book.lastChild.children[2].innerText.split("$")[1];
    console.log(bookPrice);
  }

  totalPrice = (totalPrice * 1000 + bookPrice * 1000) / 1000;
  cartPrice.innerText = `Total: \$${totalPrice}`;
  bookCount.innerText = `${++bookCounter}`;

  const bookCoverImg = document.createElement("img");
  bookCoverImg.src = imgSrc;
  bookCoverImg.alt = titleValue;

  const bookCoverDiv = document.createElement("div");
  bookCoverDiv.className = "book-cover-incart";
  bookCoverDiv.appendChild(bookCoverImg);

  const title = document.createElement("h4");
  title.innerText = titleValue;

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "bi bi-trash3";

  const deleteBook = document.createElement("div");
  deleteBook.className = "delete-book";
  deleteBook.appendChild(deleteIcon);
  deleteBook.addEventListener("click", function (e) {
    e.target.parentElement.parentElement.remove();
    totalPrice = (totalPrice * 1000 - bookPrice * 1000) / 1000;
    cartPrice.innerText = `Total: \$${totalPrice}`;
    bookCount.innerText = `${--bookCounter}`;
  });

  const addedBook = document.createElement("div");
  addedBook.className = "added-book";
  addedBook.appendChild(bookCoverDiv);
  addedBook.appendChild(title);
  addedBook.appendChild(deleteBook);

  mainList.appendChild(addedBook);
};

//add footer
{
  const footNote = document.createElement("h5");
  footNote.innerText = "Created by Nikoloz";
  const footer = document.createElement("footer");
  footer.appendChild(footNote);
  document.body.appendChild(footer);
}
