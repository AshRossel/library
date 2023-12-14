const dialog = document.querySelector('dialog');
const addBook = document.querySelector('.add-book');
const closeButton = document.querySelector('.close');
const add = document.querySelector('.add');
const openDialog = () => dialog.showModal();
const closeDialog = () => dialog.close();
addBook.addEventListener('click', openDialog);
closeButton.addEventListener('click', closeDialog);
add.addEventListener('click', addBookToLibrary);

const myLibrary = [];

function Book(title, pages, read) {
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const title = document.querySelector('#title').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read:checked').value;
    const newBook = new Book(title, pages, read);
    myLibrary.push(newBook);
    addBooksToDisplay();
}

